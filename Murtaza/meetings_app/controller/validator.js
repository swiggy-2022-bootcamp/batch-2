const { createMeeting } = require("../services/meetingService");

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
        throw new Error("Invalid Request");
    }
}

const validateLoginRequest = (req, res, next) => {
    let loginRequestPayload = req.body;
    if (("username" in loginRequestPayload)
        && ("password" in loginRequestPayload)) {
            next();
    } else {
        throw new Error("Invalid Request");
    }
}

const validateCreateMeetingRequest = (req, res, next) => {
    let requestPayload = req.body;
    if(("startTime" in requestPayload) 
        && ("endTime" in requestPayload)
        && ("participantEmailAddresses" in requestPayload)
        && ("description" in requestPayload)) {
            next();
    } else {
        throw {status: 400, message: "Invalid Request"};
    }
}

const validateFindMeetingRequest = (req, res, next) => {
    let requestParams = req.params;
    if(requestParams.meetingId != undefined) {
            next();
    } else {
        throw {status: 400, message: "Invalid Request"};
    }
}

module.exports = {
    validateSignUpRequest: validateSignUpRequest,
    validateLoginRequest: validateLoginRequest,
    validateCreateMeetingRequest: validateCreateMeetingRequest,
    validateFindMeetingRequest: validateFindMeetingRequest
}