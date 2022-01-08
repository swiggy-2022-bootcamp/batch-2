import express from "express";
import config from "./config/index.js";
import morgan from "morgan";
import connect from "./utils/db.js";

const app = express();
app.disable("x-powered-by");
app.use(express.json({ extended: false }));
app.use(morgan("dev"));



export const start = async () => {
    try {
      connect();
      app.listen(config.port, () => {
        console.log(`Started http://localhost:${config.port}`);
      });
    } catch (e) {
      console.error(e);
    }
  };