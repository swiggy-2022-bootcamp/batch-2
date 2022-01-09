// FOR QUERYING THE DATABASE
const db = require("../database/db.js")
const dbConnection= db.getDbConnection()
/*

************ CONTROLLER FOR ALL ANSWER RELATED REQUESTS ********************

*/

// USE CASE 4 OF CASE STUDY -Part 1
// POSTING A ANSWER
/*

Function : postAnswer

API TYPE : POST REQUEST

Description : 
It serves the POST request made from the client for posting a new 
answer. For the given question Id we post an answer with the provided content.
We have an assumption that the user can post an answer to a question only once.
He can alternately update his previous answer with a PUT REQUEST. We enforce this unique
contraint(username,question id) and also valid question id is enforced because of foreign key 
constraint 
// USE CASE 4 OF CASE STUDY -Part 2
// UPDATING AN ANSWER
/*

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
const authenticateUserQueryString = "select * FROM UserDetails where userName = ? and password =?;"
const getAnswerQueryString = "SELECT * FROM Answers where userName = ? and questionId = ?;"
const updateAnswerQueryString = "update Answers SET content = ? where userName =? and questionId =?;";

const updateAnswer = async (req,res) =>
{
    const answersData =
    {
        userName : req.body.user_Details.userName,
        questionId : req.body.question.questionId,
        content : req.body.question.answer
    }
    const userData =
    {
        userName : req.body.user_Details.userName,
        password : req.body.user_Details.password
    }
    try
    {
        var userAuthenticationDetails = await dbConnection.query(authenticateUserQueryString,[userData.userName,userData.password]);
        if (userAuthenticationDetails.length == 0)
        {
            res.status(401).send({ message: "Error: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN"});
            return;
        }
        var questionUserDetails = await dbConnection.query(getAnswerQueryString,[answersData.userName,answersData.questionId]);
        if (questionUserDetails == 0)
        {
            res.status(400).send({ message: "Invalid question Id or User has NOT YET answered this question. please raise a POST REQUEST to add answer"});  
            return;
        }
        await dbConnection.query(updateAnswerQueryString,[answersData.content,answersData.userName,answersData.questionId]);
        res.status(200).send({message:"Answer for question updated SUCCESSFULLY"});
    }
    catch (err)
    {
        res.status(500).send({message: "This is an internal server error!"});
    }
}
   
    

// export all these functions.
module.exports ={updateAnswer}