//*CONTROLADOR DE RESERVACIONES
const reservacionRouter = require('express').Router();
const transporter = require('../helpers/mailer');
const Reservacion = require('../models/reservacion');
const { v4 } = require('uuid');

//*CREAR NUEVA RESERVACIÓN:
reservacionRouter.post('/', async (request,response) => {

    const {cliente,telefono,correo,cantidad,fecha,hora, mesa, salida} = request.body

    console.log(cliente,telefono,correo,cantidad,fecha,hora, salida)

    const mismoDia = await Reservacion.find({fecha: fecha, hora: hora});

    const mismoCorreo = await Reservacion.findOne({fecha: fecha, correo: correo});

    const mismaMesa = await Reservacion.find({fecha: fecha, mesa: mesa})

    try{

      if(!cliente || !telefono || !correo || !cantidad || !fecha || !hora || !salida){

        return response.status(400).json({error:'Todos los campos son requeridos'});

      }else if(mismoDia.length === 10){

        return response.status(400).json({error:'No disponible. Intente otra hora u otra fecha'});

      }else if(mismoCorreo){

        return response.status(400).json({error:'Ya reservó para esa fecha'});

      }else if(mismaMesa.hora === hora){

        return response.status(400).json({error:'Hay un error con la mesa reservada'});

      }else if(hora > mismaMesa.hora && hora < mismaMesa.salida){

        return response.status(400).json({error:'Hay un error con la mesa reservada'});

      }else{

        const code = v4();

        const obj = {
          cliente: cliente,
          telefono: telefono,
          correo: correo,
          cantidad: cantidad,
          fecha: fecha,
          hora: hora,
          mesa: mesa,
          salida: salida,
          code: code
        }

        //se guarda la reservación en la BD:
        const nuevaReservacion = new Reservacion(obj);
        
        async function guardarReserva(){

            await nuevaReservacion.save();

        };
        guardarReserva().catch(console.error);


          //*se envía un correo al cliente:
          async function main() {
              
              const info = await transporter.sendMail({
                from: `Kaiju Sushi-Bar ${process.env.EMAIL}`, 
                to: correo, 
                subject: "Tu reservación en Kaiju Sushi-Bar", 
                text: `Muchas gracias ${cliente} por reservar con nosotros!

                  Aquí te indicamos los datos de tu reservación:

                  Fecha: ${fecha}
                  Hora: ${hora}:00
                  Su mesa: mesa número ${mesa}
                  Cantidad de personas: ${cantidad}

                  Recuerda que debes presentarte en la fecha indicada y si es posible unos 10 minutos antes.
                  Recuerda escanear tu código QR al llegar al local.

                  Cualquier cambio de agenda debe ser notificado con al menos un día de anticipación, y dichos cambios sólo serán posibles dependiendo de la disponibilidad del local.

                  Tiene un máximo de 5 minutos pasada la hora de su reservación para poder hacerla efectiva, de lo contrario el sistema cancelará su reservación automáticamente. Por lo que es recomendable llegar al menos 10 min antes de la hora de su reservación.

                  Por favor llegue a tiempo para evitar problemas.

                  Abre este link para ver tu código:

                  Mira tu código QR aquí

                  NO OLVIDES QUE TU CODIGO QR ES LO QUE VALIDARÁ TU RESERVACIÓN ASÍ QUE POR FAVOR NO LO PIERDAS NI BORRES ESTE CORREO. DE LO CONTRARIO NO NOS HAREMOS RESPONSABLES.

                  ¿Ya eres cliente miembro?
                  Si todavía no lo eres, Regístrate en nuestra plataforma para obtener aún más beneficios como consumidor! 
                `,
                html: `<p><b>Muchas gracias ${cliente} por reservar con nosotros!</b>
                  <br>
                  <br>
                  Aquí te indicamos los datos de tu reservación:
                  <br>
                  Fecha: ${fecha}
                  <br>
                  Hora: ${hora}:00
                  <br>
                  Su mesa: mesa número ${mesa}
                  <br>
                  cantidad de personas: ${cantidad}
                  <br>
                  <br>
                  <b>Recuerda que debes presentarte en la fecha indicada y si es posible unos 10 minutos antes.</b>
                  <br>
                  Recuerda escanear tu <b>código QR</b> al llegar al local.
                  <br>
                  <br>
                  Cualquier cambio de agenda debe ser notificado con al menos un día de anticipación, y dichos cambios sólo serán posibles dependiendo de la disponibilidad del local.
                  <br>
                  <br>
                  Tiene un máximo de 5 minutos pasada la hora de su reservación para poder hacerla efectiva, de lo contrario el sistema cancelará su reservación automáticamente. Por lo que es recomendable llegar al menos 10 min antes de la hora de su reservación.
                  <br>
                  <b>Por favor llegue a tiempo para evitar problemas.</b>
                  <br>
                  <br>
                  <b>Abre este link para ver tu código:</b>
                  <br>
                  <a href="https://kaiju-sushi-bar.onrender.com/api/reservaciones/data/${code}" target="_blank">Mira tu código QR aquí</a>
                  <br>
                  <br>
                  <b>NO OLVIDES QUE TU CODIGO QR ES LO QUE VALIDARÁ TU RESERVACIÓN ASÍ QUE POR FAVOR NO LO PIERDAS NI BORRES ESTE CORREO. DE LO CONTRARIO NO NOS HAREMOS RESPONSABLES.</b>
                  <br>
                  <br>
                  <br>
                  <br>
                  ¿Ya eres cliente miembro?
                  <br>
                  <br>
                  Si todavía no lo eres, <a href="http://localhost:4000/signup" target="_blank">Regístrate</a> en nuestra plataforma para obtener aún más beneficios como consumidor
                  </p>
                `, 
              });

              console.log("Se envió el correo de forma exitosa!", info.messageId);
          };
          main().catch(console.error);


          return response.status(200).json({message:'Se ha creado su reservación de forma exitosa!'});
      }

    }catch(error){

      return response.status(400).json({error: 'hubo un error al crear la reservación'});

    }

    
});


