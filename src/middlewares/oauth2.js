function auth(req, res, next) {
    const token = req.header('Autorizacion')
    const user = req.header('User')

    //Chequear q existe un token(user) 
    if (!token) return res.status(401).json({ msg: 'Autorizacion denegada' });

    
    try {
        //addUser from payload
        req.user = user;
        console.log(req.user)
        next()
    } catch (e) {
        res.status(400).json({ msg: 'Usuario invalido' })
    }
}

module.exports = auth;