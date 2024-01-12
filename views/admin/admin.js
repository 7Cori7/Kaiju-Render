const listaSushi = document.querySelector('#listado-sushi');
const listadoBar = document.querySelector('#listado-bar');

//arreglo:
let productosArr = [];

//*OBTENER LOS PRODUCTOS DE LA BD
document.addEventListener('DOMContentLoaded', async () => {

    try{

        //Menu Sushi:
        const productos = await axios.get('/api/menus/lista')
        const productosMenu = productos.data.data;

        productosArr.push(productosMenu);

        productosMenu.forEach(i => {

            const {nombre, precio, categoria, id} = i;
            const row = document.createElement('tr');

            row.innerHTML += `
            
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${nombre}</p>
                </td>
                                
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">$${precio}</p>
                </td>
                               
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${categoria}</p>
                </td>
                               
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

                <a href="#" data-producto="${id}" class="text-teal-600 mr-5 hover:text-teal-900 text-sm edit-sushi">Editar</a>

                <a href="#" data-producto="${id}" class="text-red-600 hover:text-red-900 eliminar text-sm">Eliminar</a>

                </td>

            `
            
            listaSushi.appendChild(row);

        });

        //Menu Bar:
        const barProductos = await axios.get('/api/bares/lista');

        const productosBar = barProductos.data.data;

        productosArr.push(productosBar);

        productosBar.forEach(i => {

            const {nombre, precio, categoria, id} = i;

            const row = document.createElement('tr');

            row.innerHTML += `
            
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${nombre}</p>
                </td>
                                
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">$${precio}</p>
                </td>
                               
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${categoria}</p>
                </td>
                               
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

                <a href="#" data-producto="${id}" class="text-teal-600 mr-5 hover:text-teal-900 text-sm edit-bar">Editar</a>

                <a href="#" data-producto="${id}" class="text-red-600 hover:text-red-900 eliminar text-sm">Eliminar</a>

                </td>

            `
            listadoBar.appendChild(row);

        });

    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);

    }

});

console.log(productosArr)

//*FILTROS
const filtroSelect = document.querySelector('#filtro-categorias');

filtroSelect.addEventListener('change', e => {

    const select = e.target.value;

    if(select === 'Todo'){

        document.startViewTransition(()=>{

            cargarLista();

        });

    }else{

        document.startViewTransition(()=>{
            
            filtrarMenu(select);

        }); 

    }
    

});

function filtrarMenu(select){

    const productos = productosArr.flat();

    const filtrado = productos.filter(i => i.categoria === select);

    if(select === 'Cerveza' || select === 'Coctel' || select === 'Vino'){

        mostrarFiltroBar(filtrado);

    }else{

        mostrarFiltroSushi(filtrado);

    }


}

//Mostrar filtro en el HTML:
function mostrarFiltroBar(productos){

    limpiarHTML();

    productos.forEach(i => {

        const {nombre, precio, categoria, id} = i;

        const row = document.createElement('tr');

        row.innerHTML += `
        
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">${nombre}</p>
            </td>
                            
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">$${precio}</p>
            </td>
                           
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">${categoria}</p>
            </td>
                           
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

            <a href="#" data-producto="${id}" class="text-teal-600 mr-5 hover:text-teal-900 text-sm edit-bar">Editar</a>

            <a href="#" data-producto="${id}" class="text-red-600 hover:text-red-900 eliminar text-sm">Eliminar</a>

            </td>

        `
        listadoBar.appendChild(row);

    });

};

function mostrarFiltroSushi(productos){

    limpiarHTML();
    console.log(productos.length)

    productos.forEach(i => {

        const {nombre, precio, categoria, id} = i;
        const row = document.createElement('tr');

        row.innerHTML += `
        
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">${nombre}</p>
            </td>
                            
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">$${precio}</p>
            </td>
                           
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">${categoria}</p>
            </td>
                           
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

            <a href="#" data-producto="${id}" class="text-teal-600 mr-5 hover:text-teal-900 text-sm edit-sushi">Editar</a>

            <a href="#" data-producto="${id}" class="text-red-600 hover:text-red-900 eliminar text-sm">Eliminar</a>

            </td>

        `
        
        listaSushi.appendChild(row);

    });

};

