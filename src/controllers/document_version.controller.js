const DocumentVersion = require('../models/document_version.model');
const { crearVersion } = require('./fileSystem.controller')
var fs = require('fs');
var config = require('config')

const document_versionController = {};

document_versionController.get_documents_version = async (req, res, next) => {
     DocumentVersion.find().populate('document_user').populate('document').then(function(document_version){
         res.send(document_version)
        });
    };

document_versionController.get_document_version = async (req, res, next) => {
        await DocumentVersion.findOne({ _id: req.params.id }).then(function (document_version) {
            res.send(document_version)
        });
    };

document_versionController.document_version_content = async (req, res, next) => {
    await DocumentVersion.findOne({ _id: req.params.id }).then(function (document_version) {
        var dir = config.data_dir + '/' + document_version.document._id;        
        fs.readFile(dir + '/' + `${document_version._id}.txt`, "utf8", function(err, data) {
            if (err) throw err;
            res.send(data);
        });
    });
};

document_versionController.post_document_version = async (req, res, next) => {
    await DocumentVersion.create(req.body).then(function (document_version) {
        crearVersion(document_version)
        res.send(document_version);
    });
};

document_versionController.put_document_version = async (req, res, next) => {
    await DocumentVersion.findOneAndUpdate({ _id: req.params.id }, req.body).then(function () {
        DocumentVersion.findOne({ _id: req.params.id }).then(function (document_version) {
            res.send(document_version);

        });
    });
}

document_versionController.delete_document_version = async (req, res, next) => {
    await DocumentVersion.findOneAndRemove({ _id: req.params.id }).then(function (document_version) {
        res.send(document_version);
    });
}


module.exports = document_versionController;