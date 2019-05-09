var rAio;
var USwm;
var VMsu;
var vJQL;
var wKsO;
var sApJ;
function setup(){
if(screen.width<400){
createCanvas(screen.width,screen.width*3/2);
}else{
createCanvas(400,600);
}
wKsO=false;
sApJ=false;
vJQL=0;
USwm=new lhVO();
VMsu=new Array();
WGln=Date.now();
}
function draw(){
if(!sApJ){
background(color("#b9e2f5"));
for(let tT71=VMsu.length-1;
tT71>=0;
tT71--){
VMsu[tT71].kMAB();
if(wKsO){
VMsu[tT71].Ckao();
}
if(VMsu[tT71].lkZ6(USwm)){
xd6S();
}
if(VMsu[tT71].qt9Y()){
VMsu.splice(tT71,1);
vJQL+=1;
}
}
if(USwm.FLAC()){
sApJ=true;
}
if(wKsO){
USwm.Ckao();
}
USwm.kMAB();
textAlign(CENTER);
Vv5R(color("#50b8e7"));
strokeWeight(0);
textSize(100);
text(vJQL,width*0.5,height*0.2);
if(frameCount%100==0&&wKsO){
VMsu.push(new GWSD());
}
}
else{
background(color("#dcf0fa"));
Vv5R(color("#50b8e7"));
textAlign(CENTER);
strokeWeight(0);
textSize(50);
text("Your Score:",width*0.5,height*0.2);
textAlign(CENTER);
strokeWeight(0);
textSize(80);
text(vJQL,width*0.5,height*0.35);
Vv5R(color("#fff"));
rect(width/4,height*0.5,width/2,70);
Vv5R(color("#50b8e7"));
textAlign(CENTER);
strokeWeight(0);
textSize(30);
text("New Game",width*0.5,height*0.5+45);
}
}
function keyPressed(){
if(key===' '){
USwm.YvXi();
wKsO=true;
}
if(keyCode===ENTER&&sApJ){
setup();
}
}
var WGln=0;
function mousePressed(){
if(!sApJ&&WGln+200<Date.now()){
if(mouseX>0&&mouseX<width&&mouseY>0&&mouseY<height){
WGln=Date.now();
USwm.YvXi();
wKsO=true;
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
ZAwx=loadImage('/img/bird.png');
hUZp=loadImage('/img/Pipebottom.svg');
cYWY=loadImage('/img/Pipetop.svg');
}
function xd6S(){
sApJ=true;
Xrt8(vJQL,"flappybird",function(){},function(){});
}
function Xrt8(vJQL,game,action,error){
ASnz("/scoreboard/request",function(O242){
if(O242!=="error"){
let pOPo=JSON.parse(O242);
let LVar=parseInt(vJQL)*parseInt(pOPo.y)+parseInt(pOPo.z);
nsfX("/scoreboard/submit",{
"key":pOPo.x,
"value":LVar,
"game":game
},function(PPme){
action(PPme);
});
}else{
error();
}
});
}
function nsfX(url,data,success){
var DMI4=typeof data=='string'?data:Object.keys(data).map(
function(WhMb){return encodeURIComponent(WhMb)+'='+encodeURIComponent(data[WhMb])}
).join('&');
var QLuU=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
QLuU.open('POST',url);
QLuU.j67Z=function(){
if(QLuU.readyState>3&&QLuU.status==200){success(QLuU.responseText);
}
};
QLuU.setRequestHeader('X-Requested-With','XMLHttpRequest');
QLuU.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
QLuU.send(DMI4);
return QLuU;
}
function ASnz(url,success){
var QLuU=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
QLuU.open('GET',url);
QLuU.j67Z=function(){
if(QLuU.readyState>3&&QLuU.status==200)success(QLuU.responseText);
};
QLuU.setRequestHeader('X-Requested-With','XMLHttpRequest');
QLuU.send();
return QLuU;
}
function lhVO(){
this.y=height/2;
this.x=25;
this.qWdk=56;
this.cnJB=40;
this.bnMU=0.04;
this.sqWU=0.5;
this.BdHi=-22;
this.Boor=0;
this.kMAB=function(){
vrOC(ZAwx,this.x,this.y,this.qWdk,this.cnJB);
}
this.Ckao=function(){
this.sqWU+=this.bnMU;
this.Boor+=this.sqWU;
this.Boor*=0.9;
this.y+=this.Boor;
if(this.y<0){
this.y=0;
this.Boor=0;
}
}
this.YvXi=function(){
this.Boor+=this.BdHi;
this.sqWU=0.3;
}
this.FLAC=function(){
return(this.y>height);
}
}
function GWSD(){
this.mC9C=145;
this.Zaxd=random(height/2)+height/4-this.mC9C/2;
this.UncK=height-this.Zaxd-this.mC9C;
this.x=width;
this.qWdk=40;
this.Qwnp=400;
this.Kx0n=2;
this.kMAB=function(){
Vv5R(255);
vrOC(cYWY,this.x,this.Zaxd-this.Qwnp,this.qWdk,this.Qwnp);
vrOC(hUZp,this.x,height-this.UncK,this.qWdk,this.Qwnp);
}
this.Ckao=function(){
this.x-=this.Kx0n;
}
this.lkZ6=function(){
if(USwm.x+USwm.qWdk>this.x&&USwm.x<this.x+this.qWdk){
if(USwm.y<this.Zaxd||USwm.y+USwm.cnJB>height-this.UncK){
return true;
}
}
return false;
}
this.qt9Y=function(){
return(this.x<-this.qWdk);
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