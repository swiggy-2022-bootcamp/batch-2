// FOR QUERYING THE DATABASE
const sql = require("./db.js")

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

const postAnswer = (req,res) =>
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

    // lets do the authentication part later
    const authenticateQueryString = 'SELECT * FROM UserDetails where userName = ? and password =?;';
    sql.query(authenticateQueryString,[userData.userName,userData.password],(err,result) => 
    {
        if(err ||result.length == 0 )
        {
            console.log("Error: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN");
            res.status(401).send({ message: "Error: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN"});
        }
        else
        {
            const queryString = 'INSERT INTO Answers SET ?;';
            sql.query(queryString,answersData,(err,result) => 
            {
                if(err)
                {
                    console.log("error:maybe check for valid QUESTION ID OR IF user has already answered this question before. then try a PUT REQUEST TO update the answer",err);
                    res.status(400).send({ message: 'This is an error! maybe check for valid QUESTION ID OR IF user has already answered this question before. then try a PUT REQUEST TO update the answer'});
                }
                else
                {
                    console.log("Answer for question "+answersData.questionId+" posted Successfully with ID "+result.insertId);
                    res.status(201).send({message:"Answer for question "+answersData.questionId+" posted Successfully with ID "+result.insertId});
                }
            })
        }
    })
}   

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
const updateAnswer = (req,res) =>
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
    const authenticateQueryString = 'SELECT * FROM UserDetails where userName = ? and password =?;';
    sql.query(authenticateQueryString,[userData.userName,userData.password],(err,result) => 
    {
        if(err ||result.length == 0 )
        {
            console.log("Error: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN");
            res.status(401).send({ message: "Error: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN"});
        }
        else
        {
            const queryString = 'SELECT * FROM Answers where userName = ? and questionId = ?;';
            sql.query(queryString,[answersData.userName,answersData.questionId],(err,result) => 
            {
                if(err || result.length == 0)
                {
                    console.log("Invalid question ID or User has NOT YET answered this question. please raise a POST REQUEST to add answer");
                    res.status(400).send({ message: "Invalid question Id or User has NOT YET answered this question. please raise a POST REQUEST to add answer"});   
                }
                else
                {
                    // USER has answered this question
                    // lets update the answer with new content.
                    const queryString2 = 'update Answers SET content = ? where userName =? and questionId =?;';
                    sql.query(queryString2,[answersData.content,answersData.userName,answersData.questionId],(err,result) => 
                    {
                        if(err)
                        {
                            console.log("error: ",err)
                            res.status(500).send({ message: 'This is an internal server error!'});
                        }
                        else
                        {
                            console.log("Answer for question "+answersData.questionId+" updated SUCCESSFULLY");
                            res.status(200).send({message:"Answer for question "+answersData.questionId+" updated SUCCESSFULLY"});
                        }
                    });
                }    
            });   
        }
    })
}

