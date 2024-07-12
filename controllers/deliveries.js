//*CONTROLADOR DE PEDIDOS DELIVERY
const deliveryRouter = require('express').Router();
const Delivery = require('../models/delivery');
const User = require('../models/user');
const { v4 } = require('uuid');
const transporter = require('../helpers/mailer');

//*GUARDAR PEDIDO DELIVERY EN LA BD:
deliveryRouter.post('/', async (req, res) => {

    try{

        const {pedido, cliente, telefono, destino, total, formaPago, estado, referencia, bolivares} = req.body;

        if(!pedido || !cliente || !telefono || !destino || !total || !formaPago || !estado){

            return res.status(400).json({error:'Error! Faltan datos'});

        }else if(total === 0 || total < 0){

            return res.status(400).json({error:'Error!'});

        }else if(formaPago === 'Pago movil' && !referencia){

            return res.status(400).json({error:'Error!'});

        }else{

            console.log(req.body)

            const code = v4();

            const usuario = await User.findOne({_id: cliente});

            console.log(usuario)

            const pedidoDelivery = new Delivery({pedido: pedido, cliente: {nombre: usuario.name, correo: usuario.email, id: usuario.id}, telefono: telefono, destino: destino, total: total, formaPago: formaPago, code: code, estado: estado});

            async function guardarPedido(){

                await pedidoDelivery.save();

            };
            guardarPedido().catch(console.error);

            //Borrar la cookie del pedido y del carrito:
            res.cookie('pedido', '', {maxAge: 1});
            res.cookie('carrito', '', {maxAge: 1});

            if(formaPago === 'Pago movil'){

                //*se envía un correo:
                async function main() {
                    
                    const info = await transporter.sendMail({
                    from: `Kaiju Sushi-Bar ${process.env.EMAIL}`, 
                    to: `${process.env.EMAIL}`, 
                    subject: "Pago realizado por pago movil", 
                    text: `El usuario ${usuario.name} realizó un pago por Pago movil.

                        Total de la compra: $${total}
                        Total en bolívares: Bs.${bolivares}
                        Forma de pago: ${formaPago}
                        Tipo de pedido: Delivery
                        N° de referenica: ${referencia}
                        
                    `,
                    html: `<p><b>El usuario ${usuario.name} realizó un pago por Pago movil.</b>
                        <br>
                        <br>
                        <br>
                        Total de la compra: $${total}
                        <br>
                        Total en bolívares: Bs.${bolivares}
                        <br>
                        Forma de pago: ${formaPago}
                        <br>
                        Tipo de pedido: Delivery
                        <br>
                        N° de referenica: ${referencia}
                        <br>
                        <br>
                        <br>
                        <br>
                        </p>
                    `, 
                    });

                    console.log("Se envió el correo de forma exitosa!", info.messageId);
                };
                main().catch(console.error);
                
            };

            //*se envía un correo al cliente:
            const website_url = process.env.KAIJU_URL;
            async function main() {
                
                const info = await transporter.sendMail({
                from: `Kaiju Sushi-Bar ${process.env.EMAIL}`, 
                to: usuario.email, 
                subject: "Tu pedido con Kaiju Sushi-Bar", 
                text: `Muchas gracias ${usuario.name} por elegir nuestros servicios!

                    Aquí te indicamos los datos de tu pedido:

                    Total de la compra: $${total}
                    Forma de pago: ${formaPago}

                    Recuerda que debes tener la factura y tu código QR para poder recibir tu pedido. 

                    Abre este link para descargar tu código y factura:

                    Mira tu código QR aquí.

                    NO OLVIDES QUE TU CODIGO QR ES LO QUE VALIDARÁ TU PEDIDO ASÍ QUE POR FAVOR NO LO PIERDAS NI BORRES ESTE CORREO. DE LO CONTRARIO NO NOS HAREMOS RESPONSABLES.
                    
                `,
                html: `<p><b>Muchas gracias ${usuario.name} por elegir nuestros servicios!</b>
                    <br>
                    <br>
                    Aquí te indicamos los datos de tu pedido:
                    <br>
                    Total de la compra: $${total}
                    <br>
                    Forma de pago: ${formaPago}
                    <br>
                    <br>
                    <b>Recuerda que debes tener la factura y tu código QR para poder recibir tu pedido.
                    <br>
                    <br>
                    <b>Abre este link para descargar tu código y factura:</b>
                    <br>
                    <a href="${website_url}/api/deliveries/data/${code}" target="_blank">Mira tu código QR aquí</a>
                    <br>
                    <br>
                    <b>NO OLVIDES QUE TU CODIGO QR ES LO QUE VALIDARÁ TU PEDIDO ASÍ QUE POR FAVOR NO LO PIERDAS NI BORRES ESTE CORREO. DE LO CONTRARIO NO NOS HAREMOS RESPONSABLES.</b>
                    <br>
                    <br>
                    <br>
                    <br>
                    </p>
                `, 
                });

                console.log("Se envió el correo de forma exitosa!", info.messageId);
            };
            main().catch(console.error);

            return res.status(200).json({ok:true, data:usuario.name, message:'Se ha realizado su pedido correctamente!'});

        }   

    }catch(error){

        return res.status(400).json({error:'hubo un error'});

    }

});

