const mongoose = require('mongoose');

//*SCHEMA PARA VENTAS CONCRETADAS:  
const ventaSchema = new mongoose.Schema({

    cliente: String,
    pedido: Array,
    tipo: String,
    formaPago: String,
    estado: String,
    total: Number

}, {timestamps: true});

ventaSchema.set('toJSON',{

    transform: (document, returnObject) => {
        
        returnObject.id = returnObject._id.toString();

        delete returnObject._id;

        delete returnObject.__v;
    }

});

const Venta = mongoose.model('Venta', ventaSchema);
module.exports = Venta;