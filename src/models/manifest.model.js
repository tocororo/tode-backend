const mongoose = require('mongoose');

const manifestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El campo nombre es requerido'],
        trim: true,
        unique: true
    },
    autor: {
        type: String,
        required: [true, 'El campo email es requerido']
    },
    editor: {
        type: String
    },
    revisor: {
        type: String
    }
},
    {
        timestamps: true
    })

const Manifest = mongoose.model('manifest', manifestSchema);
module.exports = Manifest;
