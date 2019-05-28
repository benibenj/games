var player;
var obstacles;
let speed;
let gameover;
let started;
let score;
let framespawntime;
let haveincreased;
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
	gameover = false;
	started = false;
	score = 0;
	speed = 8;
	framespawntime = 100;
	haveincreased = true;
}

function draw(){
	if (!gameover) {
		image(imgbackground, 0, 0, width, height);
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

		// increase speed every x obstacles
		if (score % 6 == 0 && !haveincreased && score > 0) {
			speed++;
			framespawntime--;
			haveincreased = true;
		}
		else if (score % 6 != 0 && haveincreased) {
			haveincreased = false;
		}

		// create new obstacles
		if (frameCount % framespawntime == 0) {
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
			player.slide();
		}	
	}
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