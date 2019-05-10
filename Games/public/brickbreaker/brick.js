function Brick(i, j, w, color){
	this.w = w;
	this.h = 20;
	this.x = i*this.w;
	this.y = j*this.h;
	this.display = true;
	this.color = color;

	this.show = function(){
		//fill(rgb(0,255,255));
		if (this.display) {
			rect(this.x, this.y, this.w, this.h);
		}
	}

	this.collbot = function(){
		if(ball.y - ball.size/2 <= this.y + this.h && ball.y - ball.size/2 <= this.y){
			if (ball.x + ball.size/2 >= this.x && ball.x - ball.size/2 <= this.x + this.w) {
				this.display = false;
				return true;
			}
		}
	}
}