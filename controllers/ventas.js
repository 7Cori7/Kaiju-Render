//*CONTROLADOR DE VENTAS:
const ventasRouter = require('express').Router();
const Venta = require('../models/venta');

//*Guardar la venta en la base de datos:
ventasRouter.post('/', async (req, res) => {

    try{

        const {pedido, total, estado, formaPago, cliente, tipo} = req.body;

        if(!pedido || !total || !estado || !formaPago || !cliente || !tipo){

            return res.status(400).json({error:'Faltan datos'});

        }else if(estado !== 'recibido'){

            return res.status(400).json({error:'El pedido no ha sido entregado'});

        }else{

            await Venta.create(req.body);

            return res.status(200).json({message:'Se procesó la venta con éxito!'});

        }

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});

    }

});

//*Obtener la lista de ventas:
ventasRouter.get('/lista', async (req, res) => {

    try{

        const lista = await Venta.find();

        return res.status(200).json({ ok: true, data: lista });

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});

    }

});

module.exports = ventasRouter;