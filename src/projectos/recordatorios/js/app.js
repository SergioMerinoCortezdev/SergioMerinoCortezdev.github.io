    const todoInput = document.querySelector(".todo-input");
    const todoList = document.querySelector(".todo-list");
    const btnAgregar = document.querySelector("#btnagregar");
    const fechaInput = document.getElementById('fecha');
    const toast = document.querySelector('.toast');
    const cerrar = document.querySelector('.btn-close'); 
    const itsHoy = new Date();
    const notificacionSound = new Audio('./sound/cloud.mpeg')
    let emptyMessage = document.querySelector(".empty-message");
    let tareas =  JSON.parse(localStorage.getItem("tasks")) || []; //si no existe en local storage hace un arreglo vacio
    let tareasparaHoy = [];
    let notificacion = document.querySelector('.toast-body')
    let notificacionDiv = document.querySelector('.notificaciontoast')
    let notificacionfecha = document.querySelector('.tareastitulos')






 cargarFecha();

    function formatearFecha(date) {
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const anio = date.getFullYear();
    return `${anio}-${mes}-${dia}`;
   }

    const hoyFormateado = formatearFecha(itsHoy);


    function notification(mensaje, fechastasks){

    
    setTimeout(function(){
               
        if(fechastasks ===  hoyFormateado){

        notificacionDiv.style.display = 'block';
        
        toast.style.display = 'block';
        notificacionSound.play();
        cerrar.addEventListener('click', ()=>{
            toast.style.display = 'none';
            notificacionSound.pause();
        })
        notificacionfecha.textContent =  fechastasks;
        
    }
    
    
    // notificacion.textContent = mensaje ;
    notificacion.innerHTML = mensaje ;
    
    },3000)
  
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

        if( task.Datetask ===  hoyFormateado ){
            tareasparaHoy.push(task.texto)
        }


    });

    if(tareasparaHoy.length > 0){
        const mensaje = tareasparaHoy.map((tarea)=> `${tarea}`).join('<br>');
        notification(mensaje,hoyFormateado)
    }

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

    todoList.addEventListener('click', (e)=>{
    const idTask = e.target.closest('.todo-item');

    if(e.target.matches('.equis')){
        eliminarTasks(idTask);
    }


  })


    function renderTask(tasks){

    if( tasks.Datetask ===  hoyFormateado ){
        const mensajetext = tasks.texto; 
        const fechastasks = tasks.Datetask;     
        
       

        notification(mensajetext, fechastasks)

    }
       
    createElements(tasks);

   }

    function createElements(tasks){
    
    const tareaList = document.createElement("li");
    const tareadateList = document.createElement("p");
    const eliminarTarea = document.createElement("a");


    tareaList.classList.add("todo-item");
    tareadateList.classList.add("todo-item");
    eliminarTarea.classList.add("equis");

    tareaList.textContent= tasks.texto;
    tareaList.dataset.tareaId = tasks.id;
    tareadateList.textContent = tasks.Datetask; 
    eliminarTarea.innerText ='X';
    
    todoList.appendChild(tareaList);
    tareaList.appendChild(eliminarTarea);
    tareaList.appendChild(tareadateList);
  
    }


    function eliminarTasks(tasksId){
    
    const id = parseInt(tasksId.dataset.tareaId);

    tareas = tareas.filter(task=> task.id !== id )

    saveTasks(tareas);

    tasksId.remove();

  
   

   }


    function limpiarInput(){
    todoInput.value = "";
   }



