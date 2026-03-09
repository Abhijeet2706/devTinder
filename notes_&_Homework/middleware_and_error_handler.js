const express = require('express');

const app = express();

//app.use("/route",rh0 ,[rh1,rh2,rh3],rh4). route handlers are executed in sequence. 
// If any of the route handler does not call next() then the execution will stop and 
// the response will be sent to the client. If all the route handlers call next() then the final handler will be executed 
// and the response will be sent to the client.

//multiple route handler-play with the code

app.get("/user", (req, res, next) => {
    console.log("This is the first route handler");
    res.send("This is the first route handler");
    next();
},
    (req, res) => {
        console.log("This is the second route handler");
        res.send("This is the second route handler");
    },
);


//- multiplenext function and errors along with res.send()

app.get("/route",
    [(req, res, next) => {
        console.log("This is the first route handler");
        //  res.send("This is the first route handler");
        next(); // This will not work because res.send() will end the response and next() will not be called.
    },

    (req, res, next) => {
        console.log("This is the second route handler");
        //  res.send("This is the second route handler");
        next(); // This will not work because res.send() will end the response and next() will not be called.
    },

    (req, res, next) => {
        console.log("This is the third route handler");
        //  res.send("This is the third route handler");
        next(); // This will not work because res.send() will end the response and next() will not be called.
    },

    (req, res, next) => {
        console.log("This is the fourth route handler");
        // res.send("This is the fourth route handler");
        next()
    }], (req, res, next) => {
        console.log("This is the final route handler");
        res.send("This is the final route handler");

    }
);



app.listen(7777, () => {
    console.log("Server is running on port 7777");
});