// EXTRA USE CASE
// UPVOTING AN ANSWER
/*

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

const upvoteAnswer = (req,res) =>
{
    const userData=
    {       
        userName : req.body.userName,
        password : req.body.password
    }
    const upvoteData =
    {
        userName : req.body.userName,
        answerId : req.params.id
    }
    
    const authenticateQueryString = 'SELECT * FROM UserDetails where userName = ? and password =?;';
    sql.query(authenticateQueryString,[userData.userName,userData.password],(err,result) => 
    {
        if(err ||result.length == 0 )
        {
            console.log("Error: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN");
            res.status(401).send({ message: "Error: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN"});
        }
        else
        {
            // now lets find the user who posted the answer
            // and make sure current user doesnt match with that
            const queryString = 'SELECT userName FROM Answers where answerId = ?;';
            sql.query(queryString,upvoteData.answerId,(err,result)=>
            {
                if(err ||result.length == 0 )
                {
                    console.log("error: INVALID ANSWER ID ")
                    res.status(400).send({ message: 'This is an error! INVALID ANSWER ID'});
                }
                else
                {
                    const userWhoPostedThisAnswer = result[0].userName;
                    if (userData.userName == userWhoPostedThisAnswer)
                    {
                        console.log("ERROR: User trying to UPVOTE HIS OWN ANSWER.");
                        res.status(403).send({ message: "ERROR: User trying to UPVOTE HIS OWN ANSWER."});
                    }
                    else
                    {
                        //lets insert the upvote into upvotes table
                        const queryString2 = 'insert into Votes SET ?;';
                        sql.query(queryString2,upvoteData,(err,result)=>
                        {
                            if(err)
                            {
                                console.log("ERROR: User trying to UPVOTE this ANSWER more than ONCE");
                                res.status(403).send({ message: "ERROR: User trying to UPVOTE this ANSWER more than ONCE"});
                            }
                            else
                            {
                                //console.log("We have successfully upvoted the answer")
                                // now lets increment points for the user who posted this answer
                                const queryString3 = 'insert into UserPoints(userName) values(?);';
                                sql.query(queryString3,userWhoPostedThisAnswer,(err,result)=>
                                {
                                    if(err )
                                    {
                                        console.log("Error:",err)
                                        res.status(500).send({ message: 'This is an internal server error!'});
                                    }
                                    else
                                    {
                                        console.log("We have successfully upvoted the answer")
                                        res.status(201).send({message:"WE HAVE SUCCESSFULLY UPVOTED the answer"});
                                    }
                                });
                            }
                        })
                    }   

                }
            
            })
        }  
    })  
}

const getPrivilegedUsers = (req,res) =>
{
    const queryString = 'select userName,Count(*) as Points from UserPoints Group by userName order by Points desc;';
    sql.query(queryString,(err,result) => 
    {
        if(err)
        {
            console.log("error: ",err)
            res.status(404).send({ message: 'This is an error!'});
        }
        else
        {
            res.status(200).send(JSON.stringify(result));
        }
    });   
}
const getVoteCountOfAnswers = (req,res) =>
{
    const queryString = 'select Votes.answerId,Answers.content,Count(*) as VoteCount from Votes,Answers where Votes.answerId = Answers.answerId Group by Votes.answerId order by VoteCount desc;';
    sql.query(queryString,(err,result) => 
    {
        if(err)
        {
            console.log("error: ",err)
            res.status(404).send({ message: 'This is an error!'});
        }
        else
        {
            res.status(200).send(JSON.stringify(result));
        }
    });   
}


// API TO DELETE ANSWER

const deleteAnswer = (req,res) =>
{
    const userData =
    {       
        userName : req.body.userName,
        password : req.body.password
    }
    const answerId = req.params.id

    const authenticateQueryString = 'SELECT * FROM UserDetails where userName = ? and password =?;';
    sql.query(authenticateQueryString,[userData.userName,userData.password],(err,result) => 
    {
        if(err ||result.length == 0 )
        {
            console.log("Error: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN");
            res.status(401).send({ message: "Error: INVALID CREDENTIALS FOR LOGIN. PLEASE TRY AGAIN"});
        }
        else
        {
            const queryString = 'SELECT * FROM Answers where answerId = ? and userName =?;';
    
            sql.query(queryString,[answerId,userData.userName],(err,result) => 
            {
                if(err || result.length ==0)
                {
                    console.log("error: INVALID ANSWER ID OR USER has not posted this answer ")
                    res.status(404).send({ message: 'This is an error! INVALID ANSWER ID OR USER has not posted this answer'});
            
                }
                else
                {   // first have to remove from votes table. since it has foreign key referencing answers table;
                    const deleteQueryString = 'delete from Votes where answerId =?;';
                    sql.query(deleteQueryString,answerId,(err,result)=>
                    {
                        if(err)
                        {
                            console.log("error: ",err)
                            res.status(400).send({ message: 'This is an error!'});
                        }
                        else
                        {
                            const deleteQueryString2 = 'delete from Answers where answerId =?;';
                            sql.query(deleteQueryString2,answerId,(err,result)=>
                            {
                                if(err)
                                {
                                    console.log("error: ",err)
                                    res.status(400).send({ message: 'This is an error!'});
                                }
                                else
                                {
                                    console.log("SUCCESSFULLY DELETED ANSWER")
                                    res.status(200).send({ message: "SUCCESFULLY DELETED ANSWER"});
                                }
                            })
                        }
                    })    
                }
            });   
        }
    })
}   


// export all these functions.
module.exports ={postAnswer,updateAnswer,upvoteAnswer,getPrivilegedUsers,getVoteCountOfAnswers,deleteAnswer}