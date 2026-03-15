const express = require("express");
const connectDB = require("../src/config/database")
const User = require("../src/models/User");
const { validateSignupData } = require("../src/utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator")

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
    const body = req.body || {};

    try {
        //validation of data
        validateSignupData(req);

        //Encrypt the password
        const { password, firstName, lastName, emailId } = body;
        const passwordHash = await bcrypt.hash(password, 10);
        console.log("passwordHash", passwordHash)


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
        const isPasswordValid = await bcrypt.compare(password, user?.password);
        if (isPasswordValid) {
            res.status(201).send("login successful!!")
        } else {
            throw new Error("Invalid credentails")
        }

    } catch (error) {
        res.status(400).send("Error " + error.message)
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
});


//Delete api -DELETE /user -delete a user from the database.


app.delete("/user", async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            res.status(404).send("Required user id to deleteing the user")
        } else {
            //  await User.findOneAndDelete({ _id: userId })
            const user = await User.findByIdAndDelete(userId);
            res.status(200).send("User deleted successfully")
        }

    } catch (error) {
        console.log("Error whilte deleting the user", error);
        res.status(500).send("Internal server error")
    }
});


//update data of the user
app.patch("/user/:userId", async (req, res) => {
    try {
        const userId = req?.params?.userId;
        const { ...data } = req.body;
        const ALLOWED_UPDATES = [
            "userId",  //we should avoid this key instead of passing we can get this userId from the URL
            "photoUrl",
            "aboout",
            "gender",
            "age",
            "skills",
        ];

        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed")
        }
        if (!userId) {
            return res.status(400).send("user is not found");
        };

        if (data?.skills.length > 10) {
            throw new Error("Skils can't be more then 5")
        }
        const user = await User.findByIdAndUpdate(userId, data,
            {
                returnDocument: "after",
                runValidators: true //this will run in an existing document
            }
        );
        res.status(200).json({
            message: "updated successfully",
            user
        })

    } catch (error) {
        console.log("error", error.message)
        res.status(500).send("Internal server error " + error.message)
    }
})





