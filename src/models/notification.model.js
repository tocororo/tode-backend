const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    notification: {
        type: String
    },
    notificationSied: {
        type: Boolean,
        default: false
    },
    toUser: {
        type: Schema.ObjectId,
        ref: 'oauth2User',
        //required: [true, 'No se puede enviar notificacion a este usuario']
    },
    forPermisions: {
        type: Schema.ObjectId,
        ref: 'oauth2User',
        //required: [true, 'No se puede enviar notificacion a este usuario']
    },
    document_version: {
        type: Schema.ObjectId,
        ref: 'document_version',
        //required: [true, 'Es necesaria una version del documento']
    },
    document: {
        type: Schema.ObjectId,
        ref: 'document',
        //required: [true, 'Es necesario un documento']
    }
}, {
    timestamps: true
});

const Notification = mongoose.model('notification', notificationSchema);
module.exports = Notification;