import mongoose from "mongoose";
import options from "../config/index.js";

const connect = (url = options.dbUrl, opts = {}) => {
  mongoose.connect(url, { ...opts, useNewUrlParser: true });
  mongoose.connection
    .once("open", () => {
      console.log("database connected");
    })
    .on("error", error => {
      console.log(error);
    });
};

export default connect;
