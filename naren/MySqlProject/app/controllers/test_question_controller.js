// Establishing DataBase connection
const db = require("../database/db.js")
const dbConnection= db.getDbConnection()

/*

************ CONTROLLER FOR ALL QUESTION RELATED REQUESTS ********************

*/

// QUERY STRINGS FOR THIS CONTROLLER
const authenticateUserQueryString = "SELECT * FROM UserDetails WHERE userName = ? AND password = ?;";
const insertQuestionQueryString = "INSERT INTO Questions SET ?;";
const getQuestionContentQueryString = "SELECT content FROM Questions WHERE questionId = ?";
const getAnswerContentQueryString = "SELECT content FROM Answers WHERE questionId = ? ORDER BY answerId";
const getAllQuestionsQueryString ="SELECT * from Questions ORDER BY questionId;";
const getAllAnswersQueryString = "SELECT * from Answers ORDER BY answerId;";
/*
USE CASE 3 OF CASE STUDY : POSTING A NEW QUESTION

Function : postQuestion

API TYPE : POST REQUEST

Description : 
It serves the POST request made from the client for posting a new 
question. We insert a new question into the database and reespond
with the question id generated for the question. We also 
need to authorize the client making the request. 

Input parameters :
From the request we get,
1) questionContent - The content of the question to post.
2) userName - Email Id of the user
3) password - password of the user

Response of the API with HTTP STATUS codes:
201: Question posted Successfully with question ID
401: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN
500: "Internal Server Error "

*/

const postQuestion = async (req,res) =>
{
    const questionData =
    {
        userName : req.body.user_Details.userName,
        content : req.body.question
    };
    const userData =
    {
        userName : req.body.user_Details.userName,
        password : req.body.user_Details.password
    };

    try
    {
        var userAuthenticationDetails = await dbConnection.query(authenticateUserQueryString, [userData.userName, userData.password]);
        if (userAuthenticationDetails.length == 0)
        {
            res.status(401).send({message: "Error: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN"});
            return;
        }
        var insertQuestionQueryResult = await dbConnection.query(insertQuestionQueryString,questionData);
        res.status(201).send({message: "Question posted Successfully with ID " + insertQuestionQueryResult.insertId});
    }
    catch (err)
    {
        res.status(500).send({message: "This is an internal server error!"});
    }    
}

/*
USE CASE 5 OF CASE STUDY - Part 1 : GET ALL ANSWERS FOR A GIVEN QUESTION

Function : getAllAnswersForQuestion

API TYPE : POST REQUEST

Description : 
It serves the POST request made from the client for getting all the
answers for a particular question. We query the database for the given
question ID. If valid, we display all the questions for it. We also
need to authorize the client making the request. 

Input parameters :
From the request we get,
1) questionId - The question id for which the user wants answers.
2) userName - Email Id of the user
3) password - password of the user

Response of the API with HTTP STATUS codes:
401: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN
400 : INVALID QUESTION ID
500: "Internal Server Error "
200: The question content and answers for the question in JSON FORMAT
Example
{
        "Question" : "which is better chrome or firefox or safari?",
        "Answers" : ["firefox is best", " I would go for chrome", 
                    "I also think firefox is best"]
}

*/
const getAllAnswersForQuestion = async (req,res) =>
{
    const userData=
    {       
        userName : req.body.userName,
        password : req.body.password
    };
    const displayObject =
    {
        "Question" : "",
        "Answers" : []
    };
    const questionId = req.params.id;

    try
    {
        var userAuthenticationDetails = await dbConnection.query(authenticateUserQueryString, [userData.userName, userData.password]);
        if (userAuthenticationDetails.length == 0)
        {
            res.status(401).send({message: "Error: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN"});
            return;
        }
        var questionContentDetails = await dbConnection.query(getQuestionContentQueryString, questionId);
        if (questionContentDetails.length == 0)
        {
            res.status(400).send({message: "This is an error! INVALID QUESTION ID"});
            return;
        }
        displayObject.Question = questionContentDetails[0].content;
        var answerContentDetails = await dbConnection.query(getAnswerContentQueryString, questionId);
        answerContentDetails = JSON.parse(JSON.stringify(answerContentDetails));
        for (var index =0; index<answerContentDetails.length; index++)
        {
            displayObject.Answers.push(answerContentDetails[index].content);
        }
        res.status(200).send(JSON.stringify(displayObject));
    }
    catch (err)
    {
        res.status(500).send({message: "This is an internal server error!"});
    }  
}          


/*
USE CASE 5 OF CASE STUDY - Part 2 : GETTING ALL QUESTIONS AND ITS CORRESPONDING ANSWERS

Function : getAllQuestionsAndAnswers 

API TYPE : GET REQUEST

Description : 
It serves the GET request made from the client for getting all the
Questions and Answers. We query the database and return 
the results in JSON FORMAT.

Input parameters : NONE


Response of the API with HTTP STATUS codes:
500: "Internal Server Error "
200: The question ID,question content and all its answers in JSON FORMAT
Example
"100": {
        "question": "which is better? - vscode or notepad++ or xcode",
        "answers": [
            "vs code is best UPDATED now",
            "xcode is best. but you can try notepadd++ as well"
        ]
    },
    "101": {
        "question": "which is better? - chrome or firefox or safari",
        "answers": [
            "UPDATED i also think firefox is better 2",
            "i think firefox is better"
        ]
    },
    "102": {
        "question": "how to install brew on macos?",
        "answers": []
    }
}

*/
const getAllQuestionsAndAnswers = async (req,res) =>
{
    const displayObject = {};

    try
    {
        var questionContentDetails = await dbConnection.query(getAllQuestionsQueryString);
        questionContentDetails = JSON.parse(JSON.stringify(questionContentDetails));
        for (var index =0; index<questionContentDetails.length; index++)
        {
            // Building the question part of the display object
            var questionBody = {}
            questionBody.question = questionContentDetails[index].content;
            questionBody.answers=[];
            var questionId = String(questionContentDetails[index].questionId);
            displayObject[questionId]=questionBody;
        }
        var answerContentDetails = await dbConnection.query(getAllAnswersQueryString);
        answerContentDetails = JSON.parse(JSON.stringify(answerContentDetails));
        for (var index =0; index<answerContentDetails.length; index++)
        {
            // Collecting all answers for each question  
            var questionId = String(answerContentDetails[index].questionId);
            var answerContent = answerContentDetails[index].content;
            displayObject[questionId].answers.push(answerContent);
        }
        res.status(200).send(JSON.stringify(displayObject));
    }
    catch (err)
    {
        res.status(500).send({message: "This is an internal server error!"});
    } 
} 
                        
// Export the functions
module.exports ={getAllAnswersForQuestion,postQuestion,getAllQuestionsAndAnswers}