function Ball(){
	this.size = 20;
	this.x = slider.x + slider.w/2;
	this.y = height-50-this.size/2;

	this.show = function(){
		circle(this.x, this.y, this.size);
	}
}