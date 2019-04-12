
function make2DArray(cols, rows){
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

var grid;
var size;
var w = 60;
var amountMines = 15;

function setup(){
	createCanvas(601, 601);
	size = floor(width / w);
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
}

function mousePressed(){
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			if (grid[i][j].contains(mouseX, mouseY)) {
				grid[i][j].reveal();
				if (grid[i][j].mine) {
					gameOver();
				}
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
}


function preload(){
  img = loadImage('img/bomb.svg');
}


function gameOver(){
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			grid[i][j].reveal();
		}
	}
}