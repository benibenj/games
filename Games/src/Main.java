import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Timer;
import java.util.TimerTask;

import database.Database;
import database.templates.ObjectTemplate;
import jobs.PreciseIntervalJob;
import mailer.Mailer;
import manager.DatabaseSessionManager;
import responder.RenderResponder;
import server.Request;
import server.Server;
import user.User;
import user.UserManager;

public class Main {
	
	private static final int REWARD_SIZE = 3;
	private static final int MAX_SESSION_AGE = 7 * 24 * 60 * 60;
	private static final int PORT = 8001;
	
	private static HashMap <String, Object> predefined;
	private static Database database;
	private static Mailer mailer;
	private static RenderResponder responder;
	private static DatabaseSessionManager <User> sessionManager;
	private static Server server;
	
	public static void main(String[] args) throws IOException {
		
		predefined = new HashMap <String, Object> (); 
		predefined.put("url", "http://we.serve.games");
		
		database = new Database();
		mailer = new Mailer(new File("views/mail"), predefined);
		responder = new RenderResponder(new File("views/web"), predefined);
		sessionManager = new DatabaseSessionManager <User> (database, MAX_SESSION_AGE, User::new);
		server = new Server(PORT, new File("public"), responder, sessionManager);
		
		new UserManager(server, responder, database, mailer, predefined, 
			(User user) -> {
				Player player = new Player(user.getUsername());
				player.setDatabase(database);
				for(int i = 0; i < Player.QUEST_AMOUNT; i++) {
					player.addQuest();
				}
				database.save(player);
			}, 
			(User user) -> {
				Player player = null;
				if((player = (Player) database.load(Player.class, user.getUsername())) != null) {
					player.delete();
				}
			}
		);
		
		initializeRoutes(server, responder, database);
		
		// Delete all expired score requests
		Timer timer = new Timer();
		timer.schedule(new TimerTask() {
			@Override
			public void run() {
				database.deleteAll(ScoreRequest.class, (ObjectTemplate objectTemplate) -> {
					ScoreRequest scoreRequest = (ScoreRequest) objectTemplate;
					return scoreRequest.expired();
				});
			}
		}, 0, 10000);
		
		// Import PreciseIntervalJob from webserver repository
		new PreciseIntervalJob(() -> {
			// Update fame for all games listed here
			System.out.println("Updating Fame");
			
			String[] games = {"minesweeper", "flappybird", "brickbreaker"};

			for(String game : games) {
				LinkedList <ObjectTemplate> scoreObjectTemplates = database.loadAll(Score.class, (ObjectTemplate objectTemplate) -> {
					Score score = (Score) objectTemplate;
					return score.getGame().equals(game);
				});

				ArrayList <Score> scores = new ArrayList <Score> ();
				for(ObjectTemplate objectTemplate : scoreObjectTemplates) {
					scores.add((Score) objectTemplate);
				}
				
				Collections.sort(scores);
				
				
				for(int i = 0; i < Math.min(REWARD_SIZE, scores.size()); i++) {
					scores.get(i).getPlayer().addFame(REWARD_SIZE - i);
					database.update(scores.get(i));
				}
				
			}
			
			// Update quests
			
			System.out.println("Updating Quests");
			LinkedList <ObjectTemplate> questObjectTemplates = database.loadAll(Quest.class);
			for(ObjectTemplate objectTemplate : questObjectTemplates) {
				Quest quest = (Quest) objectTemplate;
				quest.updateDuration();
			}
			
		}, 60000);
		
		
	}
	
