const Message = require('../models/message.model');
const Permision = require('../models/permision.model');
const Document = require('../models/document.model');

const messageController = {};


// GET all the previous messages
messageController.get_message = (req, res) => {  
    console.log(req.query);
      
    Message.find({'document': req.query.id}).exec((err, messages) => {
        if (err) {
            res.send(err).status(500);
        } else {
            res.send(messages).status(200);
        }
    });
};

// POST a new message
messageController.post_message = (req, res) => {
    message_body = {
        sender: req.body.sender,
        content: req.body.content.toString(),
        document: req.body.document
    }
    Message.create(message_body).then((message) => {
        res.send(message).status(200);
    }).catch((err) => {
        console.log(err);
        res.send(err).status(500);
    });
};

messageController.get_chatNumber = async (req, res, next)=>{    
    var docs, perms, permsShared, messagesArray ;

    await Document.find().populate('document_user').then(function (document) {
        docs = document;
    })
    
    await Permision.find().populate('withPermisions').populate('document').then(function (permision) {
        perms = new Array(permision.length);
        permsShared = new Array(permision.length);

        docs.forEach(doc => {
            permision.forEach((perm, index) => {
                if (req.user && req.user._id.toString() === perm.withPermisions._id.toString() && req.user._id.toString() === perm.document.document_user.toString()) {
                    perms[index] = perm;
                }
                if (req.user && req.user._id.toString() === perm.withPermisions._id.toString() && req.user._id.toString() !== perm.document.document_user.toString() && perm.requestAcepted.toString() === true && perm.document._id.toString() === doc._id.toString()) {
                    permsShared[index] = perm
                }
            })
        })        
    }); 

    await Message.find({messageSied:false}).then( messages=> { 
        messagesArray = new Array(perms.length);
        perms.forEach((perm, permIndex) => {
            let count = 0
            messages.forEach((message, messageIndex) => {
                
                
                if (perm.document._id.toString() === message.document.toString()) {                    
                    count = count + 1;
                    messagesArray[permIndex] = count;                    
                }
            });
        });
    });

    res.status(200).json({
        number:messagesArray
    })
    
};

messageController.get_updateMessageState = async (req, res, next)=>{
    await Message.updateOne({
          messageSied: false,
          document: req.query.document,
          sender: req.user.name
        },
        {$set:{ messageSied: true }})
        .then( message => 
            res.json(message)
            )
        .catch(err => res.status(400).json(err))     
};

module.exports = messageController;