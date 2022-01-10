const userRoutes = require("./user.routes");
const questionRoutes = require("./question.routes");
const answerRoutes = require("./answer.routes");
const voteRoutes = require("./vote.routes");

class Routes {
  constructor(app) {
    this.app = app;
  }

  configRoutes() {
    this.app.use("/user", userRoutes(this.app));
    this.app.use("/question", questionRoutes(this.app));
    this.app.use("/answer", answerRoutes(this.app));
    this.app.use("/vote", voteRoutes(this.app));
  }
}

module.exports = Routes;
