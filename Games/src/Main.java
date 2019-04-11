import java.io.File;
import java.io.IOException;

import responder.RenderResponder;
import server.Request;
import server.Server;

public class Main {
	public static void main(String[] args) throws IOException {
		RenderResponder responder = new RenderResponder(new File("views"));
		Server server = new Server(8000, new File("public"), responder);
		server.on("GET", "/", (Request request) -> {
			return responder.text("Hallo!"); 
		});
	}
}
