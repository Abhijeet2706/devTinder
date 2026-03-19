const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/User")

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id; //getting from userAuth middleware (All loggedIn details I am getting here and getting the _id);
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        /**
         * case 1- this is only for ignores and interested
         * case-2-if toUserId which we are sending to, should be in the DB
         * case-3-checking an exitsing connection request
         * case-4-loggedin user can't send the connection request to itself
         */

        //case-4   -- or we can use pre method in connectionRequest Schema
        // if (fromUserId.equals(toUserId)) {
        //     return res.status(400).json({
        //         message: "You can't send the connection to your self"
        //     })
        // }

        //case -1
        const allowedStatus = ["ignored", "interested"]
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "An invalid status type " + status
            })
        };

        //case-2
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(400).json({
                message: "User not found"
            })
        };

        //case -3
        const existingConnectionRequest = await connectionRequestModel.findOne({
            $or: [                                              //$or is use when we need to check more then one condition
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingConnectionRequest) {
            return res.status(400).json({
                message: "Connection request is already exist!!"
            })

        }


        const connectionRequest = new connectionRequestModel({
            fromUserId,
            toUserId,
            status
        });
        //saving in the db
        const data = await connectionRequest.save();
        res.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName,
            data
        });
    } catch (error) {
        res.status(400).send("ERROR " + error.message)
        console.log("ERROR " + error.message)
    }
});

module.exports = requestRouter;
