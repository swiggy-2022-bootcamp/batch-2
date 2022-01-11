const Meeting = require("../models/meetings.js")
const Cryptr=require('cryptr');
const cryptr = new Cryptr(process.env.CIPHER_KEY);
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
    const {startTime,members,endTime,description,inviteLinkAccess}=req.body;
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
        members: members,
        endTime : new Date(endTime),
        description:description,
        inviteLinkAccess: inviteLinkAccess||false
    })

    try{
        const data = await Meeting.create(meeting);
        res.status(201).send(data);
    } catch(e){
        res.status(500).send({
            message:"internal error"
        })
    }        
}

//get all meeting
const getAllMeeting = async (req,res) => {
    try{
        const data = await Meeting.getAllMeeting(req.query);
        const result = createMembersArray(data);
        res.status(200).send(result);
    } catch(e){
        console.log(e)
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
        res.status(200).send(result[0]);
    } catch(e){
        res.status(500).send({
            message:"internal error"
        })
    }
}

const findMeetingByCreatorId = async (req,res) => {
    const creatorId = req.params.userId;
    try{
        const data = await Meeting.findMeetingByCreatorId(creatorId);
        if(data.length==0){
            return res.send("No meeting made by this user");
        }
        const result = createMembersArray(data);
        res.status(200).send(result);
    } catch(e){
        console.log(e);
        res.status(500).send({
            message:"internal error"
        })
    }
}

const findMeetingByMemberId = async (req,res) => {
    const userId = req.params.userId;
    try{
        const data = await Meeting.findMeetingByMemberId(userId);
        if(data.length==0){
            return res.status(200).send("No meeting made by this user");
        }
        const result = createMembersArray(data);
        res.status(200).send(result);
    } catch(e){
        res.status(500).send({
            message:"internal error"
        })
    }
}

//update meeting by meetingId
const updateMeetingById = async (req,res) => {
    const meetingId = req.params.id;
    const updateInfo = new Meeting({
        startTime :req.body.startTime,
        endTime :req.body.endTime,
        description:req.bodydescription
    })
    try{
        const data = await User.updateMeetingById(meetingId,updateInfo,);
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({
            message:"internal error"
        })
    }
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
        res.status(200).send(data);
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
        res.status(200).send(data);
    } catch(e){
        console.log(e)
        res.status(500).send({
            message:"internal error"
        })
    }
}


const createInviteLink = async (req,res) => {
    const meetingId = req.params.id;
    try{
        //create a encrypted invite link
        const data = await Meeting.findMeetingById(meetingId);
        if(data.length==0){
            return res.send("meeting with Id doesnt exist");
        }
        if(data[0].inviteLinkAccess||data[0].creatorId===req.userId)
        {
            inviteLink="http://localhost:3000/meetings/joinWithInviteLink/"
            const encryptedString = cryptr.encrypt(meetingId);
            inviteLink+=encryptedString;
            res.status(200).send(inviteLink);
        }
        else{
            res.status(403).send("Invite Link access is denied");
        }
    } catch(e){
        console.log(e)
        res.status(500).send({
            message:"internal error"
        })
    }
}


const joinMeetingbyId = async (req,res) => {
    try{
        const meetingId = cryptr.decrypt(req.params.encryptedMeetingId); 
        console.log(meetingId);
        const data = await Meeting.joinMeetingbyId(req.userId,meetingId);
        if(data.length==0){
            return res.send("meeting with Id Doesnt exist");
        }
        res.status(200).send(data);
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
    dropOffMeetingById,
    createInviteLink,
    joinMeetingbyId
};





