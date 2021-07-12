const express = require('express')
const cors = require('cors')
const path = require('path');
const { apiLimiter } = require('../middlewares/funciones')
const hbs = require('hbs');


class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
            //aqui colocamos nuestros paths
        this.apiPath = '/api/'
        this.publicPath = '/public'
        this.app.set('view engine', 'hbs');


        //Middlewares
        //Funaciones que añaden funcionalidad
        this.middlewares();


        //Rutas de mi apliccion
        this.routes()

    }

    middlewares() {

        //Cors
        this.app.use(cors())

        //Middleware Public
        console.log(path.join(__dirname, '../', 'public'));
        this.app.use(express.static(path.join(__dirname, '../', 'public')))



        //un middlware para recibir un json den el header - Lectura y parseo del body
        this.app.use(express.json())

        //express-rate-limit
        this.app.use(apiLimiter)
    }


    //Est metodo van nuestras rutas
    routes() {
        //Usamos un middlware condicional 
        //entra a nuestra api
        this.app.use(this.apiPath, require('../routes/api.routes'))
            //entra a nuestro public donde hacemos el render del html (a futuro)
        this.app.use(this.publicPath, require('../routes/public.routes'))



    }

    //Este metodo es el listen escucha al puerto
    listen() {
        this.app.listen(this.port || 8080, () => {
            console.log("Server corriendo");
        })
    }

}


module.exports = Server;