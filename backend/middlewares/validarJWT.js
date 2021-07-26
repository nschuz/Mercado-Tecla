const jwt = require('jsonwebtoken')
const { Usuario } = require('../models/Usuario');

const validarJWT = async(req = request, res = response, next) => {
    //leer los header
    const token2 = req.cookies.token;
    //const token = req.header('acces-token');
    console.log(token2);

    if (!token2) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const { uid } = jwt.verify(token2, 'secretkey')

        //ller el usuario que corresponda al uid
        const usuario = await Usuario.findOne({ where: { id_unico: uid } })



        req.usuario = usuario;
        next();

    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token no valido'
        })

    }




}


module.exports = {
    validarJWT
}