const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const MeetingSchema = new mongoose.Schema({
		meetingId: { type: Number, required: false },
		description: { type: String, required: true },
		startTime: { type: Number, required: true },
		endTime: { type: Number, required: true },
		duration: { type: String, required: false },
		participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  	},
  	{
    	timestamps: true,
  	}
);

MeetingSchema.methods.setMeetingTime = function (startTime, endTime) {
	this.startTime = startTime;
	this.endTime = endTime;
	this.duration = endTime - startTime;
};

MeetingSchema.plugin(AutoIncrement, { inc_field: "meetingId" });

const MeetingModel = mongoose.model("Meeting", MeetingSchema);
module.exports = MeetingModel;
