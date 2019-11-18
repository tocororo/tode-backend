const mongoose = require('mongoose');
const user = mongoose.model('user');
const doc = mongoose.model('document')
const Schema=mongoose.Schema

const document_versionSchema = new Schema(
    {
    coment:String,    
    document_user: {type: Schema.ObjectId, ref:'user'},
    document: {type: Schema.ObjectId, ref:'document'}
},
   {
      timestamps: true
    })

const DocumentVersion = mongoose.model('document_version', document_versionSchema);
module.exports = DocumentVersion;