document.addEventListener('DOMContentLoaded', function(){

const email = {
  email:'',
  asunto:'',
  mensaje:''
}
console.log(email);
///selecciona los elementos de la interfaz
const inputEmail = document.querySelector('#email');
const inputAsunto = document.querySelector('#asunto');
const inputMensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#enviar-mail');
const btnsubmit = document.querySelector('#enviar-mail button[type="submit"]');
const btnreset = document.querySelector('#resetBtn');
const spinner = document.querySelector('#spinner');
//Asignar evento
inputEmail.addEventListener('input',validar);
inputAsunto.addEventListener('input',validar);
inputMensaje.addEventListener('input',validar);
formulario.addEventListener('submit',enviarEmail);

btnreset.addEventListener('click',resetearform);
function resetearform(){

email.email='';
email.asunto='';
email.mensaje='';
formulario.reset();
comprobarEmail();
}


function enviarEmail(e){
e.preventDefault();
spinner.style.display = 'flex';

setTimeout(()=>{

  spinner.style.display = 'none';
  resetearform();

//crear alerta

const alertaExito = document.createElement('P');
alertaExito.classList.add('bg-green-500','text-white','p-2','text-center','rounded-lg','mt-10','font-bold','text-sm','uppercase');
alertaExito.textContent = 'Mensaje enviado';
formulario.appendChild(alertaExito);
setTimeout(()=>{
alertaExito.remove();
},3000);
},3000);

}



function validar(evento){
    //el trim es para eliminar espacios en blanco
if(evento.target.value.trim()===''){
/*
La propiedad parentElement devuelve el elemento principal del especificado elemento.

La diferencia entre parentElement y nodo padre, es ese elemento padre devoluciones nulo si el nodo principal no es un nodo de elemento:
*/ 
Mostraralerta(`El campo ${evento.target.id} es obligatorio`,evento.target.parentElement);
email[evento.target.id] = '';
comprobarEmail();
return;
}
if( evento.target.id === 'email' && !Validarmail(evento.target.value)){
    Mostraralerta('El mail no es valido',evento.target.parentElement);
    comprobarEmail();
return;
}
LimpiarAlerta(evento.target.parentElement);
    
//asignar valores
email[evento.target.id] = evento.target.value.trim().toLowerCase();

//comprobar  el objeto email
comprobarEmail();

}

function Mostraralerta(mensaje, referencia){
LimpiarAlerta(referencia);



//generar html
const error = document.createElement('P');
error.textContent= mensaje;
error.classList.add('bg-red-600','text-white', 'p-2','text-center');

//inyectar el error al formulario
referencia.appendChild(error);

}
function LimpiarAlerta(referencia){
  /*Comprueba si ya existe una alerta*/
const alerta = referencia.querySelector('.text-white');
if(alerta){
alerta.remove();
}
    
}
function Validarmail(mail){
const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\+)*(\.\w{2,10})+$/;
const resultado = regex.test(mail);
return resultado;

}

function comprobarEmail(){
  if(Object.values(email).includes('')){
    btnsubmit.classList.add('opacity-50');
    btnsubmit.classList.add('cursor-not-allowed');
    btnsubmit.disable = true;
 return;
  }
  btnsubmit.classList.remove('opacity-50');
  btnsubmit.classList.remove('cursor-not-allowed');
  btnsubmit.disable = false;
  

}

});

