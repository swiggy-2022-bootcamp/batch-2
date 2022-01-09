// FOR QUERYING THE DATABASE
const sql = require("./db.js")

/*

************ CONTROLLER FOR ALL QUESTION RELATED REQUESTS ********************


// USE CASE 5 OF CASE STUDY - Part 1
// GET ALL ANSWERS FOR A GIVEN QUESTION

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
const getAllAnswersForQuestion = (req,res) =>
{
    
    const userData=
    {       
        userName : req.body.userName,
        password : req.body.password
    }
    // display object made for displaying the result
    const displayObject =
    {
        "Question" : "",
        "Answers" : []
    }
    
    const questionId = req.params.id;

    const authenticateQueryString = 'SELECT * FROM UserDetails where userName = ? and password =?;';
    sql.query(authenticateQueryString,[userData.userName,userData.password],(err,result) => 
    {
        if( err || result.length == 0 )
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
                    res.status(400).send({ message: 'This is an error! INVALID QUESTION ID'});
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
                            res.status(500).send({ message: 'This is an internal server error!'});
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

// USE CASE 3 OF CASE STUDY
// POSTING A NEW QUESTION
/*

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
                    console.log("error:  ",err)
                    res.status(500).send({ message: 'ERROR: this is an internal server error'});
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

// USE CASE 5 OF CASE STUDY - Part 2
// GETTING ALL QUESTIONS AND ITS CORRESPONDING ANSWERS
/*

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
            res.status(500).send({ message: 'This is an internal server error!'});
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
                    res.status(500).send({ message: 'This is an internal server error!'});
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

// export all these functions.
module.exports ={getAllAnswersForQuestion,postQuestion,getAllQuestionsAndAnswers}