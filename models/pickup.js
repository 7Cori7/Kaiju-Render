const mongoose = require('mongoose');

//*SCHEMA PARA LOS PEDIDOS PICK-UP
const pickupSchema = new mongoose.Schema({
    
    cliente: Object,
    pedido: Array,
    total: Number,
    fecha: String,
    hora: String,
    destino: String,
    formaPago: String,
    code: String,
    estado: String

}, {timestamps: true});

pickupSchema.set('toJSON',{
    transform: (document, returnObject) => {
        
        returnObject.id = returnObject._id.toString();

        delete returnObject._id;

        delete returnObject.__v;
    }
});


const Pickup = mongoose.model('Pickup', pickupSchema);
module.exports = Pickup;