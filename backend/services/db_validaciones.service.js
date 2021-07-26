const { Usuario } = require('../models/usuario');
const { request } = require('express')
const bcrypt = require('bcrypt');

const emailExiste = async(email = '') => {
    //const emailExiste = await Contacto.findOne({ where: { email } });
    const emailExiste = await Usuario.findOne({ where: { email } });

    if (emailExiste) {
        throw new Error(`Ya tenemos un registro con este  ${email} email`);
    }
}

const emailNoExiste = async(email) => {


    const emailExiste = await Usuario.findOne({ where: { email } });

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

const passwordCorrecto = async(email = '', req) => {
    try {
        //console.log(req.body.password);
        //console.log(email)
        const { password } = req.body;
        const user = await Usuario.findOne({ where: { email } });
        //validar password 
        const passwordDB = user.dataValues.password;
        const passwordCorecto = bcrypt.compareSync(password, passwordDB);
        console.log("passoword ", passwordCorecto);
        if (passwordCorecto)
            return Promise.resolve("ok")
        else
            return Promise.reject('error');
    } catch (error) {
        console.log("ERROR".red + error.message);
    }



}



module.exports = {
    emailExiste,
    emailNoExiste,
    idExiste,
    passwordCorrecto
}