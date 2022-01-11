const fs = require("fs");
const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded((extended = true)));

// Function to Verify Credentials
function verifyCredentials(data, credentials) {
  for (let i = 0; i < data.length; i++) {
    // Validation of User
    if (
      data[i].username == credentials.username &&
      data[i].password == credentials.password
    ) {
      return true;
    }
  }

  // Credentials don't match or exist
  return false;
}

// Login Route
app.post("/login", function (req, res) {
  console.log(req.body);
  fs.readFile("./database.txt", function (err, data) {
    if (err) {
      res
        .status(401)
        .send({ message: "Something Wrong on our side. Try Again !!" });
    } else {
      console.log(JSON.parse(data));
      data = JSON.parse(data);

      var credentials = {
        username: req.body.username,
        password: req.body.password,
      };
      if (verifyCredentials(data, credentials)) {
        res.status(201).send({ message: "User logged in successfully" });
      } else {
        res.status(401).send({ message: "Sorry Invalid Credentials !!" });
      }
    }
  });
});

// Register Route
app.post("/register", function (req, res) {
  console.log(req.body);
  fs.readFile("./database.txt", function (err, data) {
    if (err) {
    } else {
      data = JSON.parse(data);

      // Inspecting whether user already exist or not
      for (let i = 0; i < data.length; i++) {
        if (data[i].username == req.body.username) {
          res
            .status(401)
            .send({ message: "User Already exists head to login" });
          return;
        }
      }

      let newUser = {
        registration_name: req.body.registration_name,
        username: req.body.username,
        password: req.body.password,
      };
      data.push(newUser);

      fs.writeFile("./database.txt", JSON.stringify(data), function (err) {
        if (err) {
          res
            .status(401)
            .send({ message: "Something Wrong on our side. Try Again !!" });
        } else {
          res.status(201).send({
            message: "User Registered Successfully",
            registration_name: newUser.registration_name,
          });
        }
      });
    }
  });
});

// Ask Question Route
app.post("/question", function (req, res) {
  console.log(req.body);
  var credentials = req.body.user_details;
  var question = req.body.question;
  fs.readFile("./database.txt", function (err, data) {
    if (err) {
      res
        .status(401)
        .send({ message: "Something Wrong on our side. Try Again !!" });
    } else {
      data = JSON.parse(data);
      // Verfying if asking user is registered or not
      if (verifyCredentials(data, credentials)) {
        var newQuestion = {
          questionId: Date.now(),
          title: question.title,
          body: question.body,
          answers: [],
          author: credentials.username,
        };
        fs.readFile("./questions.txt", function (err, data1) {
          if (err) {
            res
              .status(401)
              .send({ message: "Something Wrong on our side. Try Again !!" });
            return;
          } else {
            data1 = JSON.parse(data1);
            data1.push(newQuestion);
          }
          fs.writeFile(
            "./questions.txt",
            JSON.stringify(data1),
            function (err) {
              if (err) {
                res.status(401).send({
                  message: "Something Wrong on our side. Try Again !!",
                });
              } else {
                res.status(201).send({
                  message: "Question Posted successfully",
                  question_id: newQuestion.questionId,
                });
              }
            }
          );
        });
      } else {
        res.status(401).send({
          message:
            "You are not allowed to post !!. Only registered users have rights.",
        });
      }
    }
  });
});

// Add answer route
app.post("/question/:questionid/answer", function (req, res) {
  let questionid = req.params.questionid;
  let answer = req.body.question.answer;
  let credentials = req.body.user_details;
  console.log(questionid, answer);
  fs.readFile("./database.txt", function (err, data) {
    if (err) {
      res
        .status(401)
        .send({ message: "Something Wrong on our side. Try Again !!" });
    } else {
      data = JSON.parse(data);

      if (verifyCredentials(data, credentials)) {
        fs.readFile("./questions.txt", function (err, data1) {
          if (err) {
            res.status(401).send({
              message: "Something Wrong on our side. Try Again !!",
            });
          } else {
            data1 = JSON.parse(data1);
            console.log(data1);
            var questionIdfound = false;

            for (let i = 0; i < data1.length; i++) {
              if (data1[i].questionId == questionid) {
                questionIdfound = true;
                // If questionid is found
                data1[i].answers.push({
                  answer: answer,
                  addedBy: credentials.username,
                });
                break;
              }
            }
            if (!questionIdfound) {
              res.status(401).send({ message: "Question not available." });
              return;
            }
            fs.writeFile(
              "./questions.txt",
              JSON.stringify(data1),
              function (err) {
                if (err) {
                  res.status(401).send({
                    message: "Something Wrong on our side. Try Again !!",
                  });
                } else {
                  res.status(201).send({
                    message: "Answer Posted Successfully",
                    question_id: questionid,
                  });
                }
              }
            );
          }
        });
      } else {
        res.status(401).send({
          message: "Sorry Invalid User details",
          question_id: questionid,
        });
      }
    }
  });
});

