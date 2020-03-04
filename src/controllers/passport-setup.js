const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2").Strategy;
const Oauth2User = require("../models/oauth2User.model");
const config = require('config');

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
});

passport.use(new OAuth2Strategy({
    authorizationURL: config.get("authorizationURL"),
    tokenURL: config.get("tokenURL"),
    clientID: config.get("clientID"),
    clientSecret: config.get("clientSecret"),
    callbackURL: config.get("callbackURL")
  },
  async (token, tokenSecret, profile, params, done) => {

    // find current user in Oauth2UserModel
    const currentUser = await Oauth2User.findOne({
      sceibaId: profile.user.id
    });
    // create new user if the database doesn't have this user
    if (!currentUser) {
      const str = profile.user.email
      const name = str.split('@')
      await new Oauth2User({
        sceibaId: profile.user.id,
        name: name[0],
        email: profile.user.email,
        email_verified: profile.user.email_verified
      }).save();
    }
    done(null, profile);
  }
));

module.exports = passport;