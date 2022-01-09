const fs = require("fs");

const questionsAnswersDataPath = "./QuestionsAnswersData.json"

// function1
const checkValidQuestionId = (questionId) =>
{
    try
    {
        const Data = fs.readFileSync(questionsAnswersDataPath)
        questionsAnswersData= JSON.parse( Data );

        if (String(questionId) in questionsAnswersData)
        {
            return "Success";
        }
        else
        {
            return "Failure";
        }
    }  
    catch(err)
    {
        console.log("The Server is having trouble with JSON file", err);
        return "ServerIssue";
    }  
}

//console.log(checkValidQuestionId(109));

// function 2
const checkUserAlreadyAnswered = (userName,questionId) =>
{
    try
    {
        const Data = fs.readFileSync(questionsAnswersDataPath)
        questionsAnswersData= JSON.parse( Data );
        
        for (var index =0;index<questionsAnswersData[String(questionId)].AnswersPosted.length;index++)
        {     
            if (questionsAnswersData[String(questionId)].AnswersPosted[index].username == userName)
            {
                return "Success";
            }
        }    
        
        return "Failure";
    }
    catch(err)
    {
        console.log("The Server is having trouble with JSON file", err);
        return "ServerIssue";
    }

}

// function 3
const postNewAnswer = (questionId,userName,answerContent) =>
{
    try
    {
        const Data = fs.readFileSync(questionsAnswersDataPath)
        questionsAnswersData= JSON.parse( Data );
        const answerBody = {"username":userName,"answer":answerContent}; 
        // pushing new answer to the end of the array for the question
        questionsAnswersData[String(questionId)].AnswersPosted.push(answerBody);
        // lets write to file
        try
        {   
            fs.writeFileSync(questionsAnswersDataPath, JSON.stringify(questionsAnswersData,null, 2));
            return "Success";
        }
        catch(err)
        {
            console.log("The Server is having trouble with JSON file", err);
            return "ServerIssue";
        }    
    }
    catch(err)
    {
        console.log("The Server is having trouble with JSON file", err);
        return "ServerIssue";
    }   
}

// function 4
// we know for sure that user has already answer the question
const updateAnswer = (questionId,userName,answerContent) =>
{
    try
    {
        
        const Data = fs.readFileSync(questionsAnswersDataPath)
        questionsAnswersData= JSON.parse( Data );
        //const answerBody = {"username":userName,"answer":answerContent}; 
        // first lets find the position of the answer by this user
        // traversing over the list of answers for this question
        var answerIndex = 0;
        for (var index =0;index<questionsAnswersData[String(questionId)].AnswersPosted.length;index++)
        {     
            if (questionsAnswersData[String(questionId)].AnswersPosted[index].username == userName)
            {
                answerIndex = index;
                break;
            }
        }
        // updating the answer content for the given username
        questionsAnswersData[String(questionId)].AnswersPosted[answerIndex].answer=answerContent;
        // lets write to file
        try
        {   
            fs.writeFileSync(questionsAnswersDataPath, JSON.stringify(questionsAnswersData,null, 2));
            return "Success";
        }
        catch(err)
        {
            console.log("The Server is having trouble with JSON file", err);
            return "ServerIssue";
        }     
    }
    catch(err)
    {
        console.log("The Server is having trouble with JSON file", err);
        return "ServerIssue";
    }   
}

module.exports = {checkValidQuestionId,checkUserAlreadyAnswered,postNewAnswer,updateAnswer};