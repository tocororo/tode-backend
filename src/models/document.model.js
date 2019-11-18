const mongoose = require('mongoose');
const user = mongoose.model('user');
const Schema=mongoose.Schema

const documentSchema = new Schema(
    {
    name: String,
    coment:String,    
    document_user: {type: Schema.ObjectId, ref:'user'}
},
   {
      timestamps: true
    })

const Document = mongoose.model('document', documentSchema);
module.exports = Document;
