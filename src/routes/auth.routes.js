const {
  Router
} = require('express');
const router = Router();
const {
  post_user_auth,
  get_user_auth
} = require('../controllers/auth.controller')
const auth = require('../middlewares/auth')
const passport = require("../controllers/passport-setup")
const config = require('config')

router.route('/register_auth').post(post_user_auth);

router.route('/user_auth').get(auth, get_user_auth);

router.get('/oauth2', function(req, res, next) {
  passport.authenticate("oauth2", {
    scope: 'user:email',
    successRedirect: config.get("CLIENT_HOME_PAGE_URL"),
    failureRedirect: "/oauth2"
  }, function(err, profile, info) {
    if (err) { return next(err); }
    if (!profile) { return res.redirect('/oauth2'); }
    req.logIn(profile, function(err) {
      if (err) { return next(err); }
      const str =  profile.user.email
      const userName = str.split('@')
      
      return res.redirect(`https://localhost:3000?sceibaId=${profile.user.id}&&token=${profile.access_token}&&expires_in=${profile.expires_in}`);
    });
  })(req, res, next);
});

module.exports = router;