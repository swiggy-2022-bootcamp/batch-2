import dotenv from 'dotenv'
import express from "express";
import config from "./config/index.js";
import morgan from "morgan";

//reading environment variables
dotenv.config();

const app = express();

app.disable("x-powered-by");
app.use(express.json({ extended: false }));
app.use(morgan("dev"));


/**
 * start() : start server
 */
export const start = async () => {
  try {
    app.listen(config.port, () => {
      console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', `REST API running on http://localhost:${config.port}`);
    });
  } catch (e) {
    console.error('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', e);
  }
};

// staring server
start();
