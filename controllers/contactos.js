//*CONTROLADOR DE CONTACTANOS:
const contactosRouter = require('express').Router();
const transporter = require('../helpers/mailer');


contactosRouter.post('/', (request,response) => {
    
    const {nombre,correo,asunto,mensaje} = request.body;

    if(!nombre || !correo || !asunto || !mensaje){

        //Notificación de error:
        return response.status(400).json({error:'Todos los campos son requeridos'});

    }else{

        //*FUNCION PARA MANDAR CORREOS:
        async function main() {
            
            const info = await transporter.sendMail({
              from: `Kaiju Sushi-Bar ${process.env.EMAIL}`, 
              to: correo, 
              subject: "Gracias por comunicarte con Kaiju Sushi-Bar", 
              text: `Muchas gracias ${nombre} por comunicarte con nostros!
                Tomaremos en cuenta tu mensaje y prontamente nos estaremos comunicando contigo.
                ¿Todavía no te has registrado en nuestra plataforma?
                Regístrate haciendo click en el siguiente link:
                Regístrate!
              `,
              html: `<p><b>Muchas gracias ${nombre} por comunicarte con nostros!</b>
                <br>
                <br>
                Tomaremos en cuenta tu mensaje y prontamente nos estaremos comunicando contigo.
                <br>
                <br>
                <br>
                <br>
                ¿Todavía no te has registrado en nuestra plataforma?
                <br>
                <br>
                Regístrate haciendo click en el siguiente link:
                <br>
                <a href="http://localhost:4000/signin/">Regístrate!</a>
                </p>
              `, 
            });

            console.log("Se envió el correo de forma exitosa!", info.messageId);
        };

        main().catch(console.error);

        //*FUNCION PARA RECIBIR EL MENSAJE:
        async function mensajeContacto(){

          const msj = await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: 'Nuevo mensaje de contacto',
            text: `Nuevo mensaje enviado por:
                    Nombre: ${nombre}
                    Correo: ${correo}
                    Asunto: ${asunto}
                    Mensaje: ${mensaje}`,
            html: `<p>
                      Nuevo mensaje enviado por:
                      <br>
                      <br>
                      Nombre: ${nombre}
                      <br>
                      Correo: ${correo}
                      <br>
                      <br>
                      Asunto: ${asunto}
                      <br>
                      Mensaje: ${mensaje}
                    </p>`
          });
          console.log("Se envió el mensaje del contacto!", msj.messageId);
        };
        mensajeContacto().catch(console.error);

        //Notificación:
        return response.status(200).json({message:'Se ha enviado su mensaje'});

    }
    
});

contactosRouter.post('/mensaje', (req,res) => {

  const {nombre,correo,asunto,cuerpo} = req.body;

  console.log(nombre,correo,asunto,cuerpo)

  try{

    if(!asunto || !cuerpo){

      //Notificación de error:
      return res.status(400).json({error:'Todos los campos son requeridos'});

    }else{

      //*FUNCION PARA MANDAR CORREOS:
      async function main() {
            
        const info = await transporter.sendMail({
          from: `Kaiju Sushi-Bar ${process.env.EMAIL}`, 
          to: correo, 
          subject: asunto, 
          text: `Saludos ${nombre}!
            ${cuerpo}
          `,
          html: `<p>Saludos ${nombre}!<br><br>${cuerpo}</p>`
        });

        console.log("Se envió el correo de forma exitosa!", info.messageId);
      };

      main().catch(console.error);

      return res.status(200).json({message:'Se envió el mensaje correctamente'});

    }
    
  }catch(error){

    return res.status(400).json({error:'Hubo un error'});
    
  }

});


module.exports = contactosRouter;