//*OBTENER LISTA DE PEDIDOS:
deliveryRouter.get('/lista', async (req, res) => {

    try{

        const lista = await Delivery.find();

        return res.status(200).json({ok: true, data: lista});

    }catch(error){

        return res.status(400).json({error: 'hubo un error al obtener los datos'});

    }

});

//*BORRAR EL PEDIDO:
deliveryRouter.post('/delete', async (req, res) => {

    const {id} = req.body;

    try{

        const pedido = await Delivery.findOneAndDelete({_id: id});

        return res.status(200).json({message:'Se eliminó el pedido con exito'})

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});

    }

});

//*Datos QR:
deliveryRouter.get('/data/:code', async (req, res) => {

    try{

        const {code} = req.params;
        const pedido = await Delivery.findOne({code: code});

        console.log(pedido)

        if(!code){
            res.send('Error: El datos inválidos');

        }else{

            //Mostrar datos:
            return res.send(`

            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/estilos/custom.css">
                <script src="https://cdn.tailwindcss.com"></script>
                <title>Kaiju - Mi Pedido Delivery</title> 
            </head>
            <body class="crema">

                <main>
                    <section class="relative">

                        <div class="md:hidden flex justify-center items-center pt-20">
                        <img src="/imagenes/Logo2.png" alt="logo de Kaiju sushi-bar" class="w-[40%] mx-[35%]">
                        </div>

                        <div class="py-14 m-[10%] min-w-[30%] md:w-72 shadow-2xl overflow-hidden sm:rounded-lg border-b border-gray-200 bg-gray-100 flex flex-col justify-center items-center gap-7">

                        <div class="mx-10 w-full h-full flex justify-center items-center">
                        <img src="http://api.qrserver.com/v1/create-qr-code/?data=${pedido.id}&size=200x200" alt="Código QR"/>
                        </div>

                        <div class=" mx-10 text-azul uppercase">
                            <p>cliente: ${pedido.cliente.nombre}</p>
                            <p>total: $${pedido.total}</p>
                            <p>forma de pago: ${pedido.formaPago}</p>
                        </div>

                        <div class="md:mx-[5%] pt-5">

                            <div class="w-full flex justify-center items-center azul py-3 px-10 rounded-3xl hover:bg-teal-300 cursor-pointer transition ease-in-out delay-150 duration-300">

                            <a href="/descarga-delivery/?id=${pedido.id}" class="text-white flex md:text-xl QR">Descargar PDF</a> 

                            </div>

                        </div>

                        

                        <div class="hidden md:flex absolute top-28 md:top-0 md:w-96 right-0 opacity-25 md:opacity-40 -z-10">
                            <img src="/imagenes/medio-squid - copia.png" alt="dibujo de un calamar">
                        </div>
                        
                    </section>

                </main>

            </body>
            
            </html>
                    
            `);

        }
        

    }catch(error){

        console.log(error)
        return res.status(400).json({error:'Error al confirmar usuario'});

    }

});


//*SCANEAR QR Y ACTUALIZAR PEDIDO:
deliveryRouter.post('/scan', async (req, res) => {

    try{

        const {id} = req.body

        const pedido = await Delivery.findOne({_id: id});

        if(!id){

            return res.status(400).json({error: 'hubo un error al obtener los datos'});

        }else if(!pedido){

            return res.status(400).json({error: 'El pedido no existe'});

        }else{

            const actualizar = await Delivery.findOneAndUpdate({_id: id},{estado: 'recibido'});

            await actualizar.save();

            return res.status(200).json({message:'Se ha procesado el delivery!'});

        }


    }catch(error){

        return res.status(400).json({error: 'hubo un error al obtener los datos'});

    }

});


module.exports = deliveryRouter;