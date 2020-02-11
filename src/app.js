const express = require('express');
const cors = require('cors');
const app = express();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser"); // parse cookie header
const passportSetup = require("./controllers/passport-setup");
const config = require("config")
const session = require("express-session")

if(config.get("behind-proxy") === true)
    app.set('trust proxy', 1)


app.use(
  cookieSession({
    name: "session",
    keys: "[keys.COOKIE_KEY]",
    maxAge: 24 * 60 * 60 * 100
  })
);

app.use(cors());
// parse cookies
app.use(cookieParser());

// app.use(session(config.get('secret-session')));
// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

app.use(express.json());

//routes
app.use(require('./routes/user.routes'));
app.use(require('./routes/auth.routes'));
app.use(require('./routes/message.routes'));
app.use(require('./routes/document.routes'));
app.use(require('./routes/document_version.routes'));
app.use(require('./routes/permision.routes'));
app.use(require('./routes/notification.routes'));

module.exports = app;