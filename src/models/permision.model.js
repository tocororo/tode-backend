const mongoose = require('mongoose')
const Schema=mongoose.Schema

const permisionSchema = new Schema(
    {
    requestAcepted: {type:Boolean, default:false},
    withPermisions : {type: Schema.ObjectId, ref:'oauth2Usere'},
    document: {type: Schema.ObjectId, ref:'document'}
})

const Permision = mongoose.model('permision', permisionSchema);
module.exports = Permision;