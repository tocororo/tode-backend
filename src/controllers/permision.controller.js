const Permision = require('../models/permision.model')

const permisionController = {}

permisionController.get_permisions = async (req, res, next) => {
    await Permision.find().populate('document_user').populate('document').then(function(permision){
          res.send(permision)
       });
       
       
   };

   permisionController.post_permision = async (req, res, next) => {
    await Permision.create(req.body).then(function (permision) {
        res.send(permision);
    });
};

permisionController.delete_permision = async (req, res, next) => {
    await Permision.findOneAndRemove({ _id: req.params.id }).then(function (permision) {
        res.send(permision);
    });
}

module.exports = permisionController;