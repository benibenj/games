import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedList;

import database.Database;
import database.templates.ObjectTemplate;
import mailer.Mailer;
import manager.DatabaseSessionManager;
import responder.RenderResponder;
import server.Request;
import server.Server;
import user.User;
import user.UserManager;

public class Main {
	public static void main(String[] args) throws IOException {
		HashMap <String, Object> predefined = new HashMap <String, Object> ();
		Database database = new Database();
		Mailer mailer = new Mailer(new File("views/mail"));
		RenderResponder responder = new RenderResponder(new File("views/web"), predefined);
		DatabaseSessionManager <User> sessionManager = new DatabaseSessionManager <User> (database, 7 * 24 * 60 * 60, User::new);
		Server server = new Server(8000, new File("public"), responder, sessionManager);
		
		initializeRoutes(server, responder, database);
		 
		new UserManager(server, responder, database, mailer, predefined, 
			(User user) -> {
				Player player = new Player(user.getUsername());
				database.save(player);
			}, 
			(User user) -> {
				Player player = null;
				if((player = (Player) database.load(Player.class, user.getUsername())) != null) {
					player.delete();
				}
			}
		);
	}
	
	private static void initializeRoutes(Server server, RenderResponder responder, Database database) {
		server.on("GET", "/", (Request request) -> {
			return responder.render("index.html");
		});
		server.on("GET", "/games/minesweeper", (Request request) -> {
			return responder.render("games/minesweeper.html");
		});
		server.on("GET", "/games/battleship", (Request request) -> {
			return responder.render("games/battleship.html");
		});
		
		// Scoreboard Paths
		server.on("GET", "/scoreboard/self", (Request request) -> {
			User user = (User) request.session.load();
			if(user != null) {
				final Player player;
				if((player = (Player) database.load(Player.class, user.getUsername())) != null) {
					StringBuilder stringBuilder = new StringBuilder();
					LinkedList <ObjectTemplate> objectTemplates = database.loadAll(Score.class, (ObjectTemplate objectTemplate) -> {
						Score score = (Score) objectTemplate;
						if(score.getPlayer().equals(player)) {
							return true;
						}
						return false;
					});
					stringBuilder.append("[");
					boolean first = true;
					for(ObjectTemplate objectTemplate : objectTemplates) {
						Score score = (Score) objectTemplate;
						if(!first) {
							stringBuilder.append(", ");
						}
						stringBuilder.append(score.json());
						first = false;
					}
					stringBuilder.append("]");
				}
			}
			return responder.text("error");
		});
		server.on("GET", "/scoreboard/request", (Request request) -> {
			User user = (User) request.session.load();
			if(user != null) {
				Player player = null;
				if((player = (Player) database.load(Player.class, user.getUsername())) != null) {
					return responder.text(player.addScoreRequest().json());
				}
			}
			return responder.text("error");
		});
		server.on("POST", "/scoreboard/submit", (Request request) -> {
			ScoreRequest scoreRequest = null;
			if((scoreRequest = (ScoreRequest) database.loadId(ScoreRequest.class, request.parameters.get("key"))) != null) {
				if(scoreRequest.verify(request.parameters.get("value"), request.parameters.get("game"))) {
					return responder.text("valid");
				}
			}
			return responder.text("invalid");
		});
	}
}
