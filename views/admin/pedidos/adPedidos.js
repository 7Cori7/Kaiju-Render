//*IMPRIMIR LOS PEDIDOS DELIVERY:
const listadoDelivery = document.querySelector('#listado-delivery');
const vacio = document.querySelector('#vacio');

window.addEventListener('load', async () => {

    try{

        const listaD = await axios.get('/api/deliveries/lista');

        const deliveryList = listaD.data.data;

        console.log(deliveryList)

        deliveryList.forEach(i => {

            const {cliente, formaPago, telefono, total, id, estado} = i;
            
            const row = document.createElement('tr');

            if(estado === 'recibido'){

                row.classList.add('bg-lime-200');

            }

            row.innerHTML += `

                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

                <p class="text-gray-700 font-medium text-sm leading-5">${cliente.nombre}</p>
                <p class="text-gray-500 text-sm leading-5">${telefono}</p>

                </td>
                
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <a href="#" data-pedido="${id}" class="open-Pedidos text-azul font-medium text-sm leading-5 hover:text-blue-950">Pedido</a>
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

                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <a href="#" data-pedido="${id}" class="open-destino text-azul font-medium text-sm leading-5 hover:text-blue-950">Destino</a>
                </td>
                
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

                    <a href="#" data-pedido="${id}" class="text-teal-600 mr-5 hover:text-teal-900 text-xl">
                        <i class='bx bx-check recibido'></i>
                    </a>

                    <a href="#" data-pedido="${id}" class="text-red-600 hover:text-red-900 eliminar text-xl">
                        <i class='bx bx-x eliminar'></i>
                    </a>

                </td>

            `

            listadoDelivery.appendChild(row);

        });

        if(deliveryList.length > 0){
            vacio.classList.add('hidden');
        }else{
            vacio.classList.remove('hidden');
        }

    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);

    }

});

//*ACCIONES PEDIDOS DELIVERY:
listadoDelivery.addEventListener('click', async e => {

    try{

        //Eliminar pedido de forma manual:
        if(e.target.classList.contains('eliminar')){

            const pedidoID = e.target.parentElement.dataset.pedido;
    
            console.log(pedidoID)

            const obj = {
                id: pedidoID
            };

            const confirmar = confirm('¿Está seguro de que desea borrar este pedido?');

            if(confirmar){

                const response = await axios.post('/api/deliveries/delete', obj);

                createNotificacion(false,response.data.message);

                //Todo: tomar los datos del cliente que no se presentó a recoger/pagar su pedido

                setTimeout(() => {
                    location.reload();
                },1500);

            }

            
        }

        //Check pedido recibido:
        if(e.target.classList.contains('recibido')){

            const pedidoId = e.target.parentElement.dataset.pedido;
            const tr = e.target.parentElement.parentElement.parentElement;
    
            const listaD = await axios.get('/api/deliveries/lista');
            const deliveryList = listaD.data.data;

            const pedidoD = deliveryList.filter(i => i.id === pedidoId);
            const {pedido, total, formaPago, cliente, estado} = pedidoD[0];
            
            const obj = {
                cliente: cliente.id,
                pedido: pedido,
                tipo: 'Delivery',
                formaPago: formaPago,
                estado: estado, //<--solo puede pasar los objetos que tengan el estado recibido
                total: total
            }

            console.log(obj)

            const confirmar = confirm('¿confirma que el pedido ha sido recibido y el pago tramitado?');

            if(confirmar){

                const response = await axios.post('/api/ventas', obj);

                tr.classList.add('bg-teal-300');
                tr.classList.remove('recibido');

                createNotificacion(false,response.data.message);

                const idObj = {
                    id: pedidoId
                };

                await axios.post('/api/deliveries/delete', idObj);

                setTimeout(()=>{

                    location.reload();

                },800);


            } 
    
        }

    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);

    }


});


//*MODAL DE DESTINOS DELIVERY:
const modalDestinos = document.querySelector('[data-modal-destinos]');
const contenedor = document.querySelector('#contenido-destinos');

listadoDelivery.addEventListener('click', e => {
    if(e.target.classList.contains('open-destino')){
        modalDestinos.showModal();
        const pedidoId = e.target.dataset.pedido;
        destinoDelHTML(pedidoId);
    }
});

async function destinoDelHTML(id){

    limpiar();

    const lista = await axios.get('/api/deliveries/lista');
    const list = lista.data.data;

    const getPedido = list.filter(i => i.id === id);

    const {destino} = getPedido[0];

    const div = document.createElement('div');
    div.classList.add('lg:mx-5', 'mx-2', 'py-10', 'flex', 'justify-center', 'items-center');

    if(destino.lat){

        div.innerHTML = `

        <iframe width="300" height="200" src="https://maps.google.com/maps?q=${destino.lat},${destino.long}&amp;z=15&amp;output=embed"></iframe>

        `
        contenedor.appendChild(div);

    }else{

        div.innerHTML = `

        <p class="text-center">${destino}</p>

        `
        contenedor.appendChild(div);

    }

    

};


