const jwt = require("jsonwebtoken");
const User = require("../models/User")


const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked")
    const token = "TOKEN";
    const isAuthorization = token === "TOKEN";
    if (!isAuthorization) {
        res.status(401).send("Unauthorized");
    } else {
        console.log("Admin auth is successful");
        next();
    }
};

const userAuth = async (req, res, next) => {
    try {

        //reading the cookie
        const { token } = req.cookies;

        if (!token) {
            throw new Error("Token is not valid!!!!")
        }

        //verify the token
        const decoedObj = await jwt.verify(token, "DEV@Tinder$790"); //secret key -DEV@Tinder$790
        const { _id } = decoedObj;

        //find the user from the db from this _id
        const user = await User.findById(_id);

        if (!user) {
            throw new Error("User not found")
        };
        req.user = user
        next(); //to move to the next request handler
    } catch (error) {
        console.log("Error " + error.message)
        res.status(400).send("ERROR " + error.message)
    }

};


module.exports = { adminAuth, userAuth };

