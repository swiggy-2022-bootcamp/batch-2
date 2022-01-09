import Answer from "../models/answer.model.js";
import Question from "../models/question.model.js";

/**
 * createAnswer : answer question based on question Id
 */
export const createAnswer = async (req, res) => {
  try {
    const queId = req.body.question_id;
    const createdBy = req.user._id;

    const answerAlreadyExist = await Answer.find({
      ques_id:queId,
      createdBy: createdBy
    })
    .select("-updatedAt, -__v")
    .lean()
    .exec();

    if(answerAlreadyExist.length !== 0)
      return res.status(401).send({ message : `Answer already posted for quesId: ${req.body.question_id} by user: ${req.user.firstName} ${req.user.lastName}, you can update your answer if required` });

    const answer = await Answer.create({
      ques_id: queId,
      answer_body: req.body.answer_body,
      createdBy: createdBy
    });

    const question = await Question.findByIdAndUpdate(
      queId,
      { $push: { answers: answer._id } },
      { new: true, useFindAndModify: false }
    )
    .populate("answers")
    .select("-updatedAt, -__v");

    if (!question) {
      res.status(400).end();
    }
    const status = {
      message: `Answered posted to question having id: ${queId}`
    };
    res.status(200).send({ status, data: question });
  } catch (e) {
    console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', e);
    res.status(400).send({ message: e });
  }
};

/**
 * updateOne : update answer based on userId and questionId
 */
 export const updateAnswer = async (req, res) => {
  try{
    const isQuesAnsByUser = await Answer.find({
      ques_id:req.params.id,
      createdBy: req.user._id
    })
    .select("-updatedAt, -__v")
    .lean()
    .exec();

    if(isQuesAnsByUser.length === 0)
      return res.status(401).send({ message : `No answer posted for quesId: ${req.params.id} by user: ${req.user.firstName} ${req.user.lastName}, post answer only then you can update` });
      
    const updatedAnswer = await Answer.findOneAndUpdate({
      ques_id: req.params.id,
      createdBy: req.user._id
    }, 
    req.body, {new: true}
    )
    .select("-updatedAt, -__v")
    .lean()
    .exec();

    if(!updatedAnswer){
      return res.status(400).send({ message: "Update Answer Request failed"});
    }
    res.status(200).json({ message: `Answer updated for quesId: ${req.params.id}`, data: updatedAnswer})
  }catch(e){
    console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', e)
    res.status(400).end();
  }
}

export const displayAllAnswersToQuestionById = async (req, res) => {
  try {
    const data = await Question.findById(req.params.id).populate(
      "answers"
    )
    .select("-updatedAt, -__v");
    
    return res.status(200).send({ data });
  } catch (e) {
    console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', e)
    res.status(400).send({ message: e });
  }
};
