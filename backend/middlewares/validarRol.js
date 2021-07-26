const jwt = require('jsonwebtoken')
const { Usuario } = require('../models/Usuario');

const validarRol = async(req = request, res = response, next) => {
    //leer los header
    const token2 = req.cookies.token;
    //const token = req.header('acces-token');
    console.log(token2);


    try {

        const { uid } = jwt.verify(token2, 'secretkey')

        //ller el usuario que corresponda al uid
        const usuario = await Usuario.findOne({ where: { id_unico: uid } })
        const rol = usuario.dataValues.tipo_usuario;

        if (rol == 'cliente') {
            return res.status(403).json({
                msg: 'No tienes Permisos :C'
            })
        }
        next();



    } catch (err) {
        console.log(err);
        res.status(403).json({
            msg: 'No tienes Permisos'
        })

    }




}


module.exports = {
    validarRol
}