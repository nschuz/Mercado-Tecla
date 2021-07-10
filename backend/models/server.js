const express = require('express')
const cors = require('cors')
const path = require('path');


class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
            //aqui colocamos nuestros paths
        this.apiPath = '/api/'
        this.publicPath = '/public'


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
        this.app.use(express.static('public'))

        //un middlware para recibir un json den el header - Lectura y parseo del body
        this.app.use(express.json())
    }


    //Est metodo van nuestras rutas
    routes() {
        //Usamos un middlware condicional 
        // this.app.use(this.usuariosPath, require('../routes/public.routes'))

        this.app.get(this.apiPath, (req, res) => {
            res.json('hola');
        })

        // NO funciono :C  pero lo podemo hacer despues
        this.app.get(this.publicPath, (req, res) => {
            console.log(__dirname)
            console.log("hola")
            res.sendFile('index.html', { root: '../frontend/public' })
        })

    }

    //Este metodo es el listen escucha al puerto
    listen() {
        this.app.listen(this.port || 8080, () => {
            console.log("Server corriendo");
        })
    }

}


module.exports = Server;