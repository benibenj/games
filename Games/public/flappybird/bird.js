function Bird(){
	this.y = height/2;
	this.x = 25;
	this.size = 50;

	this.gravity = 0.7;
	this.lift = -15;
	this.velocity = 0;

	this.show = function(){
		image(birdimg, this.x, this.y, this.size, this.size);
	}

	this.update = function(){
		this.velocity += this.gravity;
		this.velocity *= 0.9; 						// Air resistence
		this.y += this.velocity;

		if (this.y > height - this.size) {
			this.y = height - this.size;
			this.velocity = 0;
		}

		if (this.y < 0) {
			this.y = 0;
			this.velocity = 0;
		}
	}

	this.up = function(){
		this.velocity += this.lift;
	}

}