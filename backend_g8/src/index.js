const express = require('express');
const DbConnection = require("./database/dbConnection");

//Importar serverRouter
const serverRouter = require('./routers/serverRouter');

class Server{
    constructor(){
        const bdConnection = new DbConnection();
        this.app = express();
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.json());
        const router = express.Router();
        router.get('/',(req,res)=>{
            res.status(200).json({message: "Conexion Exitosa", Proyecto: "Grupo 8"});
        });
        //Añadir la ruta al servidor
        const objServerR = new serverRouter.default();
        this.app.use(objServerR.router);
        //Añadir la ruta creada al servidor

        this.app.use(router);
        this.app.listen(this.app.get('port'),()=>{
            console.log("Servidor sobre el puerto =>", this.app.get('port'));
        });
    }
}

const objServer = new Server();