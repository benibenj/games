var slider;
var ball;
var bricks;
var upgrades;
var colors;
var currentupgrades;
var possibleupgrades = new Array();
var gamestat;
var amountx;
var amounty;
var bricksize;
var score;
var round;
var lastgame;
var slidercolor;
function setup(){
	if (screen.width >= 600) {
		createCanvas(600, 600);
	}
	else{
		createCanvas(screen.width, screen.width);
	}
	gamestat = 0;
	slider = new Slider();
	ball = new Ball();
	amountx = 8;
	amounty = 4;
	bricks = make2DArray(amountx, amounty);
	upgrades = new Array();
	currentupgrades = new Array();
	score = 0;
	round = 0;
	lastgame = 0;
	slidercolor = color("#0041d4");
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
	if (gamestat == 0) {
		ball.go();
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
  	shrink = loadImage('/brickbreaker/img/shrink.svg');
  	expand = loadImage('/brickbreaker/img/expand.svg');
  	bomb = loadImage('/brickbreaker/img/BBbomb.svg');
  	possibleupgrades.push(bomb);
  	possibleupgrades.push(shrink);
  	possibleupgrades.push(expand);
}



// ---- SCOREBOARD STUFF ----


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
            let value = 345 - parseInt(score) * parseInt(object.y) + parseInt(object.z) - 345;
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



function Slider(){
    this.w = width/4;
    this.h = 20;
    this.x = width/2-this.w/2;
    this.speed = 7;

    this.left = false;
    this.right = false;

    this.show = function(){
        fill(slidercolor);
        rect(this.x, height-slider.h-30, this.h, this.h);
        fill(255);
        rect(this.x+this.h, height-slider.h-30, this.w - 2 * this.h, this.h);
        fill(slidercolor);
        rect(this.x + this.w - this.h, height-slider.h-30, this.h, this.h);
    }

    this.update = function(){
        if (this.left) {
            this.x -= this.speed;
        }
        if (this.right) {
            this.x += this.speed;
        }
        if (this.x < 0) {
            this.x = 0
            this.left = false;
        }
        else if (this.x > width-this.w) {
            this.x = width-this.w;
            this.right = false;
        }
    }

    this.lefton = function(){
        this.right = false;
        this.left = true;
    }

    this.righton = function(){
        this.left = false;
        this.right = true;
    }

    this.leftoff = function(){
        this.left = false;
    }

    this.rightoff = function(){
        this.right = false;
    }
}



function Ball(){
    this.size = width/30;
    this.x = slider.x + slider.w/2;
    this.y = height-50-this.size/2;
    this.lastx = 0;
    this.lasty = 0;
    this.speed = 8;
    this.max = 7.5;
    this.vx = 0;
    this.vy = -this.speed;
    this.timey = 0;
    this.timex = 0;

    this.onslider = true;

    this.show = function(){
        fill(255);
        circle(this.x, this.y, this.size);
    }

    this.update = function(){
        if (this.onslider) {
            this.x = slider.x + slider.w/2;
        }
        else{
            this.x += this.vx;
            this.y += this.vy;
        }
        if (this.y <= 0 + this.size/2) {
            this.vy = Math.abs(this.vy);
        }
        // Right and Left Wall
        if (this.x <= 0 + this.size/2){
            this.vx = Math.abs(this.vx);
        }
        else if(this.x >= width -this.size/2){
            this.vx = -Math.abs(this.vx);
        }
        // Slider top vx
        if ((this.x + this.size/2 == slider.x + slider.w || this.x + this.size/2 == slider.x) && this.y <= height-slider.h-30-this.size/2 && this.y >= height-30-this.size/2) {
            this.vx = -this.vx;
        }
        // Slider top vy
        if (this.y >= height-50-this.size/2 && this.y <= height-40-this.size/2 && !this.onslider) {
            if (this.x >= slider.x - this.size/2 && this.x <= slider.x + slider.w + this.size/2) {
                
                this.vy = -Math.abs(this.vy);
                this.vx += this.calc();
            }
        }
        // vx limit
        if (this.vx > this.max) {
            this.vx = this.max;
        }
        // calculate vy
        this.val();
        // check if game is over
        if (this.y > height + this.size/2) {
            this.vx = 0;
            this.vy = 0;
            if (gamestat == 0) {
                submitScore(score, "brickbreaker", function(){}, function(){});
                console.log("Score submitted");
            }
            gamestat = 2;
        }

    }

    this.go = function(){
        this.onslider = false;
    }

    // calc vx change dependent of where it hits slider
    this.calc = function(){
        let keep = this.x - slider.x;
        keep -= slider.w/2;
        if (this.vx < this.max && this.vx > -this.max) {
            keep = keep/slider.w*2;
            return keep*6;
        }
        if (this.vx >= this.max && keep < 0 || this.vx <= -this.max && keep > 0) {
            keep = keep/slider.w*2;
            return keep*6;
        }
        return 0;
    }

    this.val = function(){
        let pos = 1;
        if (this.vy < 0) {
            pos = -1;
        }
        this.vy = pos * Math.sqrt(Math.abs(Math.pow(this.speed, 2)-Math.pow(this.vx, 2)));
    }

    this.lastpos = function(){
        this.lasty = this.y;
        this.lastx = this.x;
    }

}

function Brick(i, j, w, color){
    this.w = w;
    this.h = 20;
    this.x = i*this.w;
    this.y = j*this.h;
    this.display = true;
    this.color = color;
    this.dropchance = 0.2;

    this.show = function(){
        //fill(rgb(0,255,255));
        if (this.display) {
            fill(this.color);
            rect(this.x, this.y, this.w, this.h);
        }
    }

    this.collbot = function(){
        if (ball.lasty > ball.y){
            if(ball.y - ball.size/2 <= this.y + this.h && ball.y - ball.size/2 >= this.y + this.h/2){
                if (ball.x + ball.size/2 >= this.x && ball.x - ball.size/2 <= this.x + this.w) {
                    this.display = false;
                    let rand = Math.random()*10;
                    if (rand <= 10 * this.dropchance){
                        upgrades.push(new Upgrade(this.x + this.w/2, this.y + this.h/2, chooseType()));
                    }
                    return true;
                }
            }
        }
    }

    this.colltop = function(){
        if (ball.lasty < ball.y){
            if(ball.y - ball.size/2 <= this.y + this.h/2 && ball.y - ball.size/2 >= this.y){
                if (ball.x + ball.size/2 >= this.x && ball.x - ball.size/2 <= this.x + this.w){
                    this.display = false;
                    let rand = Math.random()*10;
                    if (rand <= 10 * this.dropchance){
                        upgrades.push(new Upgrade(this.x + this.w/2, this.y + this.h/2, chooseType()));
                    }
                    return true;
                }
            }
        }
    }

    this.collleft = function(){
        if (ball.lastx < ball.x){
            if(ball.y - ball.size/2 <= this.y + this.h && ball.y + ball.size/2 >= this.y){
                if (ball.x + ball.size/2 >= this.x && ball.x - ball.size/2 <= this.x + this.w/2){
                    this.display = false;
                    let rand = Math.random()*10;
                    if (rand <= 10 * this.dropchance){
                        upgrades.push(new Upgrade(this.x + this.w/2, this.y + this.h/2, chooseType()));
                    }
                    return true;
                }
            }
        }
    }

    this.collright = function(){
        if (ball.lastx > ball.x){
            if(ball.y - ball.size/2 <= this.y + this.h && ball.y + ball.size/2 >= this.y){
                if (ball.x + ball.size/2 >= this.x + this.w/2 && ball.x - ball.size/2 <= this.x + this.w){
                    this.display = false;
                    let rand = Math.random()*10;
                    if (rand <= 10 * this.dropchance){
                        upgrades.push(new Upgrade(this.x + this.w/2, this.y + this.h/2, chooseType()));
                    }
                    return true;
                }
            }
        }
    }
}

function chooseType(){
    let pick = Math.floor(Math.random()*possibleupgrades.length);
    while(pick === possibleupgrades.length){
        pick = Math.floor(Math.random()*possibleupgrades.length);
    }
    return possibleupgrades[pick];
}


function Bomb() {
    ball.vx = 0;
    ball.vy = 0;
    gamestat = 2;

    this.update = function(){

    }
}

function Shrink(){
    this.time = Date.now();
    this.life = 10000;
    this.shrink = 0.7;
    slider.w = slider.w * this.shrink;

    this.update = function(){
        if (this.time + this.life < Date.now()) {
            slider.w = slider.w / this.shrink;
            return true;
        }
        return false;
    }
}

function Expand(){
    this.time = Date.now();
    this.life = 10000;
    this.expand = 1.3;
    slider.w = slider.w * this.expand;

    this.update = function(){
        if (this.time + this.life < Date.now()) {
            slider.w = slider.w / this.expand;
            return true;
        }
        return false;
    }
}


function Upgrade(x, y, type){
    this.x = x;
    this.y = y;
    this.vy = 5;
    this.size = width/12;
    this.type = type;

    this.show = function(){
        image(this.type, this.x - this.size/2, this.y + this.size/2, this.size, this.size);
    }

    this.update = function(){
        this.y += this.vy;
    }

    this.pickup = function(){
        if (this.x + this.size/2 > slider.x && this.x - this.size/2 < slider.x + slider.w) {
            if (this.y + this.size > height-slider.h-30 && this.y - this.size/2 < height-slider.h-30) {
                return this.type;
            }
        }
        return null;
    }
}