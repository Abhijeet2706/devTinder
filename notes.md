Ep-03 and 04

const express = require('express');


const PORT = 3000;
//instance of an express application
const app = express();


//handle any incoming request
//this is request handler function, it takes two parameters req and res, 
// req is the request object that contains information about the incoming request, 
// res is the response object that we can use to send a response back to the client. 
// In this case, we are sending a simple "Hello World" message as the response.


//get request to the root route
app.get("/user", (req, res) => {
    res.send({
        firstName: "Abhijeet",
        lastName: "Kumar",

    })
});


//post method
app.post("/user", (req, res) => {
    console.log("request has saved successfully");
    res.send("This is a post request");
});


app.use("/hello", (req, res) => {
    res.send("Hello hello hello");
});

app.use("/hello/2", (req, res) => {
    res.send("abra ka dabra...!!")
})


app.use("/signup", (req, res) => {
    res.send("This is the sign up page");
});

app.use("/", (req, res) => {
    res.send("Namaste from the dashboard");
});


//app is listening on the port 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});