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
import database.validator.Validator;
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
		
		if(database.loadAll(Season.class).size() <= 0) {
			// Initialize Season Update
			Season first = new Season(0);
			first.setDatabase(database);
			first.end(mailer);
			database.save(first);
		}
		
		server.on("ALL", ".*", (Request request) -> {
			User user = (User) request.session.load();
			if(user == null) {
				predefined.put("coins", null);
				predefined.put("booster-enabled", null);
				predefined.put("booster-active", null);
				predefined.put("booster-time", null);
				predefined.put("fame-per-minute", null);
			} else {
				Player player = (Player) database.load(Player.class, user.getUsername());
				predefined.put("coins", player.getCoins());
				predefined.put("booster-enabled", player.isBoosted());
				predefined.put("booster-active", player.isBoosted() && player.canBoost());
				predefined.put("booster-time", player.getBoosterTime());
				predefined.put("fame-per-minute", player.getFamePerMinute());
			}
			predefined.put("players-online", server.activeCount());
			int total = database.loadAll(Season.class).size();
			Season season = (Season) database.load(Season.class, "" + (total - 1));
			predefined.put("current-season", total);
			predefined.put("season-duration", season.getDuration());
			return responder.next();
		});
		
		new UserManager(server, responder, database, mailer, predefined, 
			(User user) -> {
				Player player = new Player(user.getUsername());
				player.setDatabase(database);
				
				player.addMissedRanks();
				
				for(int i = 0; i < 5; i++) {
					player.addQuest(1440);
				}
				player.addQuest(4320);
				
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
			
			System.out.println("Resetting Stats");
			
			// Set fame per minute, update later
			LinkedList <ObjectTemplate> playerObjectTemplates = database.loadAll(Player.class);
			for(ObjectTemplate object : playerObjectTemplates) {
				Player player = ((Player) object);
				
				player.setFamePerMinute(0);
				database.update(player);
			}
			
			System.out.println("Adding Fame");

			String[] games = {"minesweeper", "flappybird", "brickbreaker", "chickenkiller", "runner"};
	
			final int currentSeason = database.loadAll(Season.class).size() - 1;

			for(String game : games) {
				LinkedList <ObjectTemplate> scoreObjectTemplates = database.loadAll(Score.class, (ObjectTemplate objectTemplate) -> {
					Score score = (Score) objectTemplate;
					return score.getGame().equals(game) && score.getSeason() == currentSeason;
				});

				ArrayList <Score> scores = new ArrayList <Score> ();
				for(ObjectTemplate objectTemplate : scoreObjectTemplates) {
					scores.add((Score) objectTemplate);
				}
				
				Collections.sort(scores);
				
				for(int i = 0; i < Math.min(REWARD_SIZE, scores.size()); i++) {
					int addedReward = (REWARD_SIZE - i);
					Player player = scores.get(i).getPlayer();
					if(player.isBoosted() && player.canBoost()) {
						addedReward *= 2;
					}
					player.addFamePerMinute(addedReward);
					scores.get(i).getPlayer().addFame(addedReward);
					database.update(scores.get(i));
				}

			}
			
			System.out.println("Removing Booster");
			
			// Remove 1 minute worth of booster
			playerObjectTemplates = database.loadAll(Player.class);
			for(ObjectTemplate object : playerObjectTemplates) {
				Player player = ((Player) object);
				
				if(player.isBoosted() && player.canBoost()) {
					player.addBooster(-1);
				}
				
				// Add quests to account if not there
				LinkedList <ObjectTemplate> questObjectTemplates = database.loadAll(Quest.class, (ObjectTemplate objectTemplate) -> {
					return ((Quest) objectTemplate).getPlayer().equals(player);
				});
				
				if(questObjectTemplates.size() == 0) {
					for(int i = 0; i < 5; i++) {
						player.addQuest(1440);
					}
					player.addQuest(4320);
				}
				
				database.update(player);
			}
			
			System.out.println("Updating Quests");
			
			// Update quests
			LinkedList <ObjectTemplate> questObjectTemplates = database.loadAll(Quest.class);
			for(ObjectTemplate objectTemplate : questObjectTemplates) {
				Quest quest = (Quest) objectTemplate;
				quest.updateDuration();
			}
			
			System.out.println("Updating Seasons");
			
			// Update Season
			LinkedList <ObjectTemplate> seasonObjectTemplates = database.loadAll(Season.class);
			for(ObjectTemplate objectTemplate : seasonObjectTemplates) {
				Season season = (Season) objectTemplate;
				season.update(mailer);
			}
			
		}, 60000);
		
		
	}
	
	private static void initializeRoutes(Server server, RenderResponder responder, Database database) {
		
		
		// Game paths 
		server.on("GET", "/", (Request request) -> {
			return responder.render("index.html", request.languages);
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
		server.on("GET", "/games/runner", (Request request) -> {
			return responder.render("games/runner.html", request.languages);
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
						json.append("\"name\": \"" + quest.get("name") + "\", ");
						json.append("\"game\": \"" + quest.get("game") + "\", ");
						json.append("\"times\": " + quest.get("times") + ", ");
						json.append("\"score\": " + quest.get("score") + ", ");
						json.append("\"reward\": " + quest.get("reward") + ", ");
						json.append("\"duration\": " + quest.get("duration") + ", ");
						json.append("\"completed\": " + quest.get("completed") + ", ");
						json.append("\"progress\": " + Math.floor(new Float((Integer) quest.get("progress")) / new Float((Integer) quest.get("times")) * 100));
						json.append("}");
					}
					json.append("]");
					variables.put("json", json.toString());
					return responder.render("quests.html", request.languages, variables);
				}
			}
			return responder.redirect("/signin");
		});
		
		
		server.on("GET", "/wheel", (Request request) -> {
			User user = (User) request.session.load();
			if(user != null) {
				Player player = null;
				if((player = (Player) database.load(Player.class, user.getUsername())) != null) {
					HashMap <String, Object> variables = new HashMap <String, Object> ();
					variables.put("allow", player.getCoins() >= Player.WHEEL_COST);
					return responder.render("wheel.html", request.languages, variables);
				}
			}
			return responder.redirect("/signin");
		});
		
		/*
		 * ==================================================
		 * Returns a JSON object with the following contents:
		 * ==================================================
		 * success: true if user has enough coins, false otherwise
		 * result: -1 if not successful, number from 0-12 otherwise
		 *   0: +500 fame
		 *   1: +1000 fame
		 *   2: +2000 fame
		 *   3: +60 min 2x booster
		 *   4: +180 min 2x booster
		 *   5: +1440 min 2x booster
		 *   6: +5 coins
		 *   7: +10 coins
		 *   8: +20 coins
		 *   9-12: Nothing won :(
		 */
		server.on("GET", "/wheel/spin", (Request request) -> {
			User user = (User) request.session.load();
			if(user != null) {
				Player player = null;
				if((player = (Player) database.load(Player.class, user.getUsername())) != null) {
					int result = player.spinWheel();
					return responder.text("{\"success\": " + (result != -1) + ", \"result\": " + result + "}");
				}
			}
			return responder.text("error");
		});
		
		server.on("GET", "/lottery", (Request request) -> {
			User user = (User) request.session.load();
			if(user != null) {
				Player player = null;
				if((player = (Player) database.load(Player.class, user.getUsername())) != null) {
					HashMap <String, Object> variables = new HashMap <String, Object> ();
					addMessagesFlashToVariables(request, "errors", variables);
					int total = database.loadAll(Season.class).size();
					Season season = (Season) database.load(Season.class, "" + (total - 1));
					variables.put("total-lots", season.getTotalLots());
					variables.put("my-lots", season.getMyLots(player));
					if(total > 1) {
						Season lastSeason = (Season) database.load(Season.class, "" + (total - 2));
						if(lastSeason.getWinner() != null) {
							variables.put("last-winner", lastSeason.getWinner().getUsername());
						} else {
							variables.put("last-winner", null);
						}
					} else {
						variables.put("last-winner", null);
					}
					return responder.render("lottery.html", request.languages, variables);
				}
			}
			return responder.redirect("/signin");
		});
		
		server.on("POST", "/lottery", (Request request) -> {
			User user = (User) request.session.load();
			if(user != null) {
				Player player = null;
				if((player = (Player) database.load(Player.class, user.getUsername())) != null) {
					int total = database.loadAll(Season.class).size();
					Season season = (Season) database.load(Season.class, "" + (total - 1));
					Validator validator = new Validator("errors");
					try {
						if(!season.buyLots(player, Integer.parseInt(request.parameters.get("amount")))) {
							validator.addMessage("amount", "too-large");
						}
					} catch (Exception e) {
						validator.addMessage("amount", "too-large");
					}
					request.session.addFlash(validator);
					return responder.redirect("/lottery");
				}
			}
			return responder.redirect("/signin");
		});
		
		server.on("GET", "/profile/boost", (Request request) -> {
			User user = (User) request.session.load();
			if(user != null) {
				Player player = null;
				if((player = (Player) database.load(Player.class, user.getUsername())) != null) {
					player.toggleBooster();
					database.update(player);
				}
			}
			return responder.redirect("/profile");
		});
		
		// Season paths
		server.on("GET", "/seasons/info", (Request request) -> {
			int total = database.loadAll(Season.class).size();
			Season season = (Season) database.load(Season.class, "" + (total - 1));
			return responder.text("{\"duration\": " + season.getDuration() + ", \"current\": " + total+"}");
		});
		
		// Scoreboard paths
		server.on("GET", "/scoreboard/players", (Request request) -> {
			StringBuilder stringBuilder = new StringBuilder();
			LinkedList <ObjectTemplate> objectTemplates = database.loadAll(Player.class);
			
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
			final int season = (request.parameters.get("season") != null) ? Integer.parseInt(request.parameters.get("season")) : -1;
			
			StringBuilder stringBuilder = new StringBuilder();
			LinkedList <ObjectTemplate> objectTemplates = database.loadAll(Score.class, (ObjectTemplate objectTemplate) -> {
				Score score = (Score) objectTemplate;
				return score.getGame().equals(game) && (season == -1 || season == score.getSeason());
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
		
		server.on("GET", "/info", (Request request) -> {
			return responder.render("info.html", request.languages);
		});
	}
	
	
	
	private static void addMessagesFlashToVariables(Request request, String name, HashMap <String, Object> variables) {
		Validator validator = (Validator) request.session.getFlash(name);
		if(validator != null) {
			validator.addToVariables(variables);
		}
	}
}
