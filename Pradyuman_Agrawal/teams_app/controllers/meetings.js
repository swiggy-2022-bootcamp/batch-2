const Meeting = require("../models/meetings.js")
const bcrypt = require("bcryptjs");

//util function to make members array for a meeting from an array
const createMembersArray=(data)=>{
    const result=[]
        let meetingObj={}
        meetingObj.meetingId=data[0].meetingId;
        meetingObj.startTime=data[0].startTime;
        meetingObj.creatorId=data[0].creatorId;
        meetingObj.members=new Array()
        data.forEach(element => {
            if(meetingObj.meetingId!=element.meetingId)
            {
                result.push(meetingObj);
                meetingObj={}
                meetingObj.meetingId=element.meetingId;
                meetingObj.startTime=element.startTime;
                meetingObj.creatorId=element.creatorId;
                meetingObj.members=[];
            }
            meetingObj.members.push(element.userId);
        });
    result.push(meetingObj);
    return result;
}

//Create meeting
const create = async (req,res) => {

    const creatorId=req.userId;
    //get Meeting input
    const {startTime,members}=req.body;

    //validate Meeting input
    if(!(creatorId&&startTime&&members.length)){
       return res.status(400).send("All Meeting inputs are required");
    }

    //make sure creatorId is a member of the meeting
    let flag=false;
    members.forEach(memberId=>{
        flag=(memberId===creatorId)
    })
    if(!flag)
        members.push(creatorId)
    
    const meeting = new Meeting({
        creatorId : creatorId,
        startTime : new Date(startTime),
        members: members
    })

    try{
        const data = await Meeting.create(meeting);
        res.send(data);
    } catch(e){
        res.status(500).send({
            message:"internal error"
        })
    }        
}

//get all meeting
const getAllMeeting = async (req,res) => {
    try{
        const data = await Meeting.getAllMeeting();
        const result = createMembersArray(data);
        res.send(result);
    } catch(e){
        res.status(500).send({
            message:"internal error"
        })
    } 
}

//find meeting by meetingId
const findMeetingById = async (req,res) => {
    const meetingId = req.params.id;
    try{
        const data = await Meeting.findMeetingById(meetingId);
        if(data.length==0){
            return res.send("meeting with Id Doesnt exist");
        }
        const result = createMembersArray(data);
        res.send(result[0]);
    } catch(e){
        res.status(500).send({
            message:"internal error"
        })
    }
}

const findMeetingByCreatorId = async (req,res) => {
    const creatorId = req.params.id;
    try{
        const data = await Meeting.findMeetingByCreatorId(creatorId);
        if(data.length==0){
            return res.send("No meeting made by this user");
        }
        const result = createMembersArray(data);
        result.push(meetingObj);
        res.send(result);
    } catch(e){
        console.log(e);
        res.status(500).send({
            message:"internal error"
        })
    }
}

const findMeetingByMemberId = async (req,res) => {
    const meetingId = req.params.id;
    try{
        const data = await Meeting.findMeetingByMemberId(meetingId);
        if(data.length==0){
            return res.send("No meeting made by this user");
        }
        const result = createMembersArray(data);
        res.send(result);
    } catch(e){
        res.status(500).send({
            message:"internal error"
        })
    }
}

//update meeting by meetingId
const updateMeetingById = (req,res) => {
    const meetingId = req.params.id;
    const updateInfo = new Meeting({
        email:req.body.email||"",
        password:req.body.password||"",
        name:req.body.name||""
    })
    Meeting.updateMeetingById(meetingId,updateInfo,(err,data) =>{
        if(err)
            res.status(500).send({
                message:"internal error"
            })
        else
          res.send(data);
    });
}

//delete meeting by meetingId
const deleteMeetingById = async (req,res) => {
    const meetingId = req.params.id;
    try{
        const result = await Meeting.findcreatorIdByMeetingId(meetingId)
        if(result.length==0)
            return res.send("meeting with Id Doesnt exist");
        else if(result[0].creatorId!==req.userId)
            return res.status(403).send("user Is not authorised to delete this Meeting");
        const data = await Meeting.deleteMeetingById(meetingId);
        res.send(data);
    } catch(e){
        console.log(e)
        res.status(500).send({
            message:"internal error"
        })
    }
}

//delete meeting by meetingId
const dropOffMeetingById = async (req,res) => {
    const meetingId = req.params.id;
    try{
        const data = await Meeting.dropOffMeetingById(meetingId,req.userId);
        if(data.length==0){
            return res.send("meeting with Id Doesnt exist");
        }
        res.send(data);
    } catch(e){
        console.log(e)
        res.status(500).send({
            message:"internal error"
        })
    }
}

module.exports = {
    create,
    getAllMeeting,
    findMeetingById,
    findMeetingByCreatorId,
    findMeetingByMemberId,
    updateMeetingById,
    deleteMeetingById,
    dropOffMeetingById
};




