const mongoose = require('mongoose')
const Schema = mongoose.Schema

const permisionSchema = new Schema({
    requestAcepted: {
        type: Boolean,
        default: false
    },
    withPermisions: {
        type: Schema.ObjectId,
        ref: 'oauth2Usere',
        required: [true, 'No existe el usuario al cual se desea asiganar permisos']
    },
    document: {
        type: Schema.ObjectId,
        ref: 'document',
        required: [true, 'Es necesario un documento']
    }
})

const Permision = mongoose.model('permision', permisionSchema);
module.exports = Permision;