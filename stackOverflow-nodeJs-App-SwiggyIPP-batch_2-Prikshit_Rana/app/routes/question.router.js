import questionController from "../controller/question.controller.js";
import express from "express";

const router = express.Router();

// api/question : create and findQuesion
router.route("/")
.post(questionController.createOuestion)
.get(questionController.findQuestion);

// api/question/:id : find/update/delete question by id
router
  .route("/:id")
  .get(questionController.findQuestionById)
  .put(questionController.updateQuestion)
  .delete(questionController.deleteQuestion);

export default router;
