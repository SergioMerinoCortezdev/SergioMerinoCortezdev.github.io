let ctx;
let origenx = 0;
let origeny = 0;
let anchocaja = 500;
let altocaja = 300;
let radio = 10;
let limitecajaizquierdo = anchocaja + origenx - radio;
let limiteCajaArriba = altocaja + origeny - radio;
let limiteCajaDerecha = origenx + radio;
let limiteCajaAbajo = origeny + radio;
let bolax = 50;
let bolay = 50;
let vx = 4;
let vy = 4;
// const game = {
//     ctx:null,
//     radio:10,
//     bolax:50,
//     bolay:100
// }
window.onload= function (){
    canvas = document.getElementById("canvas");
    if(canvas && canvas.getContext){
ctx = canvas.getContext("2d");
if(ctx){
ctx.lineWidth = radio;
ctx.fillStyle = "rgb(200,0,50)";
mueve();
setInterval(mueve,60);
}
else{
    
   
}

    }
}

function mueve(){
    ctx.clearRect(origenx, origeny, anchocaja, altocaja);
    verifica();
    ctx.beginPath();
    ctx.arc(bolax,bolay, radio, 0, Math.PI*2,true);
    ctx.fill();
}
function verifica(){
    let nbolax = bolax + vx;
    let nbolay = bolay + vy;

if(nbolax > limitecajaizquierdo){
    vx = -vx;
    nbolax = limitecajaizquierdo;
}

if(nbolax < limiteCajaDerecha){
    nbolax = limiteCajaDerecha;
    vx = -vx;
}
if(nbolay > limiteCajaArriba){
    nbolay = limiteCajaArriba;
    vy = -vy;
}
if(nbolay < limiteCajaAbajo){
    nbolay = limiteCajaAbajo;
    vy = -vy;
}

bolax = nbolax;
bolay = nbolay;

}