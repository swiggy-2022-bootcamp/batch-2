const { userAuth } = require("../middleware/auth.middleware.js");
const users = require("../controllers/user.controller.js");
let router = require("express").Router();

module.exports = (app) => {
  const {
    getAllUsers,
    getUser,
    createUser,
    signin,
    updateUser,
    validateUser,
    validateSignin,
  } = users;

  router.get("/list", getAllUsers);
  router.get("/:id", getUser);

  router.post("/signup", validateUser, createUser);
  router.post("/signin", validateSignin, signin);

  router.put("/update", userAuth, updateUser);

  return router;
};
