const sql = require("./db.js")


const getAllAnswersForQuestion = (req,res) =>
{
    
    const userData=
    {       
        userName : req.body.userName,
        password : req.body.password
    }

    const displayObject =
    {
        "Question" : "",
        "Answers" : []
    }
    
    const questionId = req.params.id;

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
            const queryString = 'select content from Questions where questionId = ?'
    
            sql.query(queryString,questionId,(err,result) => 
            {
                if((err) || result.length == 0)
                {
                    console.log("error: INVALID QUESTION ID ")
                    res.status(404).send({ message: 'This is an error! INVALID QUESTION ID'});
                }
                else
                {
                    displayObject.Question = result[0].content;
                    const queryString2 = 'select content from Answers where questionId = ? order by answerId;'
                    sql.query(queryString2,questionId,(err,result) => 
                    {
                        if(err)
                        {
                            console.log("error: ",err)
                            res.status(404).send({ message: 'This is an error!'});
                        }
                        else
                        {
                            result = JSON.parse(JSON.stringify(result));

                            for (var index =0;index<result.length;index++)
                            {
                                displayObject.Answers.push(result[index].content);
                            }
                            console.log(JSON.stringify(displayObject));
                            res.status(200).send(JSON.stringify(displayObject));
                        }       
       
                    });
                }
            });
        }
    })
};


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
            const queryString = 'INSERT INTO Questions SET ?;';
            sql.query(queryString,questionData,(err,result) => 
            {
                if(err)
                {
                    console.log("error: CHECK type of username and content ",err)
                    res.status(400).send({ message: 'ERROR: CHECK type of username and content'});
                }
                else
                {
                    console.log("Question posted Successfully with ID "+result.insertId);
                    res.status(201).send({message:"Question posted Successfully with ID "+result.insertId});
                }
            })
        }
    });
}

//GET API for all questions and answers

const getAllQuestionsAndAnswers = (req,res) =>
{
    // display object made for displaying the result
    const displayObject = {};

    const queryString = 'select * from Questions order by questionId;';
    sql.query(queryString,(err,result) => 
    {
        if(err)
        {
            console.log("error: ",err)
            res.status(404).send({ message: 'This is an error!'});
        }
        else
        {
            result = JSON.parse(JSON.stringify(result));
            for (var index =0;index<result.length;index++)
            {
                var questionBody = {}
                questionBody.question = result[index].content;
                questionBody.answers=[];
                var questionId = String(result[index].questionId);
                // building the question part of the object
                displayObject[questionId]=questionBody;
            }
            const queryString2 = 'select * from Answers order by answerId;';
            sql.query(queryString2,(err,result) => 
            {
                if(err)
                {
                    console.log("error: ",err)
                    res.status(404).send({ message: 'This is an error!'});
                }
                else
                {
                    result = JSON.parse(JSON.stringify(result));
                    for (var index =0;index<result.length;index++)
                    {
                        var questionId = String(result[index].questionId)
                        var answerContent = result[index].content;
                        // collecting all answers for each question
                        displayObject[questionId].answers.push(answerContent)
                    }
                    // collected all questions and answers within display object
                    console.log(displayObject);
                    res.status(200).send(JSON.stringify(displayObject));
                }    
            });
        }
    })
}
module.exports ={getAllAnswersForQuestion,postQuestion,getAllQuestionsAndAnswers}