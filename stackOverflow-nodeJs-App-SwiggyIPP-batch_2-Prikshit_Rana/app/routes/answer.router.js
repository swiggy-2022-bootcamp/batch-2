import { createAnswer, updateAnswer, displayAllAnswersToQuestionById } from "../controller/answer.controller.js";
import express from "express";

const router = express.Router();

// api/answer : createAnswer to question by id
router.route("/")
.post(createAnswer)

// api/answer/:id : display All answer to question by Id
router.route("/:id")
.get(displayAllAnswersToQuestionById)
.put(updateAnswer)

export default router;
