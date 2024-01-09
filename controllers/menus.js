const menuRouter = require('express').Router();
const Menu = require('../models/menu');



//*IMPRIMIR LISTA DE PRODUCTOS:
menuRouter.get('/lista', async (request, response) => {

    try{

        const lista = await Menu.find().sort({categoria: 1});

        return response.status(200).json({ ok: true, data: lista });

    }catch(error){

        return response.status(400).json({error:'Hubo un error'});

    }

});


//*OBTENER PRODUCTOS POR CATEGORIA:
menuRouter.get('/categ/bebidas', async (req, res) => {

    try{

        const listaBebidas = await Menu.find({categoria: 'Bebidas'});

        return res.status(200).json({ok: true, data: listaBebidas}); 

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});

    }

});

menuRouter.get('/categ/frios', async (req, res) => {

    try{

        const listaFrios = await Menu.find({categoria: 'Roles-Frios'});

        return res.status(200).json({ ok: true, data: listaFrios });

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});

    }

});

menuRouter.get('/categ/fritos', async (req, res) => {

    try{

        const listaFritos = await Menu.find({categoria: 'Tempura-Roll'});

        return res.status(200).json({ ok: true, data: listaFritos });

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});

    }

});

menuRouter.get('/categ/nigiri', async (req, res) => {

    try{

        const listaNigiri = await Menu.find({categoria: 'Nigiri-Sushi'});

        return res.status(200).json({ ok: true, data: listaNigiri });

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});

    }

});

menuRouter.get('/categ/temaki', async (req, res) => {

    try{

        const listaTemaki = await Menu.find({categoria: 'Temaki-Sushi'});

        return res.status(200).json({ ok: true, data: listaTemaki });

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});

    }

});

menuRouter.get('/categ/entradas', async (req, res) => {

    try{

        const listaEntradas = await Menu.find({categoria: 'Entradas'});

        return res.status(200).json({ ok: true, data: listaEntradas });

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});

    }

});

menuRouter.get('/categ/postres', async (req, res) => {

    try{

        const listaPostres = await Menu.find({categoria: 'Postres'});

        return res.status(200).json({ ok: true, data: listaPostres });

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});

    }

});



//*CREAR PRODUCTO:
menuRouter.post('/', async (request,response) => {

    //requerir del front:
    const { nombre, precio, categoria, ingredientes, imagen } = request.body;

    //validar:
    if(!nombre || !precio || !categoria || !ingredientes || !imagen){

        return response.status(400).json({error:'Todos los campos son requeridos'});

    }else if(await Menu.findOne({nombre: nombre})){

        return response.status(400).json({error:'El nombre del producto ya existe en la base de datos'});

    }else{

        //Se crea el producto y se guarda en la BD:
        
        const nuevoProducto = new Menu(request.body);
        
        async function guardarProducto(){

            await nuevoProducto.save();

            const productos = await Menu.find();

            console.log(productos)
        };

        guardarProducto().catch(console.error);

        return response.status(200).json({message:'Se creo el nuevo producto con exito!'});

    };


});


//*ELIMINAR PRODUCTO:
menuRouter.post('/delete', async (req, res) => {

    const { id } = req.body;

    try{

        const producto = await Menu.deleteOne({_id: req.body});

        console.log(producto);

        return res.status(200).json({message:'Se eliminó el producto con exito'})

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});

    }

});


//*EDITAR PRODUCTO:
menuRouter.post('/edit', async (req,res) => {
    
    const {nombre, precio, categoria, ingredientes, imagen, id} = req.body;
    
    if(!nombre || !precio || !categoria || !ingredientes || !imagen){

        return res.status(400).json({error:'Los campos no pueden estar vacíos'});

    }else{

        const actualizarProducto = await Menu.findOneAndUpdate({_id: id},{nombre: nombre, precio: precio, categoria: categoria, ingredientes: ingredientes, imagen: imagen});

        await actualizarProducto.save();

        return res.status(200).json({message:'Se actualizó el producto con exito!'});

    }
    
});


module.exports = menuRouter;