// Update answer route
app.put("/question/:questionid/answer", function (req, res) {
  let questionid = req.params.questionid;
  let answer = req.body.question.answer;
  let credentials = req.body.user_details;
  fs.readFile("./database.txt", function (err, data) {
    if (err) {
      res
        .status(401)
        .send({ message: "Something Wrong on our side. Try Again !!" });
    } else {
      data = JSON.parse(data);

      if (verifyCredentials(data, credentials)) {
        fs.readFile("./questions.txt", function (err, data1) {
          if (err) {
            res.status(401).send({
              message: "Something Wrong on our side. Try Again !!",
            });
          } else {
            data1 = JSON.parse(data1);
            // Validating questionId
            var questionIdfound = false;
            for (let i = 0; i < data1.length; i++) {
              if (data1[i].questionId == questionid) {
                questionIdfound = true;

                // User can update its answer
                var userfound = false;
                let answersList = data1[i].answers;
                for (let j = 0; j < answersList.length; j++) {
                  if (answersList[j].addedBy == credentials.username) {
                    userfound = true;
                    answersList[j].answer = answer;
                    data1[i].answers = answersList;
                    break;
                  }
                }
                if (!userfound) {
                  res
                    .status(401)
                    .send({ message: "Question or User not available." });
                  return;
                }
                break;
              }
            }
            if (!questionIdfound) {
              res.status(401).send({ message: "Question not available." });
              return;
            }

            fs.writeFile(
              "./questions.txt",
              JSON.stringify(data1),
              function (err) {
                if (err) {
                  res.status(401).send({
                    message: "Something Wrong on our side. Try Again !!",
                  });
                } else {
                  res.status(200).send({
                    message: "Answer updated Successfully",
                    question_id: questionid,
                  });
                }
              }
            );
          }
        });
      } else {
        res.status(401).send({
          message: "Sorry Invalid User details",
          question_id: questionid,
        });
      }
    }
  });
});

// Get Answers of all questions route
app.get("/allanswers", function (req, res) {
  let credentials = req.body.user_details;
  fs.readFile("./database.txt", function (err, data) {
    if (err) {
      res
        .status(401)
        .send({ message: "Something Wrong on our side. Try Again !!" });
    } else {
      data = JSON.parse(data);

      if (verifyCredentials(data, credentials)) {
        fs.readFile("./questions.txt", function (err, data1) {
          if (err) {
            res.status(401).send({
              message: "Something Wrong on our side. Try Again !!",
            });
          } else {
            data1 = JSON.parse(data1);

            var allAnswers = [];
            for (let i = 0; i < data1.length; i++) {
              var answerObj = {
                question: data1[i].title,
                answers: data1[i].answers,
              };
              allAnswers.push(answerObj);
            }
            res.status(200).send({ allAnswers: allAnswers });
          }
        });
      } else {
        res.status(401).send({
          message:
            "You are not allowed to post !!. Only registered users have rights.",
        });
      }
    }
  });
});

// Resolve Question route
app.post("/resolve/question/:questionid", function (req, res) {
  let questionid = req.params.questionid;
  let credentials = req.body.user_details;
  fs.readFile("./database.txt", function (err, data) {
    if (err) {
      res
        .status(401)
        .send({ message: "Something Wrong on our side. Try Again !!" });
    } else {
      data = JSON.parse(data);
      if (verifyCredentials(data, credentials)) {
        fs.readFile("./questions.txt", function (err, data1) {
          if (err) {
            res
              .status(401)
              .send({ message: "Something Wrong on our side. Try Again !!" });
          } else {
            data1 = JSON.parse(data1);
            var questionIdfound = false;
            for (let i = 0; i < data1.length; i++) {
              if (data1[i].questionId == questionid && data1[i].author == credentials.username) {
                questionIdfound = true;
                data1 = data1.filter(function (obj) {
                  if (obj.questionId == questionid) {
                    return false;
                  }
                  return true;
                });
                break;
              }
            }
            if (!questionIdfound) {
              res.status(401).send({ message: "Question not found" });
              return;
            }
            fs.writeFile(
              "./questions.txt",
              JSON.stringify(data1),
              function (err) {
                if (err) {
                  res.status(401).send({
                    message: "Something Wrong on our side. Try Again !!",
                  });
                } else {
                  res.status(201).send({
                    question_id: questionid,
                    message: "Question Resolved Successfully",
                  });
                }
              }
            );
          }
        });
      }
    }
  });
});

// Server Check
app.listen(port, () => {
  console.log("I am listening");
});
