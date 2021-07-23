const { Contacto } = require('../models/contacto');

const emailExiste = async(email = '') => {
    console.log("email: ", email);
    const emailExiste = await Contacto.findOne({ where: { email } });
    console.log(emailExiste);
    if (emailExiste) {
        throw new Error(`Ya tenemos una solictud con el correo ${email}`);
    }
}

const emailNoExiste = async(email = '') => {
    console.log("email: ", email);
    const emailExiste = await Contacto.findOne({ where: { email } });
    console.log(emailExiste);
    if (!emailExiste) {
        throw new Error(`No hay un registro con ese email${email}`);
    }
}



module.exports = {
    emailExiste,
    emailNoExiste
}