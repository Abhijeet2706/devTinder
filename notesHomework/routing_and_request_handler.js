
const express = require("express");


const app = express();


//paying with routes and extensions


// app.use("/hello", (req, res) => {
//     res.send("Hello world")
// });

// app.use("/hello/2", (req, res) => {
//     res.send("This is the second hello world page")
// });

// app.use("/test", (req, res) => {
//     res.send("This is the test page")
// });

// app.use("/", (req, res) => {
//     res.send("This is the initial page")
// });


//writing a losic which handle the HTTP methods
//get

app.get("/user", (req, res) => {
    const querry = req.query;
    console.log(querry);
    res.send("This is for getting the querry parameters");
});


app.get("/user/:id", (req, res) => {
    const params = req.params.id;
    console.log(params);
    res.send("This is for getting the params");
});
app.post("/user", (req, res) => {
    res.send("This is the Post method")
});


//url optional

app.get(/ab?c/, (req, res) => {
    res.send("This will work with the ? mark as well")
});


app.listen(1111, () => {
    console.log("Server is running on port 1111")
});




