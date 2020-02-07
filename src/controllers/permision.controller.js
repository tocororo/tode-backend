const Permision = require('../models/permision.model')
const Notification = require('../models/notification.model');

const permisionController = {}

permisionController.get_permisions = async (req, res, next) => {
    await Permision.find().populate('document_user').populate('document').then(function(permision){
          res.status(200).send(permision)})
          .catch(err => res.status(400).json(err))
       
       
   };

   permisionController.post_permision = async (req, res, next) => {
    await Permision.create(req.body).then( permision => {
        Permision.findOne({withPermisions: permision.withPermisions}).populate('withPermisions').populate('document').then( perm => {
        notification_body = {
            notification: `Un usuaio desea compartir contigo el articulo de nombre: ${perm.document.name}` ,
            forPermisions: permision.withPermisions,
            document: permision.document
        };
        Notification.create(notification_body);
        })
        res.status(200).send(permision) })
        .catch(err => res.status(400).json(err))
        
};

permisionController.delete_permision = async (req, res, next) => {
    await Permision.findOneAndRemove({ _id: req.params.id }).then(permision => {
        Notification.findOneAndRemove({ forPermisions: permision.withPermisions }).then(
        res.status(200).send(permision)
    )})
        .catch(err => res.status(400).json(err))
}

module.exports = permisionController;