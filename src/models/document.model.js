const mongoose = require('mongoose');
const Schema = mongoose.Schema

const documentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El campo (nombre del documento) del documento es requerido']
    },
    coment: {
        type: String,
        required: [true, 'El campo (comentario del documento) es requerido']
    },
    document_user: {
        type: Schema.ObjectId,
        ref: 'oauth2Usere',
        required: [true, 'No existe usuario al cual asiganar el documento']
    },
    imgURL: String
}, {
    timestamps: true
})

const Document = mongoose.model('document', documentSchema);
module.exports = Document;