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
        this.router.get("/login", objServerC.home);
        //this.router.get("/login/:user", objServerC.inicioSesion);
        this.router.post("/login", objServerC.inicioSesion);
        this.router.put("/editar", objServerC.agregarUsuario);
        this.router.get("/editar", objServerC.mostrarUsuariosNombre);
    }
}

exports.default = ServerRouter; 