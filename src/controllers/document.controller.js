const Document = require('../models/document.model');

const documentController = {};

documentController.get_documents = async (req, res, next) => {
    await Document.find().populate('document_user').then(function(manifest){
        res.send(manifest)
       });
   };

documentController.get_document = async (req, res, next) => {
    await Document.findOne({ _id: req.params.id }).then(function (documents) {
        res.send(documents);
    });
};

documentController.post_document = async (req, res, next) => {
    await Document.create(req.body).then(function (documents) {
        res.send(documents);
    });
};

documentController.put_document = async (req, res, next) => {
    await Document.findOneAndUpdate({ _id: req.params.id }, req.body).then(function () {
        Document.findOne({ _id: req.params.id }).then(function (documents) {
            res.send(documents);

        });
    });
}

documentController.delete_document = async (req, res, next) => {
    await Document.findOneAndRemove({ _id: req.params.id }).then(function (documents) {
        res.send(documents);
    });
}


module.exports = documentController;