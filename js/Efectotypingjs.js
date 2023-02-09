const textoDisplay = document.getElementById('textotyping');
const fraces = ['Developer', 'C#','sql','javascript','css','html'];
let i = 0;
let j = 0;
let fraceactual = [];
let final = false;
let final1 = false;

function loop(){
final1 = false;
    textoDisplay.innerHTML=fraceactual.join('');

    if(i < fraces.length){

if(!final && j <= fraces[i].length){

fraceactual.push(fraces[i][j]);
j++;
textoDisplay.innerHTML=fraceactual.join('');
}
if(final && j <= fraces[i].length){
    fraceactual.pop(fraces[i][j]);
    j--;
    textoDisplay.innerHTML=fraceactual.join('');
}
if(j == fraces[i].length ){
   final1 = true;
    final = true;
}
if(final && j === 0){
    fraceactual = [];
    final = false;
    i++;
    if(i === fraces.length){
        i = 0;
    }
}

}
const spedUp = Math.random() * (80 -50) + 50;
const velocidadnormal =  Math.random() * (300 -200) + 200;
const time = final1 ? 2000 : final ? spedUp : velocidadnormal;
setTimeout(loop, time);
}

loop();