const DocumentVersion = require('../models/document_version.model');
const Notification = require('../models/notification.model');
const Permision = require('../models/permision.model');
const { crearTXTversion } = require('./fileSystem.controller')
var fs = require('fs');
var config = require('config')

const document_versionController = {};

document_versionController.get_documents_version = async (req, res, next) => {
     DocumentVersion.find().populate('document_user').populate('document').then(function(document_version){
         res.status(200).json(document_version)})
        .catch(err => res.status(400).json(err));
    };

document_versionController.get_document_version = async (req, res, next) => {
        await DocumentVersion.findOne({ _id: req.params.id }).then(function (document_version) {
            res.status(200).json(document_version)})
            .catch(err => res.status(400).json(err));
    };

document_versionController.document_version_content = async (req, res, next) => {
    await DocumentVersion.findOne({ _id: req.params.id }).then(function (document_version) {
        var dir = config.data_dir + '/' + document_version.document._id;        
        fs.readFile(dir + '/' + `${document_version._id}.txt`, "utf8", function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
};

document_versionController.post_document_version = async (req, res, next) => {
    await DocumentVersion.create(req.body).then(function (document_version) {
        crearTXTversion(document_version)
        Permision.find({'document': document_version.document}).then(permision =>{
        permision.map(perm => (
            notification_body = {
                notification: 'Se ha creado una nueva version del documento' ,
                document_user: perm.document_user,
                document: document_version.document,
                document_version: document_version
            },
            Notification.create(notification_body)
        ))
    })       
        res.status(200).json(document_version)})
        .catch(err => res.status(400).json(err));
};

/* document_versionController.put_document_version = async (req, res, next) => {
    await DocumentVersion.findOneAndUpdate({ _id: req.params.id }, req.body).then(function () {
        DocumentVersion.findOne({ _id: req.params.id }).then(function (document_version) {
            res.send(document_version);

        });
    });
} */

/* document_versionController.delete_document_version = async (req, res, next) => {
    await DocumentVersion.findOneAndRemove({ _id: req.params.id }).then(function (document_version) {
        res.send(document_version);
    });
} */


module.exports = document_versionController;