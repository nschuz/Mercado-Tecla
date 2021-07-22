const { validationResult } = require('express-validator');


//como es un middlware usa un parametro mas 
const validarCampos = (req, res, next) => {
    //obstenmmos los errores del middlware de la ruta
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}


module.exports = {
    validarCampos
}