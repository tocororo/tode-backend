const mongoose = require('mongoose')
const Schema=mongoose.Schema

const permisionSchema = new Schema(
    {
    document_user : {type: Schema.ObjectId, ref:'user'},
    document: {type: Schema.ObjectId, ref:'document'}
})

const Permision = mongoose.model('permision', permisionSchema);
module.exports = Permision;