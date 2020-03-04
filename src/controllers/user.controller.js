const User = require('../models/user.model');
const Permision = require('../models/permision.model')
const Oauth2User = require("../models/oauth2User.model");
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken')
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

    await Oauth2User.find({
        "name": req.query.value
    }).then(function (users) {
        Permision.find({
                "withPermisions": users._id,
                "document": req.query.document_id
            }).then(function (permision) {
                    users.filter(user => user._id !== permision.withPermisions)
                    res.status(200).json(user)
                }
            )
            .catch(err => res.status(400).json(err))

    })
    /* await User.find({"name": req.query.value}).then(function (user) {  

       Permision.find({"document": req.query.document_id, "document_user": user._id}).then(function (permision) { 
           if(permision.document_user != user._id)            
            {
            res.json(user) 
            console.log(user);   
           }else
               {
                res.status(400).json({ msg: "El usuario ya tiene permisos sobre el documento" })
                console.log('El usuario ya tiene permisos sobre el documento');
               }                   
       }); */
};

userController.post_user = async (req, res, next) => {

    const {
        name,
        email,
        password,
        rol
    } = req.body;
    if (!name || !email || !password || !rol) {
        return res.status(400).json({
            msg: "LLene todos los campos"
        })
    }

    User.findOne({
        email
    }).then(user => {
        if (user) return res.status(400).json({
            msg: "El email ya esta en uso"
        })
        const newUser = new User({
            name,
            email,
            password,
            rol
        });


        //Create salt & hash    
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then(user => {

                    jwt.sign({
                            id: user.id
                        },
                        config.get('jwtSecret'),
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                    rol: user.rol
                                }
                            });
                        })
                });
            })
        })
    });


};

userController.put_user = async (req, res, next) => {
    /*await User.findOneAndUpdate({ _id: req.params.id }, req.body).then(function () {
        User.findOne({ _id: req.params.id }).then(function (user) {
            res.send(user);

        });
    });*/

    const {
        id,
        name,
        email,
        password
    } = req.body;
    if (!name || !password) {
        return res.status(400).json({
            msg: "LLene todos los campos"
        })
    }
    User.findOneAndUpdate({
        id
    }, req.body).then(() => {
        User.findOne({
            id
        }).then(user => {

            const newUser = new User({
                name,
                email,
                password
            });

            //Create salt & hash    
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    // newUser.updateOne(id).then(user => {

                    jwt.sign({
                            id: user.id
                        },
                        config.get('jwtSecret'),
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        })
                    // });
                })
            })
        });
    })
}
userController.delete_user = async (req, res, next) =>
    await User.findOneAndRemove({
        _id: req.params.id
    }).then(function (user) {
        res.status(200).send(user)
    })
    .catch(err => res.status(400).json(err))



module.exports = userController;