function cargarLista(){

    limpiarHTML();

    //Sushi:
    productosArr[0].forEach(i => {

        const {nombre, precio, categoria, id} = i;
        const row = document.createElement('tr');

        row.innerHTML += `
            
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${nombre}</p>
                </td>
                                
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">$${precio}</p>
                </td>
                               
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${categoria}</p>
                </td>
                               
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

                <a href="#" data-producto="${id}" class="text-teal-600 mr-5 hover:text-teal-900 text-sm edit-sushi">Editar</a>

                <a href="#" data-producto="${id}" class="text-red-600 hover:text-red-900 eliminar text-sm">Eliminar</a>

                </td>

        `
            
        listaSushi.appendChild(row);

    });

    //Bar:
    productosArr[1].forEach(i => {

        const {nombre, precio, categoria, id} = i;

        const row = document.createElement('tr');

        row.innerHTML += `
            
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${nombre}</p>
                </td>
                                
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">$${precio}</p>
                </td>
                               
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${categoria}</p>
                </td>
                               
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

                <a href="#" data-producto="${id}" class="text-teal-600 mr-5 hover:text-teal-900 text-sm edit-bar">Editar</a>

                <a href="#" data-producto="${id}" class="text-red-600 hover:text-red-900 eliminar text-sm">Eliminar</a>

                </td>

        `
        listadoBar.appendChild(row);

    });

};

function limpiarHTML(){

    while(listaSushi.firstChild){

        listaSushi.removeChild(listaSushi.firstChild);

    };

    while(listadoBar.firstChild){

        listadoBar.removeChild(listadoBar.firstChild);

    };

};


//*PRODUCTOS SUSHI:

//*MODAL NUEVO SUSHI
const modalNuevoMenu = document.querySelector('[data-modal-nuevo-sushi]');
const nuevoSushiBtn = document.querySelector('#nuevo-sushi');
const cerrarModal = document.querySelectorAll('[data-close-modal]');
const formSushi = document.querySelector('#form-nuevo-sushi');

nuevoSushiBtn.addEventListener('click', (e) => {

    e.preventDefault();
    modalNuevoMenu.showModal();

});

cerrarModal.forEach(i => {
    i.addEventListener('click', () => {
        formSushi.reset();
        formBar.reset();
        modalNuevoMenu.close();
        modalNuevoBar.close();
    })
});


//*INPUTS:
const nombreSushiInput = document.querySelector('#nombre-sushi');
const precioSushiInput = document.querySelector('#precio-sushi');
const categoriaSushi = document.querySelector('#categoria-sushi');
const descripcionSushi = document.querySelector('#descripcion-sushi');
const imagenInput = document.querySelector('#imagen-sushi');

//*CREAR NUEVO SUSHI:
formSushi.addEventListener('submit', async () =>{

    try{

        //Conseguir el valor del campo "imagen":
        let img = imagenInput.value.split('\\');
        const imagenSushi = img[2];

        //Objeto para guardar los datos:
        const newSushi = {
            nombre: nombreSushiInput.value,
            precio: precioSushiInput.value,
            categoria: categoriaSushi.value,
            ingredientes: descripcionSushi.value,
            imagen: imagenSushi
        };

        formSushi.reset();

        //REQUEST:
        const response = await axios.post('/api/menus', newSushi);

        console.log(response);

        createNotificacion(false,response.data.message);

        setTimeout(()=>{

            location.reload();

        }, 2000);

    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);

    };


})

//*MODAL EDITAR SUSHI
const editarSushiBtn = document.querySelector('#editar-sushi');
const modalEditSushi = document.querySelector('[data-modal-editar-sushi]');
const cerrarModalEdit = document.querySelectorAll('[data-close-modal-edit]');
const formEditSushi = document.querySelector('#form-edit-sushi');
//inputs:
const editNombreSushi = document.querySelector('#edit-nombre-sushi');
const editPrecioSushi = document.querySelector('#edit-precio-sushi');
const editCategSushi = document.querySelector('#edit-categoria-sushi');
const editIngredSushi = document.querySelector('#edit-ingred-sushi');
const nombreImgSushi = document.querySelector('#nombre-imagen-sushi');
const editImgSushi = document.querySelector('#edit-imagen-sushi');

listaSushi.addEventListener('click', async e => {

    e.preventDefault();
    
    try{
        //*ELIMINAR PRODUCTO:
        if(e.target.classList.contains('eliminar')){

            const productoId = {

                _id: e.target.dataset.producto

            }
            console.log(productoId);
    
           const confirmar = confirm('Quieres eliminar este producto');
    
           if(confirmar){
    
            const response = await axios.post('/api/menus/delete', productoId);
    
            createNotificacion(false,response.data.message);

            setTimeout(()=>{

                location.reload();
    
            }, 2000);
    
           }
        };


        //*EDITAR PRODUCTO:
        if(e.target.classList.contains('edit-sushi')){

            modalEditSushi.showModal();

            const productoId = e.target.dataset.producto;

            const productos = await axios.get('/api/menus/lista');

            const productosMenu = productos.data.data;

            //Filtrar por el id:
            const editar = productosMenu.filter( i => i.id === productoId);

            console.log(editar)

            //Inputs:
            editar.forEach( i => {

                editNombreSushi.value = i.nombre;
                editPrecioSushi.value = i.precio;
                editCategSushi.value = i.categoria;
                editIngredSushi.value = i.ingredientes;
                nombreImgSushi.value = i.imagen;

            });

            formEditSushi.addEventListener('submit', async e => {

                e.preventDefault();

                try{
   
                    const productoEditado = {
                        id: productoId,
                        nombre: editNombreSushi.value,
                        precio: editPrecioSushi.value,
                        categoria: editCategSushi.value,
                        ingredientes: editIngredSushi.value,
                        imagen: nombreImgSushi.value
                    };
                
                    const response = await axios.post('/api/menus/edit', productoEditado);

                    createNotificacion(false,response.data.message);

                    modalEditSushi.close();

                    setTimeout(()=>{

                        location.reload();
            
                    }, 1000);

                }catch(error){

                    console.log(error);
                    createNotificacion(true,error.response.data.error);

                }

            });

        };


    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);

    }
    
    

});


