//*IMPRIMIR LA LISTA DE PRODUCTOS:
const catBebidas = document.querySelector('#lista-bebidas');
const catRoles = document.querySelector('#lista-roles');
const catTempura = document.querySelector('#lista-tempura');
const catNigiri = document.querySelector('#lista-nigiri');
const catTemaki = document.querySelector('#lista-temakis');
const catEntradas = document.querySelector('#lista-entradas');
const catPostres = document.querySelector('#lista-postres');
const mensaje = document.querySelector('#mensaje');


document.addEventListener('DOMContentLoaded', async () => {

    try{

        //Categoria Bebidas:
        const productosBebidas = await axios.get('/api/menus/categ/bebidas');
        const bebidas = productosBebidas.data.data;

        bebidas.forEach( i => {

            const {nombre, precio, imagen, id} = i;

            const tarjetaBebidas = document.createElement('div');
            tarjetaBebidas.classList.add('bg-white', 'h-full', 'w-full', 'uppercase', 'lg:w-[32%]', 'md:w-[48%]', 'flex', 'flex-col', 'justify-center', 'items-center', 'p-5', 'gap-5', 'rounded-lg', 'shadow-xl');

            tarjetaBebidas.innerHTML += `
            
            <img src="../menu-img/${imagen}" alt="foto de Coca-Cola">
            <h3>${nombre}</h3>
            <p>$${precio}</p>

            <button data-id="${id}" class="agregar-btn hidden md:flex py-2 md:px-14 px-8 text-sm md:text-lg rounded mx-2 text-white fuente-A transition ease-in-out delay-150 hover:bg-blue-300 hover:text-gray-900 shadow-xl hover:scale-110 duration-300 uppercase" style="background-color: #3FA8F4;">agregar al carrito</button>

            <button data-id="${id}" class="agregar-btn md:hidden py-2 md:px-14 px-8 text-sm md:text-lg rounded mx-2 text-white fuente-A transition ease-in-out delay-150 hover:bg-blue-300 hover:text-gray-900 shadow-xl hover:scale-110 duration-300 uppercase" style="background-color: #3FA8F4;">agregar</button>
            
            `

            catBebidas.appendChild(tarjetaBebidas);

        });

        //Categoria Roles Frios:
        const productosRoles = await axios.get('/api/menus/categ/frios');

        const roles = productosRoles.data.data;

        roles.forEach( i => {
            const {nombre, precio, imagen, id} = i;

            const tarjetaRoles = document.createElement('div');
            tarjetaRoles.classList.add('bg-white', 'h-full', 'w-full', 'uppercase', 'lg:w-[32%]', 'md:w-[48%]', 'flex', 'flex-col', 'justify-center', 'items-center', 'p-5', 'gap-5', 'rounded-lg', 'shadow-xl');

            tarjetaRoles.innerHTML +=`
            
            <img src="../menu-img/${imagen}" alt="foto de Coca-Cola">
            <h3>${nombre}</h3>
            <p>$${precio}</p>

            <button data-id="${id}" class="agregar-btn hidden md:flex py-2 md:px-14 px-8 text-sm md:text-lg rounded mx-2 text-white fuente-A transition ease-in-out delay-150 hover:bg-blue-300 hover:text-gray-900 shadow-xl hover:scale-110 duration-300 uppercase" style="background-color: #3FA8F4;">agregar al carrito</button>

            <button data-id="${id}" class="agregar-btn md:hidden py-2 md:px-14 px-8 text-sm md:text-lg rounded mx-2 text-white fuente-A transition ease-in-out delay-150 hover:bg-blue-300 hover:text-gray-900 shadow-xl hover:scale-110 duration-300 uppercase" style="background-color: #3FA8F4;">agregar</button>
            
            `

            catRoles.appendChild(tarjetaRoles);

        });


        //Categoria Roles Tempurizados:
        const productosTempura = await axios.get('/api/menus/categ/fritos');
        const tempura = productosTempura.data.data;

        tempura.forEach( i => {
            const {nombre, precio, imagen, id} = i;

            const tarjetaTempura = document.createElement('div');
            tarjetaTempura.classList.add('bg-white', 'h-full', 'w-full', 'uppercase', 'lg:w-[32%]', 'md:w-[48%]', 'flex', 'flex-col', 'justify-center', 'items-center', 'p-5', 'gap-5', 'rounded-lg', 'shadow-xl');

            tarjetaTempura.innerHTML += `
            
            <img src="../menu-img/${imagen}" alt="foto de Coca-Cola">
            <h3>${nombre}</h3>
            <p>$${precio}</p>

            <button data-id="${id}" class="agregar-btn hidden md:flex py-2 md:px-14 px-8 text-sm md:text-lg rounded mx-2 text-white fuente-A transition ease-in-out delay-150 hover:bg-blue-300 hover:text-gray-900 shadow-xl hover:scale-110 duration-300 uppercase" style="background-color: #3FA8F4;">agregar al carrito</button>

            <button data-id="${id}" class="agregar-btn md:hidden py-2 md:px-14 px-8 text-sm md:text-lg rounded mx-2 text-white fuente-A transition ease-in-out delay-150 hover:bg-blue-300 hover:text-gray-900 shadow-xl hover:scale-110 duration-300 uppercase" style="background-color: #3FA8F4;">agregar</button>

            `

            catTempura.appendChild(tarjetaTempura);
        });


        //Categoria Nigiri:
        const productosNigiri = await axios.get('/api/menus/categ/nigiri');
        const nigiri = productosNigiri.data.data;

        nigiri.forEach( i => {
            const {nombre, precio, imagen, id} = i;

            const tarjNigiri = document.createElement('div');
            tarjNigiri.classList.add('bg-white', 'h-full', 'w-full', 'uppercase', 'lg:w-[32%]', 'md:w-[48%]', 'flex', 'flex-col', 'justify-center', 'items-center', 'p-5', 'gap-5', 'rounded-lg', 'shadow-xl');

            tarjNigiri.innerHTML += `
            
            <img src="../menu-img/${imagen}" alt="foto de Coca-Cola">
            <h3>${nombre}</h3>
            <p>$${precio}</p>
            
            <button data-id="${id}" class="agregar-btn hidden md:flex py-2 md:px-14 px-8 text-sm md:text-lg rounded mx-2 text-white fuente-A transition ease-in-out delay-150 hover:bg-blue-300 hover:text-gray-900 shadow-xl hover:scale-110 duration-300 uppercase" style="background-color: #3FA8F4;">agregar al carrito</button>

            <button data-id="${id}" class="agregar-btn md:hidden py-2 md:px-14 px-8 text-sm md:text-lg rounded mx-2 text-white fuente-A transition ease-in-out delay-150 hover:bg-blue-300 hover:text-gray-900 shadow-xl hover:scale-110 duration-300 uppercase" style="background-color: #3FA8F4;">agregar</button>

            `

            catNigiri.appendChild(tarjNigiri);

        });


        //Categoria Temaki:
        const productosTemaki = await axios.get('/api/menus/categ/temaki');
        const temaki = productosTemaki.data.data;

        temaki.forEach( i => {
            const {nombre, precio, imagen, id} = i;

            const tarjTemaki = document.createElement('div');
            tarjTemaki.classList.add('bg-white', 'h-full', 'w-full', 'uppercase', 'lg:w-[32%]', 'md:w-[48%]', 'flex', 'flex-col', 'justify-center', 'items-center', 'p-5', 'gap-5', 'rounded-lg', 'shadow-xl');

            tarjTemaki.innerHTML += `
            
            <img src="../menu-img/${imagen}" alt="foto de Coca-Cola">
            <h3>${nombre}</h3>
            <p>$${precio}</p>
            
            <button data-id="${id}" class="agregar-btn hidden md:flex py-2 md:px-14 px-8 text-sm md:text-lg rounded mx-2 text-white fuente-A transition ease-in-out delay-150 hover:bg-blue-300 hover:text-gray-900 shadow-xl hover:scale-110 duration-300 uppercase" style="background-color: #3FA8F4;">agregar al carrito</button>

            <button data-id="${id}" class="agregar-btn md:hidden py-2 md:px-14 px-8 text-sm md:text-lg rounded mx-2 text-white fuente-A transition ease-in-out delay-150 hover:bg-blue-300 hover:text-gray-900 shadow-xl hover:scale-110 duration-300 uppercase" style="background-color: #3FA8F4;">agregar</button>

            `
            catTemaki.appendChild(tarjTemaki);
        });


        //Categoria Entradas:
        const productosEntradas = await axios.get('/api/menus/categ/entradas');
        const entradas = productosEntradas.data.data;

        entradas.forEach( i => {
            const {nombre, precio, imagen, id} = i;

            const tarjEntradas = document.createElement('div');
            tarjEntradas.classList.add('bg-white', 'h-full', 'w-full', 'uppercase', 'lg:w-[32%]', 'md:w-[48%]', 'flex', 'flex-col', 'justify-center', 'items-center', 'p-5', 'gap-5', 'rounded-lg', 'shadow-xl');

            tarjEntradas.innerHTML += `
            
            <img src="../menu-img/${imagen}" alt="foto de Coca-Cola">
            <h3>${nombre}</h3>
            <p>$${precio}</p>

            <button data-id="${id}" class="agregar-btn hidden md:flex py-2 md:px-14 px-8 text-sm md:text-lg rounded mx-2 text-white fuente-A transition ease-in-out delay-150 hover:bg-blue-300 hover:text-gray-900 shadow-xl hover:scale-110 duration-300 uppercase" style="background-color: #3FA8F4;">agregar al carrito</button>

            <button data-id="${id}" class="agregar-btn md:hidden py-2 md:px-14 px-8 text-sm md:text-lg rounded mx-2 text-white fuente-A transition ease-in-out delay-150 hover:bg-blue-300 hover:text-gray-900 shadow-xl hover:scale-110 duration-300 uppercase" style="background-color: #3FA8F4;">agregar</button>

            `
            catEntradas.appendChild(tarjEntradas);
        });


        //Categoria Postres:
        const productosPostres = await axios.get('/api/menus/categ/postres');
        const postres = productosPostres.data.data;

        postres.forEach( i => {
            const {nombre, precio, imagen, id} = i;

            const tarjPostres = document.createElement('div');
            tarjPostres.classList.add('bg-white', 'h-full', 'w-full', 'uppercase', 'lg:w-[32%]', 'md:w-[48%]', 'flex', 'flex-col', 'justify-center', 'items-center', 'p-5', 'gap-5', 'rounded-lg', 'shadow-xl');

            tarjPostres.innerHTML += `
            
            <img src="../menu-img/${imagen}" alt="foto de Coca-Cola">
            <h3>${nombre}</h3>
            <p>$${precio}</p>
            
            <button data-id="${id}" class="agregar-btn hidden md:flex py-2 md:px-14 px-8 text-sm md:text-lg rounded mx-2 text-white fuente-A transition ease-in-out delay-150 hover:bg-blue-300 hover:text-gray-900 shadow-xl hover:scale-110 duration-300 uppercase" style="background-color: #3FA8F4;">agregar al carrito</button>

            <button data-id="${id}" class="agregar-btn md:hidden py-2 md:px-14 px-8 text-sm md:text-lg rounded mx-2 text-white fuente-A transition ease-in-out delay-150 hover:bg-blue-300 hover:text-gray-900 shadow-xl hover:scale-110 duration-300 uppercase" style="background-color: #3FA8F4;">agregar</button>

            `
            catPostres.appendChild(tarjPostres);
        });


    }catch(error){
        console.log(error);
        createNotificacion(true,error.response.data.error);
    }

});



