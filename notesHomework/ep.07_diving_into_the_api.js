const express = require("express");
const connectDB = require("../src/config/database")
const User = require("../src/models/User");

const app = express();

app.use(express.json());  // Middleware to parse JSON request bodies into JavaScript objects



connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
        console.log("Server is running on port 7777");
    });
}).catch((error) => {
    console.error("Database connection failed:", error);
});


app.post("/signup", async (req, res) => {
    try {
        const body = req.body || {};
        //creating a new instance of the user model
        const user = new User(body);
        await user.save();
        res.send("User created successfully");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    }
})