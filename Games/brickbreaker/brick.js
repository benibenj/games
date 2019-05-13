function Brick(i, j, w, color){
	this.w = w;
	this.h = 20;
	this.x = i*this.w;
	this.y = j*this.h;
	this.display = true;
	this.color = color;
	this.dropchance = 0.2;

	this.show = function(){
		//fill(rgb(0,255,255));
		if (this.display) {
			fill(this.color);
			rect(this.x, this.y, this.w, this.h);
		}
	}

	this.collbot = function(){
		if (ball.lasty > ball.y){
			if(ball.y - ball.size/2 <= this.y + this.h && ball.y - ball.size/2 >= this.y + this.h/2){
				if (ball.x + ball.size/2 >= this.x && ball.x - ball.size/2 <= this.x + this.w) {
					this.display = false;
					let rand = Math.random()*10;
					if (rand <= 10 * this.dropchance){
						upgrades.push(new Upgrade(this.x + this.w/2, this.y + this.h/2, chooseType()));
					}
					return true;
				}
			}
		}
	}

	this.colltop = function(){
		if (ball.lasty < ball.y){
			if(ball.y - ball.size/2 <= this.y + this.h/2 && ball.y - ball.size/2 >= this.y){
				if (ball.x + ball.size/2 >= this.x && ball.x - ball.size/2 <= this.x + this.w){
					this.display = false;
					let rand = Math.random()*10;
					if (rand <= 10 * this.dropchance){
						upgrades.push(new Upgrade(this.x + this.w/2, this.y + this.h/2, chooseType()));
					}
					return true;
				}
			}
		}
	}

	this.collleft = function(){
		if (ball.lastx < ball.x){
			if(ball.y - ball.size/2 <= this.y + this.h && ball.y + ball.size/2 >= this.y){
				if (ball.x + ball.size/2 >= this.x && ball.x - ball.size/2 <= this.x + this.w/2){
					this.display = false;
					let rand = Math.random()*10;
					if (rand <= 10 * this.dropchance){
						upgrades.push(new Upgrade(this.x + this.w/2, this.y + this.h/2, chooseType()));
					}
					return true;
				}
			}
		}
	}

	this.collright = function(){
		if (ball.lastx > ball.x){
			if(ball.y - ball.size/2 <= this.y + this.h && ball.y + ball.size/2 >= this.y){
				if (ball.x + ball.size/2 >= this.x + this.w/2 && ball.x - ball.size/2 <= this.x + this.w){
					this.display = false;
					let rand = Math.random()*10;
					if (rand <= 10 * this.dropchance){
						upgrades.push(new Upgrade(this.x + this.w/2, this.y + this.h/2, chooseType()));
					}
					return true;
				}
			}
		}
	}
}

function chooseType(){
	let pick = Math.floor(Math.random()*possibleupgrades.length);
	while(pick === possibleupgrades.length){
		pick = Math.floor(Math.random()*possibleupgrades.length);
	}
	return possibleupgrades[pick];
}