//*ESTRUCTURA PARA GUARDAR EL PEDIDO:
let articulosCarrito = [];



//*MODAL PARA AGREGAR AL CARRITO:
const listaProductos = document.querySelector('#lista-productos'); //<--div que contiene todos los productos

const agregarBtn = document.querySelectorAll('.agregar-btn'); //<---boton para abrir modal
const modal = document.querySelector('[data-modal]');
const closeModal = document.querySelector('[data-close-modal]');
const formModal = modal.querySelector('form');
const agregarCarrito = document.querySelector('.agregar-carrito'); //<---boton para agregar producto al carrito


//abrir modal:
listaProductos.addEventListener('click', e => {

    e.preventDefault();

    if(e.target.classList.contains('agregar-btn')){

        modal.showModal();

        formModal.reset();

        const producto = e.target.parentElement;

        mostrarProducto(producto);

    };

});

//*datos del producto en el modal:
async function mostrarProducto(producto){

    //obtener los detalles del producto:
    const productos = await axios.get('/api/menus/lista');
    const products = productos.data.data;
    const id = producto.querySelector('button').getAttribute('data-id');
    const select = products.filter(i => i.id === id);
    const ingredientes = select.map(i => i.ingredientes);

    //mostrar los detalles del producto en el modal:
    modal.querySelector('#tituloP').innerHTML = producto.querySelector('h3').textContent;
    modal.querySelector('#detallesP').innerHTML = ingredientes;
    const precioP = modal.querySelector('#precioP').innerHTML = producto.querySelector('p').textContent;
    modal.querySelector('#totalP').innerHTML = producto.querySelector('p').textContent;

    //sumar el total del precio según la cantidad de producto:
    const precio = parseFloat(precioP.split('$')[1]);
    const cantidadP = modal.querySelector('input')
    
    cantidadP.addEventListener('change', () =>{

        let total = parseFloat(cantidadP.value * precio);

        modal.querySelector('#totalP').innerHTML = '$'+ total.toFixed(1);

    });

    //*GUARDAR EN EL CARRITO:
    formModal.addEventListener('submit', async () => {

        const precioT = parseFloat(modal.querySelector('#totalP').textContent.split('$')[1]);

        //Guardar en un objeto el pedido:
        const infoProducto = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h3').textContent,
        precio: precioT,
        cantidad: parseInt(cantidadP.value),
        id: id,
        precioBase: precio
        };

        //Guardar el nuevo pedido en el arreglo evitando que se dupliquen:
        if(articulosCarrito.some(i => i.id === id)){

            const items = articulosCarrito.map(i => {
                if(i.id === infoProducto.id){
                    return i;
                }else{
                    return i;
                }
            })

            articulosCarrito = [...items];

            const response = await axios.post('/api/pedidos/cart', articulosCarrito);

        }else{

            articulosCarrito = [...articulosCarrito, infoProducto];

            const response = await axios.post('/api/pedidos/cart', articulosCarrito);

        };

        carritoHTML();

    });
    

};

