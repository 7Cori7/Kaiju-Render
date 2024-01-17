const pedidosRouter = require('express').Router();
const jwt = require('jsonwebtoken');

//*FUNCION PARA CREAR TOKEN DE JWT:
const maxAge = 3 * 24 * 60 * 60;
const crearToken = (items) => {
  return jwt.sign({ items }, process.env.SECRET_JWT, { expiresIn: maxAge });
}


//*CREAR COOKIE DEL CARRITO:
pedidosRouter.post('/cart', (req, res) => {

    console.log(req.body)

    try{

        const token = crearToken(req.body);
        res.cookie('carrito', token, { httpOnly: true, maxAge: maxAge * 1000 });

        return res.status(200).json({ok:true, data:req.body});

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});

    };

});


//*OBTENER LA COOKIE DEL CARRITO:
pedidosRouter.get('/cart/list', (req, res, next) => {

    const token = req.cookies.carrito;

    if(token){

        jwt.verify(token, process.env.SECRET_JWT, async (error, decodedToken) => {

            if(error){

                console.log(error.message)
                res.locals.carrito = null;
                next();

            }else{

                const carrito = decodedToken;
                res.status(200).json({ ok: true, data: carrito });

            }

        });

    }else{

        res.locals.carrito = null;
        next();

    }

});


//*CREAR COOKIE DEL PEDIDO DELIVERY:
pedidosRouter.post('/set-delivery', (req, res) => {

    const {pedido, telefono, destino, tipoPedido } = req.body;

    console.log(req.body);

    try{

        if(!pedido || !telefono || !destino){

            return res.status(400).json({error:'Los campos no pueden estar vacios'});

        }else{

            const token = crearToken(req.body);
            res.cookie('pedido', token, { httpOnly: true, maxAge: maxAge * 1000 });
    
            return res.status(200).json({ok:true, data:req.body, message:'Se ha generado su pedido'});
        }

    }catch(error){

        return res.status(400).json({error:'Hubo un error al crear el pedido'});

    }

});

//*CREAR COOKIE DE PEDIDO PICK-UP:
pedidosRouter.post('/set-pickup', (req, res) => {

    const {pedido, fecha, hora, tipoPedido, destino } = req.body;

    console.log(req.body);

    try{

        if(!pedido || !hora || !destino || !fecha){

            return res.status(400).json({error:'Los campos no pueden estar vacios'});

        }else{

            const token = crearToken(req.body);
            res.cookie('pedido', token, { httpOnly: true, maxAge: maxAge * 1000 });
    
            return res.status(200).json({ok:true, data:req.body, message:'Se ha generado su pedido'});
        }

    }catch(error){

        return res.status(400).json({error:'Hubo un error al crear el pedido'});

    }

});


//*OBTENER COOKIE PEDIDOS:
pedidosRouter.get('/get-orden', (req, res, next) => {

    const token = req.cookies.pedido;
    if(token){

        jwt.verify(token, process.env.SECRET_JWT, async (error, decodedToken) => {

            if(error){

                console.log(error.message)
                res.locals.pedido = null;
                next();

            }else{

                const pedido = decodedToken;
                res.status(200).json({ ok: true, data: pedido });

            }

        });

    }else{

        res.locals.pedido = null;
        next();

    }
});



module.exports = pedidosRouter;