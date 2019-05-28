function Road(){
	this.h = 20*scaler;
	this.w = 100*scaler;
	this.x = width;
	this.y = height-this.h-40*scaler;

	this.update = function(){
		this.x = this.x - speed;
	}

	this.show = function(){
		fill(255);
		rect(this.x, this.y, this.w, this.h);
	}

	this.offscreen = function(){
		return this.x + this.w <= 0;
	}
}