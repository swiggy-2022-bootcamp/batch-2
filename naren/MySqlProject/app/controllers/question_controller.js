const sql = require("./db.js")


const testquestion = (req,res) =>
{
    res.json({message:"we can start writing question controller"})
}



//testing inserting a question into questions table
const postQuestion = (req,res) =>
{
    const questionData =
    {
        userName : req.body.user_Details.userName,
        content : req.body.question
    }
    const userData =
    {
        userName : req.body.user_Details.userName,
        password : req.body.password
    }
    // lets do the authentication part later
    const queryString = 'INSERT INTO Questions SET ?;';
    sql.query(queryString,questionData,(err,result) => 
    {
        if(err)
        {
            console.log("error: ",err)
            res.status(400).send({ message: 'This is an error!'});
        }
        else
        {
            console.log("Question posted Successfully with ID "+result.insertId);
            res.status(201).send({message:"Question posted Successfully with ID "+result.insertId});
        }
    })
}

module.exports ={testquestion,postQuestion}