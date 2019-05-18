import java.util.HashMap;

import database.templates.BooleanTemplate;
import database.templates.IntegerTemplate;
import database.templates.ObjectTemplate;
import database.templates.ObjectTemplateReference;
import database.templates.StringTemplate;

public class Quest extends ObjectTemplate {
	
	public static final String NAME = "quests";
	
	private ObjectTemplateReference <Player> player;
	private IntegerTemplate times;
	private IntegerTemplate score;
	private StringTemplate name;
	private StringTemplate game;
	private IntegerTemplate reward;
	private IntegerTemplate progress;
	private IntegerTemplate duration;
	private BooleanTemplate completed;
	
	public Quest(Player player, String name, String game, int times, int score, int reward, int duration) {
		this.player = new ObjectTemplateReference <Player> ("player", Player::new);
		this.player.set(player);
		this.times = new IntegerTemplate("times");
		this.times.set(times);
		this.score = new IntegerTemplate("score");
		this.score.set(score);
		this.name = new StringTemplate("name");
		this.name.set(name);
		this.game = new StringTemplate("game");
		this.game.set(game);
		this.reward = new IntegerTemplate("reward");
		this.reward.set(reward);
		this.progress = new IntegerTemplate("progress");
		this.progress.set(0);
		this.duration = new IntegerTemplate("duration");
		this.duration.set(duration);
		this.completed = new BooleanTemplate("completed");
		this.completed.set(false);
	}
	
	public Quest() {
		this(null, null, null, 0, 0, 0, 0);
	}

	public HashMap <String, Object> getInfo() {
		return renderPrimitivesToMap(new String[] {"name", "game", "times", "score", "reward", "duration", "progress", "completed"});
	}

	public void updateProgress(int value, String game) {
		if(!completed.get()) {
			if(this.game.get().equals(game)) {
				if(value >= score.get()) {
					progress.set(progress.get() + 1);
					if(progress.get() >= times.get()) {
						completed.set(true);
						player.get().addCoins(reward.get());
						// database.update(player.get());
					}
					database.update(this);
				}
			}
		}
	}
	
	public void updateDuration() {
		duration.set(duration.get() - 1);
		if(duration.get() <= 0) {
			database.deleteId(Quest.class, getId());
			player.get().addQuest(duration.get());
		} else {
			database.update(this);
		}
	}
	
	@Override
	public boolean equals(Object other) {
		return (other instanceof Quest) && ((Quest) other).name.get().equals(name.get()) && ((Quest) other).player.get().equals(player.get());
	}
	
	/*
	@Override
	public String toString() {
		return name.get();
	}
	*/

	public Player getPlayer() {
		return player.get();
	}

	public int getDuration() {
		return duration.get();
	}
}
