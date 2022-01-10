const { userAuth } = require("../middleware/auth.middleware.js");
const vote = require("../controllers/vote.controller.js");
let router = require("express").Router();

module.exports = (app) => {
  const { upvote, downvote } = vote;

  router.post("/upvote", userAuth, upvote);
  router.post("/downvote", userAuth, downvote);

  return router;
};
