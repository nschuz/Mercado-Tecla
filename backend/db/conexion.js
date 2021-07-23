const Sequelize = require("sequelize");
require('dotenv').config({ path: '../dev.env' })

let sequelize;


try {
    sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.dialect,
        /*   pool: {
               max: process.env.max,
               min: process.env.min,
               acquire: process.envacquire,
               idle: process.env.idle
           }*/
    });
    console.log("Conexion a la base de datos correcta");
} catch (e) {
    console.log("Problema en la conexion " + e);

}



module.exports = sequelize;