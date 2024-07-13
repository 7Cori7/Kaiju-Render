const listaReservas = document.querySelector('#lista-reservas');
const vacio = document.querySelector('#vacio');
const modalQR = document.querySelector('[data-modal-QR]');
const spinner = document.querySelector('#spinner');

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


//*IMPRIMIR RESERVACIONES PENDIENTES:
document.addEventListener('DOMContentLoaded', obtenerReservas);

async function obtenerReservas(){

    try{

        let timeout;

        const persona = await axios.get('/api/users/galleta');
        const person = persona.data.data;

        const {email} = person;

        const lista = await axios.get('/api/reservaciones/lista');
        const list = lista.data.data;

        const listaUsuario = list.filter(i=> i.correo === email);

        if(listaUsuario.length > 0){

            listaUsuario.forEach(i => {

                const {fecha, hora, mesa, cantidad, salida, id} = i;

                //en caso de reservación con fecha pasada:
                if(fecha < hoy){

                    borrarReservacion(i);

                }
            
                const div = document.createElement('div');
                div.classList.add('min-w-full', 'lg:min-w-[49%]', 'shadow-2xl', 'overflow-hidden', 'sm:rounded-lg', 'border-b', 'border-gray-200', 'bg-gray-100');
            
                div.innerHTML = `
            
                        <div class="m-10">
                        
                            <h3 class="text-azul text-lg md:text-3xl">Fecha: ${fecha}</h3>
                            <p class="pt-5 text-gray-600 text-sm md:text-lg">Hora: ${hora}:00</p>
                            <p class="pt-5 text-gray-600 text-sm md:text-lg">Número de mesa: ${mesa}</p>
                            <p class="pt-5 text-gray-600 text-sm md:text-lg">Catidad de personas: ${cantidad}</p>
                            <p class="py-5 text-gray-600 text-sm md:text-lg">Salida: ${salida}:00</p>

                            <div class="w-full flex justify-center items-center azul py-3 px-10 rounded-3xl hover:bg-teal-300 cursor-pointer transition ease-in-out delay-150 duration-300">
                            <a href="#" data-reserva="${id}" class="text-white hidden md:flex md:text-xl QR">Mostrar QR</a>

                            <a href="#" data-reserva="${id}" class="text-white md:hidden QR">QR</a>
                            </div>
                        </div>
            
                        `
            
                        listaReservas.appendChild(div);
            
                });

            
            timeout = setTimeout(()=>{
                clearTimeout(timeout);
                spinner.classList.add('hidden');
                vacio.classList.add('hidden');
            },500)

        }else{
            
            timeout = setTimeout(()=>{
                clearTimeout(timeout);
                spinner.classList.add('hidden');
                vacio.classList.remove('hidden');
            },500)
        } 
        

    }catch(error){
        console.log(error)
        createNotificacion(true,error.response.data.error)
    }

};

//*Borrar reservaciones pasadas:
async function borrarReservacion(reservacion){

    await axios.post('/api/reservaciones/delete', reservacion);

    obtenerReservas();

};


//*Mostrar QR:
listaReservas.addEventListener('click', e => {

    if(e.target.classList.contains('QR')){

        modalQR.show();

        const id = e.target.dataset.reserva;

        const QR = document.querySelector('#show-QR');
        
        QR.innerHTML = `<img src="http://api.qrserver.com/v1/create-qr-code/?data=${id}&size=200x200" alt="Código QR"/>`

    }

});


const closeModal = document.querySelector('[data-close-modal]').addEventListener('click', e => {
    e.preventDefault();
    modalQR.close();
})