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

const userAuth = (req, res, next) => {
    console.log("User auth is getting checked")
    const token = "TOKEN";
    const isAuthorization = token === "TOKEN";
    if (!isAuthorization) {
        res.status(401).send("Unauthorized");
    } else {
        console.log("Admin auth is successful");
        next();
    }
};


module.exports = { adminAuth, userAuth };

