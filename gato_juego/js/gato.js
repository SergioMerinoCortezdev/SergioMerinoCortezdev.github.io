console.log("juego del ahorcado");
const game = {
ctx: null,
canvas: null,
fichas_array:[],
COLUMNAS: 3,
RENGLONES: 3,
fichas_X: 0,
fichas_O: 0,
tiradas:0,
gameOver:false,
largo: 120,
colorGato: "black",
colorCanvas: "blue"
}
/***************** */
function Ficha(x, y, w, h, i, ren, col){
this.x = x;
this.y = y;
this.w = w;
this.h = h;
this.i = i;
this.ren = ren;
this.col = col;
this.peso = 0;
this.valor = "";
this.pintar = function(valor){
    this.valor = valor;
    game.ctx.font= "bold 100px Arial";
    game.ctx.fillStyle = game.colorGato;
    game.ctx.fillText(valor, this.x + 30, this.y + 100, this.w, this.h);
}
}
/************
FUNCIONES
 ************/ 
function gato(){
game.ctx.fillStyle = game.colorGame;
game.ctx.strokeStyle = game.colorGato;
game.ctx.lineWidth = 20;
game.ctx.beginPath();
game.ctx.moveTo(410,20);
game.ctx.lineTo(410,420);
game.ctx.stroke();

game.ctx.beginPath();
game.ctx.moveTo(550,20);
game.ctx.lineTo(550,420);
game.ctx.stroke();

game.ctx.beginPath();
game.ctx.moveTo(280,150);
game.ctx.lineTo(680,150);
game.ctx.stroke();

game.ctx.beginPath();
game.ctx.moveTo(280,290);
game.ctx.lineTo(680,290);
game.ctx.stroke();

game.fichas_array.push(new Ficha(280,20,game.largo, game.largo, 0,0,0));
game.fichas_array.push(new Ficha(420,20,game.largo, game.largo, 1,0,1));
game.fichas_array.push(new Ficha(560,20,game.largo, game.largo, 2,0,2));

game.fichas_array.push(new Ficha(280,160,game.largo, game.largo, 3,1,0));
game.fichas_array.push(new Ficha(420,160,game.largo, game.largo, 4,1,1));
game.fichas_array.push(new Ficha(560,160,game.largo, game.largo, 5,1,2));

game.fichas_array.push(new Ficha(280,300,game.largo, game.largo, 6,2,0));
game.fichas_array.push(new Ficha(420,300,game.largo, game.largo, 7,2,1));
game.fichas_array.push(new Ficha(560,300,game.largo, game.largo, 8,2,2));

}


/************
  
 Funciones
 *************/ 
const mensaje = (cadena) =>{
    var lon = (game.canvas.width) / 2;
    game.ctx.save();
    game.ctx.strokeStyle = game.colorGato;
    game.ctx.clearRect(0,420,game.canvas.width,100);
    game.ctx.font = "bold 40px Courier";
    game.ctx.textAlign = "center";
    game.ctx.fillText(cadena,lon,470);
game.ctx.restore();
}

 /************
 AJUSTAR COORDENADAS
 ************/ 
const ajustar = (xx,yy) =>{
    const postCanvas = game.canvas.getBoundingClientRect();
const x = xx - postCanvas.left;
const y = yy  - postCanvas.top;
return {x,y};

}
/************
 SELECCIONAR POR EL APUNTADOR DEL RATON
 ************/ 
function seleccionar (e){
    const {x,y} = ajustar(e.clientX, e.clientY);
    var ficha;
    // var i ;
    for(var i = 0; i < game.fichas_array.length; i++){
        ficha = game.fichas_array[i];
        if((x > ficha.x) && (x < ficha.x + ficha.w) && (y > ficha.y) && ( y < ficha.y + ficha.h )){
            if(ficha.valor ==""){
                game.tiradas++;
                break;
            }
        }
    }
    if( i < game.fichas_array.length){
        // console.log(i);
        if(ficha.valor == ""){
            game.canvas.removeEventListener("click",seleccionar);
            ficha.pintar("X");
            mensaje("Pensasando...");

setTimeout(tiraMaquina,1000);
        }
    }
}