//*cerrar modal:
closeModal.addEventListener('click', () => {

    modal.close();
    formModal.reset();
});



//*CARRITO DE COMPRAS:
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const comprarBtn = document.querySelector('#comprar-btn'); //<---botón para confirmar la compra
const indicador = document.querySelector('.indicador');

//Función para mostrar los productos en el carrito:
function carritoHTML(){
    vaciarCarrito();

    articulosCarrito.forEach(i => {

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${i.imagen}" width=100>
            </td>
            <td>
                ${i.nombre}  
            </td>
            <td>
                $ ${i.precio}
            </td>
            <td>
                ${i.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-producto" data-id="${i.id}">X</a>
            </td>
        `

        contenedorCarrito.appendChild(row);
    });

    if(articulosCarrito.length > 0){
        document.querySelector('.vacio').classList.add('hidden');
        comprarBtn.classList.remove('hidden');
        indicador.innerHTML = `
        <div class="bg-red-500 w-5 h-5 rounded-full absolute text-sm text-white bottom-0 -right-2 flex justify-center items-center">
            <p>${articulosCarrito.length}</p>
        </div>
        `
    }else{
        document.querySelector('.vacio').classList.remove('hidden');
        comprarBtn.classList.add('hidden');
        indicador.innerHTML = '';
    }

}

//Eliminar productos del carrito:
carrito.addEventListener('click', e => {

    e.preventDefault();

    if(e.target.classList.contains('borrar-producto')){

        const productoId = e.target.getAttribute('data-id');
        console.log(productoId)
        const existe = articulosCarrito.some(i => i.id === productoId);

        if(existe){

            const producto = articulosCarrito.map(i=> {

                if(i.id === productoId){

                    if(i.cantidad > 1){

                        async function restar(){

                            i.cantidad--
                            i.precio = i.cantidad * i.precioBase;
                            i;
                            return await axios.post('/api/pedidos/cart', articulosCarrito);

                        }
                        
                        restar().catch(console.error);

                    }else{

                        async function actualizar(){
                            articulosCarrito = articulosCarrito.filter(i => i.id !== productoId);
                            i;
                            return await axios.post('/api/pedidos/cart', articulosCarrito);
                        }
                        
                        actualizar().catch(console.error);

                        
                    }
                }
            })
        }

        carritoHTML();
    }

});

//Funcion para evitar que se dupliquen los productos en el carrito:
function vaciarCarrito(){

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

};


//*COOKIE DEL CARRITO
document.addEventListener('DOMContentLoaded', async () => {

    const carrito = await axios.get('/api/pedidos/cart/list');
    const cart = carrito.data.data;

    if(!carrito){
        
        articulosCarrito = [];
        
    }else{
        console.log(cart.items)

        articulosCarrito = [...cart.items];

        carritoHTML();

    }

});


//*MODAL PARA CONFIRMAR LA COMPRA
const modalPedido = document.querySelector('[data-modal-pedido]');
const closeModal2 = document.querySelector('[data-close-modal2]');

//SELECTS
const fecha = document.querySelector('#fecha-pickup');
const horaPickup = document.querySelector('#hora-pickup');
const horas = horaPickup.querySelectorAll('option');
const asap = horaPickup.querySelector('#asap');
const local = document.querySelector('#local');
const formPickup = modalPedido.querySelector('#form-pickup');
const formBtn = document.querySelector('#confirmar-pickup');

horaPickup.disabled = true;
local.disabled = true;
formBtn.disabled = true;


//EVENTOS
comprarBtn.addEventListener('click', () => {
    
    modalPedido.showModal();

});


fecha.addEventListener('change', e => {

    const dia = e.target.value;

    if(dia === 'tomorrow'){

        asap.disabled = true;
        horaPickup.disabled = false;

    }else if(dia === 'hoy' && abierto){

        asap.disabled = false;
        horas.forEach(i => {
   
            if(i.value <= hora){
                i.disabled = true;
            }else{
                i.disabled = false;
            }
        });

        horaPickup.disabled = false;
    
    }else if(dia === 'hoy' && !abierto){
        
        mensaje.innerHTML = 'lo sentimos estamos cerrados';
        setTimeout(()=>{
            mensaje.innerHTML = '';
            formPickup.reset();
        },2000);

    }

});

horaPickup.addEventListener('change', e => {

    const timePickup = e.target.value;

    if(fecha.value === 'hoy' && timePickup <= hora){

        mensaje.innerHTML = 'Hora inválida';
        setTimeout(()=>{
            mensaje.innerHTML = '';
            formDelivery.reset();
        },2000);

    }else if(fecha.value === 'tomorrow' && timePickup === 'asap'){

        mensaje.innerHTML = 'Hora inválida';
        setTimeout(()=>{
            mensaje.innerHTML = '';
            formDelivery.reset();
        },2000);

    }else{

        local.disabled = false;
    }


});

local.addEventListener('change', e => {

    formBtn.disabled = false;

});


//*CONFIRMAR EL PEDIDO:
formPickup.addEventListener('submit', async e => {
    e.preventDefault();

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var dd = tomorrow.getDate();
    var mm = tomorrow.getMonth()+1; 
    var yyyy = tomorrow.getFullYear();
    if(dd<10){
    dd='0'+dd
    } 
    if(mm<10){
    mm='0'+mm
    } 
    tomorrow = yyyy+'-'+mm+'-'+dd;

    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1; 
    var yyyy = hoy.getFullYear();
    if(dd<10){
    dd='0'+dd
    } 
    if(mm<10){
    mm='0'+mm
    } 
    var today = yyyy+'-'+mm+'-'+dd;

    let date;
    let time;

    if(fecha.value === 'hoy'){
        date = today;
    }else{
        date = tomorrow;
    }

    if(horaPickup.value === 'asap'){
        let minutos = hoy.getMinutes();
        minutos = minutos + 15;
        if(minutos > 59){
            time = hora + 1 +':00';
        }else{
            time = hora +':'+ minutos;
        }
    }else{
        time = horaPickup.value +':00';
    }
    
    try{

        const newPedido = {

            pedido: articulosCarrito,
            tipoPedido: 'Pick-Up',
            fecha: date,
            hora: time,
            destino: local.value
    
        };

        const response = await axios.post('/api/pedidos/set-pickup', newPedido);

        createNotificacion(false,response.data.message);

        setTimeout(()=>{

            window.location.href = '/caja';

            formPickup.reset();
            modalPedido.close();

        },2000);


    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);

    };

});


//cerrar modal:
closeModal2.addEventListener('click', () => {

    formPickup.reset();
    modalPedido.close();

});