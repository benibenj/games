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
		document.getElementById("clicker").style.display = "none";
		closeAll("none");
	}
	else{
		closeAll("signup");
		document.getElementById("clicker").style.display = "block";
	}
	
}

let login = false;
function openlogin(){
	if (login) {
		document.getElementById("clicker").style.display = "none";
		closeAll("none");
	}
	else{
		closeAll("login");
		document.getElementById("clicker").style.display = "block";
	}
	
}


// Opens Profile
let profile = false;
function openprofile(){
	if (profile) {
		document.getElementById("clicker").style.display = "none";
		closeAll("none");
	}
	else{
		closeAll("profile");
		document.getElementById("clicker").style.display = "block";
	}
}



//By Clicking the Background Canvas, closing the form

function closeform(){
	document.getElementById("clicker").style.display = "none";
	closeAll("none");
}



function closeAll(id){
	document.getElementById("login").style.display = "none";
	document.getElementById("signup").style.display = "none";
	document.getElementById("profile").style.display = "none";
	document.getElementById("uid").style.display = "none";
	document.getElementById("mail").style.display = "none";
	document.getElementById("pwd").style.display = "none";
	document.getElementById("overview").style.display = "block";
	profile = false;
	login = false;
	signup = false;

	document.getElementById(id).style.display = "block";

	switch(id) {
  		case "profile": profile = true;
  		break;
  		case "login": login = true;
  		break;
  		case "signup": signup = true;
  		break;
  		default:;
	}
}


/* Settings */

function openuid(){
	document.getElementById("uid").style.display = "block";
	document.getElementById("overview").style.display = "none";
}

function openmail(){
	document.getElementById("mail").style.display = "block";
	document.getElementById("overview").style.display = "none";
}

function openpwd(){
	document.getElementById("pwd").style.display = "block";
	document.getElementById("overview").style.display = "none";
}