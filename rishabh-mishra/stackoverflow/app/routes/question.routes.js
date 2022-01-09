const { userAuth } = require("../middleware/auth.middleware.js");
const question = require("../controllers/question.controller.js");
let router = require("express").Router();

module.exports = (app) => {
  const {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    acceptAnswer,
    removeAcceptedAnswer,
    deleteQuestion,
    validateQuestion,
  } = question;

  router.get("/list", getAllQuestions);
  router.get("/:id", getQuestionById);

  router.post("/create", [userAuth, validateQuestion], createQuestion);

  router.put("/update/:id", [userAuth, validateQuestion], updateQuestion);
  router.put("/accept-answer", [userAuth], acceptAnswer);
  router.put(
    "/remove-accepted-answer/:questionId",
    [userAuth],
    removeAcceptedAnswer
  );

  router.delete("/delete/:id", [userAuth], deleteQuestion);

  return router;
};
