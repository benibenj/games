var bird;
var pipes;
var score;
var started;
var gameover;

function setup(){
	createCanvas(400, 590);
	started = false;
	gameover = false;
	score = 0;
	bird = new Bird();
	pipes = new Array();
}

function draw(){
	if (!gameover) {
		background(color("#b9e2f5"));
		
		// Pipe checks
		for (let i = pipes.length - 1; i >= 0; i--) {
			pipes[i].show();
			if (started) {
				pipes[i].update();
			}


			if (pipes[i].hits(bird)) {
				gameover = true;
			}

			// Remove pipe from array and increase score when pipe is off the screen
			if (pipes[i].offscreen()) {
				pipes.splice(i, 1);
				score += 1;
			}
		}

		if (bird.fallout()) {
			gameover = true;
		}

		// Bird drawings
		if (started) {
			bird.update();
		}
		bird.show();

		// Draw Score
		textAlign(CENTER);
		fill(color("#50b8e7"));
		strokeWeight(0);
		textSize(100);
		text(score, width*0.5, height*0.2);

		// Create Pipes all 100 Frames

		if (frameCount % 100 == 0 && started) {
			pipes.push(new Pipe());
		}
	}
	else{
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
		textSize(80);
		text(score, width*0.5, height*0.35);

	}
}

function keyPressed(){
	if (key = ' ') {
		bird.up();
		started = true;
	}
}

function preload(){
  	birdimg = loadImage('/img/bird.svg');
}