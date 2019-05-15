import database.templates.IntegerTemplate;
import database.templates.LongTemplate;
import database.templates.ObjectTemplate;
import database.templates.ObjectTemplateReference;
import database.templates.StringTemplate;

public class Quest extends ObjectTemplate {
	
	public static final String NAME = "quests";
	
	private ObjectTemplateReference <Player> player;
	private IntegerTemplate times;
	private IntegerTemplate score;
	private StringTemplate game;
	private IntegerTemplate reward;
	private IntegerTemplate progress;
	private LongTemplate duration;
	
	public Quest(Player player, String game, int times, int score) {
		this.player = new ObjectTemplateReference <Player> ("player", Player::new);
		this.player.set(player);
		this.times = new IntegerTemplate("times");
		this.times.set(times);
		this.score = new IntegerTemplate("score");
		this.score.set(score);
		this.game = new StringTemplate("game", 1, 64);
		this.game.set(game);
		this.reward = new IntegerTemplate("reward");
		this.reward.set(0);
		this.progress = new IntegerTemplate("progress", 0, Integer.MAX_VALUE);
		this.progress.set(0);
		this.duration = new LongTemplate("duration");
		this.duration.set(new Long(60 * 24));
	}
	
	public Quest() {
		this(null, null, 0, 0);
	}

	public Object json() {
		return "{\"times\": \"" + times.get() + "\", \"score\": \"" + score.get() + "\", \"game\": \"" + game.get() + "\", \"progress\": \"" + progress.get() + "\"}";
	}

	public void update(int value, String game) {
		if(this.game.get().equals(game)) {
			if(value >= score.get()) {
				progress.set(progress.get() + 1);
				if(progress.get() >= times.get()) {
					
				}
			}
		}
	}

}
