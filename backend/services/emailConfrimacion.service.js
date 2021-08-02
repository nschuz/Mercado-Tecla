 const nodemailer = require('nodemailer');
 const emailConfirmacion = async(email) => {
     try {
         console.log("Email: ", email);
         let testAccount = await nodemailer.createTestAccount();
         let transporter = nodemailer.createTransport({
             host: "smtp.ionos.mx",
             port: 587,
             secure: false,
             auth: {
                 user: 'chuz.regis@proyectocifrado.com',
                 pass: 'Anytime0730',
             },
             tls: {
                 // do not fail on invalid certs
                 rejectUnauthorized: false
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

     } catch (e) {
         console.log("Problema en el envio ");
         console.log(e);
     }

 }

 module.exports = {
     emailConfirmacion
 }