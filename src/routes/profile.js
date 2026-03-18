const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth")

//profile api
profileRouter.get("/profile", userAuth, async (req, res) => {
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

module.exports = profileRouter;