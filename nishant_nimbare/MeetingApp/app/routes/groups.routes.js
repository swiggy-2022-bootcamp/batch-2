const groupRouter = require("express").Router();
const groupController = require("../controllers/groups.controller");
const authController = require("../controllers/auth.controller");

//verify token
groupRouter.use(authController.verifyUser);

groupRouter.get("/", groupController.viewGroups);
groupRouter.post("/", groupController.createGroup);
groupRouter.post("/addMembers", groupController.addGroupMembers);
groupRouter.post("/removeMembers", groupController.removeGroupMembers);

module.exports = groupRouter;