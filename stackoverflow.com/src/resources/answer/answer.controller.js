import Answer from "./answer.model.js";
import Question from "../question/question.model.js";
import { crudRepository } from "../../utils/crud.js";

export const createAnswer = async (req, res) => {
  try {
    const queId = req.body.question_id;
    const createdBy = req.user._id;
    const userAlreadyAnswered = Question.find({
      answers: { createdBy: createdBy },
    });
    if (!userAlreadyAnswered) {
      const answer = await Answer.create({
        description: req.body.description,
        createdBy: createdBy,
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
    } else {
      res.status(401).send({message: `User with email: ${req.user.email} has already answered the question with id: ${queId}`})
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e });
  }
};

export const displayAllAnswersToGivenQuestions = async (req, res) => {
  try {
    const data = await Question.findById(req.params.id)
      .populate("answers")
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