function Ball(){
	this.size = 20;
	this.x = slider.x + slider.w/2;
	this.y = height-50-this.size/2;
	this.lastx = 0;
	this.lasty = 0;
	this.speed = 8;
	this.max = 7.5;
	this.vx = 0;
	this.vy = -this.speed;
	this.timey = 0;
	this.timex = 0;

	this.onslider = true;

	this.show = function(){
		fill(255);
		circle(this.x, this.y, this.size);
	}

	this.update = function(){
		if (this.onslider) {
			this.x = slider.x + slider.w/2;
		}
		else{
			this.x += this.vx;
			this.y += this.vy;
		}
		if (this.y <= 0 + this.size/2) {
			this.vy = Math.abs(this.vy);
		}
		// Right and Left Wall
		if (this.x <= 0 + this.size/2){
			this.vx = Math.abs(this.vx);
		}
		else if(this.x >= width -this.size/2){
			this.vx = -Math.abs(this.vx);
		}
		// Slider top vx
		if ((this.x + this.size/2 == slider.x + slider.w || this.x + this.size/2 == slider.x) && this.y <= height-slider.h-30-this.size/2 && this.y >= height-30-this.size/2) {
			this.vx = -this.vx;
		}
		// Slider top vy
		if (this.y >= height-50-this.size/2 && this.y <= height-40-this.size/2 && !this.onslider) {
			if (this.x >= slider.x - this.size/2 && this.x <= slider.x + slider.w + this.size/2) {
				
				this.vy = -Math.abs(this.vy);
				this.vx += this.calc();
			}
		}
		// vx limit
		if (this.vx > this.max) {
			this.vx = this.max;
		}
		// calculate vy
		this.val();
		// check if game is over
		if (this.y > height + this.size/2) {
			this.vx = 0;
			this.vy = 0;
			if (gamestat == 0) {
				submitScore(score, "brickbreaker", function(){}, function(){});
				console.log("Score submitted");
			}
			gamestat = 2;
		}

	}

	this.go = function(){
		this.onslider = false;
	}

	// calc vx change dependent of where it hits slider
	this.calc = function(){
		let keep = this.x - slider.x;
		keep -= slider.w/2;
		if (this.vx < this.max && this.vx > -this.max) {
			keep = keep/slider.w*2;
			return keep*6;
		}
		if (this.vx >= this.max && keep < 0 || this.vx <= -this.max && keep > 0) {
			keep = keep/slider.w*2;
			return keep*6;
		}
		return 0;
	}

	this.val = function(){
		let pos = 1;
		if (this.vy < 0) {
			pos = -1;
		}
		this.vy = pos * Math.sqrt(Math.abs(Math.pow(this.speed, 2)-Math.pow(this.vx, 2)));
	}

	this.lastpos = function(){
		this.lasty = this.y;
		this.lastx = this.x;
	}

}