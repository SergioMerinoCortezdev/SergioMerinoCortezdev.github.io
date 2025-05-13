const btn_cv = document.querySelector('.hero_button_cv');

btn_cv.addEventListener('click',()=>{
   
    btn_cv.classList.add('hero_button_cv_progress');

    setTimeout(function(){
        btn_cv.classList.add('hero_button_cv_fill');
    },100)

    setTimeout(function(){
    btn_cv.classList.remove('hero_button_cv_fill');
    },4200)

    setTimeout(function(){
    btn_cv.classList.add('hero_button_cv_complete');
    },4400)
    
    setTimeout(function(){
    btn_cv.classList.remove('hero_button_cv_complete');
    },8800)

     setTimeout(function(){
    btn_cv.classList.remove('hero_button_cv_progress');
    },4800)

    



});