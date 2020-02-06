const express = require('express');
const cors = require('cors');
const app = express();
var config = require('config')

//midlewares
app.use(cors());

//app.use(express.urlencoded());
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