var slider;
var ball;
function setup(){
	createCanvas(400,600);
	slider = new Slider();
	ball = new Ball();
}

function draw(){
	background(0);
	slider.update();
	slider.show();
	ball.show();
}

function keyPressed(){
	if (keyCode == LEFT_ARROW){
		slider.lefton();
	}
	if (keyCode == RIGHT_ARROW){
		slider.righton();
	}
}

function keyReleased(){
	if (keyCode == LEFT_ARROW){
		slider.leftoff();
	}
	if (keyCode == RIGHT_ARROW){
		slider.rightoff();
	}
}

function mousePressed(){
	if(mouseX > 0 && mouseX < width/2 && mouseY > 0 && mouseY < height) {
		slider.lefton();
	}
	else if(mouseX < width && mouseX > width/2 && mouseY > 0 && mouseY < height) {
		slider.righton();
	}
}

function mouseReleased(){
	if(mouseX > 0 && mouseX < width/2 && mouseY > 0 && mouseY < height) {
		slider.leftoff();
	}
	else if(mouseX < width && mouseX > width/2 && mouseY > 0 && mouseY < height) {
		slider.rightoff();
	}
}