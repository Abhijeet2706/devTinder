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
});


//getting one record at a time
app.get("/user", async (req, res) => {
    try {
        const userEmail = req.body.emailId;
        if (!userEmail) {
            return res.status(400).send("Email ID is required");
        };

        if (userEmail?.length === 0) {
            return res.status(404).send("user not found");
        } else {
            const user = await User.findOne({ emailId: userEmail });
            res.status(200).json({
                message: "User fetched successfully",
                user: user
            })
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

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
        res.status(500).send("Internal Server Error");
    }
})





