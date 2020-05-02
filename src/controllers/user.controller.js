const User = require('../models/user.model');
const Permision = require('../models/permision.model')
const Oauth2User = require("../models/oauth2User.model");
const _ = require('../../../tode-frontend/node_modules/lodash')

const userController = {};

userController.get_users = async (req, res, next) =>
    await User.find().then(function (user) {
        res.status(200).send(user)
    })
    .catch(err => res.status(400).json(err))

userController.get_user = async (req, res, next) =>
    await Oauth2User.findOne({
        sceibaId: req.params.id
    }).then(function (user) {
        res.status(200).send(user)
    })
    .catch(err => res.status(400).json(err))

userController.getUsersToPermission = async (req, res, next) => {
    const regex = new RegExp(req.query.value)
    
    await Oauth2User.find({
        "name": {$regex: regex, $options: 'i'}
    }).then( users => {        
        Permision.find({
                document: req.query.document
            }).then( permisions => {
                let names = new Array
                permisions.forEach( perm => {
                    users.forEach( user => {
                        if (perm && user._id.toString() != perm.withPermisions.toString()) {  
                            //names[index] = user.name              
                            names.push({_id:user._id, title:'name', name:user.name})
                        }
                    })     
                })               
                    res.status(200).json(names)
                }
            )
            .catch(err => res.status(400).json(err))
    })
};

userController.updateUser = async (req, res, next) =>{
    await Oauth2User.updateOne({
        _id: req.body.id
    }, {
        $set: {
        name: req.body.name,
        role: req.body.role.toString()
        }
    });
}

userController.updateImage = async (req, res) => {    
    await Oauth2User.updateOne({
        _id: req.body.id
    }, {
        $set: {
        perfilImage: `${config.images_dir}/${req.file.filename}`
        }
    });
}

userController.delete_user = async (req, res, next) =>
    await User.findOneAndRemove({
        _id: req.params.id
    }).then(function (user) {
        res.status(200).send(user)
    })
    .catch(err => res.status(400).json(err))



module.exports = userController;