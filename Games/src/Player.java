import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Random;
import java.util.Scanner;

import database.templates.BooleanTemplate;
import database.templates.IdentifiableStringTemplate;
import database.templates.IntegerTemplate;
import database.templates.ListTemplate;
import database.templates.ObjectTemplate;

public class Player extends ObjectTemplate implements Comparable <Player> {
	
	public static final String NAME = "players";
	
	public static final int WHEEL_COST = 10;
	public static final File QUEST_FILE = new File("files/quests.txt");
	public static final Random RANDOM = new Random();
	
	private IdentifiableStringTemplate username;
	private IntegerTemplate fame;
	private IntegerTemplate suspicion;
	private BooleanTemplate banned;
	private IntegerTemplate coins;
	private IntegerTemplate booster;
	private BooleanTemplate boosted;
	private IntegerTemplate famePerMinute;
	private ListTemplate <IntegerTemplate> ranks;
	
	public Player(String username) {
		this.username = new IdentifiableStringTemplate("username");
		this.username.set(username);
		fame = new IntegerTemplate("fame");
		fame.set(0);
		suspicion = new IntegerTemplate("suspicion");
		suspicion.set(0);
		banned = new BooleanTemplate("banned");
		banned.set(false);
		coins = new IntegerTemplate("coins");
		coins.set(10);
		booster = new IntegerTemplate("booster");
		booster.set(0);
		boosted = new BooleanTemplate("boosted");
		boosted.set(false);
		famePerMinute = new IntegerTemplate("fame-per-minute");
		famePerMinute.set(0);
		ranks = new ListTemplate <IntegerTemplate> ("ranks", IntegerTemplate::new);
		setIdentifier(this.username);
	}
	
	public Player() {
		this(null);
	}

	public void delete() {
		final Player self = this;
		
		database.deleteAll(Score.class, (ObjectTemplate objectTemplate) -> {
			Score score = (Score) objectTemplate;
			return score.getPlayer().equals(self);
		});
		
		database.deleteAll(Quest.class, (ObjectTemplate objectTemplate) -> {
			return ((Quest) objectTemplate).getPlayer().equals(self);
		});
		
		database.delete(Player.class, username.get());
	}
	
	public ScoreRequest addScoreRequest() {
		ScoreRequest scoreRequest = new ScoreRequest(this);
		database.save(scoreRequest);
		return scoreRequest;
	}
	
	public Score addScore(int value, String game) {
		if(!banned.get()) {
			
			LinkedList <ObjectTemplate> questObjectTemplates = database.loadAll(Quest.class, (ObjectTemplate objectTemplate) -> {
				return ((Quest) objectTemplate).getPlayer().equals(this);
			});
			LinkedList <Quest> quests = new LinkedList <Quest> ();
			for(ObjectTemplate questObjectTemplate : questObjectTemplates) {
				quests.add((Quest) questObjectTemplate);
			}

			for(Quest quest : quests) {
				quest.updateProgress(value, game);
				// database.update(this);
			}
			
			int currentSeason = database.loadAll(Season.class).size() - 1;
			
			Score newScore = new Score(this, value, game, currentSeason);
			database.save(newScore);
			
			final Player self = this;
			LinkedList <ObjectTemplate> objectTemplates = database.loadAll(Score.class, (ObjectTemplate objectTemplate) -> {
				Score score = (Score) objectTemplate;
				return score.getPlayer().equals(self) && score.getGame().equals(game) && score.getSeason() == currentSeason;
			});
			Score bestScore = null;
			for(ObjectTemplate objectTemplate : objectTemplates) {
				Score score = (Score) objectTemplate;
				if(bestScore == null || score.getScore() > bestScore.getScore()) {
					bestScore = score;
				}
			}
			final Score finalBestScore = bestScore;
			database.deleteAll(Score.class, (ObjectTemplate objectTemplate) -> {
				Score score = (Score) objectTemplate;
				return !score.equals(finalBestScore) && score.getPlayer().equals(self) && score.getGame().equals(game) && score.getSeason() == currentSeason;
			});
			
			return (Score) database.loadAll(Score.class).get(0);
		}
		return null;
	}

	public String getUsername() {
		return username.get();
	}
	
	public void addFame(int addend) {
		fame.set(fame.get() + addend);
	}
	
	public void addBooster(int addend) {
		booster.set(booster.get() + addend);
		if(booster.get() <= 0) {
			boosted.set(false);
		}
	}

	@Override
	public int compareTo(Player otherPlayer) {
		return otherPlayer.fame.get() - fame.get();
	}
	
	public String json() {
		StringBuilder builder = new StringBuilder();
		builder.append("[");
		boolean first = true;
		for(IntegerTemplate rank : ranks) {
			if(!first) {
				builder.append(", ");
			} else {
				first = false;
			}
			builder.append(rank.get().toString());
		}
		builder.append("]");
		
		int firstMedals = 0;
		int secondMedals = 0;
		int thirdMedals = 0;
		int participatedMedals = 0;
		for(IntegerTemplate rank : ranks) {
			int intRank = rank.get();
			if(intRank >= 0) {
				switch(intRank) {
				case 0:
					firstMedals++;
					participatedMedals++;
					break;
				case 1:
					secondMedals++;
					participatedMedals++;
					break;
				case 2:
					thirdMedals++;
					participatedMedals++;
					break;
				default:
					participatedMedals++;
					break;
				}
			}
		}
		
		return "{\"username\": \"" + getUsername() + "\", \"fame\": \"" + fame.get() + "\", \"banned\": " + banned.get() + ", \"rankings\": " + builder.toString() + ", \"medals\": {\"first\": " + firstMedals + ", \"second\": " + secondMedals + ", \"third\": " + thirdMedals + ", \"participated\": "+ participatedMedals +"}}";
	}
	
