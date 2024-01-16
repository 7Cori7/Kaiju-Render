const dolarApiRouter = require('express').Router();
const dolar = require("consulta-dolar-venezuela");

dolarApiRouter.get('/monitor-dolar', async (req, res) => {

    try{

        let tasaDolar = await dolar.getMonitor("EnParaleloVzla", "price", false);

        return res.status(200).json({ ok: true, data: tasaDolar });

    }catch(error){

        return res.status(400).json({error:'Hubo un error'});

    }
    

});

module.exports = dolarApiRouter;