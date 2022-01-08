const express = require("express");
const bodyParser = require("body-parser");
const Library = require("./Library.js");

const app = express();

app.use(bodyParser.json());

// POST REQUEST to login
app.post("/login", (req, res) => 
{
  
  // the req(request) object has the incoming json data from Postman client
  // object destructuring 
  const {userName,password} = req.body;
  
  // lets use the UserAuthenticate function imported
  const responseStatus = Library.authenticateUser.authenticate(userName,password);

  switch(responseStatus)
  {
    case "Success":
      res.end("The user has successfully logged in");
      break;
    
    case "IncorrectPassword":
      res.end("The user has entered incorrect password for the given email");
      break;
    
    case "NotRegistered":
      res.end("The user has not been registered  yet");
      break;
    
    case "ServerIssue":
      res.end("The server has some issue. Please try again later");
      break;
    
    default:
      res.end();
      
  }
  
});

// POST REQUEST TO ADD A USER

app.post("/addUser", (req, res) => 
{
    const {registrationName,userName,password} = req.body;
    const responseStatus = Library.addUser.registerUser(registrationName,userName,password);
 
    switch(responseStatus)
    {
      case "Success":
          res.end("The user added successfully. His registration email is "+userName);
          break;
   
      case "Failure":
          res.end("This username "+userName+ " is already registered. \n Please choose another");
          break;
  
      case "ServerIssue":
          res.end("The server has some issue. Please try again later");
          break;
  
      default:
          res.end();
    }
 
});

// GET REUQEST TO LIST ALL USERS

app.get('/listUsers', (req, res) => 
{
   
    const usersData = Library.addUser.listAllUsers();
    if (usersData != "ServerIssue")
    {
        res.end(usersData);
    }
    else
    {
        res.end("Server issue please try again later");
    }


});

// POST REQUEST TO ADD A QUESTION

// for simplicity, we have used a global variable
var questionId = 109;

app.post("/addQuestion", (req, res) => 
{
  const userName = req.body.user_Details.userName;
  const password = req.body.user_Details.password;
  const questionContent = req.body.question;
  
  // first lets authenticate the user

  const authResponseStatus = Library.authenticateUser.authenticate(userName,password);
  if (authResponseStatus != "Success")
  {
      console.log("Sorry Invalid login details. Please try again.");
      res.end("Sorry Invalid login details. Please try again.");
  }
  else
  { // authentication successfull, lets post the question
    questionId +=1;
    //pass question id , username(unique), and content of the question

    const postQuestionStatus = Library.addQuestion.postQuestion(questionId,userName,questionContent);
    if (postQuestionStatus == "Success")
    {
      console.log("question posted successfully \n "+"question id is: "+ String(questionId));
      res.end("question posted successfully \n "+"question id is: "+ String(questionId));
    }
    else
    {
      res.end("The server has some issue. Please try again later");
    }
    
  }    

});

// POST REUQEST TO ADD AN ANSWER
app.post("/addAnswer", (req, res) => 
{
    const userName = req.body.user_Details.userName;
    const password = req.body.user_Details.password;
    const questionId = req.body.question.questionId;
    const answerContent = req.body.question.answer;
  
    // first lets check authentication
    const authResponseStatus = Library.authenticateUser.authenticate(userName,password);
    if (authResponseStatus != "Success")
    {
        console.log("Sorry Invalid login details. Please try again.");
        res.end("Sorry Invalid login details. Please try again.");
        return;
    }
  
    // now lets check if questin id is valid
    const questionIdStatus = Library.addAnswer.checkValidQuestionId(questionId);
    if (questionIdStatus != "Success")
    {
        console.log("Sorry question id is invalid. Please try again.");
        res.end("Sorry question id is invalid.  Please try again.");
        return;
    }
   
    // now lets check if user has already answered this question
    const checkUserAlreadyAnsweredStatus = Library.addAnswer.checkUserAlreadyAnswered(userName,questionId);
    if (checkUserAlreadyAnsweredStatus == "Success")
    {
        console.log("Sorry the user has already answered this question. \n");
        console.log("Please make a PUT request to update this answer");
        res.end("Sorry the user has already answered this question. \n Please make a PUT request to update this answer");
        return;
    }
    // now lets the post this new answer
    const postAnswerStatus = Library.addAnswer.postNewAnswer(questionId,userName,answerContent)
    if (postAnswerStatus == "Success")
    {
        console.log("New Answer posted successfully \n "+"question id is: "+ String(questionId));
        res.end("New Answer posted successfully \n "+"question id is: "+ String(questionId));
    }
    else
    {
        res.end("The server has some issue. Please try again later");
    }
  
  });

  // PUT REQUEST TO UPDATE AND ANSWER
  app.put("/updateAnswer", (req, res) => 
  {
    const userName = req.body.user_Details.userName;
    const password = req.body.user_Details.password;
    const questionId = req.body.question.questionId;
    const answerContent = req.body.question.answer;
  
    // first lets check authentication
    const authResponseStatus = Library.authenticateUser.authenticate(userName,password);
    if (authResponseStatus != "Success")
    {
        console.log("Sorry Invalid login details. Please try again.");
        res.end("Sorry Invalid login details. Please try again.");
        return;
    }
  
    // now lets check if questin id is valid
    const questionIdStatus = Library.addAnswer.checkValidQuestionId(questionId);
    if (questionIdStatus != "Success")
    {
        console.log("Sorry question id is invalid. Please try again.");
        res.end("Sorry question id is invalid.  Please try again.");
        return;
    }
   
    // now lets check if user has already answered this question
    const checkUserAlreadyAnsweredStatus = Library.addAnswer.checkUserAlreadyAnswered(userName,questionId);
    if (checkUserAlreadyAnsweredStatus != "Success")
    {
        console.log("Sorry the user has NOT YET answered this question. \n");
        console.log("Please make a POST request to write a NEW answer");
        res.end("Sorry the user has NOT YET answered this question. \n Please make a POST request to write a NEW answer");
        return;
    }
    // now lets the post this new answer
    const postAnswerStatus = Library.addAnswer.updateAnswer(questionId,userName,answerContent)
    if (postAnswerStatus == "Success")
    {
        console.log("Answer UPDATED successfully \n "+"question id is: "+ String(questionId));
        res.end("Answer UPDATED successfully \n "+"question id is: "+ String(questionId));
    }
    else
    {
        res.end("The server has some issue. Please try again later");
    }
  
  });



// GET REUQEST TO LIST ALL USERS

app.get('/listAllQuestionsAndAnswers', (req, res) => 
{
   
    const allData = Library.addQuestion.listAllQnA();
    if (allData != "ServerIssue")
    {
        res.end(allData);
    }
    else
    {
        res.end("Server issue please try again later");
    }


});



// OUR EXPRESS SERVER IS LISTENING ON PORT 5000 FOR THE REQUESTS
var server = app.listen(5000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server listening at http://%s:%s", host, port)
 })
