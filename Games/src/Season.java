import database.templates.IntegerTemplate;
import database.templates.ObjectTemplate;

public class Season extends ObjectTemplate {
	
	public static final String NAME = "season";
	
	public static final int SEASON_DURATION = 10080;
	
	private IntegerTemplate season;
	private IntegerTemplate duration;
	
	public Season() {
		this.season = new IntegerTemplate("season");
		this.season.set(0);
		this.duration = new IntegerTemplate("duration");
		this.duration.set(SEASON_DURATION);
	}
	
	public void update() {
		duration.set(duration.get() - 1);
		if(duration.get() <= 0) {
			duration.set(SEASON_DURATION);
			season.set(season.get() + 1);
		}
	}
	
}
