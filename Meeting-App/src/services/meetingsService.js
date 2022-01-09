const Meeting = require('../models/meetingsModel');

const createMeetingService = async (meeting) => {
    await Meeting.sync();

    try {
        const result = await Meeting.create(meeting);
        return result;
    } catch (e) {
        throw Error(e.message);
    }
}

module.exports = {
    createMeetingService
}