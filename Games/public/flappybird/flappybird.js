var bf4w;
var z9P0;
var bUUE;
var BHf5;
var ZAJz;
var y3go;
function setup(){
if(screen.width<400){
createCanvas(screen.width,screen.width*3/2);
}else{
createCanvas(400,600);
}
ZAJz=false;
y3go=false;
BHf5=0;
z9P0=new CJAx();
bUUE=new Array();
N0Wy=Date.now();
}
function draw(){
if(!y3go){
background(color("#b9e2f5"));
for(let jMbP=bUUE.length-1;
jMbP>=0;
jMbP--){
bUUE[jMbP].VmxC();
if(ZAJz){
bUUE[jMbP].TSQb();
}
if(bUUE[jMbP].JFBT(z9P0)){
OnvI();
}
if(bUUE[jMbP].puow()){
bUUE.splice(jMbP,1);
BHf5+=1;
}
}
if(z9P0.pY7X()){
y3go=true;
}
if(ZAJz){
z9P0.TSQb();
}
z9P0.VmxC();
textAlign(CENTER);
SdC8(color("#50b8e7"));
strokeWeight(0);
textSize(100);
text(BHf5,width*0.5,height*0.2);
if(frameCount%100==0&&ZAJz){
bUUE.push(new Wgnn());
}
}
else{
background(color("#dcf0fa"));
SdC8(color("#50b8e7"));
textAlign(CENTER);
strokeWeight(0);
textSize(50);
text("Your Score:",width*0.5,height*0.2);
textAlign(CENTER);
strokeWeight(0);
textSize(80);
text(BHf5,width*0.5,height*0.35);
SdC8(color("#fff"));
rect(width/4,height*0.5,width/2,70);
SdC8(color("#50b8e7"));
textAlign(CENTER);
strokeWeight(0);
textSize(30);
text("New Game",width*0.5,height*0.5+45);
}
}
function keyPressed(){
if(key===' '){
z9P0.U7X7();
ZAJz=true;
}
if(keyCode===ENTER&&y3go){
setup();
}
}
var N0Wy=0;
function mousePressed(){
if(!y3go&&N0Wy+200<Date.now()){
if(mouseX>0&&mouseX<width&&mouseY>0&&mouseY<height){
N0Wy=Date.now();
z9P0.U7X7();
ZAJz=true;
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
RkvA=loadImage('/img/z9P0.png');
ddQ2=loadImage('/img/Pipebottom.svg');
fjV0=loadImage('/img/Pipetop.svg');
}
function OnvI(){
y3go=true;
UV0o(BHf5,"flappybird",function(){},function(){});
}
function UV0o(BHf5,game,action,error){
t3wb("/scoreboard/request",function(yDat){
if(yDat!=="error"){
let MLMA=JSON.parse(yDat);
let mjWF=parseInt(BHf5)*parseInt(MLMA.y)+parseInt(MLMA.z);
toKW("/scoreboard/submit",{
"key":MLMA.x,
"value":mjWF,
"game":game
},function(R09A){
action(R09A);
});
}else{
error();
}
});
}
function toKW(url,data,success){
var UNpl=typeof data=='string'?data:Object.keys(data).map(
function(D87H){return encodeURIComponent(D87H)+'='+encodeURIComponent(data[D87H])}
).join('&');
var oQQJ=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
oQQJ.open('POST',url);
oQQJ.HeOm=function(){
if(oQQJ.readyState>3&&oQQJ.status==200){success(oQQJ.responseText);
}
};
oQQJ.setRequestHeader('X-Requested-With','XMLHttpRequest');
oQQJ.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
oQQJ.send(UNpl);
return oQQJ;
}
function t3wb(url,success){
var oQQJ=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
oQQJ.open('GET',url);
oQQJ.HeOm=function(){
if(oQQJ.readyState>3&&oQQJ.status==200)success(oQQJ.responseText);
};
oQQJ.setRequestHeader('X-Requested-With','XMLHttpRequest');
oQQJ.send();
return oQQJ;
}
function CJAx(){
this.y=height/2;
this.x=25;
this.pbPb=56;
this.sbtI=40;
this.XFlP=0.04;
this.tTcm=0.5;
this.cE6F=-22;
this.n7DV=0;
this.VmxC=function(){
pEuJ(RkvA,this.x,this.y,this.pbPb,this.sbtI);
}
this.TSQb=function(){
this.tTcm+=this.XFlP;
this.n7DV+=this.tTcm;
this.n7DV*=0.9;
this.y+=this.n7DV;
if(this.y<0){
this.y=0;
this.n7DV=0;
}
}
this.U7X7=function(){
this.n7DV+=this.cE6F;
this.tTcm=0.3;
}
this.pY7X=function(){
return(this.y>height);
}
}
function Wgnn(){
this.Q6he=145;
this.WTnt=random(height/2)+height/4-this.Q6he/2;
this.qZgq=height-this.WTnt-this.Q6he;
this.x=width;
this.pbPb=40;
this.Hcpe=400;
this.Ypk3=2;
this.VmxC=function(){
SdC8(255);
pEuJ(fjV0,this.x,this.WTnt-this.Hcpe,this.pbPb,this.Hcpe);
pEuJ(ddQ2,this.x,height-this.qZgq,this.pbPb,this.Hcpe);
}
this.TSQb=function(){
this.x-=this.Ypk3;
}
this.JFBT=function(){
if(z9P0.x+z9P0.pbPb>this.x&&z9P0.x<this.x+this.pbPb){
if(z9P0.y<this.WTnt||z9P0.y+z9P0.sbtI>height-this.qZgq){
return true;
}
}
return false;
}
this.puow=function(){
return(this.x<-this.pbPb);
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