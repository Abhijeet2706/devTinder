const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");

const app = express();

app.use(express.json());  // Middleware to parse JSON request bodies into JavaScript objects



//signup api -POST /signup -create a new user in the database.
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

//getting one record at a time
//even when you have the same email id for the user, it will return the first record that matches the email id.
app.get("/user", async (req, res) => {
    try {
        const userEmail = req.body.emailId;
        if (!userEmail) {
            res.status(404).json("User not found");
        } else {
            const user = await User.findOne({ emailId: userEmail });
            res.status(200).json({
                message: "User fetched successfully",
                user: user
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
});

//Feed api -GET /feed -get all the users from the database.
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            message: "User fetched successfully",
            user: users,
            total: users.length
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
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

