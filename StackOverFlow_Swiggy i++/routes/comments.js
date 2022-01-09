var express = require("express");
var router = express.Router({ mergeParams: true });
var Question = require("../models/question.js");
var Comment = require("../models/comment.js");
var middleware = require("../middleware/index.js");
var User = require("../models/user.js");

//NEW COMMENT page
router.get("/new", middleware.isLoggedIn, function (req, res) {
  Question.findById(req.params.id, function (err, foundquestion) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { question: foundquestion });
    }
  });
});

//CREATE COMMENT page
router.post("/", middleware.isLoggedIn, function (req, res) {
  Question.findById(req.params.id, function (err, question) {
    if (err) {
      req.flash("error", "Something went wrong");
      console.log(err);
      res.redirect("/question");
    } else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          console.log(comment);
          question.comments.push(comment);
          question.save();
          req.flash("success", "Successfully added comment");
          res.redirect("/question/" + question._id);
        }
      });
    }
  });
});

//COMMENT EDIT
router.get(
  "/:comment_id/edit",
  middleware.checkCommentOwnership,
  function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        res.render("comments/edit", {
          question_id: req.params.id,
          comment: foundComment,
        });
      }
    });
  }
);

//COMMENT UPDATE
router.put(
  "/:comment_id",
  middleware.checkCommentOwnership,
  function (req, res) {
    Comment.findByIdAndUpdate(
      req.params.comment_id,
      req.body.comment,
      function (err, updatedComment) {
        if (err) {
          res.redirect("back");
        } else {
          res.redirect("/question/" + req.params.id);
        }
      }
    );
  }
);

//like
router.post("/:id", middleware.isLoggedIn, function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (err) {
      req.flash("error", "Something went wrong");
      console.log(err);
      res.redirect("/question");
    } else {
      User.findById(req.user._id, function (err, user) {
        if (err) {
          console.log(err);
        } else {
          if (comment.likes.includes(user._id)) {
            var idx = comment.likes.indexOf(user._id);
            comment.likes.splice(idx, 1);
            comment.save();
            User.findById(comment.author.id, function (err, author) {
              author.points = author.points - 10;
              author.save();
            });
          } else {
            comment.likes.push(user);
            comment.save();
            User.findById(comment.author.id, function (err, author) {
              author.points = author.points + 10;
              author.save();
            });
          }
        }
      });
    }
  });
});

//COMMENT DESTROY
router.delete(
  "/:comment_id",
  middleware.checkCommentOwnership,
  function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
      if (err) {
        res.redirect("back");
      } else {
        req.flash("success", "Comment Deleted");
        res.redirect("back");
      }
    });
  }
);

module.exports = router;
