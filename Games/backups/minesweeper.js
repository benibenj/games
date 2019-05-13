var grid;
var size;
var w;
var canvasSize = 551;
var amountMines = 17;
var flag;
var starttime;
var gametime;
var start;
var gameover;
var win;

function setup(){
	gameover = false;
	win = false;
	start = false;
	// Calculate the sizes
	if (screen.width < canvasSize * 1.2) {
		canvasSize = screen.width / 1.2 - 10;
	}
	w = floor((canvasSize-1)/10);
	let canvas = createCanvas(canvasSize*1.2, canvasSize);
	canvas.id("canvas");
	size = floor(canvasSize / w);
	grid = make2DArray(size, size);

	choseMineSpots();

	// Count Mines arround a Cell
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			grid[i][j].countMines(size);
		}
	}

	//Draw Flag Space and Miner space
	flag = false;

	strokeWeight(2);
	stroke(color('#6E7889'));
	fill(color('#D8D9DE'));
	rect(canvasSize*1.05, canvasSize*0.35, w, w);
	fill(200);
	rect(canvasSize*1.05, canvasSize*0.55, w, w);
	image(flagimg, canvasSize*1.05 + w*0.25, canvasSize*0.55 + w*0.25, w/2, w/2);
}

function mousePressed(){
if (!win && !gameover) {
	//Check if you pressed on a Cell
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].display) {
				if (!flag) {
					grid[i][j].reveal();
					// If you hit a mine
					if (grid[i][j].mine) {
						gameOver();
					}
				}
				else{
					grid[i][j].flagit();
					checkIfFinished();
				}
				if (!start) {
					starttime = new Date().getTime();
					start = true;
				}
			}
		}
	}

	// Check Miner spot
	if (canvasSize*1.05 < mouseX && canvasSize*1.05 + w > mouseX &&
		canvasSize*0.35 < mouseY && canvasSize*0.35 + w > mouseY ) {
		
		if (flag) {
			strokeWeight(2);
			// Miner
			fill(color('#D8D9DE'));
			rect(canvasSize*1.05, canvasSize*0.35, w, w);
			// Flag
			fill(200);
			rect(canvasSize*1.05, canvasSize*0.55, w, w);
			image(flagimg, canvasSize*1.05 + w*0.25, canvasSize*0.55 + w*0.25, w/2, w/2);
			flag = false;
		}
	}

	// Check Flag spot
	if (canvasSize*1.05 < mouseX && canvasSize*1.05 + w > mouseX &&
		canvasSize*0.55 < mouseY && canvasSize*0.55 + w > mouseY ) {
		
		if (!flag) {
			strokeWeight(2);
			// Miner
			fill(200);
			rect(canvasSize*1.05, canvasSize*0.35, w, w);
			// Flag
			fill(color('#D8D9DE'));
			rect(canvasSize*1.05, canvasSize*0.55, w, w);
			image(flagimg, canvasSize*1.05 + w*0.25, canvasSize*0.55 + w*0.25, w/2, w/2);
			flag = true;
		}
	}
}
}


function draw(){

	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			grid[i][j].show();
		}
	}
	// Check if game is finished
	if (gameover) {
		image(gameoverimg, canvasSize*0.25, canvasSize*0.25, canvasSize*0.5, canvasSize*0.5);
	}
	if (win) {
		//Light Background
		stroke(color('#D8D9DE'));
		fill(color('#D8D9DE'));
		rect(0, 0, canvasSize+1, canvasSize+1);
		// Img
		image(winimg, canvasSize*0.3, canvasSize*0.15, canvasSize*0.4, canvasSize*0.4);
		// Score
		textAlign(CENTER);
		fill(color('#393B45'));
		strokeWeight(0);
		textSize(floor(canvasSize/7));
		text(gametime, canvasSize*0.5, canvasSize*0.75);
	}
}


function preload(){
  	bomb = loadImage('/minesweeper/img/bomb.svg');
  	flagimg = loadImage('/minesweeper/img/flag.svg');
  	gameoverimg = loadImage('/minesweeper/img/gameover.svg');
	winimg = loadImage('/minesweeper/img/win.svg');
}


function gameOver(){
	displayAll();
	gameover = true;
}


