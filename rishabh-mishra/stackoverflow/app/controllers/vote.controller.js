const User = require("../models").users;
const Question = require("../models").questions;
const Answer = require("../models").answers;

async function upvoteQuestion(req, res) {
  const { questionId } = req.query;
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).send("Question not found");
    }

    if (question.version[0].user_id.equals(id)) {
      return res.status(403).send("You cannot upvote your own question");
    }

    const index = question.vote.findIndex((vote) => {
      return vote.user_id.equals(id);
    });

    let isPreviouslyDownvoted = false;

    if (index === -1) {
      question.vote.push({
        user_id: id,
        action: true,
      });
    } else if (question.vote[index].action)
      return res.status(403).send("You have already upvoted this question");
    else {
      question.vote[index].action = true;
      isPreviouslyDownvoted = true;
    }

    const userWhoAsked = await User.findById(question.version[0].user_id);
    userWhoAsked.reputation += 10;

    if (isPreviouslyDownvoted) {
      userWhoAsked.reputation += 2;
      user.reputation += 1;
    }

    await question.save();
    await userWhoAsked.save();

    return res.status(200).send("Upvoted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Error while upvoting question",
    });
  }
}

async function upvoteAnswer(req, res) {
  const { answerId } = req.query;
  const { id } = req.user;

  try {
    const answer = await Answer.findById(answerId);
    const user = await User.findById(id);

    if (!answer) {
      return res.status(404).send("Answer not found");
    }

    if (answer.version[0].user_id.equals(id)) {
      return res.status(403).send("You can't upvote your own answer");
    }

    const index = answer.vote.findIndex((vote) => {
      return vote.user_id.equals(id);
    });

    let isPreviouslyDownvoted = false;
    if (index === -1) {
      answer.vote.push({
        user_id: id,
        action: true,
      });
    } else if (answer.vote[index].action) {
      return res.status(403).send("You have already upvoted this answer");
    } else {
      answer.vote[index].action = true;
      isPreviouslyDownvoted = true;
    }

    const userWhoAnswered = await User.findById(answer.version[0].user_id);
    userWhoAnswered.reputation += 15;

    if (isPreviouslyDownvoted) {
      userWhoAnswered.reputation += 2;
      user.reputation += 1;
    }

    await answer.save();
    await userWhoAnswered.save();

    res.json({
      msg: "Answer upvoted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Error while upvoting Answer",
    });
  }
}

exports.upvote = async (req, res) => {
  const { questionId, answerId } = req.query;
  const { id } = req.user;

  const user = await User.findById(id);
  if (user.reputation < 15 && user.role !== "admin") {
    return res.status(403).json({
      error: "You should have at least 15 reputation to upvote",
    });
  }

  if (questionId) upvoteQuestion(req, res);
  else if (answerId) upvoteAnswer(req, res);
  else
    res
      .status(400)
      .send("Invalid request either provide questionId or answerId");
};

async function downvoteQuestion(req, res) {
  const { questionId } = req.query;
  const { id } = req.user;

  try {
    const question = await Question.findById(questionId);
    const user = await User.findById(id);

    if (!question) {
      return res.status(404).send("Question not found");
    }

    if (question.version[0].user_id.equals(id)) {
      return res.status(403).send("You cannot downvote your own question");
    }

    const index = question.vote.findIndex((vote) => {
      return vote.user_id.equals(id);
    });

    let isPreviouslyUpvoted = false;

    if (index === -1) {
      question.vote.push({
        user_id: id,
        action: false,
      });
    } else if (!question.vote[index].action) {
      return res.status(403).send("You have already downvoted this question");
    } else {
      question.vote[index].action = false;
      isPreviouslyUpvoted = true;
    }

    const userWhoAsked = await User.findById(question.version[0].user_id);
    userWhoAsked.reputation = Math.max(userWhoAsked.reputation - 2, 1);

    if (isPreviouslyUpvoted) {
      userWhoAsked.reputation = Math.max(userWhoAsked.reputation - 10, 1);
    }

    await question.save();
    await userWhoAsked.save();

    user.reputation = Math.max(user.reputation - 1, 1);
    await user.save();

    return res.status(200).send("Downvoted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Error while downvoting question",
    });
  }
}

async function downvoteAnswer(req, res) {
  const { answerId } = req.query;
  const { id } = req.user;

  try {
    const answer = await Answer.findById(answerId);
    const user = await User.findById(id);

    if (!answer) {
      return res.status(404).send("Answer not found");
    }

    if (answer.version[0].user_id.equals(id)) {
      return res.status(403).send("You can't downvote your own answer");
    }

    const index = answer.vote.findIndex((vote) => {
      return vote.user_id.equals(id);
    });

    let isPreviouslyUpvoted = false;
    if (index === -1) {
      answer.vote.push({
        user_id: id,
        action: false,
      });
    } else if (!answer.vote[index].action) {
      return res.status(403).send("You have already downvoted this answer");
    } else {
      answer.vote[index].action = false;
      isPreviouslyUpvoted = true;
    }

    const userWhoAnswered = await User.findById(answer.version[0].user_id);
    userWhoAnswered.reputation = Math.max(userWhoAnswered.reputation - 2, 1);

    if (isPreviouslyUpvoted) {
      userWhoAnswered.reputation = Math.max(userWhoAnswered.reputation - 10, 1);
    }

    await answer.save();
    await userWhoAnswered.save();

    user.reputation = Math.max(user.reputation - 1, 1);
    await user.save();

    return res.status(200).send("Downvoted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Error while downvoting Answer",
    });
  }
}

exports.downvote = async (req, res, next) => {
  const { questionId, answerId } = req.query;
  const { id } = req.user;

  const user = await User.findById(id);
  if (user.reputation < 125 && user.role !== "admin") {
    return res.status(403).json({
      error: "You should have at least 125 reputation to downvote",
    });
  }

  if (questionId) downvoteQuestion(req, res);
  else if (answerId) downvoteAnswer(req, res);
  else
    res
      .status(400)
      .send("Invalid request either provide questionId or answerId");
};
