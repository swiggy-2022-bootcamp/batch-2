const Meeting = require("../models/meeting.model");
const User = require("../models/user.model");
const { makeErr } = require("../utils/error.utils");
const meetingUtils = require("../utils/meeting.utils");

exports.createMeeting = async (req, res, next) => {

    let {name, description, date, start_time, end_time, participants} = req.body;
    participants.push(res.locals.user.email);
    let allParicipants = await expandParticipants(participants);
    let newMeeting = {
        name,
        description,
        created_by : res.locals.user.email,
        start:meetingUtils.parseDateTime(date, start_time),
        end:meetingUtils.parseDateTime(date, end_time),
        participants : allParicipants
    }

    let result = await Meeting.create(newMeeting);

    return res.status(201).send({
        message:"Meeting created!",
        meeting_id:result._id
    });
}

const expandParticipants = async (participants) => {
    // traverse all participants and expand all the groups to individual users
    // Set is used to avoid duplicates & handle cyclic groups: groups containing each other

    let expanded = new Set(participants);

    for(let email of expanded){
        let u = await User.findOne({email, isGroup:true}, {members:true, _id:false}).lean();
        if(!u || !u.members || u.members.length===0) continue;
        console.log("adding members of : ", email, u.members);
        for(let m of u.members){
            expanded.add(m);
        }
    }
    console.log("total participants: ", expanded);
    return [...expanded];
}

exports.searchMeetings = async (req, res, next) => {

    // TODO: filter meetings

    let result = await Meeting.find({participants: res.locals.user.email}).lean(); 

    return res.status(200).send(meetingUtils.transformMeetings(result));
}

exports.getMeeting = async (req, res, next) => {
    //user can only fetch meeting which they are a part of
    let {meeting_id} = req.params;
    let result = await Meeting.findOne({_id:meeting_id, participants: res.locals.user.email}).lean();
    if(!result){
        return next(makeErr("Meeting not found", 404));
    }

    return res.status(200).send(meetingUtils.transformMeetings([result]));
}

exports.declineMeeting = async (req, res, next) => {
    let {meeting_id} = req.params;
    let result = await Meeting.updateOne({ _id: meeting_id }, {
        $pullAll: {
            participants: [res.locals.user.email],
        },
    });
    console.log(result);
    return res.status(200).send();
}