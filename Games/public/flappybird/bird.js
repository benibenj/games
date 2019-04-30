function Bird(){
	this.y = width/2;
	this.x = 25;

	this.show = function(){
		fill(255);
		image(bird, this.x, this.y, 20, 20);
	}
}