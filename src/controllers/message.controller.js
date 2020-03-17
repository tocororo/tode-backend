const Message = require('../models/message.model');

const messageController = {};


// GET all the previous messages
messageController.get_message = (req, res) => {    
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

module.exports = messageController;