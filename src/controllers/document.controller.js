const Document = require('../models/document.model');
const Permision = require('../models/permision.model')
const DocumentVersion = require('../models/document_version.model');
const { crearDirectorio } = require('./versionContent.controller')
const validateDocuments = require('../validation/documents')
// var fs = require('fs');
// var config = require('config')

const documentController = {};

documentController.get_documents = async (req, res, next) => {
    var doc 
    var perm
    
     await Document.find().populate('document_user').then(function(document){
        doc = document;
     })

     await Permision.find().populate('withPermisions').populate('document').then (function(permision){
        perm = permision
    }) 
    
    res.status(200).json({docs:doc, perms:perm})
};

documentController.get_document = async (req, res, next) => {
    await Document.findOne({ _id: req.params.id }).populate('document_user').then(function (document) {
        res.status(200).send(document)})
        .catch(err => res.status(400).json(err))
};

documentController.document_ByName = async (req, res, next) => {
    await Document.findOne({ name: req.query.name }).populate('document_user').then(document =>
        res.status(200).send(document)
    )
        .catch(err => res.status(400).json(err))
};

documentController.post_document = async (req, res, next) => {    
    const {errors, isValid} = validateDocuments(req.body)
    
    if(!isValid){        
        return res.status(400).json(errors)
    }
    await Document.findOne({name:req.body.name}).then( document => {
        
            Document.create(req.body).then( doc => {        
                crearDirectorio(doc);
                permision_body = {
                    requestAcepted: true,
                    withPermisions: doc.document_user,
                    document: doc
                }
                Permision.create(permision_body)
                res.status(200).send(doc)
            })    
    })
        .catch(err => res.status(400).json(err))
};

documentController.put_document = async (req, res, next) => {
    await Document.findOneAndUpdate({ _id: req.params.id }, req.body).then(function () {
        Document.findOne({ _id: req.params.id }).then(function (document) {
            res.status(200).send(document)
        });
    })
    .catch(err => res.status(400).json(err))
}

documentController.delete_document = async (req, res, next) => {
    await Document.findOneAndRemove({ _id: req.params.id }).then(function (document) {
            DocumentVersion.findOneAndRemove({ document: req.params.id }).then(function (document_version) {
                Permision.findOneAndRemove({ document: req.params.id }).then(function (permision) {
                    res.status(200).send(document)
                })
            
            })
        
        })
        .catch(err => res.status(400).json(err))
}

documentController.updateDocumentName = async (req, res, next)=>{
    console.log(req.query);
    await Document.updateOne({
            _id: req.query.id,},
            { name: req.query.name })
        .then( notification => 
         res.status(200).json(notification)
        )
        .catch(err => res.status(400).json(err))
    
}

module.exports = documentController;