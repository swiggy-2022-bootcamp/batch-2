const users = require("../controllers/user.controller.js");
let router = require("express").Router();

module.exports = (app) => {
  router.post("/signup", users.createUser);
  router.get("/get_all_users", users.findAllUsers);
  router.get("/get_user_by_id/:id", users.findUserById);
  router.put("/update_user_by_id/:id", users.updateUserById);
  router.delete("/delete_user_by_id/:id", users.deleteUserById);

  app.use("/users", router);
  return router;
};
