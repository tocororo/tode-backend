const Notification = require('../models/notification.model');
const Permision = require('../models/permision.model')
const notificationController = {};

notificationController.get_notifications = async (req, res, next) => {
   await Notification.find().populate('document').populate('document_version').populate('document')
   .then(notification => res.status(200).json(notification)
   ).catch(err => res.status(400).json(err));
};

notificationController.post_notification = async (req, res, next) => {
    await Notification.create(req.body)
    .then(notification => res.status(200).json(notification)
    ).catch(err => res.status(400).json(err));
};


notificationController.get_notificationDocVersion = async (req, res, next)=>{
    await Notification.updateOne({
          notificationSied: false,
          document: req.query.document,
          document_version: req.query.document_version 
        },
        { notificationSied: true })
        .then(notification => res.status(200).json(notification)
    ).catch(err => res.status(400).json(err)) 
    
}

notificationController.get_notificationForPermisions = async (req, res, next)=>{
    await Notification.updateOne({
          notificationSied: false,
          document: req.query.document,
        },
        { notificationSied: true })
        .then( notification => 
            Permision.updateOne({
                requestAcepted: false,
                document: req.query.document,
              },
              { requestAcepted: true })
            )
         res.status(200).json(notification)
        .catch(err => res.status(400).json(err)) 
    
}

notificationController.get_notificationNumber = async (req, res, next)=>{
    let count = null
    await Notification.find({toUser:req.user.id})
    .then(notificationNumber  =>{   
       notificationNumber.map(notify => 
        notify.notificationSied === false ?
           count = count + 1
        :
           count = ""
       )
    res.status(200).json(count)
    }).catch(err => res.status(400).json(err));
    
}

notificationController.delete_notification = async (req, res, next) => {
    await Notification.findOneAndRemove({ _id: req.params.id }).then(function (notification) {
        Permision.findOneAndRemove({withPermisions: notification.forPermisions}).then(permision =>
            res.status(200).send(permision)
        )
        res.status(200).send(notification)
    })
        .catch(err => res.status(400).json(err))
}


module.exports = notificationController;