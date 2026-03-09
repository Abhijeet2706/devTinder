const express = require('express');


const PORT = 3000;
//instance of an express application
const app = express();


//handle any incoming request
//this is request handler function, it takes two parameters req and res, 
// req is the request object that contains information about the incoming request, 
// res is the response object that we can use to send a response back to the client. 
// In this case, we are sending a simple "Hello World" message as the response.

app.use("/", (req, res) => {
    res.send("Namaste from the dashboard");
});

app.use("/signup", (req, res) => {
    res.send("This is the sign up page");
});

//app is listening on the port 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});