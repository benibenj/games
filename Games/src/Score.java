import database.templates.IdentifiableStringTemplate;
import database.templates.IntegerTemplate;
import database.templates.ObjectTemplate;
import database.templates.ObjectTemplateReference;

public class Score extends ObjectTemplate {
	
	public static final String NAME = "scores";
	
	private IdentifiableStringTemplate game;
	private ObjectTemplateReference <Player> player;
	private IntegerTemplate score;
	
	public Score(Player player, int score, String game) {
		this.game = new IdentifiableStringTemplate("game");
		this.game.set(game);
		this.player = new ObjectTemplateReference <Player> ("player", Player::new);
		this.player.set(player);
		this.score = new IntegerTemplate("score", 0, null);
		this.score.set(score);
	}
	
	public Score() {
		this(null, 0, null);
	}
	
}
