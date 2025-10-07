
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  let flag = false;

  toggle.addEventListener("click", () => {
    if(!flag){
      toggle.classList.toggle("active");
      menu.classList.toggle("show");
      toggle.classList.add('close_menu');
      toggle.classList.remove('menu_icon');
      flag = true;
    }
    
   else  if(flag){
      flag = false;
      toggle.classList.remove('close_menu');
      toggle.classList.add('menu_icon');
    menu.classList.remove("show");
     toggle.classList.remove("active");
    }

  });

  // Cerrar menú 
  document.querySelectorAll(".nav__links a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("show");
      toggle.classList.remove("active");
      toggle.classList.remove('close_menu');
      toggle.classList.add('menu_icon');
    });
  });



 /*********scroll************/


ScrollReveal({ reset: true });
ScrollReveal().reveal('.portafolio',{delay:250});
ScrollReveal().reveal('.card1',{delay:500});
ScrollReveal().reveal('.card2',{delay:600});
ScrollReveal().reveal('.card3',{delay:700});
ScrollReveal().reveal('.lenguajes',{delay:200});
ScrollReveal().reveal('.footer',{delay:500});

