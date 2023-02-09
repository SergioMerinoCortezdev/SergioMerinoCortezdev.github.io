function generarqr(){
    document.querySelector("#qr-imagen").style.display="block";
    let qr = document .querySelector('#text').value;
    if(qr.trim().length === 0){
        document.querySelector("#qr-imagen .error").innerHTML="porfavor ingreseun texto";
        document.querySelector("#img").style.display="none";
    }

    else{
        document.querySelector("#img").style.display="block";
   
        document.querySelector("#qr-imagen .error").innerHTML="";
        document.querySelector("#img").src="http://api.qrserver.com/v1/create-qr-code/?size=240*240&data=" + qr;
    }
}