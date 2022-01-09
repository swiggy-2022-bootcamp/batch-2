const Meeting = require('../models/meetingsModel');
const Op = require('sequelize').Op;

const createMeetingService = async (meeting) => {
    await Meeting.sync();

    try {
        const result = await Meeting.create(meeting);
        return result;
    } catch (e) {
        throw Error(e.message);
    }
}

const viewMeetingsService = async (email) => {
    await Meeting.sync();

    try {
        const result = await Meeting.findAll({
            where: {
                attendees: {
                    [Op.like]: `%${email}%`
                }
            },
            raw: true
        });
        return result;
    } catch (e) {
        throw Error(e.message);
    }
}

const updateMeetingAttendees = async (meeting) => {
    await Meeting.sync();

    try {
        const result = await Meeting.update(
            { attendees: meeting.attendees },
            { where: { id: meeting.id } },
        );
        return result;
    } catch (e) {
        throw Error(e.message);
    }
}

const deleteMeetingService = async (meeting) => {
    await Meeting.sync();

    try {
        const result = await Meeting.destroy(
            { where: { id: meeting.id } },
        );
        return result;
    } catch (e) {
        throw Error(e.message);
    }
}

module.exports = {
    createMeetingService,
    viewMeetingsService,
    updateMeetingAttendees,
    deleteMeetingService
}