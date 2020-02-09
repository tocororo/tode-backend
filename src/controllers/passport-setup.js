const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2");
const User = require("../models/user.model");
const config = require('config')

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, {user: user.id, name:user.name});
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((obj, cb) => {
  cb(null, obj)
});

passport.use(new OAuth2Strategy({
  authorizationURL: config.get("authorizationURL"),
  tokenURL: config.get("tokenURL"),
  clientID: config.get("clientID"),
  clientSecret: config.get("clientSecret"),
  callbackURL: config.get("callbackURL")
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ exampleId: profile.id }, function (err, user) {
    console.log(accessToken,user);
    
    return cb(err, user);
  });
}
));

module.exports = passport;