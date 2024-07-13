//*IMPRIMIR LISTA DE PEDIDOS DELIVERY:
const listadoDelivery = document.querySelector('#listado-delivery');
const vacio = document.querySelector('#vacio');
const spinner1 = document.querySelector("#spinner-1");
const spinner2 = document.querySelector("#spinner-2");

document.addEventListener('DOMContentLoaded', async () => {

    try{

        let timeout;

        const persona = await axios.get('/api/users/galleta');
        const person = persona.data.data;

        const {id} = person;

        const lista = await axios.get('/api/deliveries/lista');
        const list = lista.data.data;

        const pedidoUser = list.some(i => i.cliente.id === id);

        if(pedidoUser){

            const pedidos = list.filter(i => i.cliente.id === id);

            pedidos.forEach(i => {

                const {pedido, total, formaPago, id, estado} = i;

                const row = document.createElement('tr');
                row.innerHTML += `

                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <a href="#" data-pedido="${id}" class="open-Pedidos text-azul font-medium text-sm leading-5 hover:text-blue-950">Ver Pedido</a>
                </td>

                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 text-sm leading-5 font-bold">$${total}</p>
                </td>

                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 font-medium text-sm leading-5 estado-delivery">${formaPago}</p>
                </td>
                
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 font-medium text-sm leading-5 estado-delivery">${estado}</p>
                </td>

                `

                listadoDelivery.appendChild(row);

            });

            timeout = setTimeout(() => {
                clearTimeout(timeout);
                spinner1.classList.add("hidden");
                vacio.classList.add('hidden');
            },500);


        }else{
            timeout = setTimeout(() => {
                clearTimeout(timeout);
                spinner1.classList.add('hidden');
                vacio.classList.remove('hidden');
            },500);
        }

        

    }catch(error){

        console.log(error)
        createNotificacion(true,error.response.data.error)

    }

});


//*IMPRIMIR LISTA DE PEDIDOS PICK-UP:
const listadoPickup = document.querySelector('#listado-pickup');
const vacio2 = document.querySelector('#vacio2');

document.addEventListener('DOMContentLoaded', async () => {

    try{

        let timeout;
        
        const persona = await axios.get('/api/users/galleta');
        const person = persona.data.data;

        const {id} = person;

        const lista = await axios.get('/api/pickups/lista');
        const list = lista.data.data;

        const pedidoUser = list.some(i => i.cliente.id === id);

        console.log(pedidoUser)

        if(pedidoUser){

            const pedidos = list.filter(i => i.cliente. id === id);

            pedidos.forEach(i => {

                const {total, formaPago, id, estado, destino, fecha, hora} = i;

                const row = document.createElement('tr');
                row.innerHTML += `

                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <a href="#" data-pedido="${id}" class="open-Pedidos text-azul font-medium text-sm leading-5 hover:text-blue-950">Ver Pedido</a>
                </td>

                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 font-medium text-sm leading-5 estado-delivery">${fecha}</p>
                    <p class="text-gray-500 font-medium text-sm leading-5 estado-delivery">${hora}</p>
                </td>

                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 text-sm leading-5 font-bold">$${total}</p>
                </td>

                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 font-medium text-sm leading-5 estado-delivery">${formaPago}</p>
                </td>

                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 font-medium text-sm leading-5 hover:text-blue-950">${destino}</p>
                </td>
                
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 font-medium text-sm leading-5 estado-delivery">${estado}</p>
                </td>

            `

            listadoPickup.appendChild(row);

            });

            timeout = setTimeout(() => {
                clearTimeout(timeout);
                spinner2.classList.add("hidden");
                vacio2.classList.add('hidden');
            },500);

        }else{

            timeout = setTimeout(() => {
                clearTimeout(timeout);
                spinner2.classList.add("hidden");
                vacio2.classList.remove('hidden');
            },500);
    
        }

        

    }catch(error){

        console.log(error)
        createNotificacion(true,error.response.data.error)

    }

});


//*MODAL DE PEDIDOS:
const modalPedidos = document.querySelector('[data-modal-pedidos]');
const listadoPedidos = document.querySelector('#listado-pedidos');

//delivery
listadoDelivery.addEventListener('click', e => {
    e.preventDefault();

    if(e.target.classList.contains('open-Pedidos')){

        const pedidoId = e.target.dataset.pedido

        modalPedidos.showModal();

        verDelivery(pedidoId);
    }


});

async function verDelivery(pedidoId){
    console.log(pedidoId)

    limpiar();

    const lista = await axios.get('/api/deliveries/lista');
    const list = lista.data.data;

    const getPedido = list.filter(i => i.id === pedidoId);
    
    const {pedido} = getPedido[0];

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


//pick-up:
listadoPickup.addEventListener('click', e => {
    e.preventDefault();

    if(e.target.classList.contains('open-Pedidos')){

        modalPedidos.showModal();

        const pedidoId = e.target.dataset.pedido;

        verPickup(pedidoId);

    }

});

async function verPickup(id){

    limpiar();

    const lista = await axios.get('/api/pickups/lista');
    const list = lista.data.data;

    const getPedido = list.filter(i => i.id === id);
    
    const {pedido} = getPedido[0];

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

        


};


//limpiar HTML
function limpiar(){

    while(listadoPedidos.firstChild){
        listadoPedidos.removeChild(listadoPedidos.firstChild);
    }

};
