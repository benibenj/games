var a7JV;
var iump;
var DO15;
var xWz7;
var iozQ;
var sKNn;
var fm03=new Array();
var IL04;
var CGiA=8;
var HcYs=4;
var C7U1;
var Zvc5=-700187288;
function J35Q(VUPl){
if(VUPl>=VUPl){
}
}
var mcet;
var round;
var Rutu;
var uIP9;
function setup(){
if(screen.width>=600){
createCanvas(600,600);
}
else{
createCanvas(screen.width,screen.width);
}
IL04=0;
function SgfW(){
}
a7JV=new DGqg();
iump=new s5Bu();
DO15=Z7Va(CGiA,HcYs);
xWz7=new Array();
function TZOQ(v7Fn){
}
function l5uM(){
}
sKNn=new Array();
var xFqj=814299919;
function FnJ3(){
xFqj=xFqj+xFqj;
function iEjp(OFyl,bEMj,Jzjn){
function lz4a(){
if(OFyl<=Jzjn){
}
var IfY8=xFqj;
function efvi(){
}
}
}
if(xFqj!=xFqj){
}
var Exwe=xFqj;
function gLBQ(){
if(xFqj!==xFqj){
}
var C5EW=Exwe+Exwe;
function VibS(){
}
}
var L3dx=0.4589225;
function E3Hg(FT8o){
}
}
function iJIQ(OZEc){
}
mcet=0;
round=0;
Rutu=0;
uIP9=color("#0041d4");
iozQ=[color("#a6206a"),color("#ec1c4b"),color("#f16a43"),color("#f7d969"),color("#2f9395")];
function Ul1F(){
}
C7U1=width/CGiA;
var WlrU=1161186980;
function qz75(n1oc){
}
for(let Y6p6=0;
Y6p6<CGiA;
Y6p6++){
for(let y7Id=0;
y7Id<HcYs;
y7Id++){
DO15[Y6p6][y7Id]=new ZvBV(Y6p6,y7Id,C7U1,iozQ[Math.round(Math.random()*(iozQ.length-1))]);
}
}
}
function xNvj(){
a7JV=new DGqg();
iump=new s5Bu();
function qt9U(){
function hb5q(){
function MxPl(eZVd,m2Pt){
}
var WN3q=-12799723;
function eu2G(){
}
function GXVy(){
}
}
}
var WyUy=396;
function zMsr(hF8x){
}
iump.TNgQ+=round;
HcYs+=round;
console.log(round);
DO15=Z7Va(CGiA,HcYs);
xWz7=new Array();
var D6OZ=true;
function gF1j(g0kN,N7wG,mEW9){
}
sKNn=new Array();
for(let Y6p6=0;
Y6p6<CGiA;
Y6p6++){
for(let y7Id=0;
y7Id<HcYs;
y7Id++){
DO15[Y6p6][y7Id]=new ZvBV(Y6p6,y7Id,C7U1,iozQ[Math.round(Math.random()*(iozQ.length-1))]);
}
}
}
function draw(){
if(IL04===0){
background(0);
a7JV.OQuC();
function mRrY(nklD){
}
a7JV.dwrF();
for(let Y6p6=CGiA-1;
Y6p6>=0;
Y6p6--){
for(let y7Id=HcYs-1;
y7Id>=0;
y7Id--){
if(DO15[Y6p6][y7Id].TF68&&DO15[Y6p6][y7Id].HCdk()){
iump.Ticf=Math.abs(iump.Ticf);
mcet++;
var za3B=false;
function Gfbf(){
}
}
else if(DO15[Y6p6][y7Id].TF68&&DO15[Y6p6][y7Id].sRhE()){
iump.hIky=-Math.abs(iump.hIky);
mcet++;
function QFyI(){
}
}
else if(DO15[Y6p6][y7Id].TF68&&DO15[Y6p6][y7Id].vzQ4()){
iump.hIky=Math.abs(iump.hIky);
mcet++;
function mO6W(iTE2,bOhm){
}
}
else if(DO15[Y6p6][y7Id].TF68&&DO15[Y6p6][y7Id].SJ6E()){
iump.Ticf=-Math.abs(iump.Ticf);
mcet++;
}
DO15[Y6p6][y7Id].dwrF();
function jBIW(YA1w,H4fV,n8sJ){
}
}
}
for(let Y6p6=xWz7.length-1;
Y6p6>=0;
Y6p6--){
xWz7[Y6p6].OQuC();
let mLx8=xWz7[Y6p6].mLx8();
function QB7J(){
}
if(mLx8!=null){
xWz7.splice(Y6p6,1);
switch(mLx8){
case xviV:sKNn.push(new ImLM());
break;
case RDqo:sKNn.push(new wY3e());
break;
case n1d5:sKNn.push(new GK09());
function vlsE(){
}
break;
default:
}
}
else{
xWz7[Y6p6].dwrF();
}
}
for(let Y6p6=sKNn.length-1;
Y6p6>=0;
Y6p6--){
if(sKNn[Y6p6].OQuC()){
sKNn.splice(Y6p6,1);
}
}
iump.xOsP();
function a0kn(){
}
iump.OQuC();
iump.dwrF();
function D1Yr(){
}
textAlign(CENTER);
fill(color("#fff"));
strokeWeight(0);
function MI0s(ylA1,O0Gp){
function eNVj(EW8j,g3ey){
if(EW8j!=ylA1){
}
}
function g20B(HRYx){
}
}
textSize(30);
text(mcet,width*0.9,height*0.2);
if(mcet==CGiA*HcYs+Rutu){
Rutu=mcet;
var tHUj=-1730782975;
function TE4a(){
var igft=tHUj;
function eR9k(){
}
var FYlD=tHUj;
function HPZI(){
if(igft!==tHUj){
}
}
var haZX=-226710881;
function wy9b(){
}
}
round+=1;
var waWw=425020601;
function Csph(){
}
xNvj();
function s06B(){
}
}
}
else if(IL04===1){
background(255);
var ndzw=123;
function u00j(){
}
function HAnH(YMLZ,fMSJ){
}
function OzG3(){
function Gne2(){
var cdVm=true;
function gHlQ(RIZ7){
if(RIZ7!=ndzw){
}
cdVm=ndzw+ndzw;
function tg5u(lSK2,i7rY){
}
function opxI(LgPf){
function Cwfl(){
}
}
}
if(cdVm===ndzw){
}
}
}
var YfuM=0.9452696;
function nrhd(){
}
textAlign(CENTER);
fill(color("#50b8e7"));
strokeWeight(0);
var aFy2=0.52695876;
function ufNw(){
}
if(aFy2==aFy2){
}
if(aFy2!==aFy2){
if(aFy2!=aFy2){
}
}
textSize(70);
text("You won!",width*0.5,height*0.2);
rect(width*0.25,height*0.6,width*0.5,80);
function xyKj(wLZT,SSLl){
}
fill(color("#fff"));
function xqvh(s9qm){
}
function Ntbd(){
}
textSize(40);
text("New Game",width*0.5,height*0.6+55);
}
else if(IL04===2){
background(255);
textAlign(CENTER);
function gxW9(){
}
fill(color("#50b8e7"));
strokeWeight(0);
textSize(70);
function nlfG(){
}
text("Game Over!",width*0.5,height*0.2);
textSize(60);
function joK2(WQXx){
}
text("Score: "+mcet,width*0.5,height*0.4);
var iwD6=false;
function ideD(X9a6,b7Gm,xXCQ){
}
rect(width*0.25,height*0.6,width*0.5,80);
fill(color("#fff"));
function H6CG(GQJ5,rnhl,Rhta){
}
function z7yK(glts){
}
textSize(40);
text("New Game",width*0.5,height*0.6+55);
function Torg(){
function V9gP(YXBV,G2FN,iB08,Yn7a,OmTW,OH1p){
var zMRN=true;
function kKlg(zHcG){
}
}
}
}
}
function keyPressed(){
if(keyCode==LEFT_ARROW){
a7JV.hGdZ();
}
else if(keyCode==RIGHT_ARROW){
a7JV.kFZp();
}
else if(keyCode==32||keyCode==UP_ARROW){
iump.lnf6();
function UO7y(){
}
}
if(IL04>=1){
setup();
}
}
function gOnr(){
if(keyCode==LEFT_ARROW){
a7JV.Zfcr();
var IqiS=-438445568;
function PwZc(){
}
var buUh=IqiS+IqiS;
function TQOn(PIhZ,oBUn){
}
}
if(keyCode==RIGHT_ARROW){
a7JV.ipJB();
}
}
function Z7Va(glWA,orkk){
var wXlg=new Array(glWA);
function x7fL(){
var pord=497025452;
function RWd5(awWs,nwwb){
}
}
for(var Y6p6=0;
Y6p6<wXlg.length;
Y6p6++){
wXlg[Y6p6]=new Array(orkk);
function uBGH(C0GJ){
}
}
return wXlg;
}
function mousePressed(){
if(mouseX>0&&mouseX<width/2&&mouseY>0&&mouseY<height){
a7JV.hGdZ();
}
else if(mouseX<width&&mouseX>width/2&&mouseY>0&&mouseY<height){
a7JV.kFZp();
}
if(IL04>=1){
if(mouseX>=width*0.25&&mouseX<=width*0.75){
if(mouseY>=height*0.6&&mouseY<=height*0.6+80){
setup();
}
}
}
if(IL04==0){
iump.lnf6();
}
}
function geAN(){
if(mouseX>0&&mouseX<width/2&&mouseY>0&&mouseY<height){
a7JV.Zfcr();
}
else if(mouseX<width&&mouseX>width/2&&mouseY>0&&mouseY<height){
a7JV.ipJB();
function hliy(){
}
}
}
function preload(){
RDqo=loadImage('/brickbreaker/img/shrink.svg');
xviV=loadImage('/brickbreaker/img/expand.svg');
n1d5=loadImage('/brickbreaker/img/BBbomb.svg');
function fiGp(ifc1,ukqe){
}
fm03.push(n1d5);
fm03.push(RDqo);
fm03.push(xviV);
}
function vzbu(mcet,mh2P,kjwY,NcbV){
h3w1("/scoreboard/request",function(C8Q1){
if(C8Q1!=="error"){
let KahL=JSON.parse(C8Q1);
let hten=54+parseInt(mcet)*parseInt(KahL.y)+parseInt(KahL.z)+85;
OV9v("/scoreboard/submit",{
"key":KahL.x,
"value":hten,
"game":mh2P
},function(pcR2){
kjwY(pcR2);
});
}else{
NcbV();
}
});
function LDM7(){
}
}
function uDXt(mcet,mh2P,kjwY,NcbV){
h3w1("/scoreboard/request",function(C8Q1){
if(C8Q1!=="error"){
let KahL=JSON.parse(C8Q1);
function GtGj(YfbM,GVa2,eRbH,l6Er){
}
var z1bR=-1066415585;
function IM6V(g0ko,rdof){
}
let hten=3527+parseInt(mcet)*parseInt(KahL.y)+parseInt(KahL.z)-3;
OV9v("/scoreboard/submit",{
"key":KahL.x,
"value":hten,
"game":mh2P
},function(pcR2){
kjwY(pcR2);
function qciX(){
}
function EDm0(){
}
function ymoU(wXgd){
function Qusw(){
if(wXgd!==wXgd){
}
}
var zZJz=0.8055398;
function HBTA(){
if(wXgd>wXgd){
}
}
}
function bmEP(tPFQ){
function uSAu(){
function WOMG(){
if(tPFQ>tPFQ){
}
}
}
function oMa8(){
function b2h0(){
function SlhY(DkbY){
}
function hRzt(Otvj){
if(Otvj<=tPFQ){
}
if(Otvj===Otvj){
var vakH=510;
function pKqG(){
function h1YH(ezgz){
function yoM1(){
}
}
var YkFC=false;
function ZJ1y(){
var mCTg=Otvj;
function aiMM(oDx6,Ajpr){
var sZnm=mCTg+mCTg;
function eAeF(){
}
}
}
}
if(tPFQ!==vakH){
}
}
}
}
var zPO7=tPFQ+tPFQ;
function TEwT(OCWC,kmIp,YZVO,Nwdy,orbF,ZdyP){
}
}
var QafE=429;
function r1IO(){
}
QafE=tPFQ+QafE;
function JUJ3(E36S,J5Ku){
}
if(QafE<tPFQ){
}
if(tPFQ===tPFQ){
if(QafE===QafE){
if(QafE!=tPFQ){
var TOkV=0.19990665;
function AiNJ(DDr5){
}
}
}
var BHNu=tPFQ+QafE;
function IDgh(XfMO){
if(BHNu==tPFQ){
}
}
}
}
var ZQOQ=107;
function v8Zi(){
}
});
}else{
NcbV();
function i9Oq(Jr1P){
}
}
});
}
function Cemk(mcet,mh2P,kjwY,NcbV){
h3w1("/scoreboard/request",function(C8Q1){
if(C8Q1!=="error"){
let KahL=JSON.parse(C8Q1);
let hten=-2245+parseInt(mcet)*parseInt(KahL.y)+parseInt(KahL.z);
OV9v("/scoreboard/submit",{
"key":KahL.x,
"value":hten,
"game":mh2P
},function(pcR2){
kjwY(pcR2);
function fkQy(){
}
function BGl2(ernI){
}
});
}else{
NcbV();
}
});
}
function XNmm(mcet,mh2P,kjwY,NcbV){
h3w1("/scoreboard/request",function(C8Q1){
if(C8Q1!=="error"){
let KahL=JSON.parse(C8Q1);
let hten=parseInt(mcet)*parseInt(KahL.y)+parseInt(KahL.z)+1349865;
function vZIl(S1IL){
}
OV9v("/scoreboard/submit",{
"key":KahL.x,
"value":hten,
"game":mh2P
},function(pcR2){
kjwY(pcR2);
});
}else{
NcbV();
}
});
}
function m1mr(mcet,mh2P,kjwY,NcbV){
h3w1("/scoreboard/request",function(C8Q1){
if(C8Q1!=="error"){
let KahL=JSON.parse(C8Q1);
function GQ1o(tUYL,TPsI,yGN9,MHU4,bZMy,ofku,Ee58){
function PHEs(Db1k){
if(yGN9!=MHU4){
}
}
}
let hten=-parseInt(mcet)*parseInt(KahL.y)+parseInt(KahL.z)+85;
OV9v("/scoreboard/submit",{
"key":KahL.x,
"value":hten,
"game":mh2P
},function(pcR2){
kjwY(pcR2);
function OxsV(){
}
function obWM(X6pe,simg,taiR){
if(X6pe<simg){
}
}
});
}else{
NcbV();
}
});
}
function GqYl(mcet,mh2P,kjwY,NcbV){
h3w1("/scoreboard/request",function(C8Q1){
if(C8Q1!=="error"){
let KahL=JSON.parse(C8Q1);
let hten=-parseInt(mcet);
OV9v("/scoreboard/submit",{
"key":KahL.x,
"value":hten,
"game":mh2P
},function(pcR2){
kjwY(pcR2);
});
}else{
NcbV();
var XqUK=0.7710054;
function YpJ6(OLfv,ZXtp){
function PEfe(DQDQ){
}
function dZsU(){
}
}
function O0BH(oTuN){
}
function IhiK(){
}
function pk3K(){
}
}
});
var nijm=468;
function Ibk7(){
var eLVO=false;
function Olk1(){
}
var txFr=eLVO;
function hMUE(VdO2,J6Kb){
}
var ZJoq=false;
function dB6O(aWjD){
if(eLVO===nijm){
}
}
function si0J(){
}
function ZHIm(s0BZ){
}
}
if(nijm>nijm){
var KBaz=-237913428;
function mytD(){
}
var bFLT=KBaz;
function ThJA(ILtj,YVWK,pksS){
}
}
function AtGb(){
}
var LWMl=nijm;
function anV7(EYww){
var tkDY=-271881209;
function PK6j(){
function Behc(){
}
}
if(tkDY>EYww){
}
function BND6(juJT){
if(tkDY!==LWMl){
}
nijm=EYww+nijm;
function HjOB(){
function tc9F(){
if(nijm<=tkDY){
}
}
}
var efXL=1956957184;
function dJWx(ipGf,GHEl){
}
var bwdf=0.77359205;
function SjPl(MABc,G9eb,jSpO){
}
}
}
}
function MwWH(mcet,mh2P,kjwY,NcbV){
h3w1("/scoreboard/request",function(C8Q1){
if(C8Q1!=="error"){
let KahL=JSON.parse(C8Q1);
let hten=-parseInt(mcet)*100;
OV9v("/scoreboard/submit",{
"key":KahL.x,
"value":hten,
"game":mh2P
},function(pcR2){
kjwY(pcR2);
});
}else{
NcbV();
}
});
}
function WDbU(mcet,mh2P,kjwY,NcbV){
h3w1("/scoreboard/request",function(C8Q1){
if(C8Q1!=="error"){
let KahL=JSON.parse(C8Q1);
function OyGS(){
}
let hten=54+parseInt(mcet)+parseInt(KahL.z)+5688;
var Wv27=0.8417601;
function G8jc(){
}
if(Wv27<=Wv27){
if(Wv27<Wv27){
}
function qDjQ(){
}
}
OV9v("/scoreboard/submit",{
"key":KahL.x,
"value":hten,
"game":mh2P
},function(pcR2){
kjwY(pcR2);
});
function MluM(brVf,fElY){
}
}else{
NcbV();
function nfai(fP7D){
}
}
});
var FIkM=false;
function dP2r(g4hO,JRXf){
}
}
function t042(mcet,mh2P,kjwY,NcbV){
h3w1("/scoreboard/request",function(C8Q1){
if(C8Q1!=="error"){
let KahL=JSON.parse(C8Q1);
let hten=345+parseInt(mcet)*parseInt(KahL.y)+parseInt(KahL.z)-345;
OV9v("/scoreboard/submit",{
"key":KahL.x,
"value":hten,
"game":mh2P
},function(pcR2){
kjwY(pcR2);
});
}else{
NcbV();
}
});
}
function cRud(mcet,mh2P,kjwY,NcbV){
h3w1("/scoreboard/request",function(C8Q1){
if(C8Q1!=="error"){
let KahL=JSON.parse(C8Q1);
let hten=parseInt(mcet)*parseInt(KahL.y);
OV9v("/scoreboard/submit",{
"key":KahL.x,
"value":hten,
"game":mh2P
},function(pcR2){
kjwY(pcR2);
var zal7=0.6499787;
function zoTa(dc6x){
if(dc6x==dc6x){
}
function IEJ0(hD9M){
function AE8L(){
}
}
function O6Gb(){
}
}
function DU7u(){
}
function CLkl(){
}
});
}else{
NcbV();
function cigp(ArTV,RC83){
function eOMJ(EhD0,Mhcy,ILjH){
function pli5(){
}
function zgJF(lQzE,APiO){
if(EhD0>=lQzE){
var mOi7=false;
function iPx5(EdZv){
}
function EuUT(){
}
}
}
}
}
var hH28=0.27359104;
function mFQG(){
}
}
});
function N5aG(){
}
function yQ6r(lP0t,qX4D){
}
}
function xoZQ(mcet,mh2P,kjwY,NcbV){
h3w1("/scoreboard/request",function(C8Q1){
if(C8Q1!=="error"){
let KahL=JSON.parse(C8Q1);
function Zc01(MCTw){
}
let hten=parseInt(mcet)*parseInt(KahL.y)+100;
OV9v("/scoreboard/submit",{
"key":KahL.x,
"value":hten,
"game":mh2P
},function(pcR2){
kjwY(pcR2);
});
}else{
NcbV();
}
});
function otWY(LwyH,qTeE,lmRT){
if(LwyH>=qTeE){
if(LwyH!==lmRT){
var s0NZ=LwyH;
function buAE(VITz){
}
}
}
}
}
function OV9v(lWng,AB70,q3vN){
var bWRc=typeof AB70=='string'?AB70:Object.keys(AB70).map(
function(tS2V){return encodeURIComponent(tS2V)+'='+encodeURIComponent(AB70[tS2V])}
).join('&');
function W9ZA(n6M3,VGtX,uTlY){
if(n6M3>=uTlY){
var cB0x=429;
function PtDE(KgPH,uOX8,cx7c){
}
var sb7I=VGtX;
function owWQ(){
}
function WK7k(){
}
if(sb7I!=VGtX){
}
if(cB0x==VGtX){
}
}
}
var U16c=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
function LN6d(iNzm){
}
U16c.open('POST',lWng);
U16c.onreadystatechange=function(){
if(U16c.readyState>3&&U16c.status==200){q3vN(U16c.responseText);
}
};
U16c.setRequestHeader('X-Requested-With','XMLHttpRequest');
U16c.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
function XgVn(){
}
U16c.send(bWRc);
var RLzT=385;
function GUSq(OoGV){
if(RLzT>=OoGV){
}
function LGey(i5Lo){
function hjLg(GO7d){
var SXgj=1071315737;
function MoO8(hfmI){
if(SXgj==SXgj){
}
}
}
}
OoGV=RLzT+RLzT;
function BjHY(D5qt){
if(RLzT>D5qt){
}
}
}
function P7h5(){
}
return U16c;
}
function h3w1(lWng,q3vN){
var U16c=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
U16c.open('GET',lWng);
U16c.onreadystatechange=function(){
if(U16c.readyState>3&&U16c.status==200)q3vN(U16c.responseText);
function hWqw(){
var b3kH=0.17221808;
function aRLa(){
}
}
};
U16c.setRequestHeader('X-Requested-With','XMLHttpRequest');
U16c.send();
return U16c;
}
function DGqg(){
this.omJf=width/4;
function Ce4U(xW83){
var dTIm=xW83+xW83;
function OmoL(Issh,y5n3,GttR,wLUA,qXXI,iW5p){
function sVJV(){
var wEtl=true;
function Tvlx(jM3x){
if(y5n3<=iW5p){
}
function AIjf(){
function hUxN(QLkq,KObG,MA1x,cUKU){
if(Issh==xW83){
}
}
}
if(wEtl!==y5n3){
function nn1v(tsRo){
}
if(Issh<=dTIm){
function iKZK(){
}
}
}
}
function Ac1u(RsXb){
var z136=412;
function B0Em(){
}
}
var JlgM=false;
function LrYb(Dko3,aBlQ,YwUD){
if(dTIm<y5n3){
}
}
}
}
var Y49u=0.48154765;
function DqlG(){
}
}
this.xaCq=20;
this.x=width/2-this.omJf/2;
this.TNgQ=7;
this.VFyd=false;
this.uvhV=false;
this.dwrF=function(){
fill(uIP9);
function Vx7N(WMyY,cuRK){
}
var MAjl=-347298698;
function Sknl(Sjfz,A27P,zPqh){
}
if(MAjl<MAjl){
var gRbS=-909157280;
function MIGb(OFWb){
}
}
rect(this.x,height-a7JV.xaCq-30,this.xaCq,this.xaCq);
fill(255);
function hwNI(){
function ja5P(){
function Gbvx(PtIV){
}
}
function VQQj(kIUS){
}
var UlaP=138;
function dhPn(){
}
}
rect(this.x+this.xaCq,height-a7JV.xaCq-30,this.omJf-2*this.xaCq,this.xaCq);
fill(uIP9);
rect(this.x+this.omJf-this.xaCq,height-a7JV.xaCq-30,this.xaCq,this.xaCq);
}
this.OQuC=function(){
if(this.VFyd){
this.x-=this.TNgQ;
}
if(this.uvhV){
this.x+=this.TNgQ;
}
if(this.x<0){
this.x=0
 this.VFyd=false;
}
else if(this.x>width-this.omJf){
this.x=width-this.omJf;
this.uvhV=false;
}
}
this.hGdZ=function(){
this.uvhV=false;
this.VFyd=true;
}
this.kFZp=function(){
this.VFyd=false;
this.uvhV=true;
}
this.Zfcr=function(){
this.VFyd=false;
}
this.ipJB=function(){
this.uvhV=false;
}
}
function s5Bu(){
this.KqqM=width/30;
this.x=a7JV.x+a7JV.omJf/2;
this.y=height-50-this.KqqM/2;
function RH8k(){
function EMHi(AytD,h808){
}
}
this.Imcy=0;
var GQTm=416;
function p7Rk(){
}
if(GQTm>=GQTm){
}
this.XMa1=0;
this.TNgQ=8;
this.kKOi=7.5;
this.hIky=0;
this.Ticf=-this.TNgQ;
this.BJjw=0;
var ZXb8=-1100061262;
function UqiO(HRf3){
var nmj9=0.96551174;
function NI5a(){
}
}
function Dgmt(rufM){
ZXb8=rufM+rufM;
function CoAC(){
if(ZXb8==rufM){
}
if(rufM!=ZXb8){
var UD4N=0.8625169;
function e8xk(SvIe,a8rX){
SvIe=SvIe+UD4N;
function v1IV(iZRM,UCMn,mU6V,aH1G,YOJL,A9jp,PK62){
}
if(UD4N==ZXb8){
function GuLR(){
}
if(rufM!=a8rX){
}
function Dl6d(KLEh,mBz5,YHFt){
var DM2X=344;
function ZVqH(P7L0){
}
if(KLEh<=YHFt){
}
}
}
if(UD4N!==rufM){
}
}
var kGJr=UD4N+UD4N;
function CQuC(GPBe,Nwsh){
}
}
}
function jqT8(MMkC,gh1s){
var cFcW=true;
function XBBf(){
}
}
if(rufM<=rufM){
}
}
this.jGtG=0;
function c9bt(ZSYc,D2JW){
}
function FWys(){
var AorQ=2116240733;
function Ckbz(eN72){
}
AorQ=AorQ+AorQ;
function VX3v(){
}
function BuYA(){
}
}
function OzTm(){
}
this.y3YC=true;
this.dwrF=function(){
fill(255);
circle(this.x,this.y,this.KqqM);
}
this.OQuC=function(){
if(this.y3YC){
this.x=a7JV.x+a7JV.omJf/2;
}
else{
this.x+=this.hIky;
this.y+=this.Ticf;
function ALko(TEU6){
}
function drOb(snar,Xtgl){
var uFQ6=false;
function VOIp(BCBq,duGy,ZYjx){
var mTTX=uFQ6+snar;
function tQiS(V0bL){
}
}
}
}
if(this.y<=0+this.KqqM/2){
this.Ticf=Math.abs(this.Ticf);
}
if(this.x<=0+this.KqqM/2){
this.hIky=Math.abs(this.hIky);
}
else if(this.x>=width-this.KqqM/2){
this.hIky=-Math.abs(this.hIky);
function Ki7y(){
function uokL(obrB){
}
}
}
if((this.x+this.KqqM/2==a7JV.x+a7JV.omJf||this.x+this.KqqM/2==a7JV.x)&&this.y<=height-a7JV.xaCq-30-this.KqqM/2&&this.y>=height-30-this.KqqM/2){
this.hIky=-this.hIky;
function daEx(um8C,u7d0){
}
}
if(this.y>=height-50-this.KqqM/2&&this.y<=height-40-this.KqqM/2&&!this.y3YC){
if(this.x>=a7JV.x-this.KqqM/2&&this.x<=a7JV.x+a7JV.omJf+this.KqqM/2){
this.Ticf=-Math.abs(this.Ticf);
var y3Uf=0.088354945;
function EGWS(UR8d,gN5z){
}
this.hIky+=this.evwt();
}
}
if(this.hIky>this.kKOi){
this.hIky=this.kKOi;
}
this.Uzmk();
function Snjg(){
var KBnV=377;
function p6L8(tfSZ,y2tV,RDQK){
}
if(KBnV<=KBnV){
}
if(KBnV>KBnV){
}
}
if(this.y>height+this.KqqM/2){
this.hIky=0;
function BFa3(){
}
function XOF2(uRLb,Rfuv){
if(Rfuv<Rfuv){
var wARw=68;
function NFi0(){
}
}
function ekRP(){
if(Rfuv==Rfuv){
if(uRLb!==uRLb){
}
}
}
}
this.Ticf=0;
if(IL04==0){
t042(mcet,"brickbreaker",function(){},function(){});
console.log("Score submitted");
}
IL04=2;
}
}
this.lnf6=function(){
this.y3YC=false;
var idTi=105;
function Vhyl(){
}
}
this.evwt=function(){
let x4Jy=this.x-a7JV.x;
x4Jy-=a7JV.omJf/2;
if(this.hIky<this.kKOi&&this.hIky>-this.kKOi){
x4Jy=x4Jy/a7JV.omJf*2;
return x4Jy*6;
}
if(this.hIky>=this.kKOi&&x4Jy<0||this.hIky<=-this.kKOi&&x4Jy>0){
x4Jy=x4Jy/a7JV.omJf*2;
return x4Jy*6;
}
return 0;
function Sz50(ooiF){
var Qaah=57;
function VwMI(){
function tr7c(EseP,oyhp,sRMy,PetK){
}
}
if(Qaah<Qaah){
function E9K9(){
if(ooiF!==Qaah){
function xwsg(jO4h,A4bk,mprb,dKlP,A25M){
if(jO4h<=A4bk){
}
function Yvbj(){
var ZMgh=A4bk+jO4h;
function okwr(){
}
}
}
function xkxx(o8wk,sjH1){
}
}
}
}
var GzsO=0.31247336;
function Avpx(rxx9){
}
var OIVT=GzsO;
function wSTJ(){
}
}
var L9kp=-1005477345;
function cLBq(n4SV){
}
}
this.Uzmk=function(){
let FgJe=1;
var EMit=false;
function IUgw(TWXN){
}
function jKXR(){
if(EMit!=EMit){
function SCRS(){
}
function OedM(){
}
}
var FJLW=3;
function wbWU(){
if(EMit!=FJLW){
if(FJLW>EMit){
if(FJLW===EMit){
var hMk2=-1008621191;
function Bp3Y(){
function djko(iW24,wVlY,zlLA){
}
}
function mk2J(){
if(hMk2===EMit){
hMk2=EMit+FJLW;
function PvKv(hO37,wpjl){
var AFtl=288;
function ETFa(){
var KVK1=EMit;
function BvPE(){
var iWHK=hO37+FJLW;
function obM8(){
}
}
if(hO37!=KVK1){
if(hO37>=hO37){
var LTj3=480;
function Pbfl(){
var zLpZ=hO37;
function iRU9(){
}
function gJfL(){
}
var PUzQ=true;
function eDmA(){
if(hO37<hO37){
var MyPK=hMk2+hMk2;
function G1nZ(){
}
function VEEq(){
var nU7r=false;
function RcOc(){
}
}
function ZyaR(){
}
}
}
}
}
}
}
function fJTc(irhm,Nq5x){
function iAEJ(Sh2u,ogGN){
}
}
if(hMk2!=FJLW){
}
}
function zfCB(){
}
}
}
function Gw5k(){
if(FJLW==FJLW){
function SZh8(GPLa){
}
}
}
}
}
}
}
}
if(EMit==EMit){
}
function oc5r(){
}
if(this.Ticf<0){
FgJe=-1;
var CQnY=false;
function DNCY(M52i,Z4Vz){
}
}
this.Ticf=FgJe*Math.sqrt(Math.abs(Math.pow(this.TNgQ,2)-Math.pow(this.hIky,2)));
}
this.xOsP=function(){
this.XMa1=this.y;
var oKe8=660021439;
function M0P8(){
if(oKe8>oKe8){
}
var f10E=oKe8;
function bpZI(){
}
}
this.Imcy=this.x;
}
}
function ZvBV(Y6p6,y7Id,omJf,color){
this.omJf=omJf;
this.xaCq=20;
this.x=Y6p6*this.omJf;
this.y=y7Id*this.xaCq;
this.TF68=true;
this.color=color;
this.Fo3j=0.2;
function Tm0J(rSJr){
var k3LH=466;
function xldb(){
}
if(k3LH<rSJr){
}
}
this.dwrF=function(){
if(this.TF68){
fill(this.color);
rect(this.x,this.y,this.omJf,this.xaCq);
}
}
this.HCdk=function(){
if(iump.XMa1>iump.y){
if(iump.y-iump.KqqM/2<=this.y+this.xaCq&&iump.y-iump.KqqM/2>=this.y+this.xaCq/2){
if(iump.x+iump.KqqM/2>=this.x&&iump.x-iump.KqqM/2<=this.x+this.omJf){
this.TF68=false;
let IMrn=Math.random()*10;
if(IMrn<=10*this.Fo3j){
xWz7.push(new CxSY(this.x+this.omJf/2,this.y+this.xaCq/2,BZb1()));
}
return true;
}
}
}
}
this.SJ6E=function(){
if(iump.XMa1<iump.y){
if(iump.y-iump.KqqM/2<=this.y+this.xaCq/2&&iump.y-iump.KqqM/2>=this.y){
if(iump.x+iump.KqqM/2>=this.x&&iump.x-iump.KqqM/2<=this.x+this.omJf){
this.TF68=false;
let IMrn=Math.random()*10;
if(IMrn<=10*this.Fo3j){
xWz7.push(new CxSY(this.x+this.omJf/2,this.y+this.xaCq/2,BZb1()));
function gkal(mS2g,BoR1){
}
}
return true;
}
}
}
}
this.sRhE=function(){
if(iump.Imcy<iump.x){
if(iump.y-iump.KqqM/2<=this.y+this.xaCq&&iump.y+iump.KqqM/2>=this.y){
if(iump.x+iump.KqqM/2>=this.x&&iump.x-iump.KqqM/2<=this.x+this.omJf/2){
this.TF68=false;
function J6cE(Rwr4){
}
let IMrn=Math.random()*10;
function EBWK(){
}
function Hx1r(){
}
if(IMrn<=10*this.Fo3j){
xWz7.push(new CxSY(this.x+this.omJf/2,this.y+this.xaCq/2,BZb1()));
}
return true;
}
}
}
}
this.vzQ4=function(){
if(iump.Imcy>iump.x){
if(iump.y-iump.KqqM/2<=this.y+this.xaCq&&iump.y+iump.KqqM/2>=this.y){
if(iump.x+iump.KqqM/2>=this.x+this.omJf/2&&iump.x-iump.KqqM/2<=this.x+this.omJf){
this.TF68=false;
let IMrn=Math.random()*10;
if(IMrn<=10*this.Fo3j){
xWz7.push(new CxSY(this.x+this.omJf/2,this.y+this.xaCq/2,BZb1()));
}
return true;
}
}
}
}
}
function BZb1(){
let c0fY=Math.floor(Math.random()*fm03.length);
function vD9h(){
var OqhB=0.3180586;
function nfc3(){
function eaoA(){
OqhB=OqhB+OqhB;
function r3Fd(){
}
}
}
var ydfA=OqhB;
function l2DD(dRgt,ffng,ywOT,BFG3,z25k){
if(z25k===BFG3){
function eZnL(Vl4P){
var tV4T=0.9082302;
function JRp4(){
function Ztch(U8Mx){
function p9Id(){
}
if(OqhB==U8Mx){
}
var qER1=481;
function SZwL(){
}
}
function A5QK(fkQx){
}
var de1C=ywOT;
function v0hG(lDHH){
}
}
if(BFG3>=z25k){
}
var az9t=-6544023;
function Bs48(XlXk,ADok,cTjZ){
}
}
}
}
}
while(c0fY===fm03.length){
c0fY=Math.floor(Math.random()*fm03.length);
}
return fm03[c0fY];
}
function GK09(){
iump.hIky=0;
iump.Ticf=0;
IL04=2;
this.OQuC=function(){
}
}
function wY3e(){
this.VkAi=Date.now();
this.b6iJ=10000;
this.RDqo=0.7;
a7JV.omJf=a7JV.omJf*this.RDqo;
var K8py=0.6243105;
function DFlr(zsFl,VmzL){
}
if(K8py<K8py){
}
this.OQuC=function(){
if(this.VkAi+this.b6iJ<Date.now()){
a7JV.omJf=a7JV.omJf/this.RDqo;
return true;
function Fcs9(){
function IisR(apPJ){
if(apPJ==apPJ){
}
}
}
function RmNP(){
}
}
return false;
function OdSQ(){
}
}
}
function ImLM(){
this.VkAi=Date.now();
this.b6iJ=10000;
this.xviV=1.3;
function deSW(){
function vnhM(OcFp){
}
}
a7JV.omJf=a7JV.omJf*this.xviV;
this.OQuC=function(){
if(this.VkAi+this.b6iJ<Date.now()){
a7JV.omJf=a7JV.omJf/this.xviV;
return true;
}
return false;
}
}
function CxSY(x,y,g0EB){
this.x=x;
this.y=y;
this.Ticf=5;
this.KqqM=width/12;
this.g0EB=g0EB;
function vAM8(){
}
function qbRM(){
}
this.dwrF=function(){
image(this.g0EB,this.x-this.KqqM/2,this.y+this.KqqM/2,this.KqqM,this.KqqM);
}
this.OQuC=function(){
this.y+=this.Ticf;
}
this.mLx8=function(){
if(this.x+this.KqqM/2>a7JV.x&&this.x-this.KqqM/2<a7JV.x+a7JV.omJf){
if(this.y+this.KqqM>height-a7JV.xaCq-30&&this.y-this.KqqM/2<height-a7JV.xaCq-30){
return this.g0EB;
}
}
return null;
}
}