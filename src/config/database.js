const mongoose = require("mongoose");

const URI = "mongodb+srv://namastedev:GZkShtdmAMmxofDd@namastenode.rlgy0lq.mongodb.net/devTinder?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(URI)
};

module.exports = connectDB;