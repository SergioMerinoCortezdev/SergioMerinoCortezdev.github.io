const search = document.getElementById("listp");
const template = document.getElementById("template");
const modalform = document.getElementById("miModal");
const closemodal = document.getElementById("cerrarModal");
const contenedorCampos = document.getElementById("contenedorCampos");
const modalTitulo = document.getElementById("modalTitulo");
const btnGuardar = document.getElementById("btnGuardar");
const btnCopy = document.getElementById("btnCopy");

let plantillaActual = null;


/******************** OBJETOS ************************** */

// Configuración de las plantillas y los campos que requiere cada una
const configuracionPlantillas = {
  "llamada-dat": {
    titulo: "Datos para Llamada DAT",
    campos: [
      { id: "imei", label: "IMEI", type: "text", placeholder: "15 dígitos" },
      { id: "nombre", label: "Nombre", type: "text", placeholder: "Nombre completo" },
      { id: "sucursal", label: "Sucursal / Grupo", type: "text", placeholder: "Ej. Sucursal Centro" },
      { id: "numero", label: "Número de contacto", type: "number", placeholder: "Ej. 2221234567" }
    ],
    generarTexto: (datos) => 
      `IMEI: ${datos.imei}\nNombre: ${datos.nombre}\nDe donde contacta: ${datos.sucursal}\nNúmero: ${datos.numero}\nSe mandó el desbloqueo`
  },

  "llamada-cel": {
    titulo: "Datos para Llamada CEL",
    campos: [
      { id: "imei", label: "IMEI", type: "text", placeholder: "IMEI 15 dígitos" },
      { id: "nombre", label: "Nombre", type: "text", placeholder: "Nombre completo" },
      { id: "origen", label: "De donde contacta", type: "text", placeholder: "Sucursal - grupo" },
      { id: "numContacto", label: "Número para contactar", type: "number", placeholder: "numero del cliente a contactar" },
      { id: "numMarco", label: "Número de donde marcó", type: "number", placeholder: "numero donde marco" }
    ],
    generarTexto: (datos) => 
      `IMEI: ${datos.imei}\nNombre: ${datos.nombre}\nDe donde contacta: ${datos.origen}\nNúmero para contactar: ${datos.numContacto}\nNúmero de donde marcó: ${datos.numMarco}\nSe mandó el desbloqueo`
  },

  "aviso-llamada": {
    titulo: "Aviso de Bloqueo a Titular",
    campos: [
      { id: "nombreTitular", label: "Nombre del Titular", type: "text", placeholder: "Ej. Juan Pérez" }
    ],
    generarTexto: (datos) => 
      `Aviso importante: si el titular del financiamiento no responde la llamada, el celular será bloqueado de forma inmediata ¿confirma que el titular ${datos.nombreTitular} contestará la llamada?`
  },

"link-contrato":{
  titulo:"link-contrato",
  campos:[
    { id: "nombre",  label: "Nombre", type: "text", placeholder: "Nombre completo"},
    { id: "link",  label: "Link", type: "text", placeholder: "link contrato"},

  
  ],
  generarTexto:(datos)=>
    `Hola ${datos.nombre} 👋

¡Bienvenido a Credicel!
Para continuar con tu proceso, es necesario completar la firma de tu contrato digital.

Solo debes ingresar al siguiente enlace y seguir los pasos:
🔗 ${datos.link}
Ahí podrás realizar tu prueba de vida y firmar tu contrato de manera rápida y segura.
Una vez finalizado, tu trámite continuará automáticamente.

Credicel, siempre a tu servicio.
`
},

"formato-sistemas":{
  titulo:"formatosistemas",
  campos:[
    {id: "nombre", label:"Nombre del cliente / CURP / Folio", type:"text", placeholder: "Nombre del cliente / CURP / Folio"},
    {id: "imei", label:"IMEI", type:"text", placeholder: "IMEI"},
    {id: "dat", label:"DAT", type:"text", placeholder: "DAT"},
    {id: "tienda", label:"Tienda", type:"text", placeholder: "Tienda"},
    {id: "descripcion", label:"Descripcion", type:"text", placeholder: "Descripcion"},
  ],
  generarTexto:(datos)=>

    `Nombre del cliente / CURP / Folio: ${datos.nombre}
    IMEI: ${datos.imei}
    DAT: ${datos.dat}
    Tienda: ${datos.tienda}
    Descripción: ${datos.descripcion}
    
    
    `
  
}


};


