const MeetingModel = require("../models/Meeting");
const UserModel = require("../models/User");
const userService = require("../services/userService");
const createError = require('http-errors');

const validateSignUpRequest = (req, res, next) => {
    let signUpRequestPayload = req.body;
    if ("firstName" in signUpRequestPayload 
        && "lastName" in signUpRequestPayload 
        && "emailAddress" in signUpRequestPayload
        && "username" in signUpRequestPayload
        && "password" in signUpRequestPayload) {
        next();
    } else {
        throw createError(400, "Mandatory fields are missing");
    }
};

const validateLoginRequest = async (req, res, next) => {
    let loginRequestPayload = req.body;
    if ("username" in loginRequestPayload && "password" in loginRequestPayload) {
        let user = await UserModel.findOne({ username: loginRequestPayload.username });
        if (!user) {
            next(createError("Username doesn't exists"));
        }
        next();
    } else {
        next(createError("username / password field missing"));
    }   
};

const validateCreateMeetingRequest = async (req, res, next) => {
    let requestPayload = req.body;
    if ("startTime" in requestPayload 
        && "endTime" in requestPayload 
        && "participants" in requestPayload 
        && "add" in requestPayload.participants 
        && "description" in requestPayload) {
        next();
    } else {
        next(createError(400, "Mandatory fields missing in request body"));
    }
};

const validateFindMeetingRequest = async (req, res, next) => {
    let requestParams = req.params;
    if (requestParams.meetingId != undefined) {
        next();
    } else {
        next(createError(400, "Invalid Request"));
    }
};

const validateMeetingTimeInfo = (req, res, next) => {
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    if (startTime && endTime) {
        if (startTime > endTime) {
            next(createError(400, "start date cannot be after the end date"));
        }

        if (startTime < Date.now()) {
            next(createError(400, "cannot schedule a meeting in the past" ));
        }
        next(); 
    } else if (startTime || endTime) {
        next(createError(400, "Need to provide both startTime and endTime"));
    } else {
        next();
    }
};

const validateAddParticipantRequest = async (req, res, next) => {
    
    if (req.body.participants) {
        let addParticipantEmailAddresses = req.body.participants.add;
        let existingParticipantEmailAddresses = [];
        if (req.params.meetingId) {
            existingParticipantEmailAddresses = await MeetingModel.findOne({ meetingId: req.params.meetingId }, { participants: 1 })
                .populate({ path: "participants", transform: (doc) => doc.emailAddress });
        }

        let invalidEmailAddresses = [];
        for await (participantEmailAddress of addParticipantEmailAddresses) {
            if (!(participantEmailAddress in existingParticipantEmailAddresses)) {
                let user = await userService.findUserByEmailAddress(participantEmailAddress);
                if (!user) 
                    invalidEmailAddresses.push(participantEmailAddress);
            }
        }

        if (invalidEmailAddresses.length > 0) {
        next(createError(400, `Some of the provided Email Address [${invalidEmailAddresses}] doesn't exists in the system`));
        }
    }
    next();
};

const validateSearchQuery = (req, res, next) => {
    if ("description" in req.query || ("from" in req.query && "to" in req.query)) {
        if ("from" in req.query && "to" in req.query) {
            if (Date.parse(req.query.from) > Date.parse(req.query.to)) {
                next(createError(400, "'from' cannot be later in time than 'to'"));
            }
        }
        next();
    } else {
        next(createError(400, "please provide either 'description' or 'from/to' timestamps in search query"));
    }
};

module.exports = {
    validateSignUpRequest: validateSignUpRequest,
    validateLoginRequest: validateLoginRequest,
    validateCreateMeetingRequest: validateCreateMeetingRequest,
    validateFindMeetingRequest: validateFindMeetingRequest,
    validateAddParticipantRequest: validateAddParticipantRequest,
    validateMeetingTimeInfo: validateMeetingTimeInfo,
    validateSearchQuery: validateSearchQuery
};
