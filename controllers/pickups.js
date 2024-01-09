//*CONTROLADOR DE PEDIDOS PICK-UP
const pickupRouter = require('express').Router();
const Pickup = require('../models/pickup');
const User = require('../models/user');
const transporter = require('../helpers/mailer');
const { v4 } = require('uuid');


//*GUARDAR PEDIDO PICK-UP EN LA BD:
pickupRouter.post('/', async (req, res) => {


    try{

        const {pedido, cliente, fecha, hora, destino, total, formaPago, estado} = req.body;

        if(!pedido || !cliente || !fecha || !hora || !destino || !total || !formaPago || !estado){

            return res.status(400).json({error:'Error! Faltan datos'});

        }else if(total === 0 || total < 0){

            return res.status(400).json({error:'Error!'});

        }else{

            console.log(req.body)

            const code = v4();

            const usuario = await User.findOne({_id: cliente});

            console.log(usuario)

            const pedidoPickup = new Pickup({pedido: pedido, cliente: {nombre: usuario.name, correo: usuario.email, id: usuario.id}, fecha: fecha, hora: hora, destino: destino, total: total, formaPago: formaPago, code: code, estado: estado});

            async function guardarPedido(){

                await pedidoPickup.save();

            };
            
            guardarPedido().catch(console.error);

            //Borrar la cookie del pedido y del carrito:
            res.cookie('pedido', '', {maxAge: 1});
            res.cookie('carrito', '', {maxAge: 1});


            //*se envía un correo al cliente:
            async function main() {
                
                const info = await transporter.sendMail({
                from: `Kaiju Sushi-Bar ${process.env.EMAIL}`, 
                to: usuario.email, 
                subject: "Tu pedido con Kaiju Sushi-Bar", 
                text: `Muchas gracias ${usuario.name} por elegir nuestros servicios!

                    Aquí te indicamos los datos de tu pedido:

                    Fecha: ${fecha}
                    Hora: ${hora}
                    Lugar donde buscará su pedido: Local Kaiju sushi bar de ${destino}
                    Total de la compra: $${total}
                    Forma de pago: ${formaPago}

                    Recuerda que debes presentarte en la fecha y hora indicada para recoger tu pedido, no olvides llevar la factura y tu código QR para poder recibir tu pedido. 

                    Abre este link para descargar tu código y factura:

                    Mira tu código QR aquí.

                    NO OLVIDES QUE TU CODIGO QR ES LO QUE VALIDARÁ TU PEDIDO ASÍ QUE POR FAVOR NO LO PIERDAS NI BORRES ESTE CORREO. DE LO CONTRARIO NO NOS HAREMOS RESPONSABLES.
                    
                `,
                html: `<p><b>Muchas gracias ${usuario.name} por elegir nuestros servicios!</b>
                    <br>
                    <br>
                    Aquí te indicamos los datos de tu pedido:
                    <br>
                    Fecha: ${fecha}
                    <br>
                    Hora: ${hora}
                    <br>
                    Lugar donde buscará su pedido: Local Kaiju sushi bar de ${destino}
                    <br>
                    Total de la compra: $${total}
                    <br>
                    Forma de pago: ${formaPago}
                    <br>
                    <br>
                    <b>Recuerda que debes presentarte en la fecha y hora indicada para recoger tu pedido.</b>
                    <br>
                    No olvides llevar la factura y tu código QR para poder recibir tu pedido.
                    <br>
                    <br>
                    <b>Abre este link para descargar tu código y factura:</b>
                    <br>
                    <a href="https://kaiju-sushi-bar.onrender.com/api/pickups/data/${code}" target="_blank">Mira tu código QR aquí</a>
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
pickupRouter.get('/lista', async (req, res) => {

    try{

        const lista = await Pickup.find();

        return res.status(200).json({ok: true, data: lista});

    }catch(error){

        return res.status(400).json({error: 'hubo un error al crear la reservación'});

    }

});

//*BORRAR EL PEDIDO:
pickupRouter.post('/delete', async (req, res) => {

    const {id} = req.body;

    try{

        const pedido = await Pickup.findOneAndDelete({_id: id});

        return res.status(200).json({message:'Se eliminó el pedido con exito'})

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});

    }

});

//*Datos QR:
pickupRouter.get('/data/:code', async (req, res) => {

    try{

        const {code} = req.params;
        const pedido = await Pickup.findOne({code: code});

        

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
                <title>Kaiju - Mi Pedido Pick-Up</title> 
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
                            <p>${pedido.cliente.nombre}</p>
                            <p>fecha: ${pedido.fecha}</p>
                            <p>hora: ${pedido.hora}</p>
                            <p>total: $${pedido.total}</p>
                            <p>forma de pago: ${pedido.formaPago}</p>
                            <p>local: ${pedido.destino}</p>
                        </div>

                        <div class="md:mx-[5%] pt-5">

                            <div class="w-full flex justify-center items-center azul py-3 px-10 rounded-3xl hover:bg-teal-300 cursor-pointer transition ease-in-out delay-150 duration-300">

                            <a href="/descarga-pickup/?id=${pedido.id}" class="text-white flex md:text-xl QR">Descargar PDF</a> 

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
pickupRouter.post('/scan', async (req, res) => {

    try{

        const {id, hoy} = req.body

        const pedido = await Pickup.findOne({_id: id});

        if(!id){

            return res.status(400).json({error: 'hubo un error al obtener los datos'});

        }else if(!pedido){

            return res.status(400).json({error: 'El pedido no existe'});

        }else if(pedido.fecha !== hoy){

            return res.status(400).json({error: 'Su pedido no es para hoy'});

        }else{

            const actualizar = await Pickup.findOneAndUpdate({_id: id},{estado: 'recibido'});

            await actualizar.save();

            return res.status(200).json({message:'Se ha procesado el pedido!'});

        }


    }catch(error){

        return res.status(400).json({error: 'hubo un error al obtener los datos'});

    }

});


module.exports = pickupRouter;