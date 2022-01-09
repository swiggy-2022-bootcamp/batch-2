import dotenv from 'dotenv'
import express from "express";
import config from "./config/index.js";
import morgan from "morgan";
import { register, login, protect } from "./utils/auth.js";
import connectDb from "./utils/db.js";
import apiUserRouter from "./routes/user.router.js"

//reading environment variables
dotenv.config();

const app = express();

app.disable("x-powered-by");
app.use(express.json({ extended: false }));
app.use(morgan("dev"));

//route calls
app.post("/register", register);
app.post("/login", login);

app.use("/api", protect);
app.use('/api/user', apiUserRouter)
app.use('/api/question', apiQuestionRouter)

/**
 * start() : connect to database and start server
 */
export const start = async () => {
  try {
    connectDb();
    app.listen(config.port, () => {
      console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', `REST API running on http://localhost:${config.port}`);
    });
  } catch (e) {
    console.error('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', e);
  }
};

// staring server
start();
