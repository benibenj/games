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
			text(this.neighborCount, this.x + this.w*0.5, this.y + this.w*0.65);
		}
	}
	else if (this.flagOnMe) {
		image(flagimg, this.x + this.w*0.25, this.y + this.w*0.25, w/2, w/2);
	}
}



Cell.prototype.flagit = function(){
	// Put a flag on this Cell if it is not displayed or take the flag away of the cell
	if (!this.display) {
		if(!this.flagOnMe){
			this.flagOnMe = true;
		}
		else{
			this.flagOnMe = false;
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