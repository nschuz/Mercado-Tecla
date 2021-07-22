const dbConfig = require("./config.db");
const Sequelize = require("sequelize");
const db = {};
let sequelize;



try {
    sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    });
    console.log("Conexion a la base de datos correcta");
} catch (e) {
    console.log("Problema en la conexion " + e);

}


//db.Sequelize = Sequelize;
//db.sequelize = sequelize;
//db.tutorials = require("../models/prueba")(sequelize, Sequelize);
//db.contactos = require("../models/contacto")(sequelize, Sequelize);


module.exports = sequelize;