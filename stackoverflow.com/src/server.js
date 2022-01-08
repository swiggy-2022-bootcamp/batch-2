import express from "express";
import config from "./config/index.js";
import morgan from "morgan";
import connect from "./utils/db.js";
import { signup, signin, protect } from "./utils/auth.js";
import userRouter from "./resources/user/user.router.js";
import questionRouter from "./resources/question/question.router.js";
import answerRouter from "./resources/answer/answer.router.js";

const app = express();
app.disable("x-powered-by");
app.use(express.json({ extended: false }));
app.use(morgan("dev"));

app.post("/signup", signup);
app.post("/signin", signin);

app.use("/api", protect);
app.use("/api", protect);
app.use("/api/user", userRouter);
app.use("/api/question", questionRouter);
app.use("/api/answer", answerRouter);

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
