const listaCarrito = document.querySelector('#lista-carrito');
const vacio = document.querySelector('#vacio');
const comprarBtn = document.querySelector('#comprar-btn');
const mensaje = document.querySelector('#mensaje');
const spinner = document.querySelector('#spinner');

//*MANEJAR LOS HORARIOS DEL LOCAL:
const hoy = new Date();
const hora = hoy.getHours();
const hoySemana = hoy.getDay();

let abierto = false;

document.addEventListener('DOMContentLoaded', () => {
    
    if(hoySemana === 1 && hora >= 10 && hora < 22){
        abierto = true;
    }else if(hoySemana === 2 && hora >= 10 && hora < 22){
        abierto = true;
    }else if(hoySemana === 3 && hora >= 10 && hora < 22){
        abierto = true;
    }else if(hoySemana === 4 && hora >= 10 && hora < 22){
        abierto = true;
    }else if(hoySemana === 5 && hora >= 10 && hora < 22){
        abierto = true;
    }else if(hoySemana === 6 && hora >= 10 && hora < 23){
        abierto = true;
    }else if(hoySemana === 0 && hora >= 10 && hora < 20){
        abierto = true;
    }
});

//*ARREGLO DEL CARRITO:
articulosCarrito = [];

//*COOKIE DEL CARRITO
document.addEventListener('DOMContentLoaded', async () => {

    try{

        const carrito = await axios.get('/api/pedidos/cart/list');
        const cart = carrito.data.data;

        if(!carrito){

            articulosCarrito = [];
            
        }else{

            articulosCarrito = [...cart.items];

            carritoHTML();
        }

    }catch(error){

        console.error(error);
    }

});

//*IMPRIMIR CONTENIDO DEL CARRITO:
function carritoHTML(){

    let timeout;

    articulosCarrito.forEach(i => {

        const div = document.createElement('div');
        div.classList.add('w-full', 'shadow-2xl', 'overflow-hidden', 'sm:rounded-lg', 'border-b', 'border-gray-200', 'bg-gray-100');
        div.innerHTML = `

        <div class="m-10 flex flex-col lg:flex-row gap-7">
                        
            <div>
                <img src="${i.imagen}" alt="foto de producto" class="w-96 h-auto">
            </div>

            <div class="lg:w-[50%]">
                <h3 class="text-azul fuente-A text-2xl lg:text-4xl uppercase pb-5 lg:pb-10">${i.nombre}</h3>
                <div class="flex justify-between pb-2 lg:pb-5">
                    <p>Cantidad:</p>
                    <p>${i.cantidad}</p>
                </div>

                <div class="flex justify-between pb-2 lg:pb-5">
                    <p>Precio:</p>
                    <p class="font-bold">$${i.precio}</p>
                </div>

                <div class="text-red-600">
                    <a href="#" data-id="${i.id}" class="borrar hover:text-red-950 ease-in-out delay-150 duration-300">Eliminar(1)</a>
                </div>
            </div>

        </div>   

        `;

        listaCarrito.appendChild(div);
    });

    if(articulosCarrito.length > 0){
        timeout = setTimeout(()=>{
            clearTimeout(timeout);
            spinner.classList.add('hidden');
            vacio.classList.add('hidden');
            comprarBtn.classList.remove('hidden');  
        }, 500);
    }else{
        timeout = setTimeout(()=>{
            clearTimeout(timeout);
            spinner.classList.add('hidden');
            vacio.classList.remove('hidden');
            comprarBtn.classList.add('hidden');  
        }, 500);
    }
};


//Eliminar productos del carrito:
listaCarrito.addEventListener('click', e => {

    e.preventDefault();

    if(e.target.classList.contains('borrar')){

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
        location.reload();
    }

});


//Vaciar el carrito:
const vaciarCart = document.querySelectorAll('[data-vaciar]');

vaciarCart.forEach(i => {

    i.addEventListener('click', async e => {
        e.preventDefault();
    
        articulosCarrito = [];
    
        await axios.post('/api/pedidos/cart', articulosCarrito);
    
        carritoHTML();
        location.reload();
    });

});



//*MODAL PARA ELEJIR EL TIPO DE PEDIDO:
const modalPedido = document.querySelector('[data-modal]');
const closeModal = document.querySelectorAll('[data-close-modal]');

comprarBtn.addEventListener('click', () => {

    modalPedido.showModal();

});

closeModal.forEach(i => {

    i.addEventListener('click', () => {

        modalPedido.close();
        modalPickup.close();
        modalDelivery.close();
    
    })

});



//*MODAL PICK-UP:
const pickupBtn = document.querySelector('#pedido-pickup');
const modalPickup = document.querySelector('[data-modal-pickup]');

pickupBtn.addEventListener('click', () => {
    modalPickup.showModal();
});

//SELECTS
const fecha = document.querySelector('#fecha-pickup');
const horaPickup = document.querySelector('#hora-pickup');
const horas = horaPickup.querySelectorAll('option');
const asap = horaPickup.querySelector('#asap');
const local = document.querySelector('#local');
const formPickup = modalPickup.querySelector('#form-pickup');
const formBtn = document.querySelector('#confirmar-pickup');

