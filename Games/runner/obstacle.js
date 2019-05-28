function Obstacle(type){
	switch(type){
		case 0:
			this.y = height-80*scaler-player.size;
			this.w = 97.5*scaler;
			this.h = 65*scaler;
			this.img = imgship;
		break;
		case 1:
			this.y = height-80*scaler-player.size;
			this.w = 52*scaler;
			this.h = player.size;
			this.img = imgobj;
		break;
		case 2:
			this.y = height-100*scaler-player.size;
			this.w = 97.5*scaler;
			this.h = 65*scaler;
			this.img = imgship;
		break;
		case 3:
			this.y = height-160*scaler-player.size;
			this.w = 73*scaler;
			this.h = 109*scaler;
			this.img = imgshuttle;
		break;
		case 4:
			this.y = height-80*scaler-player.size;
			this.w = 52*scaler;
			this.h = player.size;
			this.img = imgobj;
		break;
		default:
	}
	
	this.speed = speed;
	this.x = width;

	this.update = function(){
		this.x -= this.speed;
	}

	this.show = function(){
		fill(255);
		image(this.img, this.x, this.y, this.w, this.h);
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