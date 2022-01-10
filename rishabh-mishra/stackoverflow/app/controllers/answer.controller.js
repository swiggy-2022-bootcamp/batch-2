const { body } = require("express-validator");
const { validationErrorsHandler } = require("../utils/validation");
const Question = require("../models").questions;
const User = require("../models").users;
const Answer = require("../models").answers;

// Create
exports.createAnswer = async (req, res, next) => {
  validationErrorsHandler(req, res);
  try {
    const { questionId } = req.params;
    const { body } = req.body;
    const { id } = req.user;

    let question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ errors: [{ msg: "Question not found" }] });
    }

    const version = [
      {
        body,
        user_id: id,
      },
    ];

    let answer = await new Answer({
      question_id: questionId,
      version,
    });

    answer = await answer.save();

    await question.answers.push(answer._id);
    await question.save();

    let user = await User.findById(id);
    user.answers.push(answer._id);

    return res.status(201).json({
      msg: "Answer created successfully",
      data: answer,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

// Get all answers from a question
async function getAllAnswersRelatedToQuestion(req, res, next) {
  try {
    const { questionId } = req.query;
    const answers = await Answer.find({ question_id: questionId });
    return res.status(200).json({
      msg: "Answers fetched successfully",
      data: answers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: err.message }] });
  }
}

async function getAllAnswersRelatedToUser(req, res, next) {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);
    const answerIds = user.answers;
    const answers = await Answer.find({ _id: { $in: answerIds } });

    return res.status(200).json({
      msg: "Answers fetched successfully",
      data: answers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: err.message }] });
  }
}

exports.getAllAnswers = async (req, res, next) => {
  const { questionId, userId } = req.query;
  if (questionId) await getAllAnswersRelatedToQuestion(req, res, next);
  else if (userId) await getAllAnswersRelatedToUser(req, res, next);
  else return res.status(500).json({ errors: [{ msg: "Invalid query" }] });
};

exports.getAnswerById = async (req, res, next) => {
  try {
    const { answerId } = req.params;
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ errors: [{ msg: "Answer not found" }] });
    }
    return res.status(200).json({
      msg: "Answer fetched successfully",
      data: answer,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

exports.updateAnswer = async (req, res, next) => {
  validationErrorsHandler(req, res);
  try {
    const { answerId } = req.params;
    const { body } = req.body;
    const { id } = req.user;

    let answer = await Answer.findById(answerId);
    let user = await User.findById(id);

    if (!answer) {
      return res.status(404).json({ errors: [{ msg: "Answer not found" }] });
    }

    if (
      !answer.version[0].user_id.equals(user._id) &&
      user.role !== "admin" &&
      user.reputation < 2000
    ) {
      return res.status(403).send({
        msg: "You are not authorized to update this question",
      });
    }

    answer.version.push({
      body,
      user_id: id,
    });

    await answer.save();
    if (!user.answers.some((answerId) => answerId.equals(answer._id))) {
      await user.save();
    }

    return res.status(200).json({
      msg: "Answer updated successfully",
      data: answer,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

exports.deleteAnswer = async (req, res, next) => {
  try {
    const { answerId } = req.params;
    const { id } = req.user;

    let answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ errors: [{ msg: "Answer not found" }] });
    }

    let user = await User.findById(id);
    let question = await Question.findById(answer.question_id);

    if (!answer.version[0].user_id.equals(user._id) && user.role !== "admin") {
      return res.status(403).send({
        msg: "You are not authorized to delete this question",
      });
    }

    question.answers.pull(answer._id);
    user.answers.pull(answer._id);

    await user.save();
    await question.save();
    await answer.remove();

    return res.status(200).json({
      msg: "Answer deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

// Answer Validation
exports.validateAnswer = [
  body("body")
    .exists()
    .withMessage("Answer body is required")

    .not()
    .isEmpty()
    .withMessage("Answer body cannot be empty"),
];
