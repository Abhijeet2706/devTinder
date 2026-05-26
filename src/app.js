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
const cors = require("cors")

//we need to whitelist the frontend url in the cors options because our frontend is running on different port and backend is running on different port
const corsOptions = {
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent in cross-origin requests
};
app.use(cors(corsOptions))
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

