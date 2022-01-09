const userRoutes = require("./user.routes");
const questionRoutes = require("./question.routes");

class Routes {
  constructor(app) {
    this.app = app;
  }

  configRoutes() {
    this.app.use("/user", userRoutes(this.app));
    this.app.use("/question", questionRoutes(this.app));
  }
}

module.exports = Routes;
