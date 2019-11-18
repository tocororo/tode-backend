const DocumentVersion = require('../models/document_version.model');

const document_versionController = {};

document_versionController.get_documents_version = async (req, res, next) => {
     DocumentVersion.find().populate('document_user').populate('document').then(function(manifest){
         res.send(manifest)
        });
    };

document_versionController.get_document_version = async (req, res, next) => {
    await DocumentVersion.findOne({ _id: req.params.id }).then(function (manifest) {
        res.send(manifest);
    });
};

document_versionController.post_document_version = async (req, res, next) => {
    await DocumentVersion.create(req.body).then(function (manifest) {
        res.send(manifest);
    });
};

document_versionController.put_document_version = async (req, res, next) => {
    await DocumentVersion.findOneAndUpdate({ _id: req.params.id }, req.body).then(function () {
        DocumentVersion.findOne({ _id: req.params.id }).then(function (manifest) {
            res.send(manifest);

        });
    });
}

document_versionController.delete_document_version = async (req, res, next) => {
    await DocumentVersion.findOneAndRemove({ _id: req.params.id }).then(function (manifest) {
        res.send(manifest);
    });
}


module.exports = document_versionController;