let pintarbtn = document.querySelector(".pintarbtn");
let game ;
pintarbtn.addEventListener("click", () =>{
    
let  colorSelect = document.getElementById("color").value;
let radio1 = document.querySelector(".radio1").value;
  game = {
    ctx:null,
    canvas:null,
    radio:  Number.parseInt(radio1),
    bolaX:300,
    bolaY:200,
    colorBola: colorSelect,
    disX : Math.floor(Math.random() * 5),
    disY: Math.floor(Math.random() * -5),
   
    limiteDerecha:0,
    limiteIzquierda:0,
    limiteArriba:0,
    limiteAbajo:0,
}

let inicio = () => {
/* establece el ancho de la línea del borde de la pelota en el canvas.*/
game.ctx.lineWidth = game.radio;
/*  establece el color de la pelota en el canvas.*/
game.ctx.fillStyle = game.colorBola;
/* establece el límite derecho de la pelota, que es el ancho del canvas menos el radio de la pelota.*/
game.limiteDerecha = game.canvas.width - game.radio;
/* establece el límite izquierdo de la pelota, que es el radio de la pelota.*/
game.limiteIzquierda= game.radio;
/* establece el límite inferior de la pelota, que es la altura del canvas menos el radio de la pelota.*/
game.limiteAbajo = game.canvas.height - game.radio;
/* establece el límite superior de la pelota, que es el radio de la pelota.*/
game.limiteArriba = game.radio;
}
function mueve(){
    game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
    verificar();   
    game.bolaX += game.disX;
    game.bolaY += game.disY;

game.ctx.beginPath();
game.ctx.arc(game.bolaX,game.bolaY,game.radio,0,2*Math.PI,true);
game.ctx.fill();    
}
const verificar = ()=>{
    let nbolax = game.bolaX + game.disX;
    let nbolay = game.bolaY + game.disY;
    
    if(nbolax > game.limiteDerecha){
        game.disX *= -1;
        nbolax = game.limiteDerecha;
    }
    if(nbolax < game.limiteIzquierda){
        game.disX *= -1;
        nbolax = game.limiteIzquierda;
    }
    
    if(nbolay > game.limiteAbajo){
        game.disY *= -1;
        nbolay = game.limiteAbajo;
    }
    if(nbolay < game.limiteArriba){
        game.disY *= -1;
        nbolay = game.limiteArriba;
    }
    
    
    game.bolaX =  nbolax;
    game.bolaY =  nbolay;
}








    game.canvas = document.getElementById("canvas");
    if(game.canvas && game.canvas.getContext){
        game.ctx = game.canvas.getContext("2d");
       if(colorSelect !="" && radio1 != null && radio1 > 0){
        if(game.ctx){
            
            inicio();
            mueve();
            setInterval(mueve,60);
            
            
            }
            else{
                
                
            }
       }
       else{
        alert("Elige un color o ingresa el tamaño de la pelota, tambien el tamaño debe ser 1 en adelante")
       }
 

}



 });

   

