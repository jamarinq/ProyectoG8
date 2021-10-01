const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleadosSchema = new Schema({
    nombre:{
        type: String
    },
    numero_documento:{
        type: Number
    },
    numero_telefonico: {
        type: Number
    },
    email: {
        type: String
    },
    area:{
        type: String
    },
    fecha_de_nacimiento:{
        type: String
    },
    direccion:{
        type: String
    }
}, {
    collection: 'empleado'
});

module.exports = mongoose.model('Empleado', empleadosSchema);