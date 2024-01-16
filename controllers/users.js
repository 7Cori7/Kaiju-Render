//*CONTROLADOR DEL USUARIO:
const userRouter = require('express').Router();
const transporter = require('../helpers/mailer');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//*FUNCION PARA CREAR TOKEN DE JWT:
const maxAge = 3 * 24 * 60 * 60;
const crearToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: maxAge });
}

//*REGISTRAR USUARIO:
userRouter.post('/', async (request, response) => {
    
    const { name, email, password, cliente } = request.body
    console.log(name, email, password, cliente);

    if(!name || !email || !password){

        //NOTIFICACION DE ERROR:
        return response.status(400).json({error:'Todos los campos son requeridos'});

    }else if(await User.findOne({email: email})){

      return response.status(400).json({error:'El correo ya está registrado'});

    }else{


        //*FUNCION PARA MANDAR CORREOS:
        async function mandarCorreo() {

            const info = await transporter.sendMail({
              from: `Kaiju Sushi-Bar ${process.env.EMAIL}`, 
              to: email, 
              subject: "Verifica tu correo", 
              text: `Bienvenid@ ${name}!
                Verifica tu correo electrónico para que puedas iniciar sesión en nuestro sistema correctamente.
                Por favor dale click al siguiente enlace:
                
              `,
              html: `<p><b>Bienvenid@ ${name}!</b>
                <br>
                Verifica tu correo electrónico para que puedas iniciar sesión en nuestro sistema correctamente.
                <br>
                Por favor dale click al siguiente enlace para poder verificar tu cuenta:
                <br>
                <a href="https://kaiju-sushi-bar.onrender.com/api/users/confirm/${email}" target="_blank">Autenticar tu cuenta</a>
                </p>
              `, 
            });

            console.log("Se envió el correo de forma exitosa!", info.messageId);
        };

        mandarCorreo().catch(console.error);


        //*GUARDAR EL USUARIO EN LA BD:
        let usuario = new User();

        usuario.name = name;

        usuario.email = email;

        usuario.cliente = cliente;

        usuario.setPassword(password);

        async function guardarUser(){
          await usuario.save();
          const usuarios = await User.find();
          console.log(usuarios)
        };

        guardarUser().catch(console.error);

        if(cliente === true){

          //Cookie del usuario:
          const token = crearToken(usuario.id);
          response.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        }else{

          //Cookie del admin:
          const token = crearToken(usuario.id);
          response.cookie( 'squid', token, { httpOnly: true, maxAge: maxAge * 1000 });
  
        }

        //NOTIFICACION:
        return response.status(200).json({message:'Se ha enviado un correo para verificar su usuario'});
    }

});


//*VALIDAR EL REGISTRO:
userRouter.get('/confirm/:email', async (req,res) => {

  try {

    //Obtener los parametros de la ruta:
    const { email } = req.params;

    console.log(email)

    //Verificar la existencia del usuario:
    const usuario = await User.findOne({email: email});

    if(!usuario){

      res.send('Error: El usuario no existe');

    }else if(usuario.verified){

      res.send('Error: El usuario ya está verificado');

    }else{

      //Actualizar usuario:
      const actualizarUser = await User.findOneAndUpdate({email: email}, {verified: true});
      await actualizarUser.save();

      //Redireccionar a página "confirmar":
      return res.redirect('/confirmar');

    }

  } catch (error) {

    console.log(error)
    return res.status(400).json({error:'Error al confirmar usuario'});
  }
  
});


//*VALIDAR EL LOGIN:
userRouter.post('/login', async (req,res) => {

  const {email, password} = req.body;

  console.log(email, password)

  try{

    //EXTRAER DE LA BD:
    const usuario = await User.findOne({ email });

    //VALIDAR:
    if( !email || !password ){

      return res.status(400).json({error:'Todos los campos son requeridos'});

    }else if( !usuario ){

      return res.status(400).json({error:'El correo es incorrecto'});

    }else if( !usuario.verified ){

      return res.status(400).json({error:'El usuario no está autentificado. Por favor, verifique la bandeja de entrada de su correo electrónico'});

    }else{
      
      //comprobar el password
      if(usuario.validPassword(password)){

        //comprobar si es user o admin
        if( usuario.cliente ){

          console.log(usuario)
          
          //Cookie del usuario:
          const token = crearToken(usuario.id);
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
  
          return res.status(200).json({ok:true, data:usuario.name, message:'Se ha loggeado correctamente'});
  
        }else{
  
          //Cookie del admin:
          const token = crearToken(usuario.id);
          res.cookie( 'squid', token, { httpOnly: true, maxAge: maxAge * 1000 });
  
          return res.status(200).json({message:'Se ha loggeado correctamente'});
  
        }

      }else{

        return res.status(400).json({error:'Password incorrecto'});

      }


    };

  }catch(error){

    console.log(error)
    return res.status(400).json({error:'Error al loggear el usuario'});

  }
  
  
});


