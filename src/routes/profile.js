const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt")


//profile api
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req?.user;  //this is the user where we are settting inside the middleware
        if (!user) {
            throw new Error("User does not exist")
        }

        res.status(200).send(user)

    } catch (error) {
        res.status(400).send("ERROR " + error.message)
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid edit request");
        };
        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);

        await loggedInUser.save()
        res.status(200).json({
            message: "profile updated successfully",
            data: loggedInUser
        })
    } catch (error) {
        res.status(400).send("ERROR " + error.message)
    }

});


profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const {
            oldPassword,
            newPassword
        } = req.body;
        //checking the existing password is correct or not
        const isPasswordValid = await loggedInUser.validatePassword(oldPassword);
        console.log("isPasswordValid", isPasswordValid)
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Please enter the correct password"
            });
        }

        if (!validator.isStrongPassword(newPassword)) {
            return res.status(400).json({
                message: "Please enter the strong password"
            });
        }

        //hashed new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        //updatedPassword
        loggedInUser.password = hashedPassword;

        await loggedInUser.save();

        res.status(200).json({
            message: "password updated successfully",
            data: loggedInUser
        });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//Editing the profile

module.exports = profileRouter;