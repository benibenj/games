function setup() {
	createCanvas(400, 600);
	bird = new Bird();
}

function draw(){
	background(0);
}

function preload(){
  	bird = loadImage('img/bird.jpg');
}