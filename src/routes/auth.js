const express = require("express");
const { validateSignupData } = require("../utils/validation")
const User = require("../models/User");
const validator = require("validator");
const bcrypt = require("bcrypt")

const authRouter = express.Router();


//sign up 
authRouter.post("/signup", async (req, res) => {
    const body = req.body || {};

    try {
        //validation of data
        validateSignupData(req);

        //Encrypt the password
        const { password, firstName, lastName, emailId } = body;
        const passwordHash = await bcrypt.hash(password, 10);


        //creating a new instance of the user model
        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        });
        await user.save();
        res.send("User created successfully");
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(400).send("ERROR : " + error.message);
    }
});
//creating a login api
authRouter.post("/login", async (req, res) => {
    try {
        const {
            emailId,
            password
        } = req.body;

        if (!validator.isEmail(emailId)) {
            throw new Error("not found")
        };

        //first we will check the user the available or not
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        //comparing the password with user password
        const isPasswordValid = await user.validatePassword(password);  //this validatePassword is the function written in userSchema file.
        if (isPasswordValid) {
            //create a JWT token

            const token = await user.getJWT();  //the getJWT function is the user instance which is coming from the userSchema

            //Add the token to the cookie and send the response back to the user
            res.cookie("token", token, {
                // httpOnly: only,
                expires: new Date(Date.now() + 8 * 3600000) //expires in 8 hours

            }) //10
            res.status(201).send("login successful!!")
        } else {
            throw new Error("Invalid credentails")
        }

    } catch (error) {
        res.status(400).send("Error " + error.message)
    }
});

//logout api
authRouter.post("/logout", async (req, res) => {
    /**
     * In big company we need to do some operation
     * we do some cleaning activity
     */
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    res.send("Logout successfull")
})

module.exports = authRouter