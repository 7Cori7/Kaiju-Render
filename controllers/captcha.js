const captchaRouter = require('express').Router();

captchaRouter.post('/upload', (req, res) => {

    const params = new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET,
        response: req.body['g-recaptcha-response'],
        remoteip: req.ip
    });

    fetch('https://www.google.com/recaptcha/api/siteverify', {
            
            method: 'POST',
            body: params,
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                res.json({ captchaSuccess: true });
            }else{
                res.json({ captchaSuccess: false });
            }
        });
    

});

module.exports = captchaRouter;