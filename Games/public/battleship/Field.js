function Field(i, j, w){
	this. i = i;
	this.j = j;
	this.w = w;
	this.x = i * w;
	this.y = j * w;
	this.display = false;
	this.ship = false;
}

Field.prototype.show  = function(){
	strokeWeight(3);
	stroke(color('#6E7889'));
	fill(200);
	rect(this.x, this.y, this.w, this.w);
}


Field.prototype.contains = function(x, y){
	return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}