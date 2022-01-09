const MeetingModel = require("../models/Meeting");
const UserModel = require("../models/User");
const userService = require("../services/userService");

//TODO: better way of doing this !
const validateSignUpRequest = (req,res, next) => {
    let signUpRequestPayload = req.body;
    if(("firstName" in signUpRequestPayload)
        && ("lastName" in signUpRequestPayload)
        && ("emailAddress" in signUpRequestPayload)
        && ("username" in signUpRequestPayload)
        && ("password" in signUpRequestPayload)) {
        next();
    } else {
        res.status(400).json({message: "Mandatory fields are missing."});
        return res.end();
    }
}

const validateLoginRequest = async (req, res, next) => {
    let loginRequestPayload = req.body;
    if (("username" in loginRequestPayload)
        && ("password" in loginRequestPayload)) {
            let user = await UserModel.findOne({username: loginRequestPayload.username});
            if (!user) {
                res.status(400).json({message: "Username doesn't exists"});
                return res.end();
            }
            next();
    } else {
        res.status(400).json({message: "username / password field missing"});
        return res.end();
    }
}

const validateCreateMeetingRequest = async (req, res, next) => {
    let requestPayload = req.body;
    if(("startTime" in requestPayload) 
        && ("endTime" in requestPayload)
        && ("participants" in requestPayload)
        && ("add" in requestPayload.participants)
        && ("description" in requestPayload)) {
            next();
    } else {
        res.status(400).json({message: "Mandatory fields missing in request body"});
        return res.end();
    }
}

const validateFindMeetingRequest = async (req, res, next) => {
    let requestParams = req.params;
    if(requestParams.meetingId != undefined) {
        next();
    } else {
        throw {status: 400, message: "Invalid Request"};
    }
}

const validateMeetingTimeInfo = (req, res, next) => {
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    if (startTime && endTime) {
        if (startTime > endTime) {
            res.status(400).json({message: "start date cannot be after the end date"});
            return res.end();
        }
        
        if (startTime < Date.now()) {
            res.status(400).json({message: "cannot schedule a meeting in the past"});
            return res.end();
        }
        
        next();
    }
}

const validateAddParticipantRequest = async (req, res, next) => {
    let addParticipantEmailAddresses = req.body.participants.add;
    let existingParticipantEmailAddresses = [];
    if (req.params.meetingId) {
        existingParticipantEmailAddresses = await MeetingModel.findOne({meetingId: req.params.meetingId}, {participants:1})
            .populate({
                path: 'participants',
                transform: (doc) => doc.emailAddress
            }); 
    } 

    let invalidEmailAddresses = [];
    for await(participantEmailAddress of addParticipantEmailAddresses) {
        if (!(participantEmailAddress in existingParticipantEmailAddresses)) {
            let user = await userService.findUserByEmailAddress(participantEmailAddress);
            if (!user)
                invalidEmailAddresses.push(participantEmailAddress);
        }
    }
    if (invalidEmailAddresses.length > 0) {
        //this response is being sent
        res.status(400).send({
            data: invalidEmailAddresses,
            message: "Some of the provided Email Address doesn't exists in the system"
        });
        return res.end();
    }
    next();
}

const validateSearchQuery = (req, res, next) => {
    if (("description" in req.query) || (("from" in req.query) && ("to" in req.query))) {
        if ((("from" in req.query) && ("to" in req.query))) {
            if (Date.parse(req.query.from) > Date.parse(req.query.to)) {
                res.status(400).json({message: "'from' cannot be later in time than 'to'"});
                return res.end();
            }
        }
        next();
    } else {
        res.status(400).json({message: "please provide either 'description' or 'from/to' timestamps in search query"});
        return res.end();
    }
}

module.exports = {
    validateSignUpRequest: validateSignUpRequest,
    validateLoginRequest: validateLoginRequest,
    validateCreateMeetingRequest: validateCreateMeetingRequest,
    validateFindMeetingRequest: validateFindMeetingRequest,
    validateAddParticipantRequest: validateAddParticipantRequest,
    validateMeetingTimeInfo: validateMeetingTimeInfo,
    validateSearchQuery: validateSearchQuery
}