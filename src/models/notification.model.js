const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema (
    {
    notification: {type: String},
    notificationSied:{type: Boolean, default: false},
    toUser: {type: Schema.ObjectId, ref:''}, 
    forPermisions: {type: Schema.ObjectId, ref:''},
    document_version: {type: Schema.ObjectId, ref:'document_version'},
    document: {type: Schema.ObjectId, ref:'document'}
    },
    {
       timestamps: true
    }
);

const Notification = mongoose.model('notification', notificationSchema);
module.exports = Notification;