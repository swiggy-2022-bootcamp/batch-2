const sql = require("./db.js")


// API to post answer
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

// API to update answer
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
                    console.log("User has NOT YET answered this question. please raise a POST REQUEST to add answer");
                    res.status(403).send({ message: "User has NOT YET answered this question. please raise a POST REQUEST to add answer"});   
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
                            res.status(400).send({ message: 'This is an error!'});
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


module.exports ={postAnswer,updateAnswer}