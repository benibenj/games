var canvasSize = 551;
var size;
var w;
var grid;
var pickcounter;

function setup(){
	// Pick Phase
	pickcounter = 14;

	// Calculate The Field Sizes and ect.
	w = floor((canvasSize-1)/10);
	let canvas = createCanvas(canvasSize, canvasSize);
	canvas.id("canvas");
	size = floor(canvasSize / w);
	grid = make2DArray(size, size);

	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			grid[i][j] = new Field(i, j, w);
		}
	}
}


function mousePressed(){
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].display) {
				if (pickcounter > 0) {
					
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


function make2DArray(cols, rows){
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}