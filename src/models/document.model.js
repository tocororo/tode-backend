const mongoose = require('mongoose');
const Schema=mongoose.Schema

const documentSchema = new Schema(
    {
    name:{ type:String, unique: true, required: [true, 'El campo nombre del documento es requerido']},
    coment:{type: String},    
    document_user: {type: Schema.ObjectId, ref:'oauth2Usere'},
    imgURL: String    
    },
    {
    timestamps: true
    })

const Document = mongoose.model('document', documentSchema);
module.exports = Document;
