 const nodemailer = require('nodemailer');
 const emailConfirmacion = async(email) => {
     let testAccount = await nodemailer.createTestAccount();
     let transporter = nodemailer.createTransport({
         host: "smtp.ionos.mx",
         port: 587,
         secure: false,
         auth: {
             user: 'chuz.regis@proyectocifrado.com',
             pass: 'Anytime0730',
         },
     });
     let info = await transporter.sendMail({
         from: '"Tecla Mercado" <chuz.regis@proyectocifrado.com>', // sender address
         to: email, // list of receivers
         subject: "Tu Factura Gracias Por Tu compra",
         text: `Garcias por tu compra`,
         html: `<p>Gracias por tu compra </p>`,
         attachments: [{
             path: `./facturas/${email}.pdf`
         }]

     });

 }

 module.exports = {
     emailConfirmacion
 }