const auth = require("../middleware/auth.js");

module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const question = require("../controllers/question.controller.js");
    const answer = require("../controllers/answer.controller.js");
    var router = require("express").Router();

    router.post("/register", users.createUser);
    router.post("/login", users.userLogin);
   
    router.post("/question", auth, question.createQuestion);
    router.get("/question/:questionid",question.findQuestionById);
    router.post("/question/:questionid/upvote", auth, question.upvoteQuestion);
    
    router.post("/question/:questionid/answer", auth,answer.createAnswer);
    router.put("/question/:questionid/answer", auth, answer.updateAnswer);
    router.post("/answer/:answerid/upvote", auth, answer.upvoteAnswer);
    
    
    router.get("/get_all_users",users.findAllUsers);
    router.get("/get_user_by_id/:id",users.findUserById);
    router.delete("/delete_user_by_id/:id",users.deleteUserById);
    
    app.use("/",router)
}
