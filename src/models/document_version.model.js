const mongoose = require('mongoose');
const Schema = mongoose.Schema

const document_versionSchema = new Schema({
    coment: String,
    document_user: {
        type: Schema.ObjectId,
        ref: 'oauth2User'
    },
    document: {
        type: Schema.ObjectId,
        ref: 'document',
        required: [true, 'Es necesario un documento']
    },
    image: {
        type: String
    }
}, {
    timestamps: true
})

const DocumentVersion = mongoose.model('document_version', document_versionSchema);
module.exports = DocumentVersion;