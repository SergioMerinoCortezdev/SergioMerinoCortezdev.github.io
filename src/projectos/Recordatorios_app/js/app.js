const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const btnAgregar = document.querySelector("#btnagregar");
let emptyMessage = document.querySelector(".empty-message");
const fechaInput = document.getElementById('fecha');
const toast = document.querySelector('.toast');
let tareas =  JSON.parse(localStorage.getItem("tasks")) || []; //si no existe en local storage hace un arreglo vacio
let notificacion = document.querySelector('.toast-body')
let notificacionfecha = document.querySelector('.tareastitulos')
const cerrar = document.querySelector('.btn-close'); 



const itsHoy = new Date();
// const itsHoyFormat = itsHoy.toLocaleDateString();

cargarFecha();

function formatearFecha(date) {
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const anio = date.getFullYear();
    return `${anio}-${mes}-${dia}`;
}

const hoyFormateado = formatearFecha(itsHoy);


function notificar(mensaje, fechastasks){

    
   
    if(fechastasks ===  hoyFormateado){

        toast.style.display = 'block';
        
        cerrar.addEventListener('click', ()=>{
            toast.style.display = 'none';
        })
        notificacionfecha.textContent =  fechastasks;
        
    }
    notificacion.textContent = mensaje ;
  
}

function cargarFecha(){

   
    document.addEventListener('DOMContentLoaded', function() {
        if (fechaInput) {
            const hoy = new Date(); 
      const dia = String(hoy.getDate()).padStart(2, '0');
      const mes = String(hoy.getMonth() + 1).padStart(2, '0');
      const anio = hoy.getFullYear();
      const formateado = `${anio}-${mes}-${dia}`; 
      fechaInput.value = formateado;
    }
  });

}

tareas.forEach(function(task){
    renderTask(task);
});

btnAgregar.addEventListener('click', function(e){
    
    e.preventDefault();
      
    if(todoInput !== ""){

        agregarTarea(todoInput.value)
       
    }
    else{
        
        return;
    }

});

function agregarTarea(task){
    const tasks = {
        id:Date.now(),
        texto:task,
        Datetask:fechaInput.value
    }
  
        createElements(tasks);
        tareas.push(tasks);
        saveTasks(tareas);
    
    limpiarInput();
}

function saveTasks(tasks){
    localStorage.setItem("tasks",JSON.stringify(tasks))
    
}


function renderTask(tasks){

       if( tasks.Datetask ===  hoyFormateado ){
        const mensajetext = tasks.texto; 
        const fechastasks = tasks.Datetask;
       
        notificar(mensajetext, fechastasks)

}
       
    createElements(tasks);

}

function createElements(tasks){
    
    const tareaList = document.createElement("li");
    const tareadateList = document.createElement("p");
    tareaList.classList.add("todo-item");
    tareadateList.classList.add("todo-item");
    tareaList.textContent= tasks.texto;
    tareadateList.textContent = tasks.Datetask; 
    todoList.appendChild(tareaList);
    tareaList.appendChild(tareadateList);

  


}


function limpiarInput(){
    todoInput.value = "";
}



