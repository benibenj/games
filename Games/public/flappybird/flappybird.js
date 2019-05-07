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
				gameOver();
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
}

function keyPressed(){
	if (key = ' ') {
		bird.up();
		started = true;
	}
}

var firstKey = true;
function mousePressed(){
	if (!gameover) {
		// A Touch gives to clicks, to avoid this, we register every second touch
		if (firstKey) {
			bird.up();
			firstKey = false;
		}
		else{
			firstKey = true;
		}
		started = true;
	}
	else{
		if(mouseX > width/4 && mouseX < width*3/4){
			if (mouseY > height*0.5 && mouseY < height*0.5 + 70) {
				setup();
			}
		}
	}
}

function preload(){
  	birdimg = loadImage('/img/bird.svg');
}

function gameOver(){
	gameover = true;
	// Submitting the Score
	var points = Math.floor(1000000.0/Math.sqrt((score)/1000.0+1.0));
	submitScore(points, "flappybird", function(){}, function(){});
}





// Scoreboard Stuff

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