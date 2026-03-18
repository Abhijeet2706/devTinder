const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth")


requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {


    try {
        const user = req.user;
        console.log("Sending any request");

        res.send(user.firstName + " sent the connection request")

    } catch (error) {
        console.log("ERROR " + error.message)
    }
});

module.exports = requestRouter;
