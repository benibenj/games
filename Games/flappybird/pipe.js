
function Pipe(){
	this.pipespace = 145;
	this.top = random(height/2)+height/4-this.pipespace/2;
	this.bottom = height - this.top - this.pipespace;
	this.x = width;
	this.w = 40;
	this.pipeheight = 400;
	this.speed = 4;
	

	this.show = function(){
		fill(255);
		//rect(this.x, 0, this.w, this.top);
		//rect(this.x, height-this.bottom, this.w, this.bottom);
		image(pipetop, this.x, this.top-this.pipeheight, this.w, this.pipeheight);
		image(pipebottom, this.x, height-this.bottom, this.w, this.pipeheight);
	}

	this.update = function(){
		this.x -= this.speed;
	}

	this.hits = function(){
		if (bird.x + bird.w > this.x && bird.x < this.x + this.w) {
			if (bird.y < this.top || bird.y + bird.h> height - this.bottom) {
				return true;
			}
		}
		return false;
	}

	this.offscreen = function(){
		return (this.x < -this.w);
	}
	
}