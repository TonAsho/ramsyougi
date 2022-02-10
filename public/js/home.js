console.log("Hello World!");
let socket = io();
window.onload = function() {
    setUp();
}
function setUp() {
    document.getElementById("start").addEventListener("click", () => {
        socket.emit("waiting", "")
        document.getElementById("main").style.display = "none";
        document.getElementById("wait").style.display = "block";
    })
    document.getElementById("back").addEventListener("click", () => {
        socket.emit("cancelWaiting", "")
        document.getElementById("main").style.display = "block";
        document.getElementById("wait").style.display = "none";
    })
}

socket.on("hello", (message) => {
    console.log(message);
})
socket.on("userCount", (count) => {
    document.getElementById("userCount").innerHTML = `${count}人`;
})
socket.on("m", (url) => {
    window.location.href = `./game/${url}`
})