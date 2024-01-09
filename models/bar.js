const mongoose = require('mongoose');

//*SCHEMA PARA EL MENU-BAR:
const barSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    categoria: String,
    ingredientes: String
});


barSchema.set('toJSON',{
    transform: (document, returnObject) => {
        
        returnObject.id = returnObject._id.toString();

        delete returnObject._id;

        delete returnObject.__v;
    }
});

const Bar = mongoose.model('Bar', barSchema);
module.exports = Bar;

