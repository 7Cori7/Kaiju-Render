const mongoose = require('mongoose');

//*MODELO DE RESERVACIONES
const reservacionSchema = new mongoose.Schema({
    cliente: String,
    telefono: Number,
    correo: String,
    cantidad: Number,
    fecha: String,
    hora: Number,
    mesa: Number,
    arrived: {
        type: Boolean,
        default: false
    },
    salida: Number,
    code: String
}, {timestamps: true});

reservacionSchema.set('toJSON',{
    transform: (document, returnObject) => {
        
        returnObject.id = returnObject._id.toString();

        delete returnObject._id;

        delete returnObject.__v;
    }
});

const Reservacion = mongoose.model('Reservacion', reservacionSchema);
module.exports = Reservacion;