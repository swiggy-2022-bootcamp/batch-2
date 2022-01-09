const users = require("../controllers/user.controller.js");
const { userAuth } = require("../middleware/auth.middleware.js");
let router = require("express").Router();

module.exports = (app) => {
  const { validateUser, createUser, validateSignin, signin, getAllUsers } =
    users;

  router.post("/signup", validateUser, createUser);
  router.post("/signin", validateSignin, signin);
  router.get("/get_all", userAuth, getAllUsers);

  return router;
};
