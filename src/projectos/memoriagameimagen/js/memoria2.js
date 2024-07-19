console.log("hola script memoria con imagenes");
const game = {
ctx: null,
canvas: null,
primeraCarta:true,
cartaPrimera: null,
cartaSegunda: null,
inicioX: 70,
inicioY: 30,
cartaMargen: 45,
cartaLog: 30,
cartaAncho: 100,
cartaLargo: 140,
cartasNum: 6,
cartas: [],
colorCarta: "purple",
colorAtras: "violet",
iguales: false,
pares:0,
idTimeout: null,
imagenes : [    ["afrodita.png","afrodita.png"],
["atenea.png","atenea.png"],
["atenea4.jpg","atenea4.jpg"],
["afrodita6.jpg","afrodita6.jpg"],
["nana.JPG","nana.JPG"],
["nana1.JPG","nana1.JPG"],
["vanGogh.png","vanGogh.png"]]
} 


function Carta (x,y,ancho,largo,img,info){
this.x = x;
this.y = y;
this.ancho = ancho;
this.largo = largo;
this.info = info;
this.img = img;
this.dibuja = function(){
    game.ctx.fillStyle = game.colorAtras;
    game.ctx.fillRect(this.x,this.y,this.ancho,this.largo);
};
}

const  seleccionar = (e) => {

    let pos = ajustar(e.clientX, e.clientY);
    // console.log(e.clientX, e.clientY, pos.x,pos.y);
    for (var i = 0; i < game.cartas.length; i++){
        var carta = game.cartas[i];
        if(carta.x > 0 ){
if((pos.x > carta.x) && 
(pos.x < carta.x + carta.ancho) &&
(pos.y > carta.y) &&
( pos.y < carta.y + carta.largo)){
if(game.primeraCarta || (i!= game.cartaPrimera)){
break;
}
}
        }
    }
    if(i < game.cartas.length && game.pares < game.cartasNum){
if(game.primeraCarta){

    game.cartaPrimera = i;
    game.primeraCarta = false;
    pintarCarta(carta);
}
else{
game.cartaSegunda = i;
pintarCarta(carta);
game.primeraCarta = true;
if( game.cartas[game.cartaPrimera].info == game.cartas[game.cartaSegunda].info)
{
    game.iguales = true;
    game.pares++;
    aciertos();
}
else{
    game.iguales = false;

}
game.canvas.removeEventListener("click",seleccionar);
game.idTimeout = setTimeout(voltearCarta ,1000);
}
}
else{
   alert("No seleccionaste la carta  ");

    }
}
const aciertos = () =>{
    game.ctx.fillStyle = "black";
    if(game.pares == game.cartasNum){
        game.ctx.font = "bold 80px Comic";
        game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
        game.ctx.fillText("felicitaciones ",60,220);
    }
    else{
        game.ctx.save();
        game.ctx.font = "bold 40px Comic";
        game.ctx.clearRect(0,380,game.canvas.width,200);
        game.ctx.fillText("Pares encontrados: " + String(game.pares),30,410);
        game.ctx.restore();
    }
    game.ctx.restore();
}
const voltearCarta = () => {
    if(game.pares < game.cartasNum){

        if(game.iguales == true){
            game.ctx.clearRect(game.cartas[game.cartaPrimera].x, game.cartas[game.cartaPrimera].y, game.cartas[game.cartaPrimera].ancho, game.cartas[game.cartaPrimera].largo);
game.ctx.clearRect(game.cartas[game.cartaSegunda].x, game.cartas[game.cartaSegunda].y, game.cartas[game.cartaSegunda].ancho, game.cartas[game.cartaSegunda].largo);
    game.cartas[game.cartaPrimera].x = -1;
    game.cartas[game.cartaSegunda].x = -1;
    }
    else{
        
        game.cartas[game.cartaPrimera].dibuja();
        game.cartas[game.cartaSegunda].dibuja();
    }
    game.canvas.addEventListener("click",seleccionar, false);
 }
 else{
clearTimeout(game.idTimeout);
 }
}
const pintarCarta = (carta) => {
    var imagen = new Image();
    imagen.src = src = carta.img;
    imagen.onload = function ( ){
        if(game.pares != game.cartasNum){
            game.ctx.drawImage(imagen, carta.x, carta.y, carta.ancho, carta.largo);

        }
    }

}

const  ajustar = (xx,yy) => {
let posCanvas = game.canvas.getBoundingClientRect();
let x = xx - posCanvas.left;
let y = yy - posCanvas.top;
return {x,y}
}

/* funciones  */
const barajar = () =>{

    let i;
    let j;
    let k;
    // let temporarl;
    let temporarlinfo;
    let temporarlImagen;
    // for( i = 0; i <game.cartasNum * 6; i++ )
    for( i = 0; i < 100; i++ )
    {
j = Math.floor(Math.random() * game.cartas.length);
k = Math.floor(Math.random() * game.cartas.length);
temporarlinfo = game.cartas[j].info;
temporarlImagen = game.cartas[j].img;
game.cartas[j].info = game.cartas[k].info;
game.cartas[j].img = game.cartas[k].img;
game.cartas[k].info = temporarlinfo;
game.cartas[k].img = temporarlImagen;
    }
}
const tablero = () =>{
    
    let x = game.inicioX;
    let y = game.inicioY;
    let img = "";
var carta, yy;

for(let i = 0; i < game.cartasNum; i++){ 
    img = "img/"+ game.imagenes[i][0];
    carta = new Carta(x,y,game.cartaAncho,game.cartaLargo,img,i);
    game.cartas.push(carta);
    carta.dibuja();
    /*Segunda carta  */
    img = "img/"+ game.imagenes[i][1];
    yy = y + game.cartaLargo + game.cartaMargen; 
    carta = new Carta(x,yy,game.cartaAncho,game.cartaLargo,img,i);
    game.cartas.push(carta);
    carta.dibuja();
    //incrementa el valor de x
    x += game.cartaAncho + game.cartaMargen;

}
aciertos();
}
/* Inicio */
window.onload= function (){
    game.canvas = document.getElementById("canvas");
    if(game.canvas && game.canvas.getContext){
game.ctx = game.canvas.getContext("2d");
if(game.ctx){
    game.canvas.addEventListener("click",seleccionar, false);
tablero();
barajar();
}
else{
    
   
}

    }
}
// file:///C:/Users/DrawH/Desktop/entrenandocode2022/muchosgamesenjs/canvas/memoriagame/index.html