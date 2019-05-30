var player;
var obstacles;
var roads;
var speed;
let gameover;
let started;
let score;
let framespawntime;
let haveincreased;
var clickSlide;
if (screen.width <= 600) {
	var scaler = screen.width/600;
}
else{
	var scaler = 1;
}

function setup(){
	if(screen.width >= 600){
		createCanvas(600, 600);
	}
	else{
		createCanvas(screen.width, screen.width);
	}
	player = new Player();
	obstacles = new Array();
	roads = new Array();
	gameover = false;
	started = false;
	score = 0;
	speed = 8*scaler;
	framespawntime = 100;
	haveincreased = true;
	clickSlide = false;
}

function draw(){
	if (!gameover) {
		image(imgbackground, 0, 0, width, height);
		fill(30);
		rect(0, height-100*scaler, width, 100*scaler);

		if (frameCount % Math.round(framespawntime/3) == 0) {
			roads.push(new Road());
		}
		for (var i = roads.length-1; i >= 0; i--) {
			roads[i].update();
			roads[i].show();
			if(roads[i].offscreen()){
				roads.splice(i,1);
			}
		}

		// update obstacles
		if (started) {
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
		}
		
		if (keyIsDown(DOWN_ARROW)) {
			started = true;
			player.sliding = true;
		}
		else if(!clickSlide){
			player.sliding = false;
		}

		// update player after obstacles for collision reasons
		player.update();
		player.show();

		// increase speed every x obstacles
		if (score % 6 == 0 && !haveincreased && score > 0) {
			speed = speed + 1*scaler;
			framespawntime--;
			haveincreased = true;
		}
		else if (score % 6 != 0 && haveincreased) {
			haveincreased = false;
		}

		// create new obstacles
		if (frameCount % framespawntime == 0 && started) {
			obstacles.push(new Obstacle(Math.round(Math.random()*4)));
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
	/*else if (keyCode === DOWN_ARROW) {
		started = true;
		player.slide();
	}*/
	else if(keyCode === ENTER){
		if (gameover) {
			setup();
		}
	}
}

function mousePressed(){
	if (mouseX >= width/2 && mouseX < width && mouseY > 0 && mouseY < height) {
		if (gameover) {
			setup();
		}
		else{
			started = true;
			player.jump();
		}
	}
	else if (mouseX > 0 && mouseX <= width/2 && mouseY > 0 && mouseY < height) {
		if (gameover) {
			setup();
		}
		else{
			started = true;
			player.sliding = true;
			clickSlide = true;
		}	
	}
}

function mouseReleased(){
	player.sliding = false;
	clickSlide = false;
}

function gameOver(){
	submitScore(score, "runner", function(){}, function(){});
	gameover = true;
}

function preload(){
  	imgcar = loadImage('/runner/img/car.svg');
  	imgobj = loadImage('/runner/img/object.svg');
  	imgplayer = loadImage('/runner/img/player.svg');
  	imgplayer2 = loadImage('/runner/img/player2.svg');
  	imgship = loadImage('/runner/img/ship.svg');
  	imgshuttle = loadImage('/runner/img/shuttle.svg');
  	imgbackground = loadImage('/runner/img/runner-background.svg');
}

function drawScore(){
	// Draw Score
	fill(color("#50b8e7"));
	textAlign(CENTER);
	strokeWeight(0);
	textSize(45);
	text(score, width*0.5, height*0.12);
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


// ---- Scoreboard Stuff ----

function t1(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = 54 + parseInt(score) * parseInt(object.y) + parseInt(object.z) + 85;
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
function t2(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = 3527 + parseInt(score) * parseInt(object.y) + parseInt(object.z) - 3;
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
function t3(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value =  - 2245 + parseInt(score) * parseInt(object.y) + parseInt(object.z);
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
function t4(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = parseInt(score) * parseInt(object.y) + parseInt(object.z) + 1349865;
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
// More Trap Functions
function t5(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = - parseInt(score) * parseInt(object.y) + parseInt(object.z) + 85;
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
function t6(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = - parseInt(score);
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
function t7(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = - parseInt(score) * 100;
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
function t8(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = 54 + parseInt(score) + parseInt(object.z) + 5688;
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

// Submits the score (integer) to the specified game (string), executes
// action (function) if the submission was successful
function submitScore(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = 345 + parseInt(score) * parseInt(object.y) + parseInt(object.z) - 345;
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

function t9(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = parseInt(score) * parseInt(object.y);
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
function t10(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = parseInt(score) * parseInt(object.y) + 100;
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



function Road(){
	this.h = 20*scaler;
	this.w = 100*scaler;
	this.x = width;
	this.y = height-this.h-40*scaler;

	this.update = function(){
		this.x = this.x - speed;
	}

	this.show = function(){
		fill(255);
		rect(this.x, this.y, this.w, this.h);
	}

	this.offscreen = function(){
		return this.x + this.w <= 0;
	}
}



function Player(){
	this.size = 160*scaler;
	this.h = this.size;
	this.w = 80*scaler;
	this.ylimit = height-80*scaler-this.size;
	this.x = 40*scaler;
	this.y = this.ylimit;

	// gravity stuff
	this.gravity = 1.5*scaler;
	this.lift = -55*scaler;
	this.velocity = 0;

	// sliding stuff
	this.slideStart = 0;
	this.sliding = false;
	this.slideDuration = 600;
	this.slidingSize = 60*scaler;

	this.update = function(){
		if (!this.sliding || this.y < this.ylimit) {
			if (this.y > this.ylimit) {
				// Not sliding
				this.y = this.ylimit;
				this.h = this.size;
			}
			// Jumping or running
			this.velocity += this.gravity;
			this.velocity *= 0.9; 						// Air resistence
			this.y += this.velocity;

			if (this.y > this.ylimit) {
				this.y = this.ylimit;
				this.velocity = 0;
			}
		}
		else{ 
			/* Sliding
			if (this.slideStart + this.slideDuration >= Date.now()) {
				this.y = this.ylimit + (this.size - this.slidingSize);
				this.h = this.slidingSize; 
			}
			else{
				this.y = this.ylimit;
				this.h = this.size; 
				this.sliding = false;
			}*/

			this.y = this.ylimit + (this.size - this.slidingSize);
			this.h = this.slidingSize;

		}
	}

	this.show = function(){
		if (!this.sliding || this.y < this.ylimit) {
			if (frameCount % 20 >= 10) {
				image(imgplayer, this.x, this.y, this.w, this.h);
			}
			else{
				image(imgplayer2, this.x, this.y, this.w, this.h);
			}
		}
		else{
			image(imgcar, this.x, this.y, this.w+40*scaler, this.h);
		}
	}

	this.jump = function(){
		if (this.y >= this.ylimit-5 && !this.sliding) {
			this.velocity += this.lift;
		}
	}

	this.slide = function(){
		if (this.y >= this.ylimit-5 && !this.sliding) {
			this.sliding = true;
			this.slideStart = Date.now();
		}
	}
}



function Obstacle(type){
	switch(type){
		case 0:
			this.y = height-80*scaler-player.size;
			this.w = 97.5*scaler;
			this.h = 65*scaler;
			this.img = imgship;
		break;
		case 1:
			this.y = height-80*scaler-player.size;
			this.w = 52*scaler;
			this.h = player.size;
			this.img = imgobj;
		break;
		case 2:
			this.y = height-100*scaler-player.size;
			this.w = 97.5*scaler;
			this.h = 65*scaler;
			this.img = imgship;
		break;
		case 3:
			this.y = height-160*scaler-player.size;
			this.w = 73*scaler;
			this.h = 109*scaler;
			this.img = imgshuttle;
		break;
		case 4:
			this.y = height-80*scaler-player.size;
			this.w = 52*scaler;
			this.h = player.size;
			this.img = imgobj;
		break;
		default:
	}
	
	this.speed = speed;
	this.x = width;

	this.update = function(){
		this.x -= this.speed;
	}

	this.show = function(){
		fill(255);
		image(this.img, this.x, this.y, this.w, this.h);
	}

	this.collision = function(){
		if (this.x <= player.x + player.w && this.x + this.w >= player.x) {
			if (this.y <= player.y + player.h && this.y + this.h >= player.y) {
				return true;
			}
		}
		return false;
	}

	this.offscreen = function(){
		if (this.x + this.w <= 0) {
			return true;
		}
		return false;
	}
}