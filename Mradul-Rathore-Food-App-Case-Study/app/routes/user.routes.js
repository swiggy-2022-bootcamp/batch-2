const users = require("../controllers/user.controller.js");
var router = require("express").Router();
const auth = require("../middleware/auth.js");

router.get("/", auth, users.fetchAllUsers);
router.get("/:id", auth, users.fetchUserById);
router.put("/", auth, users.updateUserById);
router.delete("/:id", users.deleteUserById);

module.exports = router;