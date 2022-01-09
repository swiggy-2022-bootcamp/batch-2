const { body, validationResult } = require("express-validator");
const { validationErrorsHandler } = require("../utils/validation");
const Question = require("../models").questions;
const User = require("../models").users;

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({});
    res.status(200).json({
      msg: "Questions fetched successfully",
      data: questions,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Error fetching questions",
    });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).send({
        msg: "Question not found",
      });
    }
    res.status(200).json({
      msg: "Question fetched successfully",
      data: question,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "Error fetching question",
    });
  }
};

exports.createQuestion = async (req, res) => {
  validationErrorsHandler(req, res);

  try {
    const { title, body } = req.body;
    const version = [
      {
        title,
        body,
        user_id: req.user.id,
        created_at: Date.now(),
      },
    ];

    const question = await Question.create({
      version,
      created_at: Date.now(),
    });

    const user = await User.findById(req.user.id);
    user.questions.push(question.id);

    await user.save();

    res.status(201).json(question);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: [{ msg: err.message }],
    });
  }
};

exports.updateQuestion = async (req, res) => {
  validationErrorsHandler(req, res);

  try {
    const question = await Question.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!question) {
      return res.status(404).send({
        msg: "Question not found",
      });
    }

    const { title, body } = req.body;

    if (
      !question.version[0].user_id.equals(user._id) &&
      user.role !== "admin" &&
      user.reputation < 2000
    ) {
      return res.status(403).send({
        msg: "You are not authorized to update this question",
      });
    }

    question.version.push({
      title,
      body,
      user_id: user._id,
      created_at: Date.now(),
    });

    await question.save();
    user.questions.push(question._id);
    await user.save();

    res.json({
      msg: "Question updated successfully",
      data: question,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: [{ msg: err.message }],
    });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).send({
        msg: "Question not found",
      });
    }

    const user = await User.findById(req.user.id);

    if (
      !question.version[0].user_id.equals(user._id) &&
      user.role !== "admin"
    ) {
      return res.status(403).send({
        msg: "You are not authorized to delete this question",
      });
    }

    const assosiatedUserIds = new Set(
      question.version.map((version) => version.user_id)
    );

    assosiatedUserIds.forEach(async (id) => {
      const user = await User.findById(id);
      user.questions.pull(question._id);
      user.save();
    });

    await question.remove();

    res.json({
      msg: "Question deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: [{ msg: err.message }],
    });
  }
};

// Question Validations
exports.validateQuestion = [
  body("title").not().isEmpty().withMessage("Title is required"),
  body("body").not().isEmpty().withMessage("Body is required"),
];
