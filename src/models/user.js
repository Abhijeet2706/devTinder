const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    age: {
        type: Number,
        min: 18,


    },
    password: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,  // important
        lowercase: true,
        trim: true
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://picsum.photos/id/237/200/300"
    },
    about: {
        type: String,
        default: "This is a default about of the user"
    },
    skills: {
        type: [String]
    }
}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;