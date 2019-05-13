function Upgrade(x, y, type){
	this.x = x;
	this.y = y;
	this.vy = 5;
	this.size = width/12;
	this.type = type;

	this.show = function(){
		image(this.type, this.x - this.size/2, this.y + this.size/2, this.size, this.size);
	}

	this.update = function(){
		this.y += this.vy;
	}

	this.pickup = function(){
		if (this.x + this.size/2 > slider.x && this.x - this.size/2 < slider.x + slider.w) {
			if (this.y + this.size > height-slider.h-30 && this.y - this.size/2 < height-slider.h-30) {
				return this.type;
			}
		}
		return null;
	}
}