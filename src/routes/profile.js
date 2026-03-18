const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation")

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

})


//Editing the profile

module.exports = profileRouter;