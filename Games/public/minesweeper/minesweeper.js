var grid;
var size;
var w;
var canvasSize = 551;
var amountMines = 1;
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
  	bomb = loadImage('/img/bomb.svg');
  	flagimg = loadImage('/img/flag.svg');
  	gameoverimg = loadImage('/img/gameover.svg');
	winimg = loadImage('/img/win.svg');
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
	submitScore(score, "minesweeper", function() {
		alert("Score: "+score);
        
    });
	
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

/*

----------
HOW TO USE
----------

1. Copy-paste this code into your game .js file, do not include it
   with a separate script tag as this code has to be obfuscated with
   your game .js files as well

2. Implement the needed functions (submitScore(), loadMyScores(), 
   loadGameScores(), loadPlayerScores())

3. IMPORTANT: Obfuscate all the code of your game .js file with a 
   javascript obfuscator, for example 
   https://www.javascriptobfuscator.com/Javascript-Obfuscator.aspx,
   make sure you have a backup of your clean code (NOT IN THE PUBLIC
   FOLDER!)

*/

// Submits the score (integer) to the specified game (string), executes
// action (function) if the submission was successful
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

// Load the current player scores into an array and executes the
// specified function with this array
function loadMyScores(action) {
    getAjax("/scoreboard/self", function(text){
        action(JSON.parse(text));
    });
}

// Load the ranking of the specified game into an array and executes
// the specified function with this array
function loadGameRanking(game, action) {
    getAjax("/scoreboard/games?game=" + game, function(text){
        action(JSON.parse(text));
    });
}

// Load the ranking of all players into an array and executes
// the specified function with this array
// Example: loadPlayerRanking(function(array){alert(array[0].username);});
function loadPlayerRanking(action) {
    getAjax("/scoreboard/players", function(text){
        action(JSON.parse(text));
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