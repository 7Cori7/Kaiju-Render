const formaPagoBtn = document.querySelector('#forma-pago');
const pagoMovilBtn = document.querySelector('#pago-movil');
const modal = document.querySelector('[data-modal]');
const modal2 = document.querySelector('[data-modal-2]');
const closeModal = document.querySelectorAll('[data-close-modal]');
const efectivoBtn = document.querySelector('#efectivo');
let articulosCarrito = [];
let delivery = false;
let pickup = false;


//*OBTENER DATOS:
document.addEventListener('DOMContentLoaded', async () => {
    
    const pedido = await axios.get('/api/pedidos/get-orden');
    const orden = pedido.data.data;

    if(orden.items.tipoPedido === 'Delivery'){

        articulosCarrito = [...orden.items.pedido];

        const datosPedido = {
            telefono: orden.items.telefono,
            destino: orden.items.destino,
            tipo: orden.items.tipoPedido
        }
        console.log(datosPedido)

        facturaDeliveryHTML(datosPedido);

    }else{

        articulosCarrito = [...orden.items.pedido];

        const datosPedido = {
            fecha: orden.items.fecha,
            hora: orden.items.hora,
            destino: orden.items.destino,
            tipo: orden.items.tipoPedido
        }
        console.log(datosPedido)
        
        facturaPickUpHTML(datosPedido);
    }
    

});

//*IMPRIMIR DATOS:
const lista = document.querySelector('#listado-pedido');
const datosP = document.querySelector('#datos-Pedido');
const total = document.querySelectorAll('.total');

//Cuando es delivery:
function facturaDeliveryHTML(datos){

    delivery = true;

    const {telefono, destino, tipo} = datos;

    articulosCarrito.forEach(i => {

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${i.nombre}</p>
            </td>
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">$${i.precioBase}</p>
            </td>
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${i.cantidad}</p>
            </td>
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">$${i.precio}</p>
            </td>

        `
        lista.appendChild(row);
    });

    if(destino.lat){

        datosP.innerHTML = `

        <p>Tipo de Pedido: ${tipo}</p>
        <p>Teléfono: ${telefono}</p>
        <p>Destino: </p>
        <iframe width="300" height="200" src="https://maps.google.com/maps?q=${destino.lat},${destino.long}&amp;z=15&amp;output=embed"></iframe>
        <br>
        <br>
        <p class="font-bold">Pago por delivery: $2</p>
    `

    }else{

        datosP.innerHTML = `

        <p>Tipo de Pedido: ${tipo}</p>
        <p>Teléfono: ${telefono}</p>
        <p>Destino: ${destino}</p>
        <p class="font-bold">Pago por delivery: $2</p>

    `

    }

    const precioTotal = articulosCarrito.reduce((acc,cur) => acc + cur.precio, 0);

    total.forEach(i => {
        i.innerHTML = `$${precioTotal + 2}`;
    });
    
    //botones para pagar:
    formaPagoBtn.addEventListener('click', () => {

        modal.showModal();

        //opcion de pago en efectivo:
        efectivoBtn.addEventListener('click', e => {
            e.preventDefault();
            const formaPago = 'En efectivo';
            registrarPedido(datos, precioTotal, formaPago);
        });

    });

    //opcion de pago movil:
    pagoMovilBtn.addEventListener('click', () => {

        modal2.showModal();

    });


};


//Cuando es pick-up:
function facturaPickUpHTML(datos){

    pickup = true;

    const {fecha, hora, destino, tipo} = datos;

    console.log(articulosCarrito)

    articulosCarrito.forEach(i => {

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${i.nombre}</p>
            </td>
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">$${i.precioBase}</p>
            </td>
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${i.cantidad}</p>
            </td>
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">$${i.precio}</p>
            </td>

        `
        lista.appendChild(row);
    });

    datosP.innerHTML = `

    <p>Tipo de Pedido: ${tipo}</p>
    <p>Fecha: ${fecha}</p>
    <p>Hora: ${hora}</p>
    <p>En el local: ${destino}</p>

    `
    const precioTotal = articulosCarrito.reduce((acc,cur) => acc + cur.precio, 0);

    total.forEach(i => {
        i.innerHTML = `$${precioTotal}`;
    });

    formaPagoBtn.addEventListener('click', e => {

        modal.showModal();

        //opcion de pago en efectivo:
        efectivoBtn.addEventListener('click', e => {
            e.preventDefault();
            const formaPago = 'En efectivo';
            registrarPedido(datos, precioTotal, formaPago);
        });

    });

    //opcion de pago movil:
    pagoMovilBtn.addEventListener('click', () => {

        modal2.showModal();

        pagarPagoMovil(datos, precioTotal);

    });
};

