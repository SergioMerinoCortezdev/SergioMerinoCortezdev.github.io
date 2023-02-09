(function() {
   /* en lugar de nodos lo convetimos en un array  con los 3 puntos y encerrandolo entre []*/
   const sliders = [...document.querySelectorAll('.slider_body')];
   const arrowNext = document.querySelector('#after');
   const arrowBefor = document.querySelector('#before');
   const parrafoslider = document.querySelectorAll('.abajodelparrafo');
   let botones = document.createElement('BUTTON');
   let value;
   let comprobar = false;
    agregarbotonespro();
 
   arrowNext.addEventListener('click', ()=>changePosition(1));
   
   arrowBefor.addEventListener('click', ()=>changePosition(-1));
   
   
   

   function changePosition(change){
      const currenElement = Number(document.querySelector('.slider_body--show').dataset.id);
    value = currenElement;
    value += change;
    
    if(value === 0 || value === sliders.length+1 ){
    //    value = value === 0 ? sliders.length : 1;
    if (value === 0) {
        value = sliders.length;
      } else {
        value = 1;
      }
        }
        sliders[currenElement-1].classList.toggle('slider_body--show');     
        sliders[value-1].classList.toggle('slider_body--show');     

  
        
    }
    
    
  
  function agregarbotonespro(){
    

    botones.classList.add('botondelslider');
    botones.textContent=`Ver todos los projectos`;
    // botones.addEventListener('click', ()=>verprojectos());
    for (let i = 0; i < parrafoslider.length; i++) {
      parrafoslider[i].appendChild(botones.cloneNode(true));
      parrafoslider[i].addEventListener('click',verprojectos);
    }
    
    
 
    
  }
  
  

  

function verprojectos(){
  

  

   console.log('ya diste click en el boton');
   setTimeout(()=>{

     window.open('Projectos.html', '_blank');
  },3000);
 
}
  
   

    })()