cerrarModalEdit.forEach(i => {
    i.addEventListener('click', () => {
        formEditSushi.reset();
        formEditBar.reset();
        modalEditSushi.close();
        modalEditBar.close();
    })
});



//============================================================================================


//*PRODUCTOS BAR:

//*MODAL NUEVO BAR
const modalNuevoBar = document.querySelector('[data-modal-nuevo-bar]');
const nuevoBarBtn = document.querySelector('#nuevo-bar');
const formBar = document.querySelector('#form-nuevo-bar');

nuevoBarBtn.addEventListener('click', (e) => {

    e.preventDefault();
    modalNuevoBar.showModal();

});


//*INPUTS:
const nombreBarinput = document.querySelector('#nombre-bar');
const precioBarinput = document.querySelector('#precio-bar');
const categoriaBarInput = document.querySelector('#categoria-bar');
const descripcionBarInput = document.querySelector('#descripcion-bar');


//*CREAR NUEVO PRODUCTO BAR:
formBar.addEventListener('submit', async () => {

    try{

        //Objeto para guardar:
        const newBar = {
            nombre: nombreBarinput.value,
            precio: precioBarinput.value,
            categoria: categoriaBarInput.value,
            ingredientes: descripcionBarInput.value
        }

        console.log(newBar)

        formBar.reset();

        //request:
        const response = await axios.post('/api/bares', newBar);
        console.log(response);

        createNotificacion(false,response.data.message);

        setTimeout(()=>{

            location.reload();

        }, 2000);

    }catch(error){

        console.log(error)
        createNotificacion(true,error.response.data.error);

    }
});

//*MODAL EDITAR BAR
const modalEditBar = document.querySelector('[data-modal-editar-bar]');
const formEditBar = document.querySelector('#form-edit-bar');
//Inputs:
const nombreEditBar = document.querySelector('#nombre-edit-bar');
const precioEditBar = document.querySelector('#precio-edit-bar');
const categEditBar = document.querySelector('#categoria-edit-bar');
const ingredEditBar = document.querySelector('#edit-descripcion-bar');

listadoBar.addEventListener('click', async e => {

    e.preventDefault();

    try{

        //*ELIMINAR PRODUCTO:
        if(e.target.classList.contains('eliminar')){

            const productoId = {

                _id: e.target.dataset.producto

            }
            console.log(productoId);
    
           const confirmar = confirm('Quieres eliminar este producto');
    
           if(confirmar){
    
            const response = await axios.post('/api/bares/delete', productoId);
    
            createNotificacion(false,response.data.message);

            setTimeout(()=>{

                location.reload();
    
            }, 2000);
    
           }
        };


        //*EDITAR PRODUCTO:
        if(e.target.classList.contains('edit-bar')){

            modalEditBar.showModal();

            const productoId = e.target.dataset.producto;

            const productos = await axios.get('/api/bares/lista');

            const productosBar = productos.data.data;

            //Filtrar por el id:
            const barEdit = productosBar.filter( i => i.id === productoId);
            
            console.log(barEdit)

            //Inputs:
            barEdit.forEach( i => {

                nombreEditBar.value = i.nombre;
                precioEditBar.value = i.precio;
                categEditBar.value = i.categoria;
                ingredEditBar.value = i.ingredientes;

            });

            formEditBar.addEventListener('submit', async e => {

                e.preventDefault();

                try{

                    const productoEditado = {

                        id: productoId,
                        nombre: nombreEditBar.value,
                        precio: precioEditBar.value,
                        categoria: categEditBar.value,
                        ingredientes: ingredEditBar.value

                    };

                    const response = await axios.post('/api/bares/edit', productoEditado);

                    createNotificacion(false,response.data.message);

                    modalEditBar.close();

                    setTimeout(()=>{

                        location.reload();
            
                    }, 1000);

                }catch(error){

                    console.log(error);
                    createNotificacion(true,error.response.data.error);

                };

            });

            
        };


    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);

    }

});
