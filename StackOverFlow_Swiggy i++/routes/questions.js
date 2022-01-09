var express = require("express");
var router = express.Router();
var Question = require("../models/question.js");
var middleware = require("../middleware/index.js");
var User = require("../models/user.js");
var { v4: uuid } = require("uuid");
//===================
//QUESTION ROUTES
//===================


//INDEX Page

router.get("/json", function (req, res) {
    Question.find({}, function (err, questions) {
   
    if (err) {
      console.log(err);
    } else {
          res.send({ question: questions });
    }
  });
});

router.get("/", function (req, res) {

  Question.find({}, function (err, allquestion) {
    console.log(allquestion);
    if (err) {
      console.log(err);
    } else {
      res.render("questions/index", {
        question: allquestion,
        page: "question",
      });
    }
  });
});

//CREATE

router.post("/", middleware.isLoggedIn, function (req, res) {
  var name = req.body.name;
  var desc = req.body.description;
  var author = {
    id: req.user._id.toString(),
    username: req.user.username,
  };
  var newquestion = {
    name: name,
    description: desc,
    author: author,
    
    likes: [],
    comments: [],
  
  };


  Question.create(newquestion, function (err, newlycreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/question");
    }
  });
});

//like
router.post("/:id", middleware.isLoggedIn, function (req, res) {
  Question.findById(req.params.id, function (err, question) {
    if (err) {
      req.flash("error", "Something went wrong");
      console.log(err);
      res.redirect("/question");
    } else {
      User.findById(req.user._id, function (err, user) {
        if (err) {
          console.log(err);
        } else {
          console.log(user);
          if (question.likes.includes(user._id)) {
            var idx = question.likes.indexOf(user._id);
            question.likes.splice(idx, 1);
            question.save();
            User.findById(question.author.id, function (err, author) {
              author.points = author.points - 10;
              if (author.points < 0) {
                author.points = 0;
              }
              author.save();
            
              console.log(author);
            });

            
          } else {
            question.likes.push(user);
            question.save();
            User.findById(question.author.id, function (err, author) {
              if (author.points < 0) {
                author.points = 0;
              }
              author.points = author.points + 10;
              author.save();
               
              console.log(author);
            });

           
          }
        }
      });
    }
  });
});

//NEW

router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("questions/new.ejs");
});

//SHOW
router.get("/:id/json", function (req, res) {
  
     Question.findById(req.params.id)
       .populate("comments")
       .exec(function (err, foundquestion) {
         if (err) {
           console.log(err);
         } else {
           res.send({ question: foundquestion });
         }
       });
});

router.get("/:id", function (req, res) {
  
  Question.findById(req.params.id)
    .populate("comments")
    .exec(function (err, foundquestion) {
      if (err) {
        console.log(err);
      } else {
        res.render("questions/show.ejs", { question: foundquestion });
      }
    });
});

// EDIT ROUTES
router.get("/:id/edit", function (req, res) {
 
  Question.findById(req.params.id, function (err, foundquestion) {
    res.render("questions/edit", { question: foundquestion });
  });
});

router.put("/:id", function (req, res) {
 

  Question.findByIdAndUpdate(
    req.params.id,
    req.body.question,
    function (err, updatedQuestion) {
      if (err) {
        res.redirect("/questions");
      } else {
        res.redirect("/question/" + req.params.id);
      }
    }
  );
});

//DESTROY ROUTES

router.delete("/:id", function (req, res) {
  
  Question.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/question");
    } else {
      res.redirect("/question");
    }
  });
});

module.exports = router;
