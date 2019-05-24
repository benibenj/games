var player;
var obstacles;
let speed = 40;
let gameover;
let started;
let score;
function setup(){
	if(screen.width >= 600){
		createCanvas(600, 600);
	}
	else{
		createCanvas(screen.width, screen.width);
	}
	player = new Player();
	obstacles = new Array();
	gameover = false;
	started = false;
	score = 0;
}

function draw(){
	if (!gameover) {
		background(0);
		// update obstacles
		for (var i = obstacles.length-1; i >= 0; i--) {
			obstacles[i].update();
			if(obstacles[i].collision()){
				gameOver();
			}
			obstacles[i].show();
			if (obstacles[i].offscreen()) {
				obstacles.splice(i,1);
				score++;
			}
		}

		// update player after obstacles for collision reasons
		player.update();
		player.show();

		if (frameCount % 100 == 0) {
			obstacles.push(new Obstacle());
		}

		drawScore();
	}
	else{
		drawEndScreen();	
	}
}

function keyPressed(){
	if (key === ' ' || keyCode === UP_ARROW) {
		started = true;
		player.jump();
	}
	else if (keyCode === DOWN_ARROW) {
		started = true;
		player.slide();
	}
	else if(keyCode === ENTER){
		if (gameover) {
			setup();
		}
	}
}

function mousePressed(){
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
		if (gameover) {
			setup();
		}
		else{
			started = true;
			player.jump();
		}
	}
}

function gameOver(){
	gameover = true;
}

function drawScore(){
	// Draw Score
	fill(color("#50b8e7"));
	textAlign(CENTER);
	strokeWeight(0);
	textSize(45);
	text(score, width*0.9, height*0.15);
}

function drawEndScreen(){
	background(color("#dcf0fa"));
	fill(color("#50b8e7"));

	// Draw Text
	textAlign(CENTER);
	strokeWeight(0);
	textSize(50);
	text("Your Score:", width*0.5, height*0.2);

	// Draw Score
	textAlign(CENTER);
	strokeWeight(0);
	textSize(45);
	text(score, width*0.5, height*0.35);

	// Draw new Game option
	fill(color("#fff"));
	rect(width/4, height*0.5, width/2, 70);

	// Draw text for new Game
	fill(color("#50b8e7"));
	textAlign(CENTER);
	strokeWeight(0);
	textSize(30);
	text("New Game", width*0.5, height*0.5 + 45);
}