const tiraMaquina = () =>{
    var ii;
    var ficha;
    game.tiradas++;
    // console.log("tira numero: " + game.tiradas);
    if(game.gameOver == false){
        //verificar con el peso
        verificarRenglones(true);
        verificarColumnas(true);
        verificarDiagonal1(true);
        verificarDiagonal2(true);
        //Seleccionar la mejor jugada
        ii = mejorJugada();
        //Realiza la Jugada
        ficha = game.fichas_array[ii];
        ficha.pintar("O");
        //Verificar la jugada de la maquina
        verificarRenglones(false);
        verificarColumnas(false);
        verificarDiagonal1(false);
        verificarDiagonal2(false);
        if(game.gameOver == false){
            if(game.tiradas < 9){
 game.canvas.addEventListener("click",seleccionar,false);
    mensaje("Pulse su jugada");
}
else{
       mensaje("!GATO¡");
            }
        }
    }
}
const mejorJugada = () =>{
    var mejorJugada = 0;
    // var ii;
    var ficha;
    for (var i = 0; i < game.fichas_array.length; i++) {
        ficha = game.fichas_array[i];
        if(ficha.peso > mejorJugada){
            mejorJugada = ficha.peso;
            ii = i;
        }
        
    }
    return ii;
}
const verificarRenglones = (calculaPeso) =>{
var ficha;
if(game.gameOver == false){
    for(let i = 0; i < game.RENGLONES; i++){
        game.fichas_X = 0;
        game.fichas_O = 0;
    for(let j = 0; j < game.COLUMNAS; j++){
       fichas = buscaFicha(i,j); 
    game.fichas_X += (fichas.valor == "X"? 1 : 0);
    game.fichas_O += (fichas.valor == "O"? 1 : 0);
    }
    if(calculaPeso){
        for(let j = 0; j < game.COLUMNAS; j++){
            ficha = buscaFicha(i,j);
            pesoFicha(ficha.i, game.fichas_O, game.fichas_X);
        }
    }
game.gameOver = verificarFin(game.fichas_O,game.fichas_X);
if(game.gameOver){ break; }
    }

}
};
const verificarColumnas  = (calculaPeso) =>{
var ficha;
    if(game.gameOver == false){
    for(let j = 0; j < game.COLUMNAS; j++){
        game.fichas_X = 0;
        game.fichas_O = 0;
        for(var i = 0; i < game.RENGLONES; i++){
            ficha = buscaFicha(i,j);
            game.fichas_X += (ficha.valor == "X"? 1 : 0);
            game.fichas_O += (ficha.valor == "O"? 1 : 0);
            
        }
        if(calculaPeso){
            for( i = 0; i < game.RENGLONES; i++){
                ficha = buscaFicha(i,j);
pesoFicha(ficha.i, game.fichas_O, game.fichas_X);
// console.log("FICHA: " + ficha.i + "peso: " + ficha.peso);
            }
        }
        game.gameOver = verificarFin(game.fichas_O, game.fichas_X);
        if(game.gameOver){break;}
    }
}
};
const verificarDiagonal1 = (calculaPeso) =>{
var ficha;
if(game.gameOver == false){
    game.fichas_X = 0;
    game.fichas_O = 0;
    for(var i = 0; i < game.RENGLONES; i++){
        ficha = buscaFicha(i,i);
        game.fichas_X += (ficha.valor == "X"? 1 : 0);
        game.fichas_O += (ficha.valor == "O" ? 1 : 0);
    }
    //console.log("D1: X: " + game.fichas:X + ", O: "+game.fichas_O");
if(calculaPeso){
    for(var i = 0; i < game.RENGLONES; i++){
        ficha = buscaFicha(i,i);
        pesoFicha(ficha.i, game.fichas_O, game.fichas_X);
        // console.log("FICHA: " + ficha.i + "peso: " + ficha.peso);
    }
}
game.gameOver = verificarFin(game.fichas_O, game.fichas_X);
}
};
const verificarDiagonal2 = (calculaPeso) =>{
var ficha;
if(game.gameOver == false){
    game.fichas_X = 0;
    game.fichas_O = 0;
    j = 2;
    for(var i = 0; i < game.RENGLONES; i++){
        ficha = buscaFicha(i,j);
        game.fichas_X += (ficha.valor == "X"? 1 : 0);
        game.fichas_O += (ficha.valor == "O"? 1 : 0);
        j--;

    }
//console.log("D2: X: " + game.fichas:X + ", O: "+game.fichas_O");
    if(calculaPeso){
        j = 2;
        for( i = 0; i < game.RENGLONES; i++){
            ficha = buscaFicha(i,j);
            pesoFicha(ficha.i, game.fichas_O, game.fichas_X);
            //console.log("FICHA: " + ficha.i + "peso: " + ficha.peso);
            j--;
        }
    }
    game.gameOver = verificarFin(game.fichas_O, game.fichas);
}
};
const buscaFicha = (ren,col) => {
for(var i = 0; i < game.fichas_array.length; i++){
ficha = game.fichas_array[i];
if(ficha.ren == ren && ficha.col == col){
break;
}
}
return ficha;
}
/**************************
 CALCULA EL PESO DE LA FICHA
 ***************************/
const pesoFicha = (i,fichas_O,fichas_X) =>{
var ficha = game.fichas_array[i];
if(ficha.valor == ""){
if(fichas_O == 2 && fichas_X == 0){
ficha.peso += 10;
}
else if(fichas_O == 0 && fichas_X == 2){
ficha.peso += 6;
}
else if ( fichas_O == 2 && fichas_X == 0){
ficha.peso += 3;    
}else{
    ficha.peso += 1;
    
}
}else{
    ficha.peso = 0;
}
}
// const verificaFin = (O,X) =>{

// }

 /************
verificar si es el fin
 ************/ 
const verificarFin = (O,X) =>{
    var fin = false;
    if( X == 3){
        fin = true;
        mensaje("Felicidades ganaste");
    }
    if(O == 3){
        fin = true;
        mensaje("Lo siento perdiste");
    }
    return fin;
}
 /************
 INICIO
 ************/ 

window.onload= function (){
    game.canvas = document.getElementById("canvas");
    if(game.canvas && game.canvas.getContext){
game.ctx = game.canvas.getContext("2d");
if(game.ctx){
mensaje("Pulsa una celda ...");
    gato();
    canvas.addEventListener("click",seleccionar,false);
}
else{
    
   
}

    }
}
// file:///C:/Users/DrawH/Desktop/entrenandocode2022/muchosgamesenjs/canvas/memoriagame/index.html