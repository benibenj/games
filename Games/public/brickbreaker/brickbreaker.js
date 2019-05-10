var slider;
var ball;
var gameover;
var bricks;
var amountx = 10;
var amounty = 4;
var bricksize;
function setup(){
	createCanvas(600,600);
	gameover = false;
	slider = new Slider();
	ball = new Ball();
	bricks = make2DArray(amountx, amounty);
	bricksize = width / amountx;
	for (let i = 0; i < amountx; i++){
		for (let j = 0; j < amounty; j++){
			bricks[i][j] = new Brick(i, j, bricksize, '#fff');
		}
	}
}

function draw(){
	background(0);
	slider.update();
	slider.show();
	ball.update();
	ball.show();
	for (let i = amountx-1; i >= 0; i--) {
		for (let j = amounty-1; j >= 0; j--){
			if(bricks[i][j].display && bricks[i][j].collbot()){
				ball.vy = -ball.vy;
			}
			bricks[i][j].show();
		}
	}
}

function keyPressed(){
	if (keyCode == LEFT_ARROW){
		slider.lefton();
	}
	else if (keyCode == RIGHT_ARROW){
		slider.righton();
	}
	else if (keyCode == 32){
		ball.go();
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

function make2DArray(cols, rows){
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
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