//*OBTENER LISTA DE RESERVACIONES:
reservacionRouter.get('/lista', async (request, response) => {

  try{

    const lista = await Reservacion.find().sort({fecha: 1});

    return response.status(200).json({ok: true, data: lista});

    
  }catch(error){
    
    return response.status(400).json({error: 'hubo un error al crear la reservación'});

  }

});


//*Borrar Reservación:
reservacionRouter.post('/delete', async (req,res) => {

  const {id} = req.body;

  try {

    const reserva = await Reservacion.deleteOne({_id: id});

    console.log(reserva);

    return res.status(200).json({message:'Se eliminó la reservación con exito'})
    
  } catch (error) {

    return res.status(400).json({error:'Hubo un error'});

  }

});


//*Datos QR:
reservacionRouter.get('/data/:code', async (req,res) => {

  try {

    //Obtener los parametros de la ruta:
    const { code } = req.params;

    //Verificar la existencia del usuario:
    const reserva = await Reservacion.findOne({code: code});

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
          <title>Kaiju - Datos de Reservación</title> 
      </head>
      <body class="crema">

          <main>
              <section class="relative">

                  <div class="md:hidden flex justify-center items-center pt-20">
                  <img src="/imagenes/Logo2.png" alt="logo de Kaiju sushi-bar" class="w-[40%] mx-[35%]">
                  </div>

                  <div class="py-14 m-[10%] min-w-[30%] md:w-72 shadow-2xl overflow-hidden sm:rounded-lg border-b border-gray-200 bg-gray-100 flex flex-col justify-center items-center gap-7">

                  <div class="mx-10 w-full h-full flex justify-center items-center">
                  <img src="http://api.qrserver.com/v1/create-qr-code/?data=${reserva.id}&size=200x200" alt="Código QR"/>
                  </div>

                  <div class=" mx-10 text-azul uppercase">
                    <p>${reserva.cliente}</p>
                    <p>fecha: ${reserva.fecha}</p>
                    <p>hora: ${reserva.hora}:00</p>
                    <p>mesa: ${reserva.mesa}</p>
                    <p>cantidad de personas: ${reserva.cantidad}</p>
                    <p>hora de salida: ${reserva.salida}:00</p>
                  </div>

                  <div class="md:mx-[5%] pt-5">

                    <div class="w-full flex justify-center items-center azul py-3 px-10 rounded-3xl hover:bg-teal-300 cursor-pointer transition ease-in-out delay-150 duration-300">

                    <a href="/descarga-reserva/?id=${reserva.id}" class="text-white flex md:text-xl QR">Descargar PDF</a> 

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

  } catch (error) {

    console.log(error)
    return res.status(400).json({error:'Error al confirmar usuario'});
  }

});


//*SCANEAR QR Y ACTUALIZAR RESERVACION:
reservacionRouter.post('/scan', async (req, res) => {

  try{

      const {id, hoy, hora, minutos} = req.body

      const reserva = await Reservacion.findOne({_id: id});

      if(!id){

          return res.status(400).json({error: 'hubo un error al obtener los datos'});

      }else if(!reserva){

          return res.status(400).json({error: 'La reservación no existe'});

      }else if(reserva.fecha !== hoy){

          return res.status(400).json({error: 'La reservación no es hoy'});

      }else if(reserva.fecha === hoy && reserva.hora !== hora){

        return res.status(400).json({error: 'No es la hora de su reservación'});

      }else if(reserva.fecha === hoy && reserva.hora === hora && minutos > 15){

        return res.status(400).json({error: 'La hora de su reservación ya caducó. Por favor, hable con el personal'});

      }else{

          const actualizar = await Reservacion.findOneAndUpdate({_id: id},{arrived: true});

          await actualizar.save();

          return res.status(200).json({message:'Se ha procesado la reservación!'});

      }


  }catch(error){

      return res.status(400).json({error: 'hubo un error al obtener los datos'});

  }

});



module.exports = reservacionRouter;