

const express = require("express");

const app = express();
const PORT = 7777;



app.use("/test", (req, res) => {
    res.send("This is the test route");
});


app.use("/hello", (req, res) => {
    res.send("Hello world");
});

app.listen(PORT, () => {
    console.log("server is running on port 7777");
});