const { Router } = require('express');
const router = Router();
const { post_user_auth, get_user_auth, redirect, getUserOauth2 } = require('../controllers/auth.controller')
const auth = require('../middlewares/auth')
const passport = require("passport")

router.route('/register_auth').post(post_user_auth);

router.route('/user_auth').get(auth, get_user_auth);

router.route('/oauth2').get(passport.authenticate("oauth2", {scope: 'user:email'}), getUserOauth2);

router.route('/redirect-oauth2').get( redirect);

module.exports = router;