import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;

import database.templates.BooleanTemplate;
import database.templates.IntegerTemplate;
import database.templates.ListTemplate;
import database.templates.ObjectTemplate;

public class Season extends ObjectTemplate {
	
	public static final String NAME = "seasons";
	
	public static final int SEASON_DURATION = 10080;
	
	private IntegerTemplate season;
	private IntegerTemplate duration;
	private BooleanTemplate ended;
	private ListTemplate <Player> ranking;
	
	public Season(int number) {
		this.season = new IntegerTemplate("season");
		this.season.set(number);
		this.duration = new IntegerTemplate("duration");
		this.duration.set(SEASON_DURATION);
		this.ended = new BooleanTemplate("ended");
		this.ended.set(false);
		this.ranking = new ListTemplate <Player> ("ranking", Player::new);
		setIdentifier(this.season);
	}
	
	public Season() {
		this(0);
	}
	
	public void update() {
		if(duration.get() <= 0) {
			if(!ended.get()) {
				ended.set(true);
				
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
					switch(i) {
					case 0:
						player.addCoins(100);
						break;
					case 1:
						player.addCoins(50);
						break;
					case 2:
						player.addCoins(30);
						break;
					default:
						player.addCoins(10);
						break;
					}
					player.resetFame();
					database.update(player);
				}
				
				Season next = new Season(season.get() + 1);
				database.save(next);
			}
		} else {
			duration.set(duration.get() - 1);
		}
		database.update(this);
	}
	
	public int getSeason() {
		return season.get();
	}

	public void end() {
		duration.set(0);
		update();
	}

	public int getDuration() {
		return duration.get();
	}
	
}
