let articulosCarrito = [];
let delivery = false;
let pickup = false;
//*OBTENER DATOS:
document.addEventListener('DOMContentLoaded', async () => {
    
    const pedido = await axios.get('/api/pedidos/get-orden');
    const orden = pedido.data.data;

    if(orden.items.tipoPedido === 'Delivery'){

        delivery = true;

        articulosCarrito = [...orden.items.pedido];

        const datosPedido = {
            telefono: orden.items.telefono,
            destino: orden.items.destino,
            tipo: orden.items.tipoPedido
        }
        console.log(datosPedido)
        console.log(articulosCarrito)

        registrarPedido(datosPedido);

    }else{

        pickup = true;

        articulosCarrito = [...orden.items.pedido];

        const datosPedido = {
            fecha: orden.items.fecha,
            hora: orden.items.hora,
            destino: orden.items.destino,
            tipo: orden.items.tipoPedido
        }
        console.log(datosPedido)
        console.log(articulosCarrito)

        registrarPedido(datosPedido);
        
    }
    

});


async function registrarPedido(datos){

    //Obtener usuario:
    const usuario = await axios.get('/api/users/galleta');
    const user = usuario.data.data;

    let precioT = articulosCarrito.reduce((acc,cur) => acc + cur.precio, 0);

    try{

        if(delivery){

            //*DELIVERY:

            precioT = precioT + 2;

            //obtener los datos del pedido:
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
                total: precioT,
                formaPago: 'paypal',
                estado: 'En curso'
            }

            console.log(newPedido)

            const response = await axios.post('/api/deliveries/', newPedido);


        }else{

            //*PICK-UP

            precioT = precioT;

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
                total: precioT,
                formaPago: 'paypal',
                estado: 'En curso'
            }
    
            console.log(newPedido)
    
            const response = await axios.post('/api/pickups/', newPedido);
    
        }

    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);

    }

};