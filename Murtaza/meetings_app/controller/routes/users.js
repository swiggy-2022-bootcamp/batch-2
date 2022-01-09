const express = require("express");
const router = express.Router();
const meetingsRouter = require("./meetings");
const userService = require("../../services/userService");
const { validateSignUpRequest, validateLoginRequest } = require("../validator");
const auth = require("../auth");
const createError = require("http-errors");
const { createUserIfNotExists } = require("../../services/userService");
const { collection } = require("../../models/Meeting");

router.use("/meetings", meetingsRouter);

/**
 *
 * @swagger
 * /users:
 * get:
 *    description: fetch user details
 *    
 *          
 */
router.get("/", auth, async (req, res, next) => {
    userService.findUserByUserId(req.userId).then(result => {
      res.status(200).json({ status: 200, data: result.data, message: result.message });
    }).catch(err => {
      console.log(err);
      next(err);     
    });
});

/*
 * POST /signup
 * description: register new user
 *
 */
router.post("/signup", validateSignUpRequest, async (req, res, next) => {
    const userDomainEntity = req.body;
    userService.createUserIfNotExists(userDomainEntity)
      .then((result) => {
        res.cookie("auth-token", result.cookie, { httpOnly: true });
        res.status(201).json({data: result.data, message: result.message });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
});

/*
 * POST /login
 * description: authenticate new user
 *
 */
router.post("/login", validateLoginRequest, async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    userService.authenticateUser(username, password)
      .then((result) => {
        res.cookie("auth-token", result.cookie, { httpOnly: true });
        res.status(200).json({message: result.message });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
});

module.exports = router;
