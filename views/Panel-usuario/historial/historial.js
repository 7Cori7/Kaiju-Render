//*IMPRIMIR HISTORIAL DE COMPRAS:
const listaHistorial = document.querySelector('#lista-historial');
const vacio = document.querySelector('#vacio');
let historial = [];

document.addEventListener('DOMContentLoaded', async () => {

    try{

        const persona = await axios.get('/api/users/galleta');
        const person = persona.data.data;

        const {id} = person;

        //delivery
        const listaD = await axios.get('/api/deliveries/lista');
        const listDelivery = listaD.data.data;
        const userDelivery = listDelivery.filter(i => i.cliente.id === id);
        console.log('deliveries', userDelivery)

        //pickup
        const listaP = await axios.get('/api/pickups/lista');
        const listPickup = listaP.data.data;
        const userPickup = listPickup.filter(i => i.cliente.id === id) 
        console.log('pickups', userPickup)

        //ventas
        const listaV = await axios.get('/api/ventas/lista');
        const listVenta = listaV.data.data;
        const userVenta = listVenta.filter(i => i.cliente === id);
        console.log('ventas', userVenta);

        if(userDelivery.length > 0 || userPickup.length > 0 || userVenta.length > 0){

            historial = [...userDelivery, ...userPickup, ...userVenta];
            vacio.classList.add('hidden');

        }else{
            vacio.classList.remove('hidden');
        }

        console.log(historial)

        const sorted = historial.sort((a,b) => {
            
            if(a.createdAt > b.createdAt) return -1;
            return 1;

        });

        sorted.forEach(i => {

            const {createdAt, total, formaPago, id} = i;


            const div = document.createElement('div');
            div.classList.add('w-full', 'shadow-2xl', 'overflow-hidden', 'sm:rounded-lg', 'border-b', 'border-gray-200', 'bg-gray-100');
            div.innerHTML = `

            <div class="m-10 flex flex-col lg:flex-row gap-7">
                            
                <div>
                    <p class="text-azul text-2xl">${createdAt.split('T')[0]}</p>
                    <p class="text-sm text-gray-400">ID: ${id}</p>
                </div>

                <div class="hidden lg:flex w-[20%]"></div>

                <div class="lg:w-[50%]">

                    <div class="flex justify-between pb-2 lg:pb-5">
                        <p class="hidden lg:flex">Pedido:</p>
                        <a href="#" data-pedido="${id}" class="open-Pedidos text-azul hover:text-blue-950">Ver Detalles</a>
                    </div>

                    <div class="flex justify-between pb-2 lg:pb-5">
                        <p>Forma de pago:</p>
                        <p class="font-bold">${formaPago}</p>
                    </div>

                    <div class="flex justify-between pb-2 lg:pb-5">
                        <p>Pago Total:</p>
                        <p class="font-bold">$${total}</p>
                    </div>

                    
                </div>

            </div>   

            `;

            listaHistorial.appendChild(div);

        });

    }catch(error){

        console.log(error)
        createNotificacion(true,error.response.data.error);

    }

});


//*MODAL DE PEDIDOS:
const modalPedidos = document.querySelector('[data-modal-pedidos]');
const listadoPedidos = document.querySelector('#listado-pedidos');

listaHistorial.addEventListener('click', e => {
    e.preventDefault();

    if(e.target.classList.contains('open-Pedidos')){

        const pedidoId = e.target.dataset.pedido

        modalPedidos.showModal();

        verHTML(pedidoId);
    }

});

async function verHTML(id){

    limpiar();

    console.log(id)

    const listaD = await axios.get('/api/deliveries/lista');
    const listDelivery = listaD.data.data;
    const userDelivery = listDelivery.some(i => i.id === id);
        
    const listaP = await axios.get('/api/pickups/lista');
    const listPickup = listaP.data.data;
    const userPickup = listPickup.some(i => i.id === id);
        
    if(userDelivery){

        console.log('es delivery')

        const delivery = listDelivery.filter(i => i.id === id);

        console.log(delivery)

            const {pedido} = delivery[0];

            pedido.forEach(i => {

                const {producto, precioBase, cantidad, precio} = i;

                const div = document.createElement('div');

                div.innerHTML += `

                    <p class="text-gray-700 font-medium text-sm leading-5 pt-4">${producto}</p>
                
                    
                    <p class="text-gray-700 font-medium text-sm leading-5">precio: $${precioBase}</p>

                    
                    <p class="text-gray-700 font-medium text-sm leading-5">cantidad: ${cantidad}</p>


                    <p class="text-gray-700 font-medium text-sm leading-5">total: $${precio}</p>


                    <div class="border-b-2 py-2"></div>

                `;

                listadoPedidos.appendChild(div);
                    
            });
           

    }else if(userPickup){

        console.log('es pickup')

        const pickup = listPickup.filter(i => i.id === id);

        console.log(pickup)

            const {pedido} = pickup[0];

            pedido.forEach(i => {

                const {producto, precioBase, cantidad, precio} = i;

                const div = document.createElement('div');

                div.innerHTML += `

                    <p class="text-gray-700 font-medium text-sm leading-5 pt-4">${producto}</p>
                
                    
                    <p class="text-gray-700 font-medium text-sm leading-5">precio: $${precioBase}</p>

                    
                    <p class="text-gray-700 font-medium text-sm leading-5">cantidad: ${cantidad}</p>


                    <p class="text-gray-700 font-medium text-sm leading-5">total: $${precio}</p>


                    <div class="border-b-2 py-2"></div>

                `;

                listadoPedidos.appendChild(div);
                    
            });

    }
        
}


//limpiar HTML
function limpiar(){

    while(listadoPedidos.firstChild){
        listadoPedidos.removeChild(listadoPedidos.firstChild);
    }

};