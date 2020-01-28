const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

/* app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    next();
}); */


/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
//app.use(bodyParser.urlencoded({
//    extended: true
//}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
//app.use(bodyParser.json());
//
//app.post("/", function (req, res) {
//    console.log(req.body.user.name)
//});
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