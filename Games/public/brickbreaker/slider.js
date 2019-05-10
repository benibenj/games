function Slider(){
	this.w = 150;
	this.h = 20;
	this.x = width/2-this.w/2;
	this.speed = 7;

	this.left = false;
	this.right = false;

	this.show = function(){
		rect(this.x, height-slider.h-30, this.w, this.h);
	}

	this.update = function(){
		if (this.left) {
			this.x -= this.speed;
		}
		if (this.right) {
			this.x += this.speed;
		}
		if (this.x < 0) {
			this.x = 0
			this.left = false;
		}
		else if (this.x > width-this.w) {
			this.x = width-this.w;
			this.right = false;
		}
	}

	this.lefton = function(){
		this.right = false;
		this.left = true;
	}

	this.righton = function(){
		this.left = false;
		this.right = true;
	}

	this.leftoff = function(){
		this.left = false;
	}

	this.rightoff = function(){
		this.right = false;
	}
}