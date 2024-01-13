const barRouter = require('express').Router();
const { async } = require('postcss-js');
const Bar = require('../models/bar');


//*IMPRIMIR LISTA DE PRODUCTOS BAR:
barRouter.get('/lista', async (req, res) => {
    try{

        const listaBar = await Bar.find().sort({categoria: 1});

        return res.status(200).json({ ok: true, data: listaBar });

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});
    }
});


//*OBTENER PRODUCTOS POR CATEGORIAS:
barRouter.get('/categ/cerveza', async (req, res) => {
    try{

        const listaCerveza = await Bar.find({categoria: 'Cerveza'});

        return res.status(200).json({ ok: true, data: listaCerveza });

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});
    }
});

barRouter.get('/categ/coctel', async (req, res) => {
    try{

        const listaCocteles = await Bar.find({categoria: 'Coctel'});

        return res.status(200).json({ ok: true, data: listaCocteles });

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});
    }
});

barRouter.get('/categ/vino', async (req, res) => {
    try{

        const listaVinos = await Bar.find({categoria: 'Vino'});

        return res.status(200).json({ ok: true, data: listaVinos });

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});
    }
});


//*CREAR PRODUCTO BAR:
barRouter.post('/', async (req, res) => {

    const {nombre, precio, categoria, ingredientes} = req.body;

    //Validar:
    if( !nombre || !precio || !categoria || !ingredientes ){

        return res.status(400).json({error:'Todos los campos son requeridos'});

    }if( await Bar.findOne({nombre: nombre}) ){

        return res.status(400).json({error:'El nombre del producto ya existe en la base de datos'});

    }else{

        //Se crea el producto y se guarda en la BD:
        const nuevoBar = new Bar(req.body);

        async function guardarBar(){

            await nuevoBar.save();

        };

        guardarBar().catch(console.error);

        return res.status(200).json({message:'Se creo el nuevo producto con exito!'});

    };

});


//*ELIMINAR PRODUCTO BAR:
barRouter.post('/delete', async (req,res) => {
    const { id } = req.body;

    try{

        const producto = await Bar.deleteOne({_id: req.body});

        console.log(producto);

        return res.status(200).json({message:'Se eliminó el producto con exito'})

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});

    }
});


//*EDITAR PRODUCTO BAR:
barRouter.post('/edit', async (req, res) => {

    const {nombre, precio, categoria, ingredientes, id} = req.body;

    if(!nombre || !precio || !categoria || !ingredientes){

        return res.status(400).json({error:'Los campos no pueden estar vacíos'});

    }else{

        const actualizarProducto = await Bar.findOneAndUpdate({_id: id},{nombre: nombre, precio: precio, categoria: categoria, ingredientes: ingredientes});

        await actualizarProducto.save();

        return res.status(200).json({message:'Se actualizó el producto con exito!'});

    }

});


module.exports = barRouter;
