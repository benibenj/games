import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Random;

import database.templates.BooleanTemplate;
import database.templates.IntegerTemplate;
import database.templates.ListTemplate;
import database.templates.ObjectTemplate;
import database.templates.ObjectTemplateReference;
import mailer.Mailer;
import user.User;

public class Season extends ObjectTemplate {
	
	public static final String NAME = "seasons";
	
	public static final Random RANDOM = new Random();
	public static final int SEASON_DURATION = 10080;
	
	private IntegerTemplate season;
	private IntegerTemplate duration;
	private BooleanTemplate ended;
	private ListTemplate <Player> ranking;
	private ListTemplate <Player> lots;
	private IntegerTemplate reward;
	private ObjectTemplateReference <Player> winner;
	
	public Season(int number) {
		this.season = new IntegerTemplate("season");
		this.season.set(number);
		this.duration = new IntegerTemplate("duration");
		this.duration.set(SEASON_DURATION);
		this.ended = new BooleanTemplate("ended");
		this.ended.set(false);
		this.ranking = new ListTemplate <Player> ("ranking", Player::new);
		this.lots = new ListTemplate <Player> ("lots", Player::new);
		this.reward = new IntegerTemplate("reward");
		this.reward.set(0);
		this.winner = new ObjectTemplateReference <Player> ("winner", Player::new);
		setIdentifier(this.season);
	}
	
	public Season() {
		this(0);
	}
	
	public void update(Mailer mailer) {
		duration.set(duration.get() - 1);
		if(duration.get() <= 0) {
			if(!ended.get()) {
				ended.set(true);
				
				// Lottery
				int winnerIndex = RANDOM.nextInt(lots.size());
				Player winner = lots.get(winnerIndex);
				this.winner.set(winner);
				winner.addCoins(reward.get());
				database.update(this);
				
				// Rewards
				LinkedList <ObjectTemplate> objectTemplates = database.loadAll(Player.class);

				ArrayList <Player> players = new ArrayList <Player> ();
				for(ObjectTemplate objectTemplate : objectTemplates) {
					players.add((Player) objectTemplate);
				}
				
				Collections.sort(players);

				for(int i = 0; i < players.size(); i++) {
					Player player = players.get(i);
					ranking.add(player);
					player.addRank(i);
					
					int reward = 0;
					
					switch(i) {
					case 0:
						player.addCoins(100);
						reward = 100;
						break;
					case 1:
						player.addCoins(50);
						reward = 50;
						break;
					case 2:
						player.addCoins(30);
						reward = 30;
						break;
					default:
						player.addCoins(10);
						reward = 10;
						break;
					}
					
					User user = (User) database.load(User.class, player.getUsername());
					HashMap <String, Object> variables = new HashMap <String, Object> ();
					variables.put("username", user.getUsername());
					variables.put("current-season", season.get() + 1);
					variables.put("next-season", season.get() + 2);
					variables.put("rank", i + 1);
					variables.put("reward", reward);
					mailer.send(user.getMail(), "{{print translate \"new-season-email-title\"}}", "season.html", user.getLanguages(), variables);
					
					player.resetFame();
					database.update(player);
				}

				Season next = new Season(season.get() + 1);
				database.save(next);
			}
		}
		database.update(this);
	}
	
	public int getSeason() {
		return season.get();
	}

	public void end(Mailer mailer) {
		duration.set(0);
		update(mailer);
	}

	public int getDuration() {
		return duration.get();
	}
	
	public boolean buyLot(Player player) {
		if(player.removeCoins(1)) {
			lots.add(player);
			reward.set(reward.get() + 1);
			database.update(this);
			return true;
		}
		return false;
	}
	
	public int getTotalLots() {
		return lots.size();
	}
	
	public int getMyLots(Player player) {
		int counter = 0;
		for(Player lot : lots) {
			if(lot.equals(player)) {
				counter++;
			}
		}
		return counter;
	}
	
	public Player getWinner() {
		return winner.get();
	}
	
}
