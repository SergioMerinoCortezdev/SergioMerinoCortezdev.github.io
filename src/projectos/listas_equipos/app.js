
let ver = document.querySelector('.see');
const marcas_select = document.querySelector('.marcas-select');
let modelTxt = document.querySelector('.input-models');
const resultado_table = document.querySelector('.table_model'); 
const  tableHead = document.querySelector('.table-primary');


const data_excelJson = async () => {

    //llamamos al archivo excel y lo convertimos a json
    const response = await fetch('./db/equipos030926.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const excel = XLSX.read(arrayBuffer, { type: 'array' });
    const nameSheet = excel.SheetNames[0];
    const dataExcel = XLSX.utils.sheet_to_json(excel.Sheets[nameSheet]);




    


    const MarcaArray = new Map();
        
    dataExcel.forEach(element => {
        // ternario para saber si existe valores en blanco lo ponga null
        // y tambien se cambia a mayusculas para que no haya problemas de comparacion
        const marca = element.Marca ? element.Marca.trim().toUpperCase() : null;
        
        if(!marca) return;

        //comparamos si la marca ya existe en el Map, 
        // si no existe la agregamos con un array que contenga el objeto completo
        if(!MarcaArray.has(marca)){
            // guarada el objeto completo element
            MarcaArray.set(marca, [element]);
        } else {
            // si ya existe la marca, agregamos el objeto completo al array correspondiente
            MarcaArray.get(marca).push(element);
        }
    });

    MarcaArray.forEach((modelos, marca) =>{
        let options  = document.createElement('option');
        options.innerText = marca;
        options.value = marca;
        marcas_select.appendChild(options);
    });

    //ACTUALIZAR LA TABLA
    const renderizarTabla = () => {

      

        // Obtenemos lo que el usuario quiere buscar
        const marcaSeleccionada = marcas_select.value;
        const textoBuscado = modelTxt.value.trim().toLowerCase();

        if (!marcaSeleccionada){
            resultado_table.innerHTML = ""; // Limpiamos la tabla si no hay marca seleccionada
            return;
        }
        

            
            // Extraemos todos los objetos completos de esa marca desde el Map
            const datosDeMarca = MarcaArray.get(marcaSeleccionada) || [];
            
            //  Filtramos los modelos que coincidan con lo que escribió el usuario
            const modelosFiltrados = datosDeMarca.filter(item => 
                item.Modelo && String(item.Modelo).toLowerCase().includes(textoBuscado)
            );
        

        if(marcas_select.value === "all") {

      

            tableHead.innerHTML = `
        <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>SKU</th>
            <th>Enrolamiento</th>
            <th>Recomendaciones</th>
        </tr>
    `;


            // Mostrar todos los modelos
                const allModels = [];

            MarcaArray.forEach(modelos => {
                allModels.push(...modelos);
            });
            const datosAll = allModels.filter(item => 
                item.Modelo && String(item.Modelo).toLowerCase().includes(textoBuscado)
            );
            // Proceder con la lógica de filtrado para mostrar todos
            showAll(datosAll);
            return; // Salimos de la función para no continuar con el filtrado por marca
        }

        else{
            tableHead.innerHTML = `
        <tr>
            <th>Modelo</th>
            <th>SKU</th>
            <th>Enrolamiento</th>
            <th>Recomendaciones</th>
        </tr>
    `;
        }


        // Limpiamos la tabla antes de agregar los nuevos resultados
        resultado_table.innerHTML = "";

        // Pintamos los resultados usando las propiedades exactas de tu Excel
        modelosFiltrados.forEach(item => {
            const tr = document.createElement('tr');
           
            tr.innerHTML = `
                <td>${item.Modelo }</td>
                <td>${item.SKUNUMBER }</td> 
                <td>${item.Enrolamiento }</td>
                <th>${item.Recomendaciones}</th>
            `;
            resultado_table.appendChild(tr);
        });
    };


    function showAll(MODELS_ARRAY) {


        resultado_table.innerHTML = ""; // Limpiamos la tabla antes de agregar los nuevos resultados
        

            MODELS_ARRAY.forEach(item => {
                
                const tr = document.createElement('tr');
         

            tr.innerHTML = `

                <td>${item.Marca}</td>
                <td>${item.Modelo }</td>
                <td>${item.SKUNUMBER }</td> 
                <td>${item.Enrolamiento }</td>
                <th>${item.Recomendaciones}</th>
            `;

            resultado_table.appendChild(tr);
            
            
        });




    }

    
    // listeners llaman a la funcion de renderizar
    marcas_select.addEventListener("change", renderizarTabla);
    
    // Usamos 'input' en lugar de 'change' para que busque mientras escribes en tiempo real
    modelTxt.addEventListener("input", renderizarTabla); 
};

data_excelJson();
