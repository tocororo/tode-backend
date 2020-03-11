const Notification = require('../models/notification.model');
const Permision = require('../models/permision.model')
const notificationController = {};

notificationController.get_notifications = async (req, res, next) => {
   await Notification.find().populate('document').populate('forPermisions').populate('toUser')
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
        {$set:{ notificationSied: true }})
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
              {$set:{ requestAcepted: true }})
            )
        .catch(err => res.status(400).json(err)) 
    
}

notificationController.get_notificationNumber = async (req, res, next)=>{
    let countToUser = 0
    await Notification.find({toUser:req.user._id}).then(notificationToUser=>{         
        notificationToUser.map(notifyUser =>{
            if(notifyUser.notificationSied === false)  
            countToUser = countToUser + 1
        })    
    })
    
    res.status(200).json( countToUser )
}

notificationController.get_requestNumber = async (req, res, next)=>{
    let countForPermisions = 0

    await Notification.find({forPermisions:req.user._id}).then( notificationForPermisions=> { 
        notificationForPermisions.map(notifyPermisions => {
            if(notifyPermisions.notificationSied === false) 
                    countForPermisions = countForPermisions + 1
        })
    })

    res.status(200).json(countForPermisions)
}

notificationController.delete_notification = async (req, res, next) => {
    await Notification.findOneAndRemove({ forPermisions: req.user._id, document:req.params.id}).then(notification => {
        Permision.findOneAndRemove({withPermisions: req.user._id, requestAcepted:false, document:req.params.id}).then(permision =>
            res.status(200).send(permision)
        )
        res.status(200).send(notification)
    })
        .catch(err => res.status(400).json(err))
}


module.exports = notificationController;