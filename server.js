let express = require('express');
let ejs = require("ejs");
let app = express();

app.use(express.static("public"));
app.use(express.static("views"));
app.engine('ejs',ejs.renderFile);
app.get("/", (req, res) => {
    res.render("home.ejs");
});
app.get("/game", (req, res) => {
    res.render("game.ejs");
});
app.listen(3000, () => {
    console.log("Node.js server is running...");
});