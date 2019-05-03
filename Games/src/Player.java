import database.templates.IdentifiableStringTemplate;
import database.templates.IntegerTemplate;
import database.templates.ListTemplate;
import database.templates.ObjectTemplate;

public class Player extends ObjectTemplate {
	
	public static final String NAME = "players";
	
	private IdentifiableStringTemplate username;
	private IntegerTemplate fame;
	private ListTemplate <Score> scores;
	
	public Player(String username) {
		this.username = new IdentifiableStringTemplate("username");
		this.username.set(username);
		fame = new IntegerTemplate("fame");
		fame.set(0);
		scores = new ListTemplate <Score> ("scores", Score::new);
		setIdentifier(this.username);
	}
	
	public Player() {
		this(null);
	}

	public void delete() {
		for(Score score : scores) {
			database.deleteId(Score.class, score.getId());
		}
		database.delete(Player.class, username.get());
	}
	
	public ScoreRequest addScoreRequest() {
		ScoreRequest scoreRequest = new ScoreRequest(this);
		database.save(scoreRequest);
		return scoreRequest;
	}
	
	public Score addScore(int value, String game) {
		Score score = new Score(this, value, game);
		database.save(score);
		return score;
	}

	public String getUsername() {
		return username.get();
	}
}
