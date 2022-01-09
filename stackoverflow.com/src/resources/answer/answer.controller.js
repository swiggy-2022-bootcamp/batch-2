import Answer from "./answer.model.js";
import Question from "../question/question.model.js";
import { crudRepository } from "../../utils/crud.js";

export const createAnswer = async (req, res) => {
  try {
    const queId = req.body.question_id;
    const createdBy = req.user._id;

    const userAlreadyAnswered = await Answer.find({
      questionId: queId,
      createdBy: createdBy,
    }).lean().exec()


    if (userAlreadyAnswered.length !== 0) {
      return res.status(401).send({
        message: `User with email: ${req.user.email} has already answered the question with id: ${queId}`,
      });
    }

    const answer = await Answer.create({
      description: req.body.description,
      createdBy: createdBy,
      questionId: queId,
    });

    const question = await Question.findByIdAndUpdate(
      queId,
      { $push: { answers: answer._id } },
      { new: true, useFindAndModify: false }
    );
    if (!question) {
      res.status(400).end();
    }
    res.status(200).send({ data: question });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

export const displayAllAnswersByUserId = async (req, res) => {
  try {
    const allAnswers = Answer.find({ createdBy: req.user._id })
      .select("-updatedAt, -__v")
      .lean()
      .exec();
    return res.status(200).send({ data: allAnswers });
  } catch (err) {
    console.log(e);
    res.status(400).end();
  }
};

export const displayAllAnswersToGivenQuestions = async (req, res) => {
  try {
    const data = await Question.findById(req.params.id)
      .populate("answers", "-updatedAt -__v ")
      .select("-updatedAt -__v")
      .lean()
      .exec();
    return res.status(200).send({ data });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e });
  }
};

export default crudRepository(Answer);
