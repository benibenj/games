import database.templates.IntegerTemplate;
import database.templates.ObjectTemplate;
import database.templates.ObjectTemplateReference;
import database.templates.StringTemplate;

public class Score extends ObjectTemplate implements Comparable <Score> {
	
	public static final String NAME = "scores";
	
	private StringTemplate game;
	private ObjectTemplateReference <Player> player;
	private IntegerTemplate score;
	private IntegerTemplate season;
	
	public Score(Player player, int score, String game, int season) {
		this.game = new StringTemplate("game", 1, 64);
		this.game.set(game);
		this.player = new ObjectTemplateReference <Player> ("player", Player::new);
		this.player.set(player);
		this.score = new IntegerTemplate("score", 0, Integer.MAX_VALUE);
		this.score.set(score);
		this.season = new IntegerTemplate("season");
		this.season.set(season);
	}
	
	public Score() {
		this(null, 0, null, 0);
	}

	public Player getPlayer() {
		return player.get();
	}
	
	public String getGame() {
		return game.get();
	}

	public Object json() {
		return "{\"username\": \"" + player.get().getUsername() + "\", \"game\": \"" + game.get() + "\", \"score\": \"" + score.get() + "\", \"season\": \"" + season.get() + "\"}";
	}

	public int getScore() {
		return score.get();
	}

	@Override
	public int compareTo(Score otherScore) {
		return otherScore.getScore() - getScore();
	}

	public int getSeason() {
		return season.get();
	}
	
}
