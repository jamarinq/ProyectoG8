const empleado = require('../models/empleado');
const administrador = require('../models/administrador');

/*var registers = [
    { user: "jose", password: "grupo_8a" },
    { user: "camila", password: "grupo_8b" },
    { user: "marco", password: "grupo_8c" },
    { user: "miguel", password: "grupo_8d" },
];*/

/*
var empleados = [
    {
        nombre: "Jose",
        numero_documento: 159,
        numero_telefonico: 6.0,
        email: 24,
        area: 4.0,
        fecha_de_nacimiento: 87,
        direccion: "14%",
    },
    {
        nombre: "Camila",
        numero_documento: 237,
        numero_telefonico: 9.0,
        email: 37,
        area: 4.3,
        fecha_de_nacimiento: 129,
        direccion: "8%",
    },
    {
        nombre: "Marco",
        numero_documento: 262,
        numero_telefonico: 16.0,
        email: 23,
        area: 6.0,
        fecha_de_nacimiento: 337,
        direccion: "6%",
    },
    {
        nombre: "Miguel",
        numero_documento: 305,
        numero_telefonico: 3.7,
        email: 67,
        area: 4.3,
        fecha_de_nacimiento: 413,
        direccion: "3%",
    },
    {
        nombre: "Daniela",
        numero_documento: 356,
        numero_telefonico: 16.0,
        email: 49,
        area: 3.9,
        fecha_de_nacimiento: 327,
    },
];*/

class ServerController {
    constructor() {

    }

    mostrarTodos(req, res){
        empleado.find({}, (error, data)=>{
            if(error){
                res.status(500).send("Error");
            }else{
                res.status(200).json(data);
            }
        });
    }

    inicioSesion(req, res) {
        //let usuario = req.params.user;
        //let pass = req.params.password;
        let { user_name, user_pass } = req.body;
        let loginCorrecto = false;
        console.log(user_name);
        console.log(req.body);

        administrador.find({user:user_name},(error, data) => {
            console.log(data);
            if (error) {
                console.log(data[0]["aqui"]);
                res.status(500).json(error);
            } else {
                if(data[0] != null){
                    if(data[0]["password"] == user_pass){
                        res.status(200).json({mensaje: "Login Correcto"});
                        console.log(data[0]["password"]);
                        console.log("Correcto");
                    }
                    else{
                        res.status(401).json({mensaje: "Contraseña incorrecta"});
                    }
                }
                else{
                    res.status(401).json({mensaje: "Usuario no exite"});
                }             
            }
        });
    }

    //// Funciones empleados
    agregarEmpleado(req, res) {
        empleado.create(req.body,(error,data)=>{
            if (error) {
                res.status(400).json({ error })
            } else {
                res.status(201).json({ message: "Usuario agregado" });
            }
        });  
    }

    mostrarEmpleado(req, res) {
        let id = req.query.id;
        //console.log(req);
        //console.log({"id" : id});
        empleado.findById(id,(error, data) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.status(200).json(data);
            }
        });
    }

    actualizarEmpleado(req, res) {
        let { id, nombre, numero_documento, numero_telefonico, email, area, fecha_de_nacimiento, direccion } = req.body;
        let obj = {
            nombre, numero_documento, numero_telefonico, email, area, fecha_de_nacimiento, direccion
        }
        console.log( req.body);
        empleado.findByIdAndUpdate(id, {
            $set: obj
        }, (error, data) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json(data);
            }
        });
    }

    eliminarEmpleadoID(req,res){
        let { id } = req.body;
        empleado.findByIdAndRemove(id, (error, data)=>{
            if(error){
                res.status(500).send("Error");
            }else{
                res.status(200).send("Empleado Borrado");
            }
        });
    }
}

exports.default = ServerController;