horaPickup.disabled = true;
local.disabled = true;
formBtn.disabled = true;

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

    console.log(timePickup)

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

    const localPickup = e.target.value;

    console.log(localPickup)
    
    formBtn.disabled = false;
});

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

        console.log(newPedido)

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




//*MODAL DELIVERY:
const modalDelivery = document.querySelector('[data-modal-delivery]');
const delivBtn = document.querySelector('#pedido-delivery');

//INPUTS
const formDelivery = document.querySelector('#form-delivery');
const inputRadio = formDelivery.querySelectorAll('input');
const textArea = document.querySelector('#escribir');
const telDelivery = document.querySelector('#tel-delivery-input');
const mapa = document.querySelector('#map');
const deliveryBtn = document.querySelector('#confirmar-delivery');

const textoVal = /^[\s\S]{1,200}$/g;
const telVal = /(?:^[0]?[1-9]{2}|^[0]?[1-9]{2}?)[9]?[1-9]\d{3}?\d{4}$/;

deliveryBtn.disabled = true;
let valtexto = false;
let valTel = false;
let valGeoLat = false;
let valGeoLon = false;

//EVENTOS:
delivBtn.addEventListener('click', () => {

    if(!abierto){

        createNotificacion(true, 'lo sentimos estamos cerrados. Intente mañana.');

    }else{
        
        modalDelivery.showModal();
        formDelivery.reset();
    }

});

const updateTelInput = debounce(tel => {
    valTel = telVal.test(tel);
    validar(telDelivery, valTel);
});

telDelivery.addEventListener('input', e => {
    updateTelInput(e.target.value);
})

inputRadio.forEach(radio => {

    radio.addEventListener('change', e => {
        const seleccion = e.target.value;
        if(seleccion === 'actual'){

            mapa.classList.remove('hidden');
            mapa.classList.add('flex');
            textArea.classList.add('hidden');
            textArea.classList.remove('flex');

            geolocationAPI();

        }else if(seleccion === 'escribir'){

            textArea.classList.remove('hidden');
            textArea.classList.add('flex');
            mapa.classList.add('hidden');
            mapa.classList.remove('flex');

            textArea.addEventListener('input', validacion);

        }
    });

});

//MAPA GEOLOCATION API
function geolocationAPI(){

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        // mostrat mapa con los datos latitude / longitude.
        mapa.innerHTML = `<iframe width="300" height="200" src="https://maps.google.com/maps?q=${latitude},${longitude}&amp;z=15&amp;output=embed"></iframe>`;

        valGeoLat = latitude;
        valGeoLon = longitude;

        validar(inputRadio, valGeoLat);
        validar(inputRadio, valGeoLon);
    });


};

const updateTextArea = debounce(text => {
    valtexto = textoVal.test(text);
    validar(textArea, valtexto);
});

function validacion(e){
    updateTextArea(e.target.value);
};

function debounce(cb, delay = 500){
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            cb(...args);
        }, delay);
    }
}

const validar = (input, value) => {

    deliveryBtn.disabled = valtexto && valTel || valTel && valGeoLat && valGeoLon ? false : true;

    if(value){
        input.classList.remove('border-red-700', 'border-2');
        input.classList.add('border-green-700', 'border-2');
    }else if(input.value === ''){
        input.classList.remove('border-green-700', 'border-2');
        input.classList.remove('border-red-700', 'border-2');
    }else{
        input.classList.remove('border-green-700', 'border-2');
        input.classList.add('border-red-700', 'border-2');
    }
};


//*CONFIRMAR EL PEDIDO:
formDelivery.addEventListener('submit', async e => {

    e.preventDefault();
    console.log('enviar pedido')

    try{

        if(valtexto === true){

            console.log('escribir')
            console.log(textArea.value)
            const newPedido = {
                pedido: articulosCarrito,
                tipoPedido: 'Delivery',
                telefono: telDelivery.value,
                destino: textArea.value
            }

            console.log(newPedido)

            const response = await axios.post('/api/pedidos/set-delivery', newPedido);

            createNotificacion(false,response.data.message);

            setTimeout(()=>{

                window.location.href = '/caja';
    
                formDelivery.reset();
                modalDelivery.close();
    
            },2000);

        }else{

            const newPedido = {

                pedido: articulosCarrito,
                tipoPedido: 'Delivery',
                telefono: telDelivery.value,
                destino: {
                    lat: valGeoLat,
                    long: valGeoLon
                }
            }

            console.log(newPedido)

            const response = await axios.post('/api/pedidos/set-delivery', newPedido);

            createNotificacion(false,response.data.message);

            setTimeout(()=>{

                window.location.href = '/caja';
    
                formDelivery.reset();
                modalDelivery.close();
    
            },2000);

        }
        

    }catch(error){
        console.log(error);
        createNotificacion(true,error.response.data.error);
    }

});


function pedirOnline(){
    location.href = '/pide-online';
}




