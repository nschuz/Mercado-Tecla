const Sequelize = require("sequelize");
require('dotenv').config({ path: '../dev.env' })

let sequelize;


try {
    sequelize = new Sequelize(process.env.DBAZURE, process.env.USERAZURE, process.env.PASSAZURE, {
        //host: process.env.HOST,
        host: process.env.HOSTAZURE,
        dialect: process.env.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        dialectOptions: {
            encrypt: true
        }
    });
    console.log("Conexion a la base de datos correcta".green);
} catch (e) {
    console.log("Problema en la conexion ".red + e);

}



module.exports = sequelize;