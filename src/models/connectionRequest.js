const mongoose = require("mongoose");


const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  //ref is use to connect the two collection document
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        },
    }
},
    {
        timestamps: true
    }
);
//creating a index in fromUserId for find
connectionRequestSchema.index({ fromUserId: 1 });

//creating a compound index
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });


connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    //check if the fromUserId is same as toUserId

    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("cannot send connection request to your self")
    }
    next()

})
const connectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports = connectionRequestModel;
