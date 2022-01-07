require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = require("./config").db.url;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB is connected...");
  } catch (err) {
    console.error(err);

    //Exiting the process
    process.exit(1);
  }
};

module.exports = connectDB;
