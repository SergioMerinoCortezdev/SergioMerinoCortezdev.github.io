const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const objBusqueda = {
moneda:'',
criptomoneda:''
}





//Crear Promise


const obtenerCriptomonedas = criptomonedas => new Promise(resolve =>{
    resolve(criptomonedas);
})




document.addEventListener('DOMContentLoaded',() =>{
    consultarCriptomonedas();
    formulario.addEventListener('submit',submitFormulario);

criptomonedasSelect.addEventListener('change',leerValor);
monedaSelect.addEventListener('change',leerValor);

});


function consultarCriptomonedas(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url).then(respuesta => respuesta.json()).then(resultado =>obtenerCriptomonedas(resultado.Data))
.then(criptomonedas => selectCriptomonedas(criptomonedas))

}

function selectCriptomonedas(criptomonedas){
criptomonedas.forEach(cripto => {
    const {FullName, Name} = cripto.CoinInfo;

const option = document.createElement('option');
option.value = Name;
option.textContent = FullName;
criptomonedasSelect.appendChild(option);

});
}

function leerValor(e){
    // e.preventDefault();
    objBusqueda[e.target.name] = e.target.value;


}



function submitFormulario(e){
e.preventDefault();
//validar

const { moneda,criptomoneda} = objBusqueda;

if(moneda === '' || criptomoneda === ''){
    mostrarAlerta('Ambos campos son obligatorios');
    return;
}

//consultar api con resultados
consultarAPI();

}


function mostrarAlerta(msg){

const existeError = document.querySelector('.error');
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('error');

    if(!existeError){
//mensaje de error
    
divMensaje.textContent = msg;

formulario.appendChild(divMensaje);
setTimeout(()=>{
divMensaje.remove();
},3000);

    }


    

}

function consultarAPI(){
    const {moneda,criptomoneda} = objBusqueda;

const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
mostraSpinn();
fetch(url).then(respuesta => respuesta.json()).then(cotizacion=>{mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda])})


}




function mostrarCotizacionHTML(cotizacion){
    
    limpiarHTML();

    const {PRICE,HIGHDAY,LOWDAY,CHANGEPCT24HOUR,LASTUPDATE} = cotizacion;
    
    const precio = document.createElement('p');
    const precioAlto = document.createElement('p');
    const precioBajo = document.createElement('p');
    const ultimasHoras = document.createElement('p');
    const ultimaActualizacion = document.createElement('p');

    precio.classList.add('precio');


    precio.innerHTML=`El precio es: <span>${PRICE} </span> ` ;  //interpolacion html
    precioAlto.innerHTML=`El precio alto es: <span>${HIGHDAY} </span> ` ;  
    precioBajo.innerHTML=`El precio bajo es: <span>${LOWDAY} </span> ` ;  
    ultimasHoras.innerHTML=`Variacion de las ultimas 24 hoas: <span>${CHANGEPCT24HOUR} %</span> ` ;  
    ultimaActualizacion.innerHTML=`Última actualizacion: <span>${LASTUPDATE} </span> ` ;  
    
    
    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ultimasHoras);
    resultado.appendChild(ultimaActualizacion);
    




}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function mostraSpinn(){
    limpiarHTML();

const spinner = document.createElement('div');

spinner.innerHTML=`
<div class = "bounce1"></div>
<div class = "bounce2"></div>
<div class = "bounce3"></div>`;

resultado.appendChild(spinner);

}