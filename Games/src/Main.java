import java.io.File;
import java.io.IOException;
import java.util.HashMap;

import database.Database;
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
		
		initializeRoutes(server, responder);
		 
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
	
	private static void initializeRoutes(Server server, RenderResponder responder) {
		server.on("GET", "/", (Request request) -> {
			return responder.render("index.html");
		});
		server.on("GET", "/games/minesweeper", (Request request) -> {
			return responder.render("games/minesweeper.html");
		});
		server.on("GET", "/games/battleship", (Request request) -> {
			return responder.render("games/battleship.html");
		});
		server.on("GET", "/scores/list", (Request request) -> {
			String d
		});
		server.on("GET", "/scores/submit", (Request request) -> {
			return responder.text("success");
		});
	}
}
