function Obstacle(){
	this.x = width;
	this.y = height-30-player.size;
	this.w = 20;
	this.h = 20;
	this.speed = 5;

	this.update = function(){
		this.x -= this.speed;
	}

	this.show = function(){
		fill(255);
		rect(this.x, this.y, this.w, this.h);
	}

	this.collision = function(){
		if (this.x <= player.x + player.w && this.x + this.w >= player.x) {
			if (this.y <= player.y + player.h && this.y + this.h >= player.y) {
				return true;
			}
		}
		return false;
	}

	this.offscreen = function(){
		if (this.x + this.w <= 0) {
			return true;
		}
		return false;
	}
}