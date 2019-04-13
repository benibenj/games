var open = true;
function controllNav(){
	var nav = document.getElementById('nav');
	nav.style.transition = "all .4s ease-in-out";
	if (open) {
		nav.style.transform = "translate(-100%)";
		open = false;
	}
	else{
		nav.style.transform = "translate(0%)";
		open = true;
	}
}

function closeNav(){
	if (open) {
		nav.style.transform = "translate(-100%)";
	}
	open = false;
}