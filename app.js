const express = require ("express");
const app = express();
const http = require ("http");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("public"));
app.use(express.json());
app.set('view engine', 'html');
app.engine('html', require("ejs").renderFile);

app.use(bodyParser.urlencoded({extended:true}))

server.listen("5252" ,() => {
    console.log("Listening on port *:5252");
});

io.on("connection", (socket) => {
    console.log('a user connected');
    socket.on("chat message", (username, msg) => {
        console.log(username);
        console.log(msg);
        io.emit("chat message", username, msg)
    })
});


app.get("/" ,(req,res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/dashboard", (req, res) => {
    res.render(__dirname+"/dashboard.html",{ username : req.body.username });
});