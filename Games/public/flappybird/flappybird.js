var TBfV;
var PqMx;
var jiro;
var HGwp;
var Z6G4;
var jaC5;
var qtfq=0.5567657;
function wA4F(){
}
function setup(){
if(screen.width<400){
createCanvas(screen.width,screen.width*3/2);
}else{
createCanvas(400,600);
}
Z6G4=false;
function YOo0(as1P,PPwY,ydM7){
var tPo4=2054589254;
function T6wl(t4sX){
}function I3lK(GLPD){
}}var nS9X=true;
function DoWT(i9IU){
}var HwaL=ydM7+nS9X;
as1P=nS9X+PPwY;
function Bk04(){
var GZYF=as1P+as1P;
GZYF=i9IU+as1P;
function sq3a(zSK4,aJZL){
}}
jaC5=false;
HGwp=0;
PqMx=new vaHB();
jiro=new Array();
aoyU=Date.now();
}
function draw(){
if(!jaC5){
background(color("#b9e2f5"));
for(let a6eH=jiro.length-1;
a6eH>=0;
a6eH--){
jiro[a6eH].AFUm();
if(Z6G4){
jiro[a6eH].dMuE();
var qnZK=qnZK+qnZK;
qnZK=qnZK+qnZK;
function lqDG(QFnp){
}
}
if(jiro[a6eH].dKXa(PqMx)){
DE2Q();
}
if(jiro[a6eH].r9WF()){
jiro.splice(a6eH,1);
HGwp+=1;
function zgBX(a5jv,NuhT){
}function Iso1(cGTJ,XIc2){
function xBHp(){
}}
}
}
if(PqMx.oti4()){
jaC5=true;
}
if(Z6G4){
PqMx.dMuE();
}
PqMx.AFUm();
function ue0T(){
}
textAlign(CENTER);
var gA3l=946858337;
function dZGc(){
}
fill(color("#50b8e7"));
strokeWeight(0);
textSize(100);
text(HGwp,width*0.5,height*0.2);
if(frameCount%100==0&&Z6G4){
jiro.push(new Jwny());
function RhMB(){
}var CdG3=CdG3+CdG3;
CdG3=CdG3+CdG3;
function ueoN(tN0b,CW40){
function nejv(y5F4){
}var p5K7=true;
function uWrx(fCUf){
}}if(tN0b==tN0b){
function szb2(lFHa){
}}
}
}
else{
background(color("#dcf0fa"));
fill(color("#50b8e7"));
gqR8=gqR8+gqR8;
function UR1s(wtAF){
}
textAlign(CENTER);
strokeWeight(0);
textSize(50);
text("Your Score:",width*0.5,height*0.2);
textAlign(CENTER);
strokeWeight(0);
function NQMz(){
}function pkbQ(QLCr,NmY8){
if(NmY8<=QLCr){
function UsSY(mbaU,qLBk,Yqcd){
}}var Nakq=QLCr;
var Nakq=Nakq+QLCr;
NmY8=NmY8+Nakq;
function tciD(hliw){
}}var HKO6=NmY8;
var HKO6=NmY8+QLCr;
HKO6=QLCr+HKO6;
function rTA0(){
}function N9aH(){
function tGdC(YdAE){
}}
textSize(80);
var cgps=cgps;
var cgps=cgps+cgps;
cgps=cgps+cgps;
function zSdW(IEPa){
}
text(HGwp,width*0.5,height*0.35);
jv1R=jv1R+jv1R;
function FzfA(M5JM){
function VXzu(faYN){
var lhlY=false;
function KJ9w(AH4W,ljfC,Iqvt){
}function Obky(){
}}}
fill(color("#fff"));
rect(width/4,height*0.5,width/2,70);
fill(color("#50b8e7"));
textAlign(CENTER);
strokeWeight(0);
textSize(30);
GWCA=GWCA+GWCA;
function SP6u(YsMh){
function EYJj(EcmT){
if(GWCA!=YsMh){
}}}
text("New Game",width*0.5,height*0.5+45);
function cxdO(){
}
}
}
function keyPressed(){
if(key===' '){
PqMx.bYAi();
Z6G4=true;
}
if(keyCode===ENTER&&jaC5){
setup();
}
}
var aoyU=0;
function mousePressed(){
if(!jaC5&&aoyU+200<Date.now()){
if(mouseX>0&&mouseX<width&&mouseY>0&&mouseY<height){
aoyU=Date.now();
var Ynso=1176300308;
function busd(){
}
PqMx.bYAi();
Z6G4=true;
var zae0=0.053878784;
function oPrP(){
}function kF89(){
function Pqw2(){
}function hDrV(GSR3){
}if(GSR3==GSR3){
zae0=txDC+zae0;
function cpmt(AnpD){
}}if(GSR3<=GSR3){
}}
}
}
else{
if(mouseX>width/4&&mouseX<width*3/4){
if(mouseY>height*0.5&&mouseY<height*0.5+70){
setup();
var uPdg=0.9401291;
function VhWK(){
function PKzm(ptz5,ikp6,Uquy,GpP4){
}}
}
}
}
}
function preload(){
Jech=loadImage('/img/bird.png');
LhgS=LhgS+LhgS;
function TiV0(JqGy){
if(JqGy<LhgS){
var zSMw=true;
function Bb5D(SYTv,uLDf){
}}}
rc65=loadImage('/img/Pipebottom.svg');
XECC=loadImage('/img/Pipetop.svg');
}
function DE2Q(){
jaC5=true;
SISb(HGwp,"flappybird",function(){},function(){});
}
function SISb(HGwp,game,action,error){
Lrne("/scoreboard/request",function(request){
if(request!=="error"){
let pIik=JSON.parse(request);
function HJFj(zIqr,sSUY){
}
let ecVo=parseInt(HGwp)*parseInt(pIik.y)+parseInt(pIik.z);
function QdxK(){
}
ezH3("/scoreboard/submit",{
"key":pIik.x,
"value":ecVo,
"game":game
},function(submit){
action(submit);
});
var wt4J=wt4J+wt4J;
wt4J=wt4J+wt4J;
function KY7j(){
}function nu1l(){
}
}else{
error();
}
});
}
function ezH3(url,data,success){
var qzTs=typeof data=='string'?data:Object.keys(data).map(
function(k){return encodeURIComponent(k)+'='+encodeURIComponent(data[k])}
).join('&');
var wq82=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
wq82.open('POST',url);
wq82.uscI=function(){
if(wq82.readyState>3&&wq82.status==200){success(wq82.responseText);
}
};
wq82.setRequestHeader('X-Requested-With','XMLHttpRequest');
function qUn3(gUEB,diyH,IvXs){
function h6gG(wQ4a){
}}
wq82.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
var FxDI=false;
function It18(Ds37){
}if(Ds37<=FxDI){
if(FxDI!=FxDI){
}}
wq82.send(qzTs);
return wq82;
function MkKY(){
}
}
function Lrne(url,success){
var wq82=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
wq82.open('GET',url);
wq82.uscI=function(){
if(wq82.readyState>3&&wq82.status==200)success(wq82.responseText);
};
wq82.setRequestHeader('X-Requested-With','XMLHttpRequest');
wq82.send();
return wq82;
}
function vaHB(){
this.y=height/2;
kRAp=kRAp+kRAp;
function iRz9(N2bv){
function bB9y(IpXE){
}function lXgU(S4EJ,UM4b,MRVy,evyw){
}}
this.x=25;
this.wdkr=56;
this.Aabq=40;
this.GcZF=0.04;
this.UUld=0.5;
this.pW8Z=-22;
this.X1GQ=0;
this.AFUm=function(){
image(Jech,this.x,this.y,this.wdkr,this.Aabq);
function gVdb(ZQ5C,crAR){
}
}
this.dMuE=function(){
this.UUld+=this.GcZF;
this.X1GQ+=this.UUld;
this.X1GQ*=0.9;
this.y+=this.X1GQ;
if(this.y<0){
this.y=0;
this.X1GQ=0;
var p5xL=p5xL+p5xL;
p5xL=p5xL+p5xL;
function pQGp(){
}if(p5xL<=p5xL){
var XwWU=XwWU;
var XwWU=XwWU+XwWU;
XwWU=p5xL+XwWU;
function o5Qm(){
}var sMrw=sMrw+XwWU;
sMrw=XwWU+p5xL;
function Xfqq(){
}}function cRGS(Raio,lNwr){
}p5xL=AbYj+Raio;
function zoFf(){
p5xL=AbYj+lNwr;
function gfMO(){
}}
}
}
this.bYAi=function(){
this.X1GQ+=this.pW8Z;
this.UUld=0.3;
}
this.oti4=function(){
return(this.y>height);
function ArKX(){
var cTXy=-1448351385;
function jYNd(){
}cTXy=cTXy+omdG;
function gb9W(){
}if(cTXy<=omdG){
omdG=SNUn+omdG;
function CKJq(){
var zNMu=false;
function Mxzv(){
}var WBLj=cTXy;
var WBLj=zNMu+WBLj;
WBLj=cTXy+cTXy;
function uhSa(QFZE,x7Xm){
}}}function tbFa(ZFRJ,XwUI,ediR){
}}
}
}
function Jwny(){
this.Wc01=145;
this.twvU=random(height/2)+height/4-this.Wc01/2;
this.MijG=height-this.twvU-this.Wc01;
function RIQ5(HEvP,rtRz,IWxQ){
function PCs9(GnKU){
function YBvu(){
}function ZDlE(EErU,v3nC){
var xNSv=false;
function SSP9(S88q,NV9f){
}}}function LEYt(EV0m){
var pyv9=HEvP;
var pyv9=HEvP+EV0m;
EV0m=EV0m+GnKU;
function OD2o(jpVL,MQqy,SlRx,WaPj,hX0g,RQ93,dCAm){
}}}
this.x=width;
this.wdkr=40;
this.Wbw2=400;
function yVFZ(PFrN,XJSU,RNkG,aIOP,Kp2f){
if(PFrN>=aIOP){
}if(aIOP>Kp2f){
}var Y6HQ=true;
function Rt5T(wlRV){
if(Y6HQ!=XJSU){
}function HDPq(){
}}function dorv(){
}}var NZHp=0.07104254;
function Bzzk(){
var QTj4=RNkG+Kp2f;
QTj4=aIOP+XJSU;
function jm74(){
}}
this.wPZF=2;
var B7PB=-962405802;
function pJc8(){
var p5HK=0.36580127;
function VaYs(jPJJ){
function Sgiy(CZds){
}}}var b8jr=B7PB;
var b8jr=B7PB+B7PB;
b8jr=b8jr+b8jr;
function IOiE(){
}
this.AFUm=function(){
fill(255);
image(XECC,this.x,this.twvU-this.Wbw2,this.wdkr,this.Wbw2);
image(rc65,this.x,height-this.MijG,this.wdkr,this.Wbw2);
}
this.dMuE=function(){
this.x-=this.wPZF;
}
this.dKXa=function(){
if(PqMx.x+PqMx.wdkr>this.x&&PqMx.x<this.x+this.wdkr){
if(PqMx.y<this.twvU||PqMx.y+PqMx.Aabq>height-this.MijG){
return true;
}
}
return false;
}
this.r9WF=function(){
return(this.x<-this.wdkr);
}
}
