let express = require('express');
let app = express();
let server = require("http").createServer(app);
let io = require("socket.io")(server);
let ejs = require("ejs");

app.use(express.static("public"));
app.use(express.static("views"));
app.engine('ejs',ejs.renderFile);
app.get("/", (req, res) => {
    res.render("home.ejs");
});
app.get("/game/:id", (req, res) => {
    //今日はここから
    console.log(req.params.id, "hello")
    res.render("game.ejs");
});

let waitingUserCount = 0;
let waitings = [];
let interval = setInterval(function() {
    while(waitings.length > 1) {
        let n = Math.floor(Math.random() * waitings.length);
        let firstPerson = waitings[n];
        waitings.splice(n, 1);
        let n2 = Math.floor(Math.random() * waitings.length);
        let secondPerson = waitings[n2];
        waitings.splice(n2, 1);
        firstPerson.join(`${firstPerson.id}${secondPerson.id}`);
        secondPerson.join(`${firstPerson.id}${secondPerson.id}`);
        io.to(`${firstPerson.id}${secondPerson.id}`).emit("m",`${firstPerson.id}${secondPerson.id}`);
        waitingUserCount-=2;
        io.sockets.emit("userCount", waitingUserCount);
    }
}, 10000);

io.on("connection", function(socket) {
    socket.on("waiting", () => {
        waitingUserCount++;
        waitings.push(socket);
        io.sockets.emit("userCount", waitingUserCount);
    })
    socket.on("cancelWaiting", () => {
        console.log(waitings.length)
        deleteNumber(socket);
        console.log(waitings.length)
        waitingUserCount--;
        io.sockets.emit("userCount", waitingUserCount);
    })
    socket.emit("hello", "うんこ");
    socket.on("disconnect", () => {
        deleteNumber(socket);
        io.sockets.emit("userCount", waitingUserCount);
    })
})
function deleteNumber(so) {
    for(let n=0;n<waitings.length;n++) {
        if(so === waitings[n]) {
            waitings.slice(n,1);
            n = waitings.length+1;
        }
    }
}
server.listen(3000, () => {
    console.log("Node.js server is running...");
});
