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
  	bomb = loadImage('img/bomb.svg');
  	flagimg = loadImage('img/flag.svg');
  	gameoverimg = loadImage('img/gameover.svg');
  	winimg = loadImage('img/win.svg');
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
	var time = floor((endtime - starttime)/1000);
	var min = floor(time/60);
	var sec = floor(time%60);
	if (min == 0) {
		gametime = sec + "s";
	}
	else{
		gametime = min + "min " + sec + "s";
	}
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