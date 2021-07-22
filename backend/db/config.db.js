module.exports = {

    HOST: "localhost",

    USER: "tecla", //sa

    PASSWORD: "root123", //

    DB: "prueba",

    dialect: "mssql",


    port: 1433,

    pool: {

        max: 5,

        min: 0,

        acquire: 30000,

        idle: 10000

    }

};