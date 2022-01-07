const { refresh, signIn, welcome } = require("./handlers");

class Routes {
  constructor(app) {
    this.app = app;
  }
  configRoutes() {
    app.post("/signin", signIn);
    app.get("/welcome", welcome);
    app.post("/refresh", refresh);
  }
}

module.exports = Routes;