	private static void initializeRoutes(Server server, RenderResponder responder, Database database) {
		
		server.on("ALL", ".*", (Request request) -> {
			User user = (User) request.session.load();
			if(user == null) {
				predefined.put("coins", null);
			} else {
				Player player = (Player) database.load(Player.class, user.getUsername());
				predefined.put("coins", player.getCoins());
			}
			return responder.next();
		});
		
		
		// Game paths 
		server.on("GET", "/", (Request request) -> {
			return responder.render("index.html");
		});
		server.on("GET", "/games/minesweeper", (Request request) -> {
			return responder.render("games/minesweeper.html", request.languages);
		});
		server.on("GET", "/games/flappybird", (Request request) -> {
			return responder.render("games/flappybird.html", request.languages);
		});
		server.on("GET", "/games/brickbreaker", (Request request) -> {
			return responder.render("games/brickbreaker.html", request.languages);
		});
		server.on("GET", "/games/chickenkiller", (Request request) -> {
			return responder.render("games/chickenkiller.html", request.languages);
		});
		server.on("GET", "/scoreboard", (Request request) -> {
			return responder.render("scoreboard.html", request.languages);
		});
		server.on("GET", "/quests", (Request request) -> {
			User user = (User) request.session.load();
			if(user != null) {
				Player player = null;
				if((player = (Player) database.load(Player.class, user.getUsername())) != null) {
					HashMap <String, Object> variables = new HashMap <String, Object> ();
					variables.put("quests", player.getQuestInfos());
					StringBuilder json = new StringBuilder();
					json.append("[");
					boolean first = true;
					for(HashMap <String, Object> quest : player.getQuestInfos()) {
						if(!first) {
							json.append(", ");
						} else {
							first = false;
						}
						json.append("{");
						json.append("name: \"" + quest.get("name") + "\", ");
						json.append("game: \"" + quest.get("game") + "\", ");
						json.append("times: " + quest.get("times") + ", ");
						json.append("score: " + quest.get("score") + ", ");
						json.append("reward: " + quest.get("reward") + ", ");
						json.append("duration: " + quest.get("duration") + ", ");
						json.append("completed: " + quest.get("completed") + ", ");
						json.append("progress: " + Math.floor(new Float((Integer) quest.get("progress")) / new Float((Integer) quest.get("times")) * 100));
						json.append("}");
					}
					json.append("]");
					variables.put("json", json.toString());
					return responder.render("quests.html", request.languages, variables);
				}
			}
			return responder.redirect("/signin");
		});
		
		server.on("GET", "/casino", (Request request) -> {
			User user = (User) request.session.load();
			if(user != null) {
				Player player = null;
				if((player = (Player) database.load(Player.class, user.getUsername())) != null) {
					HashMap <String, Object> variables = new HashMap <String, Object> ();
					variables.put("quests", player.getQuestInfos());
					return responder.render("quests.html", request.languages, variables);
				}
			}
			return responder.redirect("/signin");
		});
		
		// Scoreboard paths
		server.on("GET", "/scoreboard/players", (Request request) -> {
			StringBuilder stringBuilder = new StringBuilder();
			LinkedList <ObjectTemplate> objectTemplates = database.loadAll(Player.class, (ObjectTemplate objectTemplate) -> {
				return true;
			});
			
			ArrayList <Player> players = new ArrayList <Player> ();
			for(ObjectTemplate objectTemplate : objectTemplates) {
				players.add((Player) objectTemplate);
			}
			
			Collections.sort(players);
			
			stringBuilder.append("[");
			boolean first = true;
			for(Player player : players) {
				if(!first) {
					stringBuilder.append(", ");
				}
				stringBuilder.append(player.json());
				first = false;
			}
			stringBuilder.append("]");
			return responder.text(stringBuilder.toString());
		});
		server.on("GET", "/scoreboard/games", (Request request) -> {
			final String game = request.parameters.get("game");
			StringBuilder stringBuilder = new StringBuilder();
			LinkedList <ObjectTemplate> objectTemplates = database.loadAll(Score.class, (ObjectTemplate objectTemplate) -> {
				Score score = (Score) objectTemplate;
				return score.getGame().equals(game);
			});

			ArrayList <Score> scores = new ArrayList <Score> ();
			for(ObjectTemplate objectTemplate : objectTemplates) {
				scores.add((Score) objectTemplate);
			}
			
			Collections.sort(scores);
			
			stringBuilder.append("[");
			boolean first = true;
			for(Score score : scores) {
				if(!first) {
					stringBuilder.append(", ");
				}
				stringBuilder.append(score.json());
				first = false;
			}
			stringBuilder.append("]");
			return responder.text(stringBuilder.toString());
		});
		server.on("GET", "/scoreboard/self", (Request request) -> {
			User user = (User) request.session.load();
			if(user != null) {
				final Player player;
				if((player = (Player) database.load(Player.class, user.getUsername())) != null) {
					StringBuilder stringBuilder = new StringBuilder();
					LinkedList <ObjectTemplate> objectTemplates = database.loadAll(Score.class, (ObjectTemplate objectTemplate) -> {
						Score score = (Score) objectTemplate;
						return score.getPlayer().equals(player);
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
					return responder.text(stringBuilder.toString());
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
					database.update(scoreRequest);
					return responder.text("valid");
				}
				database.update(scoreRequest);
			}
			return responder.text("invalid");
		});
	}
}
