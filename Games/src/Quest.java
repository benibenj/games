import java.util.HashMap;

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
	
	public Quest(Player player, String name, String game, int times, int score, int reward, int duration) {
		this.player = new ObjectTemplateReference <Player> ("player", Player::new);
		this.player.set(player);
		this.times = new IntegerTemplate("times");
		this.times.set(times);
		this.score = new IntegerTemplate("score");
		this.score.set(score);
		this.name = new StringTemplate("name");
		this.name.set(game);
		this.game = new StringTemplate("game");
		this.game.set(game);
		this.reward = new IntegerTemplate("reward");
		this.reward.set(reward);
		this.progress = new IntegerTemplate("progress");
		this.progress.set(0);
		this.duration = new IntegerTemplate("duration");
		this.duration.set(duration);
	}
	
	public Quest() {
		this(null, null, null, 0, 0, 0, 0);
	}

	public HashMap <String, Object> getInfo() {
		return renderPrimitivesToMap(new String[] {"name", "game", "times", "score", "reward", "duration", "progress"});
	}

	public void updateProgress(int value, String game) {
		if(this.game.get().equals(game)) {
			if(value >= score.get()) {
				progress.set(progress.get() + 1);
				if(progress.get() >= times.get()) {
					
				}
			}
		}
	}
	
	public void updateDuration() {
		duration.set(duration.get() - 1);
		if(duration.get() <= 0) {
			player.get().addQuest();
			database.delete(Quest.class, getId());
		}
		database.save(this);
	}

}
