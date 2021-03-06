import java.util.Random;

import database.templates.BooleanTemplate;
import database.templates.IntegerTemplate;
import database.templates.ObjectTemplate;
import database.templates.ObjectTemplateReference;

public class ScoreRequest extends ObjectTemplate {
	
	public static final String NAME = "requests";
	
	public static final int MULTIPLIER = 1000000;
	public static final int TIMEOUT = 1000;
	
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
		return "{\"x\": \"" + getId() + "\", \"y\": \"" + MULTIPLIER + "\", \"z\": \"" + offset.get() + "\"}";
	}
	
	public boolean verify(String answer, String game) {
		if(valid.get()) {
			if(System.currentTimeMillis() <= timestamp.get() + TIMEOUT) {
				long value = Long.parseLong(answer);
				value -= offset.get();
				if(value%MULTIPLIER == 0) {
					player.get().addScore(Math.toIntExact(value/MULTIPLIER), game);
					player.get().removeSuspicion();
					valid.set(false);
					return true;
				}
			}
			valid.set(false);
		}
		player.get().addSuspicion();
		return false;
	}

	public boolean expired() {
		return (System.currentTimeMillis() > timestamp.get() + TIMEOUT) || !valid.get();
	}
	
}
