const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const administradoresSchema = new Schema({
    user:{
        type: String
    },
    password: {
        type: String
    },
}, {
    collection: 'administrador'
});

module.exports = mongoose.model('Administrador', administradoresSchema);