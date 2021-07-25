const { Usuario } = require('../models/usuario');

const emailExiste = async(email = '') => {
    //const emailExiste = await Contacto.findOne({ where: { email } });
    const emailExiste = await Usuario.findOne({ where: { email } });
    console.log(emailExiste);
    if (emailExiste) {
        throw new Error(`Ya tenemos un registro con este  ${email} email`);
    }
}

const emailNoExiste = async(email = '') => {

    // const emailExiste = await Contacto.findOne({ where: { email } });
    console.log(emailExiste);
    if (!emailExiste) {
        throw new Error(`No hay un registro con ese email${email}`);
    }
}

const idExiste = async(id = '') => {
    const idExiste = await Usuario.findOne({ where: { id_unico: id } });
    if (!idExiste) {
        throw new Error(`NO tenemos un registro con ese id ${id}`);
    }

}



module.exports = {
    emailExiste,
    emailNoExiste,
    idExiste,
}