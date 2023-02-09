let ancho = window.screen.width; 
let alto = window.screen.height;







if(ancho == 375 && alto == 667){
    console.log("resolucion iphone se");
  

    botonreponse();

}
if(ancho == 414 && alto == 896){
    console.log("resolucion iphone xr");

botonreponse();



}
if(ancho == 390 && alto == 844){
    console.log("resolucion iphone 12 pro");
    
    botonreponse();
    
    
}
if(ancho == 393 && alto == 851){
    console.log("resolucion pixi");
    
    botonreponse();
    
    
    
    
    
}
if(ancho == 360 && alto == 740){
    console.log("resolucion galaxy s8");
    
    botonreponse();
    
    
}
if(ancho == 412 && alto == 915){
    console.log("resolucion galaxy s20 ultra");
    
    botonreponse();
    
    
    
    
    
}
if(ancho == 820 && alto == 1180){
    console.log("resolucion ipad air");
    
    // botonreponse();
    
    
    
    
    
    
}
if(ancho == 768 && alto == 1024){
    console.log("resolucion ipad mini");

    // botonreponse();
    
    
    
}
if(ancho == 912 && alto == 1368){
    console.log("resolucion surface pro 7");
    // botonreponse();
    
    
    
    
    
}

if(ancho == 540 && alto == 720){
    console.log("resolucion surface duo");
    
    // botonreponse();
    
    
    
    
    
    
}
if(ancho == 280 && alto == 653){
    console.log("resolucion galaxy fold");
    
    
    botonreponse();
    
    
    
    
}
if(ancho == 412 && alto == 914){
    console.log("resolucion galaxy a51/71");
  
    botonreponse();
    
    
    
}
if(ancho == 414 && alto == 736){
    console.log("resolucion iphone 6-7-8");
  
    botonreponse();
    
    
    
}
if(ancho == 1024 && alto == 600){
    console.log("resolucion nest hub");
    
    // botonreponse();
    
    
    
    
    
}
if(ancho == 1280 && alto == 800){
    console.log("resolucion nest hub max");
    
    
    // botonreponse();


}



function botonreponse(){
    const brand = document.querySelector('.brand');
    const menunoresp = document.querySelector('.menu');
    
    if (brand) {
      menunoresp.remove();
    } else {
   
    }
   

   
    const header = document.querySelector('.header1');
    const nav = document.querySelector('.navbar');
    const menurespo = document.createElement('ul');
    const menuItem = document.createElement('li');
    const menuLink = document.createElement('a');
    const subMenu = document.createElement('ul');
    const subMenuItem1 = document.createElement('li');
    const subMenuLink1 = document.createElement('a');
    const subMenuItem2 = document.createElement('li');
    const subMenuLink2 = document.createElement('a');
    
    menuItem.classList.add('menu');
    menuLink.setAttribute('href', '#');
    menuLink.innerHTML = '<span class="fontawesome-reorder"></span>';
  
    subMenu.classList.add('more');
    subMenuLink1.setAttribute('href', '#portafolio-seccion');
    subMenuLink1.innerHTML = '<span class="spanproyectos">Proyectos</span>';
    subMenuItem1.appendChild(subMenuLink1);
    
    subMenuLink2.setAttribute('href', '#socialmediabtn');
    subMenuLink2.innerHTML = '<span class="spanredes">Redes</span>';
    subMenuItem2.appendChild(subMenuLink2);
    
    subMenu.appendChild(subMenuItem1);
    subMenu.appendChild(subMenuItem2);
    
    menuItem.appendChild(menuLink);
    menuItem.appendChild(subMenu);
    menurespo.appendChild(menuItem);
    nav.appendChild(menurespo);
    header.append(nav);

  
   
    
    let menu = document.querySelector('.menu');
    let ocultos = document.querySelector('.more');
    let remover = document.querySelector('.fontawesome-reorder');
    let veronover = "";
    
    var navbar = document.getElementsByClassName("menu")[0];
    
    
    menu.addEventListener("click",ocultar);
    
    function ocultar(){
       
    if(remover.classList.value === "fontawesome-reorder"){
       
        remover.classList.remove("fontawesome-reorder");
        remover.classList.add("fontawesome-remove");
        ocultos.classList.remove("more");
        ocultos.classList.add("more1");
    }
    
    else if(remover.classList.value === "fontawesome-remove"){
        remover.classList.remove("fontawesome-remove");
        remover.classList.add("fontawesome-reorder"); 
        ocultos.classList.remove("more1");
    ocultos.classList.add("more");
    }
    }
 

   }
