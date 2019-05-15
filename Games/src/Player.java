import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
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
	
	public static final File questFile = new File("stats/quests.txt");
	public static final Random random = new Random();
	
	private IdentifiableStringTemplate username;
	private IntegerTemplate fame;
	private IntegerTemplate suspicion;
	private BooleanTemplate banned;
	private ListTemplate <Quest> quests;
	
	public Player(String username) {
		this.username = new IdentifiableStringTemplate("username");
		this.username.set(username);
		fame = new IntegerTemplate("fame");
		fame.set(0);
		suspicion = new IntegerTemplate("suspicion");
		suspicion.set(0);
		banned = new BooleanTemplate("banned");
		banned.set(false);
		quests = new ListTemplate <Quest> ("quests", Quest::new);
		refreshQuests();
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
		database.delete(Player.class, username.get());
	}
	
	public ScoreRequest addScoreRequest() {
		ScoreRequest scoreRequest = new ScoreRequest(this);
		database.save(scoreRequest);
		return scoreRequest;
	}
	
	public Score addScore(int value, String game) {
		if(!banned.get()) {
			
			for(Quest quest : quests) {
				quest.update(value, game);
			}
			database.save(this);
			
			Score newScore = new Score(this, value, game);
			database.save(newScore);
			
			final Player self = this;
			LinkedList <ObjectTemplate> objectTemplates = database.loadAll(Score.class, (ObjectTemplate objectTemplate) -> {
				Score score = (Score) objectTemplate;
				return score.getPlayer().equals(self) && score.getGame().equals(game);
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
				return !score.equals(finalBestScore) && score.getPlayer().equals(self) && score.getGame().equals(game);
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

	@Override
	public int compareTo(Player otherPlayer) {
		return otherPlayer.fame.get() - fame.get();
	}
	
	public String json() {
		return "{\"username\": \"" + getUsername() + "\", \"fame\": \"" + fame.get() + "\", \"banned\": \"" + banned.get() + "\"}";
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
	
	public String questsJson() {
		StringBuilder output = new StringBuilder();
		output.append("[");
		for(int i = 0; i < 3; i++) {
			if(i != 0) {
				output.append(", ");
				output.append(quests.get(i).json());
			}
		}
		output.append("]");
		return output.toString();
	}
	
	public void refreshQuests() {
		ArrayList <Quest> all = new ArrayList <Quest> ();
		Scanner in;
		try {
			in = new Scanner(questFile);
			while(in.hasNext()) {
				all.add(new Quest(this, in.next(), in.nextInt(), in.nextInt()));
			}
			for(int i = 0; i < 3; i++) {
				quests.clear();
				quests.add(all.get(random.nextInt(all.size())));
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
}
