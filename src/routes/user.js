const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/User")


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
});


//Feed api 
/**
 * 1. User should see all the other user card except his own card
 * 2. Only profile which doest not have actioned by the user or from the user (his connection)
 * 3. should not see the ignored 
 * 4. already sent the connection request
 */

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;


        //find out all the connection request either I sent or receive
        const connectionRequest = await connectionRequestModel.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId")


        const hideUsersFromFeed = new Set();  // It is like an array and will make unique element 
        connectionRequest.forEach(req => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        //now find the rest of the user and loggedIn user it self should not be there
        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } } //hiding the loggedin user it self
            ]
        }).select(USER_SAFE_DATA);
        res.status(200).json({
            data: users
        })


    } catch (error) {
        res.status(400).json({
            message: "ERROR " + error.message
        })
    }
})

module.exports = userRouter;


