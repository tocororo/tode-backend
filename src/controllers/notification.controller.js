const Notification = require('../models/notification.model');

const notificationController = {};

notificationController.get_notifications = async (req, res, next) => {
   await Notification.find().populate('document_user').populate('document_version').populate('document')
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
          document_user: req.query.document_user,
          document_version: req.query.document_version 
        },
        { notificationSied: true })
        .then(notification => res.status(200).json(notification)
    ).catch(err => res.status(400).json(err)) 
    
}

notificationController.get_notificationNumber = async (req, res, next)=>{
    let count = ""
    await Notification.find({document_user: req.user.id})
    .then(notificationNumber  =>{   
       notificationNumber.map(notify => (
           notify.notificationSied === false ?
           count = count + 1
           :
           count = ""
       ))
    res.status(200).json(count)
    }).catch(err => res.status(400).json(err));
    
}
module.exports = notificationController;