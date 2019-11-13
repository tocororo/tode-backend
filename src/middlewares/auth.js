const config = require('config');
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //Chequear q existe un token(user) 
    if (!token) return res.status(401).json({ msg: 'Autorizacion denegada' });

    try {
        //verificar token(user)
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        //addUser from payload
        req.user = decoded;
        next()
    } catch (e) {
        res.status(400).json({ msg: 'Usuario invalido' })
    }
}

module.exports = auth;