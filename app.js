require('dotenv').config();
const exp = require('constants');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

//Routers:
const baresRouter = require('./controllers/bares');
const deliveryRouter = require('./controllers/deliveries');
const pickupRouter = require('./controllers/pickups');
const reservacionRouter = require('./controllers/reservaciones');
const usersRouter = require('./controllers/users');
const menuRouter = require('./controllers/menus');
const contactosRouter = require('./controllers/contactos');
const pedidosRouter = require('./controllers/pedidos');
const ordersRouter = require('./controllers/orders');
const ventasRouter = require('./controllers/ventas');


const { requireAuth, adminAuth, pedidoAuth } = require('./middleware/authMiddleware');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');


(async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Te has conectado a MongoDB')
    }catch(error){
        console.log(error)
    }
})();


//*MIDDLEWARE:
app.use(cors());
app.use(cookieParser());
//Morgan:
app.use(morgan('tiny'));
//Importante:
app.use(express.json());


//*Rutas del Front-end:
app.use('/', express.static(path.resolve('views','home')));

app.use('/components', express.static(path.resolve('views','components')));
app.use('/estilos', express.static(path.resolve('styles')));
app.use('/imagenes', express.static(path.resolve('styles','img')));

app.use('/bar', express.static(path.resolve('views','menu-bar')));
app.use('/sushi', express.static(path.resolve('views','menu-sushi')));
app.use('/contactos', express.static(path.resolve('views','contact')));
app.use('/pide-online', express.static(path.resolve('views','pide-online')));

app.use('/delivery', express.static(path.resolve('views','pide-online','delivery')));
app.use('/pick-up', express.static(path.resolve('views','pide-online','pick-up')));
app.use('/menu-img', express.static(path.resolve('views','pide-online','img')));


app.use('/login', express.static(path.resolve('views','login')));
app.use('/signup', express.static(path.resolve('views','signup')));

app.use('/reservar', express.static(path.resolve('views','reservar')));

app.use('/confirmar', express.static(path.resolve('views', 'confirmar')));
app.use('/confirmar-reservacion', express.static(path.resolve('views','confirmar','confirmRes')));
app.use('/confirmar-compra', express.static(path.resolve('views', 'confirmar', 'confirmBuy')));

app.use('/descarga-pickup/?', express.static(path.resolve('views', 'descarga', 'descargaP')));
app.use('/descarga-delivery/?', express.static(path.resolve('views', 'descarga', 'descargaD')));
app.use('/descarga-reserva/?', express.static(path.resolve('views', 'descarga', 'descargaR')));

//Rutas del panel del usuario:
app.use('/panel-usuario', requireAuth, express.static(path.resolve('views','Panel-usuario')));
app.use('/perfil-usuario', requireAuth, express.static(path.resolve('views','Panel-usuario','perfil')));
app.use('/carrito-usuario', requireAuth, express.static(path.resolve('views','Panel-usuario','carrito')));
app.use('/booking-usuario', requireAuth, express.static(path.resolve('views','Panel-usuario','reservaciones')));
app.use('/pedidos-usuario', requireAuth, express.static(path.resolve('views','Panel-usuario','pedidos')));
app.use('/historial-usuario', requireAuth, express.static(path.resolve('views','Panel-usuario','historial')));

app.use('/caja', requireAuth, pedidoAuth, express.static(path.resolve('views', 'caja')));


//Rutas del Administrador:
app.use('/calamar', adminAuth, express.static(path.resolve('views','admin')));
app.use('/clientes', adminAuth, express.static(path.resolve('views','admin','clientes')));
app.use('/opciones', adminAuth, express.static(path.resolve('views','admin','opciones')));
app.use('/pedidos', adminAuth, express.static(path.resolve('views','admin','pedidos')));
app.use('/reservaciones', adminAuth, express.static(path.resolve('views','admin','reservas')));
app.use('/analiticas', adminAuth, express.static(path.resolve('views','admin','analiticas')));

app.use('/scanner-R', adminAuth, express.static(path.resolve('views', 'admin', 'scanReservas')));
app.use('/scanner-D', adminAuth, express.static(path.resolve('views', 'admin', 'scanDelivery')));
app.use('/scanner-P', adminAuth, express.static(path.resolve('views', 'admin', 'scanPickup')));


//*Rutas de Backend:
app.use('/api/bares', baresRouter);
app.use('/api/deliveries', deliveryRouter);
app.use('/api/pickups', pickupRouter);
app.use('/api/reservaciones', reservacionRouter);
app.use('/api/users', usersRouter);
app.use('/api/menus', menuRouter);
app.use('/api/contactos', contactosRouter);
app.use('/api/pedidos', pedidosRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/ventas', ventasRouter);  

module.exports = app;