// Establishing DataBase connection
const db = require("../database/db.js")
const dbConnection= db.getDbConnection()

/*

************ CONTROLLER FOR ALL ANSWER RELATED REQUESTS ********************

*/

// QUERY STRINGS FOR THIS CONTROLLER
const authenticateUserQueryString = "SELECT * FROM UserDetails WHERE userName = ? AND password = ?;";
const insertAnswerQueryString = "INSERT INTO Answers SET ?;";
const getAnswerQueryString = "SELECT * FROM Answers WHERE userName = ? AND questionId = ?;";
const updateAnswerQueryString = "UPDATE Answers SET content = ? WHERE userName =? AND questionId =?;";
const getUserWhoPostedAnswerQueryString = "SELECT userName FROM Answers WHERE answerId = ?;";
const insertUpvoteQueryString = "INSERT INTO Votes SET ?;";
const insertUserPointsQueryString = "INSERT INTO UserPoints(userName) VALUES(?);"
const deleteVotesQueryString = "DELETE FROM Votes WHERE answerId = ?;";
const deleteAnswerQueryString = "DELETE FROM Answers WHERE answerId = ?;";
const getAnswerDetailsQueryString = "SELECT * FROM Answers WHERE answerId = ? AND userName = ?;";
const getUserPointsQueryString = "SELECT userName,Count(*) as Points FROM UserPoints GROUP BY userName ORDER BY Points DESC;";
const getVoteCountQueryString = "SELECT Votes.answerId, Answers.content, Count(*) as VoteCount FROM Votes, Answers WHERE Votes.answerId = Answers.answerId GROUP BY Votes.answerId ORDER BY VoteCount DESC;";

/*
USE CASE 4 OF CASE STUDY -Part 1 : POSTING A ANSWER

Function : postAnswer

API TYPE : POST REQUEST

Description : 
It serves the POST request made from the client for posting a new 
answer. For the given question Id we post an answer with the provided content.
We have an assumption that the user can post an answer to a question only once.
He can alternately update his previous answer with a PUT REQUEST. We enforce this unique
contraint(username,question id) and also valid question id is enforced because of foreign key 
constraint on question Id refering to questions table in the database. 
We also need to authorize the client making the request. 

Input parameters :
From the request we get,
1) questionId - The id of the question we want to the post the answer for.
2) answerContent - The content of the answer to post.
3) userName - Email Id of the user
4) password - password of the user

Response of the API with HTTP STATUS codes:
201: Question posted Successfully with question ID
400: 1)question ID is invalid or 
     2)User is trying to post an answer again for the same question. The user should
       alternately make a PUT request to update his previous answer.
401: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN
500: "Internal Server Error "

*/

const postAnswer = async (req,res) =>
{
    const answersData =
    {
        userName : req.body.user_Details.userName,
        questionId : req.body.question.questionId,
        content : req.body.question.answer
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
        try
        {
        var insertAnswerQueryResult = await dbConnection.query(insertAnswerQueryString,answersData);
        res.status(201).send({message: "Answer for posted Successfully with ID " + insertAnswerQueryResult.insertId});
        }
        catch (err)
        {
            res.status(400).send({message: "Error: Check for valid QUESTION ID OR If user has already answered this question before. then try a PUT REQUEST TO update the answer"});
        }
    }
    catch (err)
    {
        res.status(500).send({message: "This is an internal server error!"});
    }        
}   

/*
USE CASE 4 OF CASE STUDY -Part 2 : UPDATING AN ANSWER
Function : updateAnswer

API TYPE : PUT REQUEST

Description : 
It serves the PUT request made from the client for posting a new 
answer. For the given question Id and username, we first check if the 
user has already answered this question before. If he has not answered, he is 
directed to make a POST request to add a new answer. Else, his answer is 
updated successfully. The question Id should also be valid. 
We also need to authorize the client making the request. 

Input parameters :
From the request we get,
1) questionId - The id of the question we want to the UPDATE the answer for.
2) answerContent - The content of the answer to post.
3) userName - Email Id of the user
4) password - password of the user

Response of the API with HTTP STATUS codes:
200: Answer posted by given user for given question ID is UPDATED SUCCESSFULLY.
400: 1)INVALID QUESTION ID or
     2)User has NOT YET answered this question. please raise a POST REQUEST to add answer.
401: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN
500: "Internal Server Error "

*/

const updateAnswer = async (req,res) =>
{
    const answersData =
    {
        userName : req.body.user_Details.userName,
        questionId : req.body.question.questionId,
        content : req.body.question.answer
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
        var questionUserDetails = await dbConnection.query(getAnswerQueryString, [answersData.userName, answersData.questionId]);
        if (questionUserDetails == 0)
        {
            res.status(400).send({message: "Invalid question Id or User has NOT YET answered this question. please raise a POST REQUEST to add answer"});  
            return;
        }
        await dbConnection.query(updateAnswerQueryString,[answersData.content, answersData.userName, answersData.questionId]);
        res.status(200).send({message: "Answer for question updated SUCCESSFULLY"});
    }
    catch (err)
    {
        res.status(500).send({message: "This is an internal server error!"});
    }
}
   
/*
EXTRA USE CASE : UPVOTING AN ANSWER

Function : upvoteAnswer

API TYPE : POST REQUEST

Description : 
It serves the POST request made from the client for upvoting an answer.
For the given answer Id, we first check if it is valid. Then we make sure 
the user is not upvoting his own answer. We also make sure he can upvote
an answer only once. We also need to authorize the client making the request.

Input parameters :
From the request we get,
1) answerId - The answer Id we want to upvote.
2) userName - Email Id of the user
3) password - password of the user

Response of the API with HTTP STATUS codes:
201: Answer upvoted SUCCESSFULLY
400: INVALID ANSWER ID
403: 1) User is trying to Upvote his OWN answer
     2) User is trying to Upvote the answer MORE than ONCE
401: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN
500: "Internal Server Error "

*/

