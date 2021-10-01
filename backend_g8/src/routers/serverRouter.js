const express = require('express');
//Importar serverController
const ServerController = require('../controllers/serverController');

class ServerRouter{
    constructor(){
        this.router = express.Router();
        this.config();
    }

    config(){
        const objServerC = new ServerController.default();
        this.router.get("/login", objServerC.mostrarTodos);
        //this.router.get("/login/:user", objServerC.inicioSesion);
        this.router.post("/login", objServerC.inicioSesion);
        ///////////////////////////////////////////////////////
        this.router.post("/editar", objServerC.actualizarEmpleado);
        this.router.put("/editar", objServerC.agregarEmpleado);
        this.router.get("/editar", objServerC.mostrarEmpleado);
        this.router.delete("/editar", objServerC.eliminarEmpleadoID);
    }
}

exports.default = ServerRouter; 