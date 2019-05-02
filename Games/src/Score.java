import database.templates.IntegerTemplate;
import database.templates.ObjectTemplate;
import database.templates.ObjectTemplateReference;

public class Score extends ObjectTemplate {
	
	private ObjectTemplateReference <Player> player;
	private IntegerTemplate score;
	
	public Score(Player player, int score) {
		this.player = new ObjectTemplateReference <Player> ("player", Player::new);
		this.player.set(player);
		this.score = new IntegerTemplate("score", 0, null);
		this.score.set(score);
	}
	
	public Score() {
		this(null, 0);
	}
	
}
