const listadoReservas = document.querySelector('#admin-listado-reservas');
const vacio = document.querySelector('#vacio');

const date = new Date();
const time = date.getHours();
const minutos = date.getMinutes();

var dd = date.getDate();
var mm = date.getMonth()+1; //como los mesese son de 0 a 11, se le suma 1
var yyyy = date.getFullYear();
if(dd<10){
  dd='0'+dd
} 
if(mm<10){
  mm='0'+mm
} 
const hoy = yyyy+'-'+mm+'-'+dd;
console.log(date, hoy, time, minutos)

                        

//*IMPRIMIR LISTA DE RESERVACIONES:
window.addEventListener('load', async () => {

    try {

        const lista = await axios.get('/api/reservaciones/lista');
        const list = lista.data.data;

        if(list.length <= 0){
            vacio.classList.remove('hidden');
        }else{
            vacio.classList.add('hidden');
        }

        list.forEach( i => {

            const {cliente, fecha, hora, salida, arrived, id} = i;
    
            const row = document.createElement('tr');

            if(!arrived){

                //Caso en que llegó el día pero no ha llegado:
                if(fecha === hoy){

                    row.classList.add('bg-yellow-500')

                    row.innerHTML += `
    
                    <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                        <p class="text-gray-700 font-medium text-sm leading-5">${cliente}</p>
                    </td>
                            
                    <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                        <p class="text-gray-700 font-medium text-sm leading-5">${fecha} (HOY)</p>
                    </td>
                            
                    <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                        <p class="text-gray-700 font-medium text-sm leading-5">${hora}:00</p>
                    </td>
            
                    <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                        <p class="text-gray-700 font-medium text-sm leading-5">${salida}:00</p>
                    </td>
            
                    <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                        <p class="text-gray-700 font-medium text-sm leading-5">en espera</p>
                    </td>
                            
                    <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
        
                        <a href="#"  class="text-teal-600 mr-5 hover:text-teal-900 text-xl">
                            <i data-cliente="${id}" class='bx bx-search detalles'></i>
                        </a>
            
                        <a href="#" class="text-red-600 hover:text-red-900 text-xl">
                            <i data-cliente="${id}" class='bx bx-x eliminar'></i>
                        </a>
        
                    </td>
                        
                    `
            
                    listadoReservas.appendChild(row);

                    if(hora === time || hora < time){
                        //Caso en que es el día y la hora y todavía no ha llegado:
                        row.classList.replace('bg-yellow-500','bg-red-400');

                        //Si no llega en 15min se elimina la reservación automáticamente:
                        console.log(`se va a elminiar ${cliente}`)

                        setTimeout(async ()=>{

                            const eliminar = {
                                id: id,
                            }
    
                            const response = await axios.post('/api/reservaciones/delete', eliminar);

                            createNotificacion(false,response.data.message);

                            location.reload();

                        },900000000);

                        //En caso de abrir la página y ya pasó el tiempo:
                        if(hora === time && minutos > 15 || hora < time){

                            const eliminar = {
                                id: id,
                            }

                            eliminarReserva(eliminar);
                        }
                            
                    }


                }else{

                    //Caso en que no ha llegado el día de la reservación:
                    row.innerHTML += `
    
                    <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                        <p class="text-gray-700 font-medium text-sm leading-5">${cliente}</p>
                    </td>
                            
                    <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                        <p class="text-gray-700 font-medium text-sm leading-5">${fecha}</p>
                    </td>
                            
                    <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                        <p class="text-gray-700 font-medium text-sm leading-5">${hora}:00</p>
                    </td>
            
                    <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                        <p class="text-gray-700 font-medium text-sm leading-5">${salida}:00</p>
                    </td>
            
                    <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                        <p class="text-gray-700 font-medium text-sm leading-5">en espera</p>
                    </td>
                            
            
                    <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
        
                        <a href="#"  class="text-teal-600 mr-5 hover:text-teal-900 text-xl">
                            <i data-cliente="${id}" class='bx bx-search detalles'></i>
                        </a>
            
                        <a href="#" class="text-red-600 hover:text-red-900 text-xl">
                            <i data-cliente="${id}" class='bx bx-x eliminar'></i>
                        </a>
        
                    </td>
                        
                    `
            
                    listadoReservas.appendChild(row);
                }

                //En caso de abrir la página y ya pasó la fecha:
                if(fecha < hoy){

                    const eliminar = {
                        id: id,
                    }

                    eliminarReserva(eliminar);

                }
                
            }else{

                //Caso en que llegó al local (se marcó el arrived como true al escanear su QR):
                row.classList.add('bg-teal-400');
                row.innerHTML += `
    
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 font-medium text-sm leading-5">${cliente}</p>
                </td>
                        
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 font-medium text-sm leading-5">${fecha} (HOY)</p>
                </td>
                        
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 font-medium text-sm leading-5">${hora}:00</p>
                </td>
        
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 font-medium text-sm leading-5">${salida}:00</p>
                </td>
        
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 font-medium text-sm leading-5">en curso</p>
                </td>
                        
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
        
                    <a href="#"  class="text-teal-600 mr-5 hover:text-teal-900 text-xl">
                        <i data-cliente="${id}" class='bx bx-search detalles'></i>
                    </a>
        
                    <a href="#" class="text-red-600 hover:text-red-900 text-xl">
                        <i data-cliente="${id}" class='bx bx-x eliminar'></i>
                    </a>
        
                </td>
                    
                `
        
                listadoReservas.appendChild(row);

            }
    
        });

    } catch(error) {

        console.log(error);
        createNotificacion(true,error.response.data.error);
        
    }

});


