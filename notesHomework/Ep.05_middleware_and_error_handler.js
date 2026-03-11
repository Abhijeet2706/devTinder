const express = require('express');
const { adminAuth, userAuth } = require("../src/middlewares/auth");
const app = express();


//handle Auth middleware for all request .
app.use("/admin", adminAuth);
app.use("/user", userAuth)

//middleware is a function that has access to the request and response objects 
// and the next function in the application's request-response cycle. 

// The next function is a function that is used to pass control to the next middleware function in the stack. 
// If the current middleware function does not end the request-response cycle, 

// it must call next() to pass control to the next middleware function. Otherwise,
//  the request will be left hanging and the client will not receive a response.




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


//- multiple next function along with res.send()
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

//another way of calling a next function sepertely
app.get("/data", (req, res, next) => {
    console.log("This is the first route handler");
    res.send("This is the first route handler");
    next();
});

app.get("/data", (req, res, next) => {
    console.log("This is the second route handler");
    res.send("This is the second route handler");
    next();
});

//How the server will respond 
//if you are sending multiple response then the server will respond with the first response 
// and the rest of the responses will be ignored.

//and it keeps on checking for the next response until it finds the first response and then 
// it will send that response to the client and ignore the rest of the responses.



// app.use("/", (req, res, next) => {
//     console.log("This is the first middleware");
//     res.send("This is the first middleware");
//     next()
// });

app.get("/getData", (req, res, next) => {
    console.log("This is the route handler");
    res.send("This is the route handler");
});




//multiple api calls

app.get("/admin/getData", (req, res) => {
    res.send("This is the admin data");
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("This is the delete user data");
})



//logic to check the api caller has authorization or not
//authentication and authorization is the process of verifying the identity of a user and
//  granting them access to certain resources based on their permissions.


app.get("/notAuthUrl", (req, res) => {
    res.send("This is the user data");
});
app.get("/admin/getValidate", (req, res) => {
    res.send("This is the validate data");
});


//how can we handle this authorization by using middleware



//ERROR HANDLER MIDDLEWARE

//error handler middleware is a middleware that is used to handle errors in the application. 
// It is defined as a function that takes four parameters: err, req, res, next.
// The err parameter is the error object that is passed to the next() function in the route handler. 
// The req and res parameters are the request and response objects, respectively. 
// The next parameter is a function that is used to pass control to the next middleware function in the stack.
// The error handler middleware is defined at the end of the middleware stack, after all the route handlers and other middleware functions. 
// It is used to catch any errors that occur in the application and send a response to the client with the error message.



app.use("/", (err, req, res, next) => {
    if (err) {
        console.log("This is the error handler middleware", err);
        res.status(500).send("This is the error handler middleware");
    }
});

app.get("/error", (req, res) => {
    try {
        //logic of DB call and get user data
        throw new Error("This is an error");
        res.send("This is the user data");
    } catch (error) {
        res.status(500).send("This is the error from the error route", error);
    }
});
app.listen(7777, () => {
    console.log("Server is running on port 7777");
});