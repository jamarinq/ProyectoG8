var registers = [
    { user: "jose", password: "grupo_8a" },
    { user: "camila", password: "grupo_8b" },
    { user: "marco", password: "grupo_8c" },
    { user: "miguel", password: "grupo_8d" },
];

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
];

class ServerController {
    constructor() {

    }

    home(req, res) {
        //console.log(req.params);
        res.status(200).json({ mensaje: "ok", "otro": "grupo_8" });
    }
    inicioSesion(req, res) {
        //let usuario = req.params.user;
        //let pass = req.params.password;
        let { user_name, user_pass } = req.body;
        let loginCorrecto = false;
        //console.log(user_name);
        //console.log(user_pass);
        registers.forEach(element => {
            //console.log(element);
            if ((element.user == user_name) && (element.password == user_pass)) {
                loginCorrecto = true;
            }
        });
        if (loginCorrecto == true) {
            res.status(200).json({ mensaje: "Login Correcto" });
        }
        else {
            res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
        }

    }
    agregarUsuario(req, res) {
        let {nombre, numero_documento, numero_telefonico, email, area, fecha_de_nacimiento} = req.body;
        console.table({nombre, numero_documento, numero_telefonico, email, area, fecha_de_nacimiento});
        //añadir el usuario al array
        empleados.push(req.body);
        res.status(201).json({ message: "Usuario agregado" });
    }
    mostrarUsuariosNombre(req, res){
        res.status(200).json(empleados);
    }
}

exports.default = ServerController;