const sql = require("./db.js")


//testing inserting an answer into answers table
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

module.exports ={postAnswer}