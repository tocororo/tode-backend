const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const oauth2UserSchema = new Schema({
  name: String,
  screenName: String,
  oauth2Id: String,
  profileImageUrl: String
});

const Oauth2User = mongoose.model("oauth2Usere", oauth2UserSchema);

module.exports = Oauth2User;