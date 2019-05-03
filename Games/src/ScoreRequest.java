import java.util.Random;

import database.templates.BooleanTemplate;
import database.templates.IntegerTemplate;
import database.templates.ObjectTemplate;
import database.templates.ObjectTemplateReference;

public class ScoreRequest extends ObjectTemplate {
	
	public static final String NAME = "requests";
	
	public static final int MULTIPLIER = 1000000;
	
	private static Random random = new Random();
	
	private ObjectTemplateReference <Player> player;
	private IntegerTemplate offset;
	private BooleanTemplate valid;
	
	public ScoreRequest(Player player) {
		this.player = new ObjectTemplateReference <Player> ("player", Player::new);
		this.player.set(player);
		offset = new IntegerTemplate("offset");
		offset.set(random.nextInt(MULTIPLIER));
		valid = new BooleanTemplate("valid");
		valid.set(true);
	}
	
	public ScoreRequest() {
		this(null);
	}
	
	public String json() {
		return "{x: " + getId() + ", y: " + MULTIPLIER + ", z: " + offset.get() + "}";
	}
	
	public boolean verify(String answer, String game) {
		if(valid.get()) {
			if(timestamp.get() + 2000 <= System.currentTimeMillis()) {
				long value = Long.parseLong(answer);
				value -= offset.get();
				if(value%MULTIPLIER == 0) {
					player.get().addScore(Math.toIntExact(value/MULTIPLIER), game);
					return true;
				}
			}
			valid.set(false);
		}
		return false;
	}
	
}