//*USER LOGOUT
userRouter.get('/logout', (req, res) => {
  
  res.cookie('jwt', '', { maxAge: 1 }); //<--se reemplaza la cookie del usuario por otra con el mismo nombre que no tiene valor y expira en 1 milisegundo
  res.redirect('/');
  
});


//*ADMIN LOGOUT
userRouter.get('/cerrar', (req, res) => {
  
  res.cookie('squid', '', { maxAge: 1 }); //<--se reemplaza la cookie del usuario por otra con el mismo nombre que no tiene valor y expira en 1 milisegundo
  res.redirect('/');
  
});



//*OBTENER EL USUARIO(cookie):
userRouter.get('/galleta', (req, res, next) => {

  const token = req.cookies.jwt;

  if(token){

    jwt.verify(token, process.env.SECRET_JWT, async (error, decodedToken) => {

        if(error){

            console.log(error.message)
            res.locals.user = null;
            next();

        }else{

            console.log(decodedToken)
            const user = await User.findById(decodedToken.id);
            res.status(200).json({ ok: true, data: user });

        }

    });

  }else{

      res.locals.user = null;
      next();

  }


});


//*OBTENER ADMIN(cookie):
userRouter.get('/ikka', (req, res, next) => {

  const token = req.cookies.squid;

  if(token){

    jwt.verify(token, process.env.SECRET_JWT, async (error, decodedToken) => {

        if(error){

            console.log(error.message)
            res.locals.user = null;
            next();

        }else{

            console.log(decodedToken)
            const user = await User.findById(decodedToken.id);
            res.status(200).json({ ok: true, data: user.name });

        }

    });

  }else{

      res.locals.user = null;
      next();

  }


});

//*OBTENER ADMIN:
userRouter.get('/ikka-list', async (req, res) => {

  try{

    const listaAd = await User.find({cliente: false});

    return res.status(200).json({ok: true, data: listaAd});

  }catch(error){

    return res.status(400).json({error:'Hubo un error'});

  }

});

//*EDITAR ADMIN:
userRouter.post('/edit-ikka', async (req, res) => {

  try{

    const { name, email, password, id} = req.body;

    console.log(req.body)

    if(!name && !email && !password){

      return res.status(400).json({error:'Todos los campos no pueden estar vacios'});

    }else{

      console.log('actualizando')
      const actualizarAdmin = await User.findOneAndUpdate({_id: id}, {name: name, email: email});

      await actualizarAdmin.save();

      if(password){

        actualizarAdmin.setPassword(password);

        await actualizarAdmin.save();

      }

      //Cookie para el admin:
      const token = crearToken(actualizarAdmin.id);
      res.cookie( 'squid', token, { httpOnly: true, maxAge: maxAge * 1000 });

      //NOTIFICACION:
      return res.status(200).json({message:'Se ha actualizado el admin correctamente'});

    }

  }catch(error){

    return res.status(400).json({error:'Hubo un error'});

  }

});


//*OBTENER LISTA DE USUARIOS:
userRouter.get('/lista-users', async (req,res) => {

  try{

    const lista = await User.find().sort({name: 1});

    return res.status(200).json({ok: true, data: lista});
    
  }catch(error){

    return res.status(400).json({error:'Hubo un error'});

  }

});

//*EDITAR USUARIO:
userRouter.post('/edit-user', async (req, res) => {

    try{

      const { name, email, password, telefono, id } = req.body;

      if(!name && !email && !password && !telefono){

        return res.status(400).json({error:'Todos los campos no pueden estar vacios'});

      }else{

        const actualizarUser = await User.findOneAndUpdate({_id: id}, {name: name, email: email, telefono: telefono});

        await actualizarUser.save();

        if(password){

          actualizarUser.setPassword(password);

          await actualizarUser.save();

        }

        //Cookie del usuario:
        const token = crearToken(actualizarUser.id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        //NOTIFICACION:
        return res.status(200).json({message:'Se ha actualizado el usuario correctamente'});

      }

    }catch(error){

      return res.status(400).json({error:'Hubo un error'});

    }
    

});


//*ELIMINAR USUARIO:
userRouter.post('/eliminar-user', async (req,res) => {

  const { id } = req.body;

  try{

    const usuario = await User.deleteOne({_id: id});

    return res.status(200).json({message:'Se ha eliminado la cuenta correctamente. Adiu!'});
    
  }catch(error){
    
    return res.status(400).json({error:'Hubo un error'});

  }

});

module.exports = userRouter;