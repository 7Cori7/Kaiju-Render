const jwt = require('jsonwebtoken');

//Autenticar el usuario:
const requireAuth = ( req, res, next) => {

    const token = req.cookies.jwt;

    if(token){

        jwt.verify(token, process.env.SECRET_JWT, (error, decodedToken) => {

            if(error){

                console.log(error.message)
                res.redirect('/login');

            }else{

                console.log(decodedToken)
                next();

            }

        })

    }else{

        res.redirect('/login');

    }

};


//autenticar el admin:
const adminAuth = ( req, res, next) => {

    const token = req.cookies.squid;

    if(token){

        jwt.verify(token, process.env.SECRET_JWT, (error, decodedToken) => {

            if(error){

                console.log(error.message)
                res.redirect('/');

            }else{

                console.log(decodedToken)
                next();

            }

        })

    }else{

        res.redirect('/');

    }

};


//Autenticar pedido:
const pedidoAuth = ( req, res, next) => {

    const token = req.cookies.pedido;

    if(token){

        jwt.verify(token, process.env.SECRET_JWT, (error, decodedToken) => {

            if(error){

                console.log(error.message)
                res.redirect('/');

            }else{

                console.log(decodedToken)
                next();

            }

        })

    }else{

        res.redirect('/');

    }

};

module.exports = { requireAuth, adminAuth, pedidoAuth };