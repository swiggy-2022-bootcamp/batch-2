const mongoose = require('mongoose');
const UserModel = require('./User.js');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const MeetingSchema = new mongoose.Schema({
    meetingId: {type: Number, required: false},
    description: {type: String, required: true},
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    users: [{type: mongoose.Schema.Types.ObjectId,ref:'User'}]
},
{
    timestamps: true
})

MeetingSchema.plugin(AutoIncrement, {inc_field: 'meetingId'});

const MeetingModel = mongoose.model('Meeting', MeetingSchema);
module.exports = MeetingModel;