const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2");
const Oauth2User = require("../models/oauth2User.model");
const config = require('config')

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user.id);;
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((obj, cb) => {
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
  async (token, tokenSecret, profile, done) => {
    console.log(profile);
    
    // find current user in UserModel
    const currentUser = await Oauth2User.findOne({
      oauth2Id: profile._json.id_str
    });
    // create new user if the database doesn't have this user
    if (!currentUser) {
      const newUser = await new Oauth2User({
        name: profile._json.name,
        screenName: profile._json.screen_name,
        oauth2Id: profile._json.id_str,
        profileImageUrl: profile._json.profile_image_url
      }).save();
      if (newUser) {
        done(null, newUser);
      }
    }
    done(null, currentUser);
  }
  )
);

module.exports = passport;