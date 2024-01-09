const mongoose = require('mongoose');

//*SCHEMA PARA EL MENU-SUSHI:
const menuSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    categoria: String,
    ingredientes: String,
    imagen: String
},
    {methods: {
        
        setImgUrl(filename){

            this.imagen = `http://localhost:4000/menu-img/${filename}`;
        
        }
    }}
);


menuSchema.set('toJSON',{
    transform: (document, returnObject) => {
   
        returnObject.id = returnObject._id.toString();

        delete returnObject._id;

        delete returnObject.__v;
    }
});


const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;