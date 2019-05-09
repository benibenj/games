var Hpi7;
var DEnr;
var TVuH;
var lkQx;
var UB8d;
var efQA;
function setup(){
if(screen.width<400){
createCanvas(screen.width,screen.width*3/2);
}else{
createCanvas(400,600);
}
UB8d=false;
efQA=false;
lkQx=0;
DEnr=new RvjQ();
TVuH=new Array();
kP6g=Date.now();
}
function draw(){
if(!efQA){
background(color("#b9e2f5"));
for(let JiW9=TVuH.length-1;
JiW9>=0;
JiW9--){
TVuH[JiW9].FDEy();
if(UB8d){
TVuH[JiW9].Lh5u();
}
if(TVuH[JiW9].sZOe(DEnr)){
iNKL();
}
if(TVuH[JiW9].XUJc()){
TVuH.splice(JiW9,1);
lkQx+=1;
}
}
if(DEnr.ZfBj()){
efQA=true;
}
if(UB8d){
DEnr.Lh5u();
}
DEnr.FDEy();
textAlign(CENTER);
fill(color("#50b8e7"));
strokeWeight(0);
textSize(100);
text(lkQx,width*0.5,height*0.2);
if(frameCount%100==0&&UB8d){
TVuH.push(new JEc9());
}
}
else{
background(color("#dcf0fa"));
fill(color("#50b8e7"));
textAlign(CENTER);
strokeWeight(0);
textSize(50);
text("Your Score:",width*0.5,height*0.2);
textAlign(CENTER);
strokeWeight(0);
textSize(80);
text(lkQx,width*0.5,height*0.35);
fill(color("#fff"));
rect(width/4,height*0.5,width/2,70);
fill(color("#50b8e7"));
textAlign(CENTER);
strokeWeight(0);
textSize(30);
text("New Game",width*0.5,height*0.5+45);
}
}
function keyPressed(){
if(key===' '){
DEnr.Tmr5();
UB8d=true;
}
if(keyCode===ENTER&&efQA){
setup();
}
}
var kP6g=0;
function mousePressed(){
if(!efQA&&kP6g+200<Date.now()){
if(mouseX>0&&mouseX<width&&mouseY>0&&mouseY<height){
kP6g=Date.now();
DEnr.Tmr5();
UB8d=true;
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
ZSGK=loadImage('/img/bird.png');
aKIh=loadImage('/img/Pipebottom.svg');
tC4T=loadImage('/img/Pipetop.svg');
}
function iNKL(){
efQA=true;
Y0Wa(lkQx,"flappybird",function(){},function(){});
}
function Y0Wa(lkQx,game,action,error){
W2XE("/scoreboard/request",function(request){
if(request!=="error"){
let Cznc=JSON.parse(request);
let kCKw=parseInt(lkQx)*parseInt(Cznc.y)+parseInt(Cznc.z);
y0Ts("/scoreboard/submit",{
"key":Cznc.x,
"value":kCKw,
"game":game
},function(submit){
action(submit);
});
}else{
error();
}
});
}
function y0Ts(url,data,success){
var g586=typeof data=='string'?data:Object.keys(data).map(
function(k){return encodeURIComponent(k)+'='+encodeURIComponent(data[k])}
).join('&');
var A0sc=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
A0sc.open('POST',url);
A0sc.rCpF=function(){
if(A0sc.readyState>3&&A0sc.status==200){success(A0sc.responseText);
}
};
A0sc.setRequestHeader('X-Requested-With','XMLHttpRequest');
A0sc.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
A0sc.send(g586);
return A0sc;
}
function W2XE(url,success){
var A0sc=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
A0sc.open('GET',url);
A0sc.rCpF=function(){
if(A0sc.readyState>3&&A0sc.status==200)success(A0sc.responseText);
};
A0sc.setRequestHeader('X-Requested-With','XMLHttpRequest');
A0sc.send();
return A0sc;
}
function RvjQ(){
this.y=height/2;
this.x=25;
this.abNb=56;
this.Ne5a=40;
this.BJTw=0.04;
this.D7KR=0.5;
this.SpJG=-22;
this.m94w=0;
this.FDEy=function(){
image(ZSGK,this.x,this.y,this.abNb,this.Ne5a);
}
this.Lh5u=function(){
this.D7KR+=this.BJTw;
this.m94w+=this.D7KR;
this.m94w*=0.9;
this.y+=this.m94w;
if(this.y<0){
this.y=0;
this.m94w=0;
}
}
this.Tmr5=function(){
this.m94w+=this.SpJG;
this.D7KR=0.3;
}
this.ZfBj=function(){
return(this.y>height);
}
}
function JEc9(){
this.Wujg=145;
this.RsBr=random(height/2)+height/4-this.Wujg/2;
this.glBK=height-this.RsBr-this.Wujg;
this.x=width;
this.abNb=40;
this.gMs7=400;
this.qyXn=2;
this.FDEy=function(){
fill(255);
image(tC4T,this.x,this.RsBr-this.gMs7,this.abNb,this.gMs7);
image(aKIh,this.x,height-this.glBK,this.abNb,this.gMs7);
}
this.Lh5u=function(){
this.x-=this.qyXn;
}
this.sZOe=function(){
if(DEnr.x+DEnr.abNb>this.x&&DEnr.x<this.x+this.abNb){
if(DEnr.y<this.RsBr||DEnr.y+DEnr.Ne5a>height-this.glBK){
return true;
}
}
return false;
}
this.XUJc=function(){
return(this.x<-this.abNb);
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