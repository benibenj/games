function Expand(){
	this.time = Date.now();
	this.life = 10000;
	this.expand = 1.3;
	slider.w = slider.w * this.expand;

	this.update = function(){
		if (this.time + this.life < Date.now()) {
			slider.w = slider.w / this.expand;
			return true;
		}
		return false;
	}
}