let express = require('express');
let app = express();

app.use(express.static("public"));
app.use(express.static("views"));

app.get("/", (req, res) => {
    res.render("index.html");
});

app.listen(3000, () => {
    console.log("Node.js server is running...");
});