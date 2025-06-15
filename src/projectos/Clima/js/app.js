
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const fromulario = document.querySelector('#formulario');
var imagen = document.querySelector('#cuerpo');

  
window.addEventListener('load', ()=>{
    fromulario.addEventListener('submit', buscarClima);

})

function buscarClima(e){
e.preventDefault();
//validar

const ciudad = document.querySelector('#ciudad').value;
const pais = document.querySelector('#pais').value;
if(ciudad === '' || pais === ''){
mostrarError('Ambos campos son obligatorios');
return;
}

//consultar api
consultarAPI(ciudad,pais);

}


function mostrarError(mensaje){
    const alerta =  document.querySelector('.bg-red-100');
    if(!alerta){
        
        //crear una alerta 
      const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'boder-red-400', 'text-red-700','px-4', 'py-3', 'rounded', 'max-w-md','mx-auto','mt-6', 'text-center');
        alerta.innerHTML = `
        <strong class = "font-bold">Error!</strong>
        <span class = "block">${mensaje}</span>
        
        
        `;
        container.appendChild(alerta);
        //eliminar alerta
        setTimeout(()=>{
            alerta.remove();
        },5000)
    }


}

function consultarAPI(ciudad,pais){
    const appID = 'fe531b4ab30616b60b1f819ba950c4bb';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`; 
    Spiner();
    fetch(url).then(respuesta =>{
return respuesta.json();
    }).then(datos =>{
        //limpiar el html previo
        limpiarHTML(); 
if(datos.cod === '404'){
mostrarError('Ciudad no encontrada');
}
else{

    //imprime la respuesta en html
    mostrarClima(datos);
}
    })
    

}

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min }, weather } = datos;
    const centigrados = KelvinaCentigrados(temp);
    bacimg(centigrados); 

    const max = KelvinaCentigrados(temp_max);
    const min = KelvinaCentigrados(temp_min);
    const icono = weather[0].icon;
    const descripcion = weather[0].description;

    const nombreciuda = document.createElement('p');
    nombreciuda.textContent = `Clima en ${name}`;
    nombreciuda.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados}&#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max}&#8451`;
    tempMax.classList.add('text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min}&#8451`;
    tempMin.classList.add('text-xl');

    // Crear imagen del ícono
    const iconoImg = document.createElement('img');
    iconoImg.src = `https://openweathermap.org/img/wn/${icono}@2x.png`;
    iconoImg.alt = descripcion;
    iconoImg.classList.add('mx-auto');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-black');

    resultadoDiv.appendChild(nombreciuda);
    resultadoDiv.appendChild(iconoImg);  
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);
    resultado.appendChild(resultadoDiv);
}



// function mostrarClima(datos){
//     const {name,main:{temp, temp_max, temp_min}} = datos;
//     const centigrados = KelvinaCentigrados(temp);
//     debugger;
//     bacimg(centigrados);
     
    
//     const max = KelvinaCentigrados(temp_max);
//     const min = KelvinaCentigrados(temp_min);
// const nombreciuda = document.createElement('p');
// nombreciuda.textContent = `Clima en ${name}`;
// nombreciuda.classList.add('font-bold','text-2xl');

//     const actual = document.createElement('p')
//     actual.innerHTML = `${centigrados}&#8451`;
//     actual.classList.add('font-bold','text-6xl');
    
//     const tempMax = document.createElement('p');
//     tempMax.innerHTML = `Max: ${max}&#8451`;
// tempMax.classList.add('text-xl');

// const tempMin = document.createElement('p');
// tempMin.innerHTML = `Min: ${min}&#8451`;
// tempMin.classList.add('text-xl');


//     const resultadoDiv = document.createElement('div');
//     resultadoDiv.classList.add('text-center','text-black');
    
//     resultadoDiv.appendChild(nombreciuda);
//     resultadoDiv.appendChild(actual);
//     resultadoDiv.appendChild(tempMax);
//     resultadoDiv.appendChild(tempMin);
//     resultado.appendChild(resultadoDiv);
// }


function KelvinaCentigrados(grados){
    return Math.round(grados - 273.15);
    // return parseInt(grados - 273.15);
    // actual.innerHTML = `${Math.round(centigrados)}ºC`;
    
}

function bacimg(centigrados) {
    imagen.style.backgroundImage = '';

    if (centigrados >= 27) {
        imagen.style.backgroundImage = 'url("https://64.media.tumblr.com/e9a736e2d11edd2342c472f0645e6993/tumblr_pk9oj7x7U71v1hotuo1_540.gif")';
        imagen.style.backgroundRepeat = "no-repeat";
        imagen.style.backgroundSize = "100%";

    } else if (centigrados <= 21) {
        imagen.style.backgroundImage = 'url("https://i.gifer.com/BkCU.gif")';
        imagen.style.backgroundRepeat = "no-repeat";
        imagen.style.backgroundSize = "100%";
    } else {
        // Fondo por defecto o clima templado
        imagen.style.backgroundImage = 'url("https://i.pinimg.com/originals/88/b8/5a/88b85afd0581a4d9b1d937b25c60e4f2.gif")';
        imagen.style.backgroundRepeat = "no-repeat";
        imagen.style.backgroundSize = "100%";
    }
}




function limpiarHTML(){
   
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spiner(){
    const divspiner = document.createElement('div');
    divspiner.classList.add('spinner');
    divspiner.innerHTML = `  <div class="dot1"></div>
    <div class="dot2"></div>`;
    resultado.appendChild(divspiner);
}