const plantillasRapidas = {

  "sergio-saludo":{
    texto: "Hola te atiende Sergio por privado"
  },

  "sergio-ayuda":{
    texto: "Hola ¿como te puedo ayudar?"
  },

  "contrato-no-whatsapp":{
    texto:`Se valida que la firma del contrato lo esta realizando desde NAVEGADOR de WHASTAPP por ello no le permite continuar ❌. 
   La prueba de vida y firma del contrato se debe realizar desde navegador de *GOOGLE CHROME*, realice lo siguiente:
    1. Favor de dar clic en los tres puntos en la parte superior de la pantalla
    2. Seleccione copiar vinculo/link
    3. Abra GOOGLE CHROME & pegue el enlace copiado
    4. Active desde el navegador los permisos de CÁMARA 📷 & UBICACIÓN  📌
    5. Genere una vez más la prueba de vida por favor`
  },

  "bloqueo-robo-extravio":{
    texto: `Favor de proporcionar una carta escrita con puño y letra del cliente mediante una fotografía con los siguientes datos:
📌 TITULO de la carta: "Solicitud de bloqueo"

1.- Fecha de solicitud del bloqueo
2.- Nombre completo
3.- Contenido de la carta:
Yo (nombre completo) solicito el bloqueo del equipo por robo/extravío con IMEI: (indique IMEI completo), soy consiente que el bloqueo no me exime de realizar los pagos semanales puntualmente,  por lo cual me comprometo a liquidar el total del financiamiento.
4.- Firma del cliente
Luego de ello por favor:
Coloque la INE del cliente encima de la carta sin tapar la información, y envié foto de la carta + INE 📸
Si el cliente ya no cuenta con la INE puede tomarse una foto sosteniendo el documento de la solicitud y también brindar un numero de contacto del cliente por favor. Reforzar que deben enviar número de contacto`
  },

  "retirar-app-ineq":{

    texto: `Para retirar INEQ por favor reinicie el equipo y ya sin abrir INEQ retire la aplicación de la siguiente manera:
          1. Ingrese a Configuraciones ⚙️
          2. Posteriormente Aplicaciones.
          3. Localice Aplicaciones Instaladas.
          4. Después Aplicaciones Predeterminadas. 5. Demos clic en App de Inicio y seleccione otra aplicación que no sea INEQ y me comparte foto 📸
          (Si presenta dudas me brinda imagen de cada paso para apoyarle e irle guiando)
          `
  },

  "nip-contrato":{
    texto:`¿Me puede ayudar brindándome el Folio del cliente y su numero telefónico por favor?
          Así vamos a poder brindarle el (NIP/CONTRATO)`
  },

  "enrolamiento-honor-xiaomi-expres-nuevo":{
    texto:`Pasos para Equipos (XIAOMI Y HONOR) para enrolamiento Express (Sin INEQ)
        1. Colocar el IMEI del equipo en la plataforma de Credicel y usar el botón de verificar.
        2. Una vez que salga el mensaje de enrolamiento, ya puedes encender el equipo y conectarlo a Wifi.(Configurarlo de manera normal, si lo enciendes antes de la pantalla de enrolamiento no se podrá vender
        3. Una vez que ya este configurado esperar el mensaje de enrolamiento en la pantalla del equipo y darle siguiente.
        4. Validar que te deje avanzar con la venta.
        `
  },

  "folio-rechazado":{
    texto:`Folio rechazado ❌😔
    El sistema de evaluación de financiamiento considera diversos factores, y en este momento no es posible aprobar el financiamiento para su cliente.
Le invitamos a intentarlo más adelante, ya que nuestras evaluaciones se actualizan constantemente. Se recomienda realizar una nueva solicitud en un periodo de 2 a 3 meses.
¡Gracias por su confianza en CREDICEL! 🫡
`
  }

}





/******************* FUNCIONES ******************** */


btnCopy.addEventListener('click', async()=>{

const textoc = template.innerText;

try {

  await navigator.clipboard.writeText(textoc);
  btnCopy.innerText = "✅copiado";
  
  
} 
catch (error) {
  console.log("error de copy es ->", error);
}

setTimeout(function(){
btnCopy.innerText = "📋 Copiar";

},4000);

});




// Escuchar cambios en el <select>
search.addEventListener('change', (e) => {
  
  const opcionSeleccionada = e.target.value;
  
  plantillaActual = configuracionPlantillas[opcionSeleccionada];





  // Si la plantilla requiere campos, construimos el formulario y abrimos el modal
  if (plantillaActual) {

    construirFormulario(plantillaActual);
    
    modalTitulo.innerText = plantillaActual.titulo;
    
    modalform.style.display = "flex";
  
  } 

  else {


  fastTemplate(opcionSeleccionada,plantillasRapidas);

  }
});


function fastTemplate(opcionSeleccionada,templateArray){

  let textTemplate = Object.keys(templateArray);


  for(let i = 0; i< textTemplate.length; i++){

    const key = textTemplate[i];

    if(opcionSeleccionada === key){

      
      template.innerText = templateArray[key].texto;
      break;


    }
    
  } 
  


}



// Función que crea los <input> dinámicamente
function construirFormulario(config) {

  contenedorCampos.innerHTML = ""; // Limpiar campos anteriores

  config.campos.forEach(campo => {

    const div = document.createElement("div");

    div.className = "form-group";

    div.innerHTML = `

    <label for="${campo.id}">${campo.label}</label>

    <input type="${campo.type}" id="${campo.id}" class="input-dinamico" placeholder="${campo.placeholder}">
    `;

    console.log("esto tare el config ",config)

    contenedorCampos.appendChild(div);

  });

}

// Guardar y generar la plantilla
btnGuardar.addEventListener('click', () => {

  if (!plantillaActual) return;


  const inputs = document.querySelectorAll(".input-dinamico");

  const datosRecabados = {};

  let hayVacios = false;

  // Recolectar valores de los campos generados
  inputs.forEach(input => {

    if (input.value.trim() === "") {

      hayVacios = true;

    }

    datosRecabados[input.id] = input.value;

  });

  if (hayVacios) {
    alert("Por favor llena todos los campos necesarios.");
    return;
  }

  // Generar el texto y pasarlo al contenedor de la vista previa
  template.innerText = plantillaActual.generarTexto(datosRecabados);

  modalform.style.display = "none";

});

// Cerrar Modal

closemodal.addEventListener('click', () => {

  modalform.style.display = "none";

});