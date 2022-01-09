import questionController from "../controller/question.controller.js";
import express from "express";

const router = express.Router();

// api/question : create
router.route("/")
.post(questionController.createOuestion)

// api/question/:id : update question by id
router
  .route("/:id")
  .put(questionController.updateQuestion)

export default router;
