ScrollReveal({ reset: true });
ScrollReveal().reveal('.portafolio',{delay:250});
ScrollReveal().reveal('.card1',{delay:500});
ScrollReveal().reveal('.card2',{delay:600});
ScrollReveal().reveal('.card3',{delay:700});
ScrollReveal().reveal('.lenguajes',{delay:200});
ScrollReveal().reveal('.footer',{delay:500});

  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    menu.classList.toggle("show");
  });

  // Cerrar menú al hacer clic en enlace
  document.querySelectorAll(".nav__links a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("show");
      toggle.classList.remove("active");
    });
  });



 

