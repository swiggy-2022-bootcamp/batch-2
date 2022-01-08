import { createAnswer, displayAllAnswersToGivenQuestions } from "./answer.controller.js";
import express from "express";

const router = express.Router();

// api/answer
router.route("/")
.post(createAnswer)

// api/answer/questionId
router.route("/:id")
.get(displayAllAnswersToGivenQuestions)

export default router;