//*IMPRIMIR LOS PEDIDOS PICK-UP:
const listadoPickup = document.querySelector('#listado-pickup');
const vacio2 = document.querySelector('#vacio2');

window.addEventListener('load', async () => {

    try{

        const listaP = await axios.get('/api/pickups/lista');

        const pickupList = listaP.data.data;

        pickupList.forEach(i => {

            const {cliente, formaPago, destino, fecha, hora, total, id, estado} = i;
            
            const row = document.createElement('tr');

            if(estado === 'recibido'){

                row.classList.add('bg-lime-200');

            }

            row.innerHTML += `

                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

                <p class="text-gray-700 font-medium text-sm leading-5">${cliente.nombre}</p>
                <p class="text-gray-500 text-sm leading-5">${fecha}</p>
                <p class="text-gray-500 text-sm leading-5">${hora}</p>

                </td>
                
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <a href="#" data-pedido="${id}" class="open-Pedidos text-azul font-medium text-sm leading-5 hover:text-blue-950">Pedido</a>
                </td>

                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 text-sm leading-5 font-bold">$${total}</p>
                </td>

                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 font-medium text-sm leading-5 estado-delivery">${formaPago}</p>
                </td>
                
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 font-medium text-sm leading-5 estado-pickup">${estado}</p>
                </td>

                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="font-medium text-gray-700 text-sm leading-5 hover:text-blue-950">${destino}</p>
                </td>
                
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

                    <a href="#" data-pedido="${id}" class="text-teal-600 mr-5 hover:text-teal-900 text-xl">
                        <i class='bx bx-check recibido'></i>
                    </a>

                    <a href="#" data-pedido="${id}" class="text-red-600 hover:text-red-900 text-xl">
                        <i class='bx bx-x eliminar'></i>
                    </a>

                </td>

            `

            listadoPickup.appendChild(row);

        });

        if(pickupList.length > 0){
            vacio2.classList.add('hidden');
        }else{
            vacio2.classList.remove('hidden');
        }

    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);

    }

});

//*ACCIONES PEDIDOS PICK-UP:
listadoPickup.addEventListener('click', async e => {

    try{

        //Eliminar pedido de forma manual:
        if(e.target.classList.contains('eliminar')){

            const pedidoID = e.target.parentElement.dataset.pedido;
    
            console.log(pedidoID)

            const obj = {
                id: pedidoID
            };

            const confirmar = confirm('¿Está seguro de que desea borrar este pedido?');

            if(confirmar){

                const response = await axios.post('/api/pickups/delete', obj);

                createNotificacion(false,response.data.message);

                //Todo: tomar los datos del cliente que no se presentó a recoger/pagar su pedido

                setTimeout(() => {
                    location.reload();
                },1500);

            }

        }

        //Check pedido recibido:
        if(e.target.classList.contains('recibido')){

            const pedidoId = e.target.parentElement.dataset.pedido;
            const tr = e.target.parentElement.parentElement.parentElement;
    
            const listaD = await axios.get('/api/pickups/lista');
            const deliveryList = listaD.data.data;

            const pedidoD = deliveryList.filter(i => i.id === pedidoId);
            const {pedido, total, formaPago, cliente, estado} = pedidoD[0];
            
            const obj = {
                cliente: cliente.id,
                pedido: pedido,
                tipo: 'Pick-Up',
                formaPago: formaPago,
                estado: estado, //<--solo puede pasar los objetos que tengan el estado recibido
                total: total
            }

            console.log(obj)

            const confirmar = confirm('¿confirma que el pedido ha sido recibido y el pago tramitado?');

            if(confirmar){

                const response = await axios.post('/api/ventas', obj);

                createNotificacion(false,response.data.message);

                const idObj = {
                    id: pedidoId
                };

                await axios.post('/api/pickups/delete', idObj);

                setTimeout(()=>{

                    location.reload();

                },800);


            }
    
        }

    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);

    }


});


//*MODAL DE PEDIDOS:
const modalPedidos = document.querySelector('[data-modal-pedidos]');
const listadoPedidos = document.querySelector('#listado-pedidos');

//delivery:
listadoDelivery.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.classList.contains('open-Pedidos')){

        modalPedidos.showModal();

        const pedidoId = e.target.dataset.pedido;

        pedidosDelHTML(pedidoId);

    }
});

async function pedidosDelHTML(id){

    limpiar();

    const lista = await axios.get('/api/deliveries/lista');
    const list = lista.data.data;

    const getPedido = list.filter(i => i.id === id);
    
    const {pedido} = getPedido[0];

    console.log(pedido)

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


//pick-up:
listadoPickup.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.classList.contains('open-Pedidos')){

        modalPedidos.showModal();

        const pedidoId = e.target.dataset.pedido;

        pedidosPickHTML(pedidoId);

    }

});

async function pedidosPickHTML(id){

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

    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }

};





