const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({

    //*2 definir el schema:
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    hash: String,
    salt: String,
    telefono: Number,
    cliente: {
        type: Boolean,
        default: true
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});


userSchema.set('toJSON', {
    //document es el schema, returnObject es lo que estoy solicitando
    transform: (document, returnObject) => {

        //estoy creando una propiedad que se llame id:
        returnObject.id = returnObject._id.toString();

        //voy a borrar la propiedad_id
        delete returnObject._id;

        //borrar version 
        delete returnObject.__v;

        delete returnObject.passwordHash;
    }

});

//FUNCION PARA ENCRIPTAR EL PASSWORD
userSchema.methods.setPassword = function (password) {

    this.salt = crypto.randomBytes(16).toString('hex');

    this.hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, `sha512`).toString(`hex`);

};

//FUNCION PARA DESENCRIPTAR EL PASSWORD
userSchema.methods.validPassword = function (password) {

    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);

    return this.hash === hash;
    
};

const User = mongoose.model('User', userSchema);
module.exports = User;