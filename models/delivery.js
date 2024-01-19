const mongoose = require('mongoose');

//*SCHEMA PARA PEDIDOS DELIVERY:
const deliverySchema = new mongoose.Schema({
    
    cliente: Object,
    pedido: Array,
    total: Number,
    telefono: String,
    destino: Object,
    formaPago: String,
    code: String,
    estado: String

}, {timestamps: true});

deliverySchema.set('toJSON',{
    transform: (document, returnObject) => {
        
        returnObject.id = returnObject._id.toString();

        delete returnObject._id;

        delete returnObject.__v;
    }
});

deliverySchema.watch().on('change', data => console.log(data));


const Delivery = mongoose.model('Delivery', deliverySchema);
module.exports = Delivery;