//Cuando el pago es por pago movil:
function pagarPagoMovil(datos, total){

const formaPago = 'Pago movil';

console.log(formaPago, total);

document.getElementById('monto-pago-movil').innerHTML =`Monto a cancelar: $${total}`;

};


//registrar pagos (efectivo & pago movil):
async function registrarPedido(datos, total, pago){

    //Obtener usuario:
    const usuario = await axios.get('/api/users/galleta');
    const user = usuario.data.data;

    try{

        if(delivery){

            //*DELIVERY:

            //obtener los datos del pedido:
            const precioTotal = total+2;
            const {telefono, destino,} = datos;
            const pedido = articulosCarrito.map( i => 

                ({
                producto: i.nombre,
                precioBase: i.precioBase,
                cantidad: i.cantidad,
                precio: i.precio,
                })

            );

            //objeto del pedido:
            const newPedido ={
                cliente: user.id,
                pedido: pedido,
                telefono: telefono,
                destino: destino,
                total: precioTotal,
                formaPago: pago,
                estado: 'En curso'
            }

            console.log(newPedido)

            const response = await axios.post('/api/deliveries/', newPedido);

            createNotificacion(false,response.data.message);

            setTimeout(()=>{

                window.location.href = '/confirmar-compra';
    
            },1500);



        }else{

            //*PICK-UP

            //obtener los datos del pedido:
            const {fecha, hora, destino} = datos;
            const pedido = articulosCarrito.map( i => 

                ({
                producto: i.nombre,
                precioBase: i.precioBase,
                cantidad: i.cantidad,
                precio: i.precio
                })


            );
    
            //objeto del pedido:
            const newPedido = {
                cliente: user.id,
                pedido: pedido,
                fecha: fecha,
                hora: hora,
                destino: destino,
                total: total,
                formaPago: pago,
                estado: 'En curso'
            }
    
            console.log(newPedido)
    
            const response = await axios.post('/api/pickups/', newPedido);

            createNotificacion(false,response.data.message);

            setTimeout(()=>{

                window.location.href = '/confirmar-compra';
    
            },1500);
    
        }

    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);

    }

};



//Cuando el pago es por paypal:
setTimeout(()=> {

    let precioT = articulosCarrito.reduce((acc,cur) => acc + cur.precio, 0);

    if(delivery){
        precioT = precioT + 2;
    }else{
        precioT = precioT
    }

    window.paypal
    .Buttons({
        async createOrder() {

            try {
                
                const response = await fetch('/api/orders/', {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                
                    body: JSON.stringify({ 
                        cart: [
                            articulosCarrito
                        ],
                        total: precioT
                    }),

                });
                const orderData = await response.json();
                
                if (orderData.id) {

                return orderData.id;

                } else {

                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                throw new Error(errorMessage);

                }

            } catch (error) {
                console.error(error);
                resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
            }

        },
        async onApprove(data, actions) {

            try {
                const response = await fetch(`/api/orders/${data.orderID}/capture`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                });

                const orderData = await response.json();
                // Three cases to handle:
                //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                //   (2) Other non-recoverable errors -> Show a failure message
                //   (3) Successful transaction -> Show confirmation or thank you message

                const errorDetail = orderData?.details?.[0];

                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {

                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/

                return actions.restart();

                } else if (errorDetail) {

                // (2) Other non-recoverable errors -> Show a failure message

                throw new Error(`${errorDetail.description} (${orderData.debug_id})`);

                } else if (!orderData.purchase_units) {

                throw new Error(JSON.stringify(orderData));

                } else {

                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');

                const transaction =
                    orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                    orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
                resultMessage(
                    `Transaction ${transaction.status}: ${transaction.id}<br><br>`,
                );

                console.log(
                    "Capture result",
                    orderData,
                    JSON.stringify(orderData, null, 2),
                );

                setTimeout(()=>{

                    window.location.href = '/confirmar-compra'; //<-- mandar a la pagina checkout y ahi se guarda la info de pedido y carrito en la bd
        
                },1500);

                }
                
            } catch (error) {
                console.error(error);
                resultMessage(
                `Sorry, your transaction could not be processed...<br><br>${error}`,
                );
            }

        },
    })
    .render("#paypal-button-container");

    // Example function to show a result to the user. Your site's UI library can be used instead.
    function resultMessage(message) {
    const container = document.querySelector("#result-message");
    container.innerHTML = message;
    }

},1000);


//Cerrar modals:
closeModal.forEach(i=> {
    i.addEventListener('click', () => {modal.close(); modal2.close();});
});