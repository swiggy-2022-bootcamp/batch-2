const users = require("../controllers/user.controller.js");
const { userAuth } = require("../middleware/auth.middleware.js");
let router = require("express").Router();

module.exports = (app) => {
  const {
    validateUser,
    validateSignin,
    createUser,
    signin,
    getAllUsers,
    updateUser,
  } = users;

  router.get("/get_all", getAllUsers);

  router.post("/signup", validateUser, createUser);
  router.post("/signin", validateSignin, signin);

  router.put("/update", userAuth, updateUser);

  return router;
};
