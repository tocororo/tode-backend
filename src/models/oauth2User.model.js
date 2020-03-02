const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const oauth2UserSchema = new Schema({
  sceibaId: String,
  name: String,
  email: String,
  email_verified: Boolean
});

const Oauth2User = mongoose.model("oauth2User", oauth2UserSchema);

module.exports = Oauth2User;