var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.js");
var Question = require("../models/question.js");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

router.get("/", function (req, res) {
  res.render("landing");
});

//REGISTER
router.get("/register", function (req, res) {
  res.render("register", { page: "register" });
});

router.post("/register", function (req, res) {
  var newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    //avatar: req.body.avatar,
  });
  if (req.body.admincode === "secretcode123") {
    newUser.isAdmin = true;
  }
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("register", { error: err.message });
    } else {
      passport.authenticate("local")(req, res, function () {
        req.flash("success", "Welcome To StackOverflow " + user.username);
        res.redirect("/question");
      });
    }
  });
});

//LOGIN
router.get("/login", function (req, res) {
  res.render("login", { page: "login" });
});

router.post("/login", function (req, res, next) {
  console.log(res.body);
  passport.authenticate("local", {
    successRedirect: "/question",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: "Welcome to StackOverflow, " + req.body.username + "!",
  })(req, res);
});

//LOGOUT
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Logged you out!!");
  res.redirect("/question");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

//USER'S PROFILE
router.get("/users/:id", function (req, res) {
  User.findById(req.params.id, function (err, foundUser) {
    if (err) {
      req.flash("error", "Something Went Wrong");
      res.redirect("/");
    }
    Question.find()
      .where("author.id")
      .equals(foundUser._id)
      .exec(function (err, questions) {
        if (err) {
          req.flash("error", "Something Went Wrong");
          res.redirect("/");
        } else {
          res.render("users/show", {
            user: foundUser,
            questions: questions,
          });
        }
      });
  });
});

module.exports = router;
