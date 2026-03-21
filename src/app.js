const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());  // Middleware to parse JSON request bodies into JavaScript objects
//paring the cookie
app.use(cookieParser());


//importing all the routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user");



app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter)

connectDB().then(() => {
    console.log("Database connected successfully")
    app.listen(7777, () => {
        console.log("Server is running on port 7777")
    })
}).catch((error) => {
    console.error("Error connecting to database:", error)
});

