// Nav Controll

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


// Forms

let signup = false;
function opensignup(){
	if (signup) {
		document.getElementById("signup").style.display = "none";
		document.getElementById("clicker").style.display = "none";
		signup = false;
	}
	else{
		document.getElementById("signup").style.display = "block";
		signup = true;
		document.getElementById("clicker").style.display = "block";
		document.getElementById("login").style.display = "none";
		login = false;
	}
	
}

let login = false;
function openlogin(){
	if (login) {
		document.getElementById("login").style.display = "none";
		document.getElementById("clicker").style.display = "none";
		login = false;
	}
	else{
		document.getElementById("login").style.display = "block";
		login = true;
		document.getElementById("clicker").style.display = "block";
		document.getElementById("signup").style.display = "none";
		signup = false;
	}
	
}


//By Clicking the Background Canvas, closing the form

function closeform(){
	document.getElementById("clicker").style.display = "none";
	document.getElementById("signup").style.display = "none";
	document.getElementById("login").style.display = "none";
	signup = false;
	login = false;
}