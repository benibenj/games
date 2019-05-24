function Player(){
	this.size = 60;
	this.h = this.size;
	this.w = 30;
	this.ylimit = height-30-this.size;
	this.x = 40;
	this.y = this.ylimit;

	// gravity stuff
	this.gravity = 0.8;
	this.lift = -30;
	this.velocity = 0;

	// sliding stuff
	this.slideStart = 0;
	this.sliding = false;
	this.slideDuration = 1000;
	this.slidingSize = 30;

	this.update = function(){
		if (!this.sliding) {
			// Jumping or running
			this.velocity += this.gravity;
			this.velocity *= 0.9; 						// Air resistence
			this.y += this.velocity;

			if (this.y > this.ylimit) {
				this.y = this.ylimit;
				this.velocity = 0;
			}
		}
		else{ 
			// Sliding
			if (this.slideStart + this.slideDuration >= Date.now()) {
				this.y = this.ylimit + (this.size - this.slidingSize);
				this.h = this.slidingSize; 
			}
			else{
				this.y = this.ylimit;
				this.h = this.size; 
				this.sliding = false;
			}
		}
	}

	this.show = function(){
		fill(255);
		rect(this.x, this.y, this.w, this.h);
	}

	this.jump = function(){
		if (this.y >= this.ylimit-5 && !this.sliding) {
			this.velocity += this.lift;
		}
	}

	this.slide = function(){
		if (this.y >= this.ylimit-5 && !this.sliding) {
			this.sliding = true;
			this.slideStart = Date.now();
		}
	}
}