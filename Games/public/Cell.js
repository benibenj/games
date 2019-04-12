function Cell(i, j, w){
	this.i = i;
	this.j = j;
	this.x = i * w;
	this.y = j * w;
	this.w = w;
	this.neighborCount = 0;
	this.mine = false;
	this.display = false;
}



Cell.prototype.show = function(){
	strokeWeight(4);
	stroke(color('#6E7889'));
	fill(200);
	rect(this.x, this.y, this.w, this.w);

	if (this.display) {
		fill(color('#D8D9DE'));
		rect(this.x, this.y, this.w, this.w);
		if (this.mine) {
			//ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w*0.5);
			image(img, this.x + this.w*0.2, this.y + this.w*0.1, 40, 40);
		}
		else if (this.neighborCount == 0) {

		}
		else{
			textAlign(CENTER);
			fill(color('#6E7889'));
			strokeWeight(0);
			textSize(30);
			text(this.neighborCount, this.x + this.w*0.5, this.y + this.w*0.65);
		}
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