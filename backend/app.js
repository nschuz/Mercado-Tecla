//primero van las importaciiones nativas de node como requires , despues  la de terceros
require('dotenv').config()
    //depues nuestras importaciones
const Server = require('./server')

const server = new Server();
server.listen();