function gameWin(){
	displayAll();
	win = true;
	// calculating the game time
	var endtime = new Date().getTime();
	var time = floor((endtime - starttime)/1000.0);
	var min = floor(time/60);
	var sec = floor(time%60);
	if (min == 0) {
		gametime = sec + "s";
	}
	else{
		gametime = min + "min " + sec + "s";
	}
	// Submitting the Score
	var score = Math.floor(1000000.0/Math.sqrt((endtime - starttime)/1000.0+1.0));
	submitScore(score, "minesweeper", function(){}, function(){});
}


function displayAll(){
	// Display all Fields
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			grid[i][j].reveal();
		}
	}
}


function checkIfFinished(){
	// Check if all flags are set correct and there arent to many
	var amountOfMinesFlagged = 0;
	var amountOfWrongFlaggs = 0;
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			if(grid[i][j].mine && grid[i][j].flagOnMe){
				amountOfMinesFlagged++;
			}
			else if(!grid[i][j].mine && grid[i][j].flagOnMe){
				amountOfWrongFlaggs++;
			}
		}
	}
	if (amountOfMinesFlagged == amountMines && amountOfWrongFlaggs == 0) {
		gameWin();
	}
}


function choseMineSpots(){
	// Creat all cells and push it on array to pick the mines later
	var options = [];
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			grid[i][j] = new Cell(i, j, w);
			options.push([i,j]);
		}
	}

	// Chose Mine Spots
	for (var i = 0; i < amountMines; i++) {
		// Get A Cell to make it a Mine
		var index = floor(random(options.length));
		var first = options[index][0];
		var second = options[index][1];
		grid[first][second].mine = true;
		// Delete the Cell from the array
		options.splice(index, 1)
	}
}


function make2DArray(cols, rows){
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
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

function Cell(i, j, w){
	this.i = i;
	this.j = j;
	this.x = i * w;
	this.y = j * w;
	this.w = w;
	this.neighborCount = 0;
	this.mine = false;
	this.display = false;
	this.flagOnMe = false;
	this.memory = 0;
}



Cell.prototype.show = function(){
	strokeWeight(3);
	stroke(color('#6E7889'));
	fill(200);
	rect(this.x, this.y, this.w, this.w);

	if (this.display) {
		fill(color('#D8D9DE'));
		rect(this.x, this.y, this.w, this.w);
		if (this.mine) {
			//ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w*0.5);
			image(bomb, this.x + this.w*0.25, this.y + this.w*0.25, w/2, w/2);
		}
		else if (this.neighborCount == 0) {

		}
		else{
			textAlign(CENTER);
			fill(color('#6E7889'));
			strokeWeight(0);
			textSize(w/2);

			switch(this.neighborCount){
				case 1: fill(color('#228B22'));
				break;
				case 2: fill(color('#0000ff'));
				break;
				case 3: fill(color('#ff0000'));
				break;
				default: fill(color('#BA55D3'));
			}

			text(this.neighborCount, this.x + this.w*0.5, this.y + this.w*0.65);
		}
	}
	else if (this.flagOnMe) {
		image(flagimg, this.x + this.w*0.25, this.y + this.w*0.25, w/2, w/2);
	}
}



Cell.prototype.flagit = function(){
	//memory is prevention agains a bug that on touch screens a touch has 2 events
	if (this.memory < new Date().getTime()-600) {

		// Put a flag on this Cell if it is not displayed or take the flag away of the cell
		if (!this.display) {
			if(!this.flagOnMe){
				this.flagOnMe = true;
			}
			else{
				this.flagOnMe = false;
			}
		}
		this.memory = new Date().getTime();
	}
}



Cell.prototype.countMines = function(size){
	if (this.mine) {
		this.neighborCount = -1;
	}
	var total = 0;
	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			var first = this.i + i;
			var second = this.j + j;
			if (first >= 0 && second >= 0 && first < size && second < size) {
				var neighbor = grid[first][second];
				if (neighbor.mine) {
					total++;
				}
			}
		}
	}
	this.neighborCount = total;
}



Cell.prototype.reveal = function(){
	this.display = true;
	if (this.neighborCount == 0) {
		this.zero();
	}
	this.flagOnMe = false;
}



Cell.prototype.zero = function(){
	for (var xoff = -1; xoff <= 1; xoff++) {
		for (var yoff = -1; yoff <= 1; yoff++) {
			var i = this.i + xoff;
			var j = this.j + yoff;
			if (i > -1 && i < size && j > -1 && j < size) {
				var neighbor = grid[i][j];
				if (!neighbor.mine && !neighbor.display) {
					neighbor.reveal();
				}
			}
		}
	}
}



Cell.prototype.contains = function(x, y){
	return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}