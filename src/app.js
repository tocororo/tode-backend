const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    next();
});

//midlewares
app.use(cors());
app.use(express.json());

//routes
app.use(require('./routes/user.routes'));
app.use(require('./routes/auth.routes'));
app.use(require('./routes/message.routes'));
app.use(require('./routes/document.routes'));
app.use(require('./routes/document_version.routes'));

module.exports = app;