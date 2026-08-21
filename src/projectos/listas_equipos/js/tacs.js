const resultado_table = document.querySelector('.table_model');
let modelTxt = document.querySelector('.input-models');





const data_excel = async()=>{

        //llamamos al archivo excel y lo convertimos a json
    const response = await fetch('./db/equipos.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const excel = XLSX.read(arrayBuffer, { type: 'array' });
    const nameSheet = excel.SheetNames[1];
    const dataExcel = XLSX.utils.sheet_to_json(excel.Sheets[nameSheet]);
    





    const renderizarTabla = () => {

    

            //const datosDeTac = dataExcel.get() || [];
            const textoBuscado = modelTxt.value;
            //  Filtramos los modelos que coincidan con lo que escribió el usuario
            const tacsFiltrados = dataExcel.filter(item => 
                item.TAC && String(item.TAC).toLowerCase().includes(textoBuscado)
            );
        
            
            resultado_table.innerHTML = "";


         tacsFiltrados.forEach(item => {


         const tr = document.createElement('tr');
           
            tr.innerHTML = `
                <td>${item.TAC }</td>
                <td>${item.MARCA }</td> 
                <td>${item.MarketingName }</td>
                <td>${item.ModelNumber }</td>
            `;
            resultado_table.appendChild(tr);


    });


}

    modelTxt.addEventListener('input', renderizarTabla);
renderizarTabla(); // Llamamos a la función para renderizar la tabla inicialmente

};


data_excel();