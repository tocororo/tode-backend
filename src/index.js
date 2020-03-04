require('dotenv').config();
const app = require('./app')
require('./database')
const config = require('config')
let path = require('path')


const Message = require('./models/message.model');
const socket = require('socket.io');



const port = config.get('port')




if (process.env.NODE_ENV === "production") {
    app.use(express.static("./client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
    });
}

//listen for requests
let server = app.listen(port || 5000, function () {
    console.log(`Servidor escuchando en puerto ${port}`);
});

// Starting a socket on the specified server
let io = socket(server);

io.on("connection", (socket) => {

    socket.on("new-message", (data) => {
        io.sockets.emit("new-message", data);
    });

});
