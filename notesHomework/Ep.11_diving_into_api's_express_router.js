const express = require("express");
const connectDB = require("../src/config/database");
const User = require("../src/models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const app = express();
const { userAuth } = require("../src/middlewares/auth")
const { validateSignupData } = require("../src/utils/validation");

app.use(express.json());  // Middleware to parse JSON request bodies into JavaScript objects


//paring the cookie
app.use(cookieParser());

connectDB().then(() => {
    console.log("Database connected successfully")
    app.listen(7777, () => {
        console.log("Server is running on port 7777")
    })
}).catch((error) => {
    console.error("Error connecting to database:", error)
});

//sign up 
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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


//profile api
app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req?.user;  //this is the user where we are settting inside the middleware
        if (!user) {
            throw new Error("User does not exist")
        }

        res.status(200).send(user)

    } catch (error) {
        res.status(400).send("ERROR " + error.message)
    }
})
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
});


app.post("/sendConnectionRequest", userAuth, async (req, res) => {


    try {
        const user = req.user;
        console.log("Sending any request");

        res.send(user.firstName + " sent the connection request")

    } catch (error) {
        console.log("ERROR " + error.message)
    }
})



