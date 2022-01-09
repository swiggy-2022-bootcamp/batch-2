const { userAuth } = require("../middleware/auth.middleware.js");
const answers = require("../controllers/answer.controller.js");
let router = require("express").Router();

module.exports = (app) => {
  const {
    getAllAnswers,
    getAnswerById,
    createAnswer,
    updateAnswer,
    deleteAnswer,
    validateAnswer,
  } = answers;

  router.get("/list", getAllAnswers);
  router.get("/:answerId", getAnswerById);

  router.post("/create/:questionId", [userAuth, validateAnswer], createAnswer);

  router.put("/update/:answerId", [userAuth, validateAnswer], updateAnswer);

  router.delete("/delete/:answerId", [userAuth], deleteAnswer);
  return router;
};
