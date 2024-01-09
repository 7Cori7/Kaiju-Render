const mongoose = require('mongoose');

//*SCHEMA DE CONTACTOS
const contactoSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    asunto: String,
    mensaje: String
});

contactoSchema.set('toJSON',{
    transform: (document, returnObject) => {
        
        returnObject.id = returnObject._id.toString();

        delete returnObject._id;

        delete returnObject.__v;
    }
});


const Contacto = mongoose.model('Contacto', contactoSchema);
module.exports = Contacto;