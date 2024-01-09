const lista1 = document.querySelector('#lista1');
const lista2 = document.querySelector('#lista2');
const vacio1 = document.querySelector('[data-vacio1]');
const vacio2 = document.querySelector('[data-vacio2]');

var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1; //como los mesese son de 0 a 11, se le suma 1
var yyyy = hoy.getFullYear();
if(dd<10){
dd='0'+dd
} 
if(mm<10){
mm='0'+mm
} 
hoy = yyyy+'-'+mm+'-'+dd;

//*carrito
articulosCarrito = [];

document.addEventListener('DOMContentLoaded', async () => {

    try{

        const carrito = await axios.get('/api/pedidos/cart/list');
        const cart = carrito.data.data;

        if(!carrito){
            
            articulosCarrito = [];
            
        }else{
            console.log(cart.items)

            articulosCarrito = [...cart.items];

            if(articulosCarrito.length > 0){

                lista1.innerHTML = `
                    <div class="min-w-[50%] shadow-2xl overflow-hidden sm:rounded-lg border-b border-gray-200 bg-gray-100">

                    <div data-vacio1 class="m-10 flex justify-center align-center text-azul text-xl">
                        <h3>Su <i class='bx bxs-cart'></i> de compras posee <b>${articulosCarrito.length}</b> artículos</h3>
                    </div>

                    <div class="m-10 flex justify-center align-center text-azul ">
                        <button class="carrito-btn border-blue-400 border-2 px-7 py-3 rounded-3xl hover:border-blue-950 hover:text-blue-950 transition-all ease-in-out delay-150 duration-300">ver carrito</button>
                    </div>

                    </div>
                `

                vacio1.classList.add('hidden');

            }else{
                vacio1.classList.remove('hidden');
            }

        }

    }catch(error){

        console.log(error)

    }

});

lista1.addEventListener('click', e => {

    if(e.target.classList.contains('carrito-btn')){

        location.href = '/carrito-usuario';

    }else if(e.target.classList.contains('pedir-btn')){

        location.href = '/pide-online';

    }

});


//*Reservaciones
document.addEventListener('DOMContentLoaded', async () => {

    try{

        const persona = await axios.get('/api/users/galleta');
        const person = persona.data.data;

        const {email} = person;

        const lista = await axios.get('/api/reservaciones/lista');
        const list = lista.data.data;

        const listaUsuario = list.filter(i=> i.correo === email);
        console.log(listaUsuario)

        listaUsuario.forEach(i => {

            const {fecha} = i;

            //en caso de reservación con fecha pasada:
            if(fecha < hoy){

                borrarReservacion(i);

            }
        });

        if(listaUsuario.length === 1){

            lista2.innerHTML = `

                <div class="min-w-[50%] shadow-2xl overflow-hidden sm:rounded-lg border-b border-gray-200 bg-gray-100">

                    <div data-vacio1 class="m-10 flex justify-center align-center text-azul text-xl">
                        <h3>Tiene <b>${listaUsuario.length}</b> reservación pendiente</h3>
                    </div>

                    <div class="m-10 flex justify-center align-center text-azul ">
                        <button class="reserva-btn border-blue-400 border-2 px-7 py-3 rounded-3xl hover:border-blue-950 hover:text-blue-950 transition-all ease-in-out delay-150 duration-300">ver reservaciones</button>
                    </div>

                </div>

            `
            vacio2.classList.add('hidden');

        }else if(listaUsuario.length > 1){

            lista2.innerHTML = `

                <div class="min-w-[50%] shadow-2xl overflow-hidden sm:rounded-lg border-b border-gray-200 bg-gray-100">

                    <div data-vacio1 class="m-10 flex justify-center align-center text-azul text-xl">
                        <h3>Tiene <b>${listaUsuario.length}</b> reservaciones pendientes</h3>
                    </div>

                    <div class="m-10 flex justify-center align-center text-azul ">
                        <button class="reserva-btn border-blue-400 border-2 px-7 py-3 rounded-3xl hover:border-blue-950 hover:text-blue-950 transition-all ease-in-out delay-150 duration-300">ver reservaciones</button>
                    </div>

                </div>

            `
            vacio2.classList.add('hidden');

        }else{
            vacio2.classList.remove('hidden');
        }

    }catch(error){
        console.log(error)
        createNotificacion(true, error.response.data.error);
    }

});

lista2.addEventListener('click', e => {

    if(e.target.classList.contains('reserva-btn')){

        location.href = '/booking-usuario';

    }else if(e.target.classList.contains('reservar-btn')){

        location.href = '/reservar';

    }

});


//*Borrar reservaciones pasadas:
async function borrarReservacion(reservacion){

    await axios.post('/api/reservaciones/delete', reservacion);


};