const upvoteAnswer = async (req,res) =>
{
    const userData=
    {       
        userName : req.body.userName,
        password : req.body.password
    };
    const upvoteData =
    {
        userName : req.body.userName,
        answerId : req.params.id
    };
    try
    {
        var userAuthenticationDetails = await dbConnection.query(authenticateUserQueryString, [userData.userName, userData.password]);
        if (userAuthenticationDetails.length == 0)
        {
            res.status(401).send({message: "Error: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN"});
            return;
        }
        
        var userDetails = await dbConnection.query(getUserWhoPostedAnswerQueryString, upvoteData.answerId)
        if (userDetails.length == 0)
        {
            res.status(400).send({message: "INVALID ANSWER ID"});
            return;
        }
        // Lets find the user who posted the answer and make sure current user doesnt match with that  
        var userWhoPostedThisAnswer = userDetails[0].userName;
        if (userData.userName == userWhoPostedThisAnswer)
        {
            res.status(403).send({message: "ERROR: User trying to UPVOTE HIS OWN ANSWER."});
            return;
        }
        try
        {
            await dbConnection.query(insertUpvoteQueryString, upvoteData);
        } 
        catch
        {
            res.status(403).send({message: "ERROR: User trying to UPVOTE this ANSWER more than ONCE"});
            return;
        }  
         // Now lets increment points for the user who posted this answer         
        await dbConnection.query(insertUserPointsQueryString, userWhoPostedThisAnswer);
        res.status(201).send({message: "We have SUCCESSFULLY UPVOTED the answer"});          
    }
    catch (err)
    {
        res.status(500).send({message: "This is an internal server error!"});
    }                                           
}

/*
EXTRA USE CASE : DELETING AN ANSWER

Function : deleteAnswer

API TYPE : DELETE REQUEST

Description : 
It serves the DELETE request made from the client for deleting an answer.
For the given answer Id, we first check if it is valid. Then we make sure 
the user is not deleting somebody else's answer. We delete the given answer
from both answers table and votes table. So all the upvotes for this 
answer also gets deleted.
We also need to authorize the client making the request.

Input parameters :
From the request we get,
1) answerId - The answer Id we want to delete
2) userName - Email Id of the user
3) password - password of the user

Response of the API with HTTP STATUS codes:
200: SUCCESSFULLY deleted answer
400: 1) Invalid answer ID
     2) User is trying to delete an answer not posted by him
401: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN
500: "Internal Server Error "

*/

const deleteAnswer = async (req,res) =>
{
    const userData =
    {       
        userName : req.body.userName,
        password : req.body.password
    };
    const answerId = req.params.id;

    try
    {
        var userAuthenticationDetails = await dbConnection.query(authenticateUserQueryString, [userData.userName, userData.password]);
        if (userAuthenticationDetails.length == 0)
        {
            res.status(401).send({message: "Error: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN"});
            return;
        }
        var answerDetails = await dbConnection.query(getAnswerDetailsQueryString, [answerId, userData.userName]);
        if (answerDetails.length == 0)
        {
            res.status(400).send({message: "Error: INVALID ANSWER ID OR USER has not posted this answer"});
            return;
        }
        await dbConnection.query(deleteVotesQueryString, answerId);
        await dbConnection.query(deleteAnswerQueryString, answerId);
        res.status(200).send({message: "SUCCESFULLY DELETED answer"});
    }
    catch (err)
    {
        res.status(500).send({message: "This is an internal server error!"});
    } 
}     

/*
EXTRA USE CASE : DISPLAY POINTS OF USERS

Function : getPrivilegedUsers

API TYPE : GET REQUEST

Description : 
It serves the GET request made from the client for 
displaying the points of the users who's answers have 
been upvoted by other users. Each upvote gives one point.
I have not added points> some amount to give privelege.
It's just a simple having Count(*) > in the query.
It displays points of the users sorted in DESC.

Input parameters : NONE

Response of the API with HTTP STATUS codes:
200: "The points of users listed in JSON FORMAT")
500: "Internal Server Error "

*/
const getPrivilegedUsers = async (req,res) =>
{
    try
    {
        var userPoints = await dbConnection.query(getUserPointsQueryString);
        res.status(200).send(JSON.stringify(userPoints));
    }
    catch (err)
    {
        res.status(500).send({message: "This is an internal server error!"});
    } 
}

/*
EXTRA USE CASE : DISPLAY UPVOTE COUNT OF ANSWERS

Function : getUpvoteCountOfAnswers

API TYPE : GET REQUEST

Description : 
It serves the GET request made from the client for 
displaying the votes of all the answers that have been
upvoted before. It displays answers sorted in DESC based on vote count.

Input parameters : NONE

Response of the API with HTTP STATUS codes:
200: "The answer and its vote count listed in JSON FORMAT")
500: "Internal Server Error "

*/
const getUpvoteCountOfAnswers = async (req,res) =>
{
    try
    {
        var upvoteCount = await dbConnection.query(getVoteCountQueryString);
        res.status(200).send(JSON.stringify(upvoteCount));
    }
    catch (err)
    {
        res.status(500).send({message: "This is an internal server error!"});
    } 
}

// export all these functions.
module.exports ={updateAnswer,postAnswer,upvoteAnswer,deleteAnswer,getUpvoteCountOfAnswers,getPrivilegedUsers}