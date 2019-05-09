var zVWc;
var gyIg;
var udLS;
var nHWo;
var Z0lR;
var gytl;
function setup(){
if(screen.width<400){
createCanvas(screen.width,screen.width*3/2);
}else{
createCanvas(400,600);
}
Z0lR=false;
gytl=false;
nHWo=0;
gyIg=new NyaD();
udLS=new Array();
Dur5=Date.now();
}
function draw(){
if(!gytl){
background(color("#b9e2f5"));
for(let eajF=udLS.length-1;
eajF>=0;
eajF--){
udLS[eajF].CfwT();
if(Z0lR){
udLS[eajF].pMus();
}
if(udLS[eajF].knjV(gyIg)){
ZC2B();
}
if(udLS[eajF].sjxg()){
udLS.splice(eajF,1);
nHWo+=1;
}
}
if(gyIg.MAX9()){
gytl=true;
}
if(Z0lR){
gyIg.pMus();
}
gyIg.CfwT();
textAlign(CENTER);
sUuh(color("#50b8e7"));
strokeWeight(0);
textSize(100);
text(nHWo,width*0.5,height*0.2);
if(frameCount%100==0&&Z0lR){
udLS.push(new hyw9());
}
}
else{
background(color("#dcf0fa"));
sUuh(color("#50b8e7"));
textAlign(CENTER);
strokeWeight(0);
textSize(50);
text("Your Score:",width*0.5,height*0.2);
textAlign(CENTER);
strokeWeight(0);
textSize(80);
text(nHWo,width*0.5,height*0.35);
sUuh(color("#fff"));
rect(width/4,height*0.5,width/2,70);
sUuh(color("#50b8e7"));
textAlign(CENTER);
strokeWeight(0);
textSize(30);
text("New Game",width*0.5,height*0.5+45);
}
}
function keyPressed(){
if(key===' '){
gyIg.Tp0e();
Z0lR=true;
}
if(keyCode===ENTER&&gytl){
setup();
}
}
var Dur5=0;
function mousePressed(){
if(!gytl&&Dur5+200<Date.now()){
if(mouseX>0&&mouseX<width&&mouseY>0&&mouseY<height){
Dur5=Date.now();
gyIg.Tp0e();
Z0lR=true;
}
}
else{
if(mouseX>width/4&&mouseX<width*3/4){
if(mouseY>height*0.5&&mouseY<height*0.5+70){
setup();
}
}
}
}
function preload(){
wO5N=loadImage('/img/bird.png');
GchL=loadImage('/img/Pipebottom.svg');
s4F1=loadImage('/img/Pipetop.svg');
}
function ZC2B(){
gytl=true;
QZtL(nHWo,"flappybird",function(){},function(){});
}
function QZtL(nHWo,game,action,error){
azh5("/scoreboard/request",function(l7BC){
if(l7BC!=="error"){
let XGae=JSON.parse(l7BC);
let d9CX=parseInt(nHWo)*parseInt(XGae.y)+parseInt(XGae.z);
uYfP("/scoreboard/submit",{
"key":XGae.x,
"value":d9CX,
"game":game
},function(yiIo){
action(yiIo);
});
}else{
error();
}
});
}
function uYfP(url,data,success){
var Lg7H=typeof data=='string'?data:Object.keys(data).map(
function(CJr8){return encodeURIComponent(CJr8)+'='+encodeURIComponent(data[CJr8])}
).join('&');
var WXxC=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
WXxC.open('POST',url);
WXxC.gcA6=function(){
if(WXxC.readyState>3&&WXxC.status==200){success(WXxC.responseText);
}
};
WXxC.setRequestHeader('X-Requested-With','XMLHttpRequest');
WXxC.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
WXxC.send(Lg7H);
return WXxC;
}
function azh5(url,success){
var WXxC=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
WXxC.open('GET',url);
WXxC.gcA6=function(){
if(WXxC.readyState>3&&WXxC.status==200)success(WXxC.responseText);
};
WXxC.setRequestHeader('X-Requested-With','XMLHttpRequest');
WXxC.send();
return WXxC;
}
function NyaD(){
this.y=height/2;
this.x=25;
this.Y95Y=56;
this.dnOY=40;
this.DcRf=0.04;
this.LwB9=0.5;
this.sLTF=-22;
this.DLFz=0;
this.CfwT=function(){
image(wO5N,this.x,this.y,this.Y95Y,this.dnOY);
}
this.pMus=function(){
this.LwB9+=this.DcRf;
this.DLFz+=this.LwB9;
this.DLFz*=0.9;
this.y+=this.DLFz;
if(this.y<0){
this.y=0;
this.DLFz=0;
}
}
this.Tp0e=function(){
this.DLFz+=this.sLTF;
this.LwB9=0.3;
}
this.MAX9=function(){
return(this.y>height);
}
}
function hyw9(){
this.iQpm=145;
this.RFDA=random(height/2)+height/4-this.iQpm/2;
this.vqoq=height-this.RFDA-this.iQpm;
this.x=width;
this.Y95Y=40;
this.MsnA=400;
this.RBvh=2;
this.CfwT=function(){
sUuh(255);
image(s4F1,this.x,this.RFDA-this.MsnA,this.Y95Y,this.MsnA);
image(GchL,this.x,height-this.vqoq,this.Y95Y,this.MsnA);
}
this.pMus=function(){
this.x-=this.RBvh;
}
this.knjV=function(){
if(gyIg.x+gyIg.Y95Y>this.x&&gyIg.x<this.x+this.Y95Y){
if(gyIg.y<this.RFDA||gyIg.y+gyIg.dnOY>height-this.vqoq){
return true;
}
}
return false;
}
this.sjxg=function(){
return(this.x<-this.Y95Y);
}
}
/*
var can;
var bird;
var pipes;
var score;
var started;
var gameover;

function setup(){
	if (screen.width < 400) {
		createCanvas(screen.width, screen.width * 3/2);
	}else{
		createCanvas(400, 600);
	}
	
	started = false;
	gameover = false;
	score = 0;
	bird = new Bird();
	pipes = new Array();
	lastclick = Date.now();
}

function draw(){

	if (!gameover) {
		background(color("#b9e2f5"));
		
		// Pipe checks
		for (let i = pipes.length - 1; i >= 0; i--) {
			pipes[i].show();
			if (started) {
				pipes[i].update();
			}


			if (pipes[i].hits(bird)) {
				gameOver();
			}

			// Remove pipe from array and increase score when pipe is off the screen
			if (pipes[i].offscreen()) {
				pipes.splice(i, 1);
				score += 1;
			}
		}

		if (bird.fallout()) {
			gameover = true;
		}

		// Bird drawings
		if (started) {
			bird.update();
		}
		bird.show();

		// Draw Score
		textAlign(CENTER);
		fill(color("#50b8e7"));
		strokeWeight(0);
		textSize(100);
		text(score, width*0.5, height*0.2);

		// Create Pipes all 100 Frames
		if (frameCount % 100 == 0 && started) {
			pipes.push(new Pipe());
		}
	}
	else{
		background(color("#dcf0fa"));
		fill(color("#50b8e7"));

		// Draw Text
		textAlign(CENTER);
		strokeWeight(0);
		textSize(50);
		text("Your Score:", width*0.5, height*0.2);

		// Draw Score
		textAlign(CENTER);
		strokeWeight(0);
		textSize(80);
		text(score, width*0.5, height*0.35);

		// Draw new Game option
		fill(color("#fff"));
		rect(width/4, height*0.5, width/2, 70);

		// Draw text for new Game
		fill(color("#50b8e7"));
		textAlign(CENTER);
		strokeWeight(0);
		textSize(30);
		text("New Game", width*0.5, height*0.5 + 45);		

	}
}

function keyPressed(){
	if (key === ' ') {
		bird.up();
		started = true;
	}
	if (keyCode === ENTER && gameover) {
		setup();
	}
}

var lastclick = 0;
function mousePressed(){
	if (!gameover && lastclick + 200 < Date.now()) {
		if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
			lastclick = Date.now();
			bird.up();
			started = true;
		}
	}
	else{
		if(mouseX > width/4 && mouseX < width*3/4){
			if (mouseY > height*0.5 && mouseY < height*0.5 + 70) {
				setup();
			}
		}
	}
}

function preload(){
  	birdimg = loadImage('/img/bird.png');
  	pipebottom = loadImage('/img/Pipebottom.svg');
  	pipetop = loadImage('/img/Pipetop.svg');
}

function gameOver(){
	gameover = true;
	// Submitting the Score
	submitScore(score, "flappybird", function(){}, function(){});
}





// Scoreboard Stuff

function submitScore(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = parseInt(score) * parseInt(object.y) + parseInt(object.z);
            postAjax("/scoreboard/submit", {
                "key": object.x,
                "value": value,
                "game": game
            }, function(submit){
                action(submit);
            });
        } else {
            error();
        }
    });
}

// From https://plainjs.com/javascript/ajax/send-ajax-get-and-post-requests-47/
function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}

function Bird(){
	this.y = height/2;
	this.x = 25;
	this.w = 56;
	this.h = 40;

	this.acceleration = 0.04;
	this.gravity = 0.5;
	this.lift = -22;
	this.velocity = 0;

	this.show = function(){
		image(birdimg, this.x, this.y, this.w, this.h);
	}

	this.update = function(){
		this.gravity += this.acceleration;
		this.velocity += this.gravity;
		this.velocity *= 0.9; 						// Air resistence
		this.y += this.velocity;

		if (this.y < 0) {
			this.y = 0;
			this.velocity = 0;
		}
	}

	this.up = function(){
		this.velocity += this.lift;
		this.gravity = 0.3;
	}

	this.fallout = function(){
		return (this.y > height);
	}
}


function Pipe(){
	this.pipespace = 145;
	this.top = random(height/2)+height/4-this.pipespace/2;
	this.bottom = height - this.top - this.pipespace;
	this.x = width;
	this.w = 40;
	this.pipeheight = 400;
	this.speed = 2;
	

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
*/