import Answer from "./answer.model.js";
import Question from "../question/question.model.js";
import { crudRepository } from "../../utils/crud.js";
import {logger} from './../../utils/logger.js'

export const createAnswer = async (req, res) => {
  const methodName = '#createAnswer'
  logger.info(`${methodName} Request recieved for creating answer and pushing it to question with id: ${req.body.question_id} `)
  try {
    const queId = req.body.question_id;
    const createdBy = req.user._id;

    const userAlreadyAnswered = await Answer.find({
      questionId: queId,
      createdBy: createdBy,
    }).lean().exec()

    if (userAlreadyAnswered.length !== 0) {
      logger.error(`${methodName} Question has already been answered by user with id: ${createdBy} to question with id: ${queId}`)
      return res.status(401).send({
        message: `User with email: ${req.user.email} has already answered the question with id: ${queId}`,
      });
    }

    const answer = await Answer.create({
      description: req.body.description,
      createdBy: createdBy,
      questionId: queId,
    });
    logger.info(`${methodName} Answer created with answer body: ${JSON.stringify(answer)}`)

    const question = await Question.findByIdAndUpdate(
      queId,
      { $push: { answers: answer._id } },
      { new: true, useFindAndModify: false }
    );
    if (!question) {
      logger.error(`${methodName} Error encountered while updating the answers array of question with id: ${quesId} with answer: ${JSON.stringify(answer)}`)
      res.status(400).end();
    }
    res.status(200).send({ data: question });
  } catch (e) {
    logger.error(`${methodName} Error encountered while updating the answers array of question with id: ${quesId} with answer: ${JSON.stringify(answer)}`)
    res.status(400).end();
  }
};


export const displayAllAnswersToGivenQuestions = async (req, res) => {
  const methodName = '#displayAllAnswersByUserId'
  logger.info(`${methodName} Request recieved for displaying all answers to question with question id: ${req.params.id}`)
  try {
    const data = await Question.findById(req.params.id)
      .populate("answers", "-updatedAt -__v ")
      .select("-updatedAt -__v")
      .lean()
      .exec();
    return res.status(200).send({ data });
  } catch (e) {
    logger.error(`${methodName} Error encountered while fetching all answers for question with id: ${req.params.id}`)
    res.status(400).send({ message: e });
  }
};

export default crudRepository(Answer);
