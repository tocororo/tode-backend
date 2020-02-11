const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken')

const userController = {};



userController.post_user_auth = async (req, res, next) => {
    /*await User.create(req.body).then(function (user) {
        res.send(user);
    })*/

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: "LLene todos los campos" })
    }

    User.findOne({ email }).then(user => {
        if (!user) return res.status(400).json({ msg: "El usuario no existe" })

        //Create salt & hash    
        bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) return res.status(400).json({ msg: "Credenciales invalidas" });

            jwt.sign(
                {
                    id: user.id,
                    rol: user.rol
                 },
                config.get('jwtSecret'),
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: user
                    });
                })
        })
        
    });


};


userController.get_user_auth = (req, res) => {
    User.findById(req.user.id).select('-password').then(user =>
        res.status(200).send(JSON.stringify(user)))
};


////////////////////OAuth2Strategy//////////////////////////////////

userController.loginSuccess = (req, res) => {
    if (req.user) {
      res.json({
        success: true,
        message: "user has successfully authenticated",
        user: req.user,
        cookies: req.cookies
      });
    }
  };
  
  // when login failed, send failed msg
  userController.loginFailed = (req, res) => {
    res.status(401).json({
      success: false,
      message: "user failed to authenticate."
    });
  };
  
  // When logout, redirect to client
  userController.logout = (req, res) => {
    req.logout();
    res.redirect(config.get("CLIENT_HOME_PAGE_URL"));
  };

module.exports = userController; 