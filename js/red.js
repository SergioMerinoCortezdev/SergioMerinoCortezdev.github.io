document.addEventListener('DOMContentLoaded',() =>{
  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  var adD = document.querySelector('.copyright');
 adD.innerHTML = '&copy;copyright Sergio Merino Cortez ' + year;
  
window.onload=function bo(){
document.body.style.overflowX = 'hidden';

  
  


 ( function(){
  $('.btn').click(function(){
      $(this).toggleClass('active');
      return $('.box').toggleClass('open');
  });
}).call(this);


$(function() {
var btn = $(".btndown");

btn.on("click", function() {
  
  $(this).addClass('btn-progress');
  setTimeout(function() {
    btn.addClass('btn-fill');
  }, 500);
  
  setTimeout(function() {
    btn.removeClass('btn-fill');
  }, 4100);
  
  setTimeout(function() {
    btn.addClass('btn-complete');
   
    
  }, 4100);
setTimeout(function(){
  window.open('CV/Sergiocv.pdf', '_blank');
},5100);
});

})




function linkspagqrs() {
window.open('qrs.html', '_blank');
}
var btnxona= $('#xonabtn');
$('#xonabtn').click(function(){
window.open('xonacaweb/xonaca2.html','_blank');
})

function linkscalcu() {
window.open('calculadora/index.html', '_blank');
}





}



})


