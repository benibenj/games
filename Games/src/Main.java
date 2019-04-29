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
			return responder.render("index.html");
		});
		server.on("GET", "/signup", (Request request) -> {
			return responder.render("signup.html");
		});
		server.on("GET", "/login", (Request request) -> {
			return responder.render("login.html");
		});
		server.on("GET", "/profile", (Request request) -> {
			return responder.render("profile.html");
		});
		server.on("GET", "/minesweeper", (Request request) -> {
			return responder.render("minesweeper.html");
		});
		server.on("GET", "/battleship", (Request request) -> {
			return responder.render("battleship.html");
		});
		server.on("GET", "/changeusername", (Request request) -> {
			return responder.render("changeusername.html");
		});
		server.on("GET", "/changepwd", (Request request) -> {
			return responder.render("changepassword.html");
		});
		server.on("GET", "/changemail", (Request request) -> {
			return responder.render("changemail.html");
		});
	}
}