	public void addSuspicion() {
		if(suspicion.get() < 2) {
			suspicion.set(suspicion.get() + 1);
		} else {
			banned.set(true);
			fame.set(0);
			final Player self = this;
			database.deleteAll(Score.class, (ObjectTemplate objectTemplate) -> {
				Score score = (Score) objectTemplate;
				return score.getPlayer().equals(self);
			});
		}
	}
	
	public void removeSuspicion() {
		if(suspicion.get() > 0) {
			suspicion.set(suspicion.get() - 1);
		}
	}
	
	public LinkedList <HashMap <String, Object>> getQuestInfos() {
		LinkedList <HashMap <String, Object>> output = new LinkedList <HashMap <String, Object>> ();
		
		LinkedList <ObjectTemplate> questObjectTemplates = database.loadAll(Quest.class, (ObjectTemplate objectTemplate) -> {
			return ((Quest) objectTemplate).getPlayer().equals(this);
		});
		
		for(ObjectTemplate questObjectTemplate : questObjectTemplates) {
			output.add(((Quest) questObjectTemplate).getInfo());
		}
		
		return output;
	}
	
	public void addQuest(int duration) {
		ArrayList <Quest> all = new ArrayList <Quest> ();
		Scanner in;
		try {
			in = new Scanner(QUEST_FILE);
			while(in.hasNext()) {
				String name = in.next();
				String game = in.next();
				int times = in.nextInt();
				int score = in.nextInt();
				int reward = in.nextInt();
				int questDuration = in.nextInt();
				
				if(score == -1) {
					
					LinkedList <ObjectTemplate> objectTemplates = database.loadAll(Score.class, (ObjectTemplate objectTemplate) -> {
						Score scoreObject = (Score) objectTemplate;
						return scoreObject.getGame().equals(game);
					});

					ArrayList <Score> scores = new ArrayList <Score> ();
					for(ObjectTemplate objectTemplate : objectTemplates) {
						scores.add((Score) objectTemplate);
					}
					
					if(scores.size() > 0) {
						Collections.sort(scores);
						score = scores.get(0).getScore();
					} else {
						score = 0;
					}
				}
				all.add(new Quest(this, name, game, times, score, reward, questDuration));
			}
			
			LinkedList <ObjectTemplate> questObjectTemplates = database.loadAll(Quest.class, (ObjectTemplate objectTemplate) -> {
				return ((Quest) objectTemplate).getPlayer().equals(this);
			});
			LinkedList <Quest> quests = new LinkedList <Quest> ();
			for(ObjectTemplate questObjectTemplate : questObjectTemplates) {
				quests.add((Quest) questObjectTemplate);
			}
			
			Quest newQuest = null;
			do {
				newQuest = all.get(RANDOM.nextInt(all.size()));
				newQuest.setDatabase(database);
			} while(quests.contains(newQuest) || newQuest.getDuration() != duration);
			database.update(newQuest);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}

	public void addCoins(int value) {
		coins.set(coins.get() + value);
	}
	
	public boolean removeCoins(int value) {
		if(coins.get() >= value) {
			coins.set(coins.get() - value);
			return true;
		}
		return false;
	}
	
	public int getCoins() {
		return coins.get();
	}
	
	public int spinWheel() {
		if(getCoins() < WHEEL_COST) {
			return -1;
		} else {
			removeCoins(WHEEL_COST);
			int result = RANDOM.nextInt(12);
			switch(result) {
			case 0:
				addFame(500);
				break;
			case 1:
				addFame(1000);
				break;
			case 2:
				addFame(2000);
				break;
			case 3:
				addBooster(60);
				break;
			case 4:
				addBooster(180);
				break;
			case 5:
				addBooster(1440);
				break;
			case 6:
				addCoins(5);
				break;
			case 7:
				addCoins(10);
				break;
			case 8:
				addCoins(20);
				break;
			}
			database.update(this);
			return result;
		}
	}

	public boolean isBoosted() {
		return boosted.get();
	}
	
	public void toggleBooster() {
		boosted.set(!boosted.get());
		if(booster.get() <= 0) {
			boosted.set(false);
		}
	}

	public boolean canBoost() {
		if(booster.get() > 0) {
			return true;
		}
		return false;
	}

	public void setFamePerMinute(int reward) {
		famePerMinute.set(reward);
	}
	
	public int getFamePerMinute() {
		return famePerMinute.get();
	}

	public Object getBoosterTime() {
		return booster.get();
	}
	
	public void addRank(int rank) {
		IntegerTemplate template = new IntegerTemplate();
		template.set(rank);
		ranks.add(template);
	}

	public void addFamePerMinute(int addedReward) {
		famePerMinute.set(famePerMinute.get() + addedReward);
	}

	public void addMissedRanks() {
		int missed = database.loadAll(Season.class).size() - 1;
		for(int i = 0; i < missed; i++) {
			IntegerTemplate filler = new IntegerTemplate();
			filler.set(-1);
			ranks.add(filler);
		}
	}

	public void resetFame() {
		fame.set(0);
	}

	
}
