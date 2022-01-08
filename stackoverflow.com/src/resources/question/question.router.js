import questionController from "./question.controller.js";
import express from "express";

const router = express.Router();

// api/question
router.route("/")
.post(questionController.createOne)
.get(questionController.findMany);

// api/question/:id
router
  .route("/:id")
  .get(questionController.findOne)
  .put(questionController.updateOne)
  .delete(questionController.removeOne);

export default router;
