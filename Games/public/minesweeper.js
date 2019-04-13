
var grid;
var size;
var w;
var canvasSize = 551;
var amountMines = 17;
var flag;

function setup(){
	w = floor((canvasSize-1)/10);
	createCanvas(canvasSize*1.2, canvasSize);
	size = floor(canvasSize / w);
	grid = make2DArray(size, size);

	var options = [];
	// Creat all cells and push it on array to pick the mines later
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
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			if (grid[i][j].contains(mouseX, mouseY)) {
				if (!flag) {
					grid[i][j].reveal();
					if (grid[i][j].mine) {
						gameOver();
					}
				}
				else{
					grid[i][j].flagit();
				}
			}
		}
	}

	// Miner spot
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

	// Flag spot
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


function draw(){
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			grid[i][j].show();
		}
	}
}


function preload(){
  	bomb = loadImage('img/bomb.svg');
  	flagimg = loadImage('img/flag.svg');
}


function gameOver(){
	// Display all Fields
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			grid[i][j].reveal();
		}
	}
}


function make2DArray(cols, rows){
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}