
const Oauth2User = require("../models/oauth2User.model");

auth = async (req, res, next) => {
    const token = req.header('Autorizacion')
    const sceibaId = req.header('sceibaId')
    //Chequear q existe un token(user) 
    if (!token) return res.status(401).json({
        msg: 'Autorizacion denegada'
    });

    try {
        await Oauth2User.findOne({
                sceibaId: sceibaId
            }).then(function (user) {
                return req.user = user
            })
            .catch(err => res.status(400).json(err))

        next()
    } catch (e) {
        res.status(400).json({
            msg: 'Usuario invalido'
        })
    }
}
module.exports = auth;