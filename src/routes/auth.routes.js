const { Router } = require('express');
const router = Router();
const { post_user_auth, get_user_auth } = require('../controllers/auth.controller')
const auth = require('../middlewares/auth')
const passport = require("passport")
const config = require('config')

router.route('/register_auth').post(post_user_auth);

router.route('/user_auth').get(auth, get_user_auth);

router.route('/oauth2').get(passport.authenticate("oauth2", {scope: 'user:email'}));

router.route('/redirect').get( 
    passport.authenticate("oauth2", {
    successRedirect: config.get("CLIENT_HOME_PAGE_URL"),
    failureRedirect: config.get("callbackURL")
  }));

module.exports = router;