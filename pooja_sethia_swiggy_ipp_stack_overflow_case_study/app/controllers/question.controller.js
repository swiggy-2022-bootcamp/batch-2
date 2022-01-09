const db = require("../models")
const bcrypt = require("bcryptjs/dist/bcrypt");
const dotenv = require("dotenv").config()
const User = db.users;
const Question = db.question;
const Answer = require("./answer.controller");
const ObjectId = require("mongodb").ObjectId;
const verifyToken = require("../middleware/auth");

//create a new question
exports.createQuestion = async(req,res,verifyToken) =>{
    console.log("Create question")
    try{
        const {username, password,question_title,question_body} = req.body;
        const question = new Question({
            question_title:question_title,
            question_body:question_body,
            asking_member:username,
            vote_count:0,
        })
        const user = await User.findOne({username});
        if(user && (await bcrypt.compare(password, user.password))){
            question.markModified("question_title");
                question.save(question).then(
                    data => {
                        res.status(201).send({message:"Question posted successfully", "question_id":question.id});
                    }
                )
        }else{
            res.status(404).send({message:"Sorry invalid credentials"});
        }
    }catch(err){
        res.status(500).send({
            message:err.message || "error while posting the question"
        })
    }
}

//fetch question by id
exports.findQuestionById = (req,res) => {
    const questionid = req.params.questionid;
    Question.findById(questionid).then(data => {
        if(!data)
            res.status(404).send({message:"question not found with this id "+questionid});
        else
            res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:err.message || "error while retrieving the question and answers."
        })
    })
}

//upvote a question
exports.upvoteQuestion = async (req,res) =>{
    console.log("Upvote question");
    const questionid = req.params.questionid;
    await Question.findById(questionid).then(data => {
        if(!data)
            res.status(404).send({message:"question not found with this id "+questionid});
        else{
            Question.findOneAndUpdate({_id:questionid}, 
                {'$set': 
                    {
                        'vote_count': data.vote_count + 1
                    }
                },
                {new:true, userFindAndModify:false}
            ).then(updatedData=>{
                const username = updatedData.asking_member;
                User.findOne({username}).then(userdata => {
                    User.findOneAndUpdate({username},
                        {'$set': 
                            {
                            'reputation': userdata.reputation + 10
                            }
                        },
                        {new:true, userFindAndModify:false}
                    ).then(
                        res.status(201).send({message:"question upvoted successfully","question_id":questionid})
                    );
                });
            });
        }
    }).catch(err => {
        res.status(500).send({
            message:err.message || "error while upvoting the question."
        })
    })
    
}

        
            
        