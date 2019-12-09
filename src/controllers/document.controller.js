
const Document = require('../models/document.model');
const DocumentVersion = require('../models/document_version.model');
const Permision = require('../models/permision.model')
const { crearDirectorio,crearTXT, crearTXTversion} = require('./fileSystem.controller')
var fs = require('fs');
var config = require('config')

const documentController = {};

documentController.get_documents = async (req, res, next) => {
    var doc 
    var perm
    
     await Document.find().populate('document_user').then(function(document){
        doc = document;
     })

     await Permision.find().populate('document_user').populate('document').then (function(permision){
        perm = permision
    }) 
    res.json({docs:doc, perms:perm})
};

documentController.get_document = async (req, res, next) => {
    await Document.findOne({ _id: req.params.id }).then(function (document) {
        res.send(document)       
    });
};

documentController.document_content = async (req, res, next) => {
    await Document.findOne({ _id: req.params.id }).then(function (document) {
        var dir = config.data_dir + '/' + document._id;        
        fs.readFile(dir + '/' + `${document._id}.txt`, "utf8", function(err, data) {
            if (err) throw err;
            res.send(data);
        });
        
        
    });
};

documentController.post_document = async (req, res, next) => {
    await Document.create(req.body).then(function (document) {    
        crearDirectorio(document);
        crearTXT(document)
        version_body = {
            'coment': document.coment,
            'document_user': document.document_user,
            'document': document
        }
        DocumentVersion.create(version_body).then(function (document_version) {
            crearTXTversion(document_version)
        });
        permision_body = {
            'document_user': document.document_user,
            'document': document
        }
        Permision.create(permision_body)
        res.send(document);
    });
};

documentController.put_document = async (req, res, next) => {
    await Document.findOneAndUpdate({ _id: req.params.id }, req.body).then(function () {
        Document.findOne({ _id: req.params.id }).then(function (document) {
            res.send(document);

        });
    });
}

documentController.delete_document = async (req, res, next) => {
    await Document.findOneAndRemove({ _id: req.params.id }).then(function (document) {
        res.send(document);
    });
}


module.exports = documentController;