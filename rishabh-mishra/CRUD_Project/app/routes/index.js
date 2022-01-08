const userRoutes = require("./user.routes");

class Routes {
  constructor(app) {
    this.app = app;
  }

  configRoutes() {
    this.app.use("/users", userRoutes(this.app));
  }
}

module.exports = Routes;
