const express = require('express')
const cors = require('cors')
const colors = require('colors');
const path = require('path');
const { apiLimiter } = require('./middlewares/funciones')
const sequelize = require("./db/conexion");
const morgan = require('morgan');
const { Usuario } = require('./models/usuario');
const cookieParser = require('cookie-parser')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
            //aqui colocamos nuestros paths
        this.apiPath = '/api/'
        this.publicPath = '/tienda'
        this.app.set('views', path.join(__dirname, '/views'));
        console.log(path.join(__dirname, '/views'));
        this.app.set('view engine', 'hbs');

        //Middlewares
        //Funaciones que añaden funcionalidad
        this.middlewares();


        //Rutas de mi apliccion
        this.routes()

        this.conectarDB();

    }

    async conectarDB() {
        try {
            await sequelize.authenticate();
            console.log('Conexion con la base de datos establecida'.green);
            await sequelize.sync();
            // await sequelize.models.User.sync({ force: true });
            // await Contacto.sync();
            //await Usuario.sync();
            console.log("Todos los modelos fueron sincronizados correctamente".green);
        } catch (error) {
            console.error('Problema al conectrase o al sicronizar modelos'.red, error);
        }
    }

    middlewares() {

        //Cors
        this.app.use(cors())

        //Middleware Public
        this.app.use(express.static(path.join(__dirname, 'public')))

        //un middlware para recibir un json den el header - Lectura y parseo del body
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));

        //express-rate-limit
        this.app.use(apiLimiter)

        this.app.use(morgan('combined'))

        //CookieParser
        this.app.use(cookieParser());

    }


    //Est metodo van nuestras rutas
    routes() {
        //Usamos un middlware condicional 
        //entra a nuestra api
        this.app.use(this.apiPath, require('./routes/api.routes'))
            //entra a nuestro public donde hacemos el render del html (a futuro)
        this.app.use(this.publicPath, require('./routes/tienda.routes'))
            /* Rutas Del CRUD administrador */
        this.app.use(this.publicPath, require('./routes/admin.routes'))
    }

    //Este metodo es el listen escucha al puerto
    listen() {
        this.app.listen(this.port || 8080, () => {
            console.log("Server corriendo".green);
        })
    }

}


module.exports = Server;