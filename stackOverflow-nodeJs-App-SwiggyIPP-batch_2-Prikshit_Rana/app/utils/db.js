import mongoose from "mongoose";
import options from "../config/index.js";

/**
 * connectDb: connect to db
 */
const connectDb = (url = options.dbUrl, opts = {}) => {
  mongoose.connect(url, { ...opts, useNewUrlParser: true });
  mongoose.connection
    .once("open", () => {
      console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', "Database Connected....");
    })
    .on("error", error => {
      console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', error);
    });
};

export default connectDb;
