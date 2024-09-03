const nodemailer = require("nodemailer");

//*TRANSPORTER PARA MANDAR CORREOS CON NODEMAILER:
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = transporter;