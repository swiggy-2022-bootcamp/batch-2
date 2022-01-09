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
        && ("participantEmailAddresses" in requestPayload)
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

const validateUpdateMeetingRequest = async (req, res, next) => {
    validateMeetingTimeInfo(req, res);
    validateAddParticipantRequest(req, res);
    validateRemoveParticipantRequest(req, res);
    next();
}   

const validateMeetingTimeInfo = (req, res, next) => {
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    if (startTime && endTime) {
        if (startTime < Date.now()) {
            res.status(400).json({message: "cannot schedule a meeting in the past"});
            return res.end();
        }
        if (startTime >= endTime) {
            res.status(400).json({message: "start date cannot be after the end date"});
            return res.end();
        }
        next();
    }
}

const validateAddParticipantRequest = async (req, res, next) => {
    let addParticipantEmailAddresses;
    let existingParticipantEmailAddresses = [];
    if (req.params.meetingId) {
        existingParticipantEmailAddresses = await MeetingModel.findOne({meetingId: req.params.meetingId}, {participants:1})
            .populate({
                path: 'participants',
                transform: (doc) => doc.emailAddress
            });
        addParticipantEmailAddresses = req.body.addParticipantEmailAddresses;
    } else {
        addParticipantEmailAddresses = req.body.participantEmailAddresses;
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

const validateRemoveParticipantRequest = async (req, res, next) => {
    let existingParticipantEmailAddresses = await MeetingModel.findOne({meetingId: req.params.meetingId}, {participants:1})
        .populate({
            path: 'participants',
            transform: (doc) => doc.emailAddress
        });
    
    let removeParticipantEmailAddresses = req.body.removeParticipantEmailAddresses;

    if (removeParticipantEmailAddresses) {
        let invalidEmailAddresses = [];
        removeParticipantEmailAddresses.array.forEach(participantEmailAddress => {
            if (!(participantEmailAddress in existingParticipantEmailAddresses)) {
                invalidEmailAddresses.push(participantEmailAddress);
            }
        });
        if (invalidEmailAddresses.length > 0) {
            res.json({data: invalidEmailAddresses, message: "Cannot remove Email Address which are not a participant for this meeting"}).status(400);
            return res.end();
        }
        next();
    }
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
    validateRemoveParticipantRequest: validateRemoveParticipantRequest,
    validateMeetingTimeInfo: validateMeetingTimeInfo,
    validateSearchQuery: validateSearchQuery
}