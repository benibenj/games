function Shrink(){
	this.time = Date.now();
	this.life = 10000;
	this.shrink = 0.7;
	slider.w = slider.w * this.shrink;

	this.update = function(){
		if (this.time + this.life < Date.now()) {
			slider.w = slider.w / this.shrink;
			return true;
		}
		return false;
	}
}