async function eliminarReserva(eliminar){

    const response = await axios.post('/api/reservaciones/delete', eliminar);

    createNotificacion(false,response.data.message);

    location.reload();
};


//*ACCIONES:
const modalReserva = document.querySelector('[data-modal-reserva]');
const closeReserva = document.querySelector('[data-close-modal]');
const listaDetalles = document.querySelector('#listado-detalles');

listadoReservas.addEventListener('click', async e => {

    e.preventDefault();

    try{

        //Ver detalles de la reservación:
        if(e.target.classList.contains('detalles')){

            modalReserva.showModal();

            const id = e.target.dataset.cliente;

            const lista = await axios.get('/api/reservaciones/lista');
            const list = lista.data.data;

            const detalles = list.filter(i=> i.id === id);

            detalles.forEach(i => {

                const {cliente, telefono, correo, cantidad, fecha, hora, salida, mesa } = i;

                listaDetalles.innerHTML = `
                
                        <div class="detalles-pc">
                            <p class="text-azul">Cliente:</p>
                            <p>${cliente}</p>
                        </div>

                        <div class="detalles-pc">
                            <p class="text-azul">Teléfono:</p>
                            <p>0${telefono}</p>
                        </div>

                        <div class="detalles-pc">
                            <p class="text-azul">Correo:</p>
                            <p>${correo}</p>
                        </div>
                        
                        <div class="detalles-pc">
                            <p class="text-azul">Cantidad de personas:</p>
                            <p>${cantidad}</p>
                        </div>

                        <div class="detalles-pc">
                            <p class="text-azul">Fecha:</p>
                            <p>${fecha}</p>
                        </div>
                        
                        <div class="detalles-pc">
                            <p class="text-azul">Hora:</p>
                            <p>${hora}:00</p>
                        </div>

                        <div class="detalles-pc">
                            <p class="text-azul">Número de mesa:</p>
                            <p>${mesa}</p>
                        </div>

                        <div class="detalles-pc">
                            <p class="text-azul">Salida:</p>
                            <p>${salida}:00</p>
                        </div>
                `
            })
        }

        //Eliminar reservación de forma manual:
        if(e.target.classList.contains('eliminar')){
            
            const userId = {

                id: e.target.dataset.cliente

            };

            const confirmar = confirm('¿Estás seguro de que quieres eliminar esta reservación?');

            if(confirmar){

                const response = await axios.post('/api/reservaciones/delete', userId);

                createNotificacion(false,response.data.message);

                setTimeout(()=>{

                    location.reload();
        
                }, 2000);

            }

        }

    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);

    } 

});


closeReserva.addEventListener('click', e => {
    e.preventDefault();
    modalReserva.close(); 
});