const jwt = require('jsonwebtoken')
const { Usuario } = require('../models/Usuario');

const tokenActivo = async(req = request, res = response, next) => {
    //leer los header
    const token2 = req.cookies.token;
    //const token = req.header('acces-token');
    console.log(token2);

    if (!token2) {
        return next();
    }

    try {

        const { uid } = jwt.verify(token2, 'secretkey')
            //ller el usuario que corresponda al uid
        const usuario = await Usuario.findOne({ where: { id_unico: uid } })
        req.usuario = usuario;
        console.log("usssuario: ", usuario);
        if (!usuario)
            next();
        else {
            const isAdmin = usuario.dataValues.tipo_usuario;
            if (isAdmin == "admin") {
                res.redirect('/tienda/admin')
            } else {
                res.redirect('/tienda/user')
            }
        }

    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token no valido'
        })

    }
}
module.exports = { tokenActivo };