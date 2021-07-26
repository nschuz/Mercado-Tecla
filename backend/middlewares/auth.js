const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',

}, async(email, password, done) => {
    try {
        const user = await Usuario.findAll({ where: { email } });

        if (!user) {
            return done(null, false, { message: "Usuario no econtrado" })
        }
        //validar password 
        const passwordDB = user[0].dataValues.password;
        const passwordCorecto = bcrypt.compareSync(passwordField, passwordDB);

        if (!passwordCorecto) {
            return done(null, false, { message: "Correo o password incorrecto" })
        }

        return done(null, user, { message: "Login successfull" })

    } catch (e) {

    }

}))