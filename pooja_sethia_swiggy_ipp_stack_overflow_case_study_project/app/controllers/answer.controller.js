const { question, answer } = require("../models");
const db = require("../models")
const Answer = db.answer;
const Question = db.question;
const User = db.user;

//create answer
exports.createAnswer = async (req,res,verifyToken) => {
    questionid = req.params.questionid;
    answer_text = req.body.answer_text;
    username = req.user._id;
    
    console.log("create answer: "+username);
    Question.findOne({questionid}).then(data =>{
        if(!data)
            res.status(404).send({message:"question id not found"});
            return;
        }
    )
    Question.findOne({_id:questionid, 'answers.username':req.user._id}).then(data =>{
        if(data){
            console.log("You have answered earlier so updating the answer");
            Question.findOneAndUpdate({_id:questionid, 'answers.username':username}, 
                {'$set': 
                    {
                        'answers.$.answer_text': req.body.answer_text
                    }
                },
                {new:true, userFindAndModify:false}
                ).then(data => {
                    res.status(201).send({message:"answer updated successfully","question_id":questionid});
            }).catch(err => {
                res.status(500).send({
                    message:err.message || "error while retrieving the questions."
                })
            })
        }else{
            const answer = new Answer({
                answer_text:answer_text,
                username:req.user._id,
                vote_count:0,
            });
            
            Question.findByIdAndUpdate(
                req.params.questionid,
                {
                    $push: {
                        answers:answer
                    }
                },
                {new:true, userFindAndModify:false}
            ) .then(userdata => {
                const username = req.user._id;
                User.findOneAndUpdate({username},
                    {'$set': 
                        {
                        'reputation': userdata.reputation + 10
                        }
                    },
                    {new:true, userFindAndModify:false}
                )
                res.status(201).send({message:"answer posted successfully","question_id":questionid});
            }).catch(err => {
                res.status(500).send({
                    message:err.message || "error while posting the answer"
                })
            })
        }
    });
    
}

//update an existing answer
exports.updateAnswer = (req,res,verifyToken) => {
    const question_id = req.params.questionid;
    Question.findOne({question_id}).then(data =>{
        if(!data)
            res.status(404).send({message:"question id not found"});
            return;
        }
    )
    Question.findOneAndUpdate({_id:question_id, 'answers.username':req.user._id}, 
        {'$set': 
            {
                'answers.$.answer_text': req.body.answer_text
            }
        },
        {new:true, userFindAndModify:false}
        ).then(data => {
            res.status(201).send({message:"answer updated successfully","question_id":question_id});
    }).catch(err => {
        res.status(500).send({
            message:err.message || "error while retrieving the questions."
        })
    })
}

//upvote an answer
exports.upvoteAnswer = async (req,res) =>{
    console.log("upvote answer"+req.params.answerid);
    const answerid = req.params.answerid;
    Question.find({"answers._id":db.mongoose.Types.ObjectId(answerid)}).then(data=>{
        if(!data){
            res.status(404).send({message:"answer not found with this id "+answerid});
        }else{       
            Question.findOneAndUpdate({"answers._id":db.mongoose.Types.ObjectId(answerid)}, 
                {'$set': 
                    {
                        'answers.$.vote_count': data.answers.vote_count + 1
                    }
                },
                {new:true, userFindAndModify:false}
                ).then(updatedData=>{
                const username = updatedData.answers.username;
                User.findOne({username}).then(userdata => {
                    User.findOneAndUpdate({username},
                        {'$set': 
                            {
                            'reputation': userdata.reputation + 10
                            }
                        },
                        {new:true, userFindAndModify:false}
                    ).then(
                        res.status(201).send({message:"answer upvoted successfully","question_id":answerid})
                    );
                });
            });             
        }
        }).catch(err => {
        res.status(500).send({
            message:err.message || "error while upvoting the answer."
        })
        
    })
}
       

           