const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const connectionRequestModel = require("../models/connectionRequest");


const USER_SAFE_DATA = "firstName lastName age gender skills about photoUrl"
//Get all the pending connection request for the loggedIn user
userRouter.get("/user/request/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        //getting the data from the DB for this user
        const connectionRequest = await connectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
        })
            .populate("fromUserId", "firstName lastName")
        //  .populate("fromUserId", ["firstName", "lastName"]);           //with the help of populate method we can get the other collection information



        res.status(200).json({ message: "Data fetched successfully", data: connectionRequest })

    } catch (error) {
        res.status(400).json({ message: "ERROR " + error.message })
    }

});


userRouter.get("/user/connection", userAuth, async (req, res) => {
    /**
     * All the connection who is my connection and accepted my request
     * only check the status is accepted
     */
    try {
        const loggedInUser = req.user;
        //trying to find the connection request from toUserId, and toUserID
        //saharukh--->>>> Abhijeet && status = accepted
        //Monu >>> saharukh && status accepted
        const connectionRequest = await connectionRequestModel.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }

            ]
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);

        //I won't send all the data I will only send the fromUserData where the status is accpeted
        const data = connectionRequest.map(row => {
            if (row.fromUserId._id.equals(loggedInUser._id)) {
                return row.toUserId
            } else {
                return row.fromUserId
            }
        })


        res.status(200).json({
            message: "Connection fetch successfully",
            data
        })
    } catch (error) {
        res.status(400).json({
            message: "ERROR " + error.message
        })
    }
})

module.exports = userRouter;