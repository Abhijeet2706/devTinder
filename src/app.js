const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");

const app = express();

app.use(express.json());  // Middleware to parse JSON request bodies into JavaScript objects

app.post("/signup", async (req, res) => {
    try {
        const body = req?.body || {};
        const user = new User(body);
        await user.save();
        res.status(201).json({
            message: "User created successfully",
            user: user
        })

    } catch (error) {
        res.status(400).json({
            message: "Error saving the user",
            error: error.message
        })
    }
})

connectDB().then(() => {
    console.log("Database connected successfully")
    app.listen(7777, () => {
        console.log("Server is running on port 7777")
    })
}).catch((error) => {
    console.error("Error connecting to database:", error)
})

