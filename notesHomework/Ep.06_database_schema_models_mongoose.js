const express = require("express")
const connectDB = require("../src/config/database")
const User = require("../src/models/user")

const app = express();




//post request to create a new user
//creating a signup route

app.post("/signup", async (req, res) => {
    try {
        const userObj = {
            firstName: "Sachin",
            lastName: "Tendulkar",
            age: 49,
            password: "Sachin@123",
            emailId: "sachin@gmail.com",
            _id: "7777777777777777777777777"
        }
        //creating a new instance of the user model
        const user = new User(userObj);
        await user.save(); //save is an asynchronous operation that saves the user to the database
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

});


connectDB().then(() => {
    console.log("Database connected successfully")
    app.listen(7777, () => {
        console.log("Server is running on port 7777")
    })
}).catch((error) => {
    console.error("Error connecting to database:", error)
})