var slider;
var ball;
var bricks;
var upgrades;
var colors;
var currentupgrades;
var possibleupgrades = new Array();
var gamestat;
var amountx = 8;
var amounty = 4;
var bricksize;
var score;
var round;
var lastgame;
function setup(){
	createCanvas(600,600);
	gamestat = 0;
	slider = new Slider();
	ball = new Ball();
	bricks = make2DArray(amountx, amounty);
	upgrades = new Array();
	currentupgrades = new Array();
	score = 0;
	round = 0;
	lastgame = 0;
	colors = [color("#a6206a"), color("#ec1c4b"), color("#f16a43"), color("#f7d969"), color("#2f9395")];
	bricksize = width / amountx;
	for (let i = 0; i < amountx; i++){
		for (let j = 0; j < amounty; j++){
			bricks[i][j] = new Brick(i, j, bricksize, colors[Math.round(Math.random()*(colors.length-1))]);
		}
	}
}

function nextgame(){
	slider = new Slider();
	ball = new Ball();

	// next level stuff
	ball.speed += round;
	amounty += round;
	console.log(round);
	bricks = make2DArray(amountx, amounty);
	upgrades = new Array();
	currentupgrades = new Array();
	for (let i = 0; i < amountx; i++){
		for (let j = 0; j < amounty; j++){
			bricks[i][j] = new Brick(i, j, bricksize, colors[Math.round(Math.random()*(colors.length-1))]);
		}
	}
}

function draw(){
	if (gamestat === 0) {
		background(0);
		slider.update();
		slider.show();


		// BRICKS
		for (let i = amountx-1; i >= 0; i--) {
			for (let j = amounty-1; j >= 0; j--){
				if(bricks[i][j].display && bricks[i][j].collbot()){
					ball.vy = Math.abs(ball.vy);
					score++;
				}
				else if(bricks[i][j].display && bricks[i][j].collleft()){
					ball.vx = -Math.abs(ball.vx);
					score++;
				}
				else if(bricks[i][j].display && bricks[i][j].collright()){
					ball.vx = Math.abs(ball.vx);
					score++;
				}
				else if(bricks[i][j].display && bricks[i][j].colltop()){
					ball.vy = -Math.abs(ball.vy);
					score++;
				}
				bricks[i][j].show();

			}
		}

		// UPGRADES
		for (let i = upgrades.length-1; i >= 0; i--) {
			upgrades[i].update();
			let pickup = upgrades[i].pickup();
			if(pickup != null){
				upgrades.splice(i, 1);
				// wich upgrade
				switch(pickup){
					case expand: currentupgrades.push(new Expand()); break;
					case shrink: currentupgrades.push(new Shrink()); break;
					case bomb: currentupgrades.push(new Bomb()); break;
					default:
				}
			}
			else{
				upgrades[i].show();
			}	
		}

		// CURRENTUPGRADES
		for (let i = currentupgrades.length-1; i >= 0; i--) {
			if(currentupgrades[i].update()){
				currentupgrades.splice(i, 1);
			}
		}
		ball.lastpos();
		ball.update();
		ball.show();
		// Draw Score
		textAlign(CENTER);
		fill(color("#fff"));
		strokeWeight(0);
		textSize(30);
		text(score, width*0.9, height*0.2);
		if (score == amountx * amounty + lastgame) {
			lastgame = score;
			round += 1;
			nextgame();
		}
	}
	else if (gamestat === 1) {
		background(255);
		// Draw Win
		textAlign(CENTER);
		fill(color("#50b8e7"));
		strokeWeight(0);
		textSize(70);
		text("You won!", width*0.5, height*0.2);
		// New Game
		rect(width*0.25, height*0.6, width*0.5, 80);
		fill(color("#fff"));
		textSize(40);
		text("New Game", width*0.5, height*0.6 + 55);
	}
	else if (gamestat === 2) {
		background(255);
		// Draw Game Over
		textAlign(CENTER);
		fill(color("#50b8e7"));
		strokeWeight(0);
		textSize(70);
		text("Game Over!", width*0.5, height*0.2);
		// New Game
		textSize(60);
		text("Score: " + score, width*0.5, height*0.4);
		// New Game
		rect(width*0.25, height*0.6, width*0.5, 80);
		fill(color("#fff"));
		textSize(40);
		text("New Game", width*0.5, height*0.6 + 55);
	}
}

function keyPressed(){
	if (keyCode == LEFT_ARROW){
		slider.lefton();
	}
	else if (keyCode == RIGHT_ARROW){
		slider.righton();
	}
	else if (keyCode == 32 || keyCode == UP_ARROW){
		ball.go();
	}
	if (gamestat >= 1) {
		setup();
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
	if (gamestat >= 1) {
		if (mouseX >= width * 0.25 && mouseX <= width * 0.75) {
			if (mouseY >= height * 0.6 && mouseY <= height * 0.6 + 80) {
				setup();
			}
		}
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


function preload(){
  	shrink = loadImage('/img/shrink.svg');
  	expand = loadImage('/img/expand.svg');
  	bomb = loadImage('/img/BBbomb.svg');
  	possibleupgrades.push(bomb);
  	possibleupgrades.push(shrink);
  	possibleupgrades.push(expand);
}



// SCOREBOARD STUFF
function submitScore(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = parseInt(score) * parseInt(object.y) + parseInt(object.z);
            postAjax("/scoreboard/submit", {
                "key": object.x,
                "value": value,
                "game": game
            }, function(submit){
                action(submit);
            });
        } else {
            error();
        }
    });
}

// From https://plainjs.com/javascript/ajax/send-ajax-get-and-post-requests-47/
function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}