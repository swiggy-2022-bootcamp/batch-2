const Question = require('../models/question');
const User = require('../models/user');
const Answer = require('../models/answer');


exports.upvote = async (req, res) => {
  const id = req.user.user_id;
  console.log(id);
  const question = await Question.findById(req.query.qid);
  console.log(question);
  answerIndex = question.findIndex((_ele => _ele.id === req.query.aid));

  currentAnswer = question.find((_ele) => _ele.id === req.query.aid);

  voteIndex = currentAnswer.findIndex((_ele) => _ele.user === id);
  if (voteIndex <= 0) {

    currentAnswer.score = currentAnswer.score + 1;
    currentAnswer.vote.push({ user: id, vote: 1 })

  } else {

    currentAnswer.score = currentAnswer.score + 1;
    vote = currentAnswer.find((_ele) => _ele.user === id);
    [vote.vote] = 1;
    currentAnswer.vote[voteIndex] = vote;

  }

  questions.answers[answerIndex] = currentAnswer

};

exports.downvote = async (req, res) => {
  const { id } = req.user;

  if (req.answer) {
    req.answer.vote(id, -1);
    const question = await req.question.save();
    return res.json(question);
  }
  const question = await req.question.vote(id, -1);
  return res.json(question);
};

exports.unvote = async (req, res) => {
  const { id } = req.user;

  if (req.answer) {
    req.answer.vote(id, 0);
    const question = await req.question.save();
    return res.json(question);
  }
  const question = await req.question.vote(id, 0);
  return res.json(question);
};