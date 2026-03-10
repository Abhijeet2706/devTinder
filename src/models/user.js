const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    password: {
        type: String
    },
    emailId: {
        type: String
    },
    gender: {
        type: String
    },
    _id: {
        type: String,
        optional: true
    }
});

//module.exports=mongoose.model("User",userSchema) --- IGNORE ---   

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;