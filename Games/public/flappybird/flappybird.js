var bird;
var pipes = [];
var score = 0;
function setup(){
	createCanvas(400, 590);
	bird = new Bird();
	pipes.push(new Pipe());
}

function draw(){
	background(0);
	
	// Pipe checks
	for (let i = pipes.length - 1; i >= 0; i--) {
		pipes[i].show();
		pipes[i].update();

		if (pipes[i].hits(bird)) {
			console.log("hit");
			score = 0;
		}

		if (pipes[i].offscreen()) {
			pipes.splice(i, 1);
		}
	}

	// Bird drawings
	bird.update();
	bird.show();

	// Draw Score
	if ((frameCount + width) % 100 == 0) {
		score += 1;
	}
	textAlign(CENTER);
	fill(0, 0, 255);
	strokeWeight(0);
	textSize(100);
	text(score, width*0.5, height*0.2);

	// Create Pipes all 100 Frames
	if (frameCount % 100 == 0) {
		pipes.push(new Pipe());
	}
}

function keyPressed(){
	if (key = ' ') {
		bird.up();
	}
}

function preload(){
  	birdimg = loadImage('/img/bird.jpg');
}