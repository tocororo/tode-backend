
const Document = require('../models/document.model');
const { crearDirectorio,verDocumento } = require('./fileSystem.controller')
var fs = require('fs');
var config = require('config')

const documentController = {};

documentController.get_documents = async (req, res, next) => {
    await Document.find().populate('document_user').then(function(document){
        res.send(document)
       });
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