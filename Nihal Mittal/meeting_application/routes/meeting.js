const express = require("express");
const { check } = require("express-validator");
const { Op } = require("sequelize");
const router = express.Router();
const Meeting = require("../models/Meeting");
const User = require("../models/User");
const { validateTime } = require("../utils");
const validateRequest = require("../middlewares/validateRequest");
const auth = require("../middlewares/auth");

// @route    POST /meeting
// @desc     Create a meeting
// @access   Private
router.post(
	"/meeting",
	auth,
	check(
		["date_of_meeting", "description", "email_ids_of_attendees"],
		"Value cannot be empty"
	).notEmpty(),
	check(["start_time", "end_time"])
		.notEmpty()
		.withMessage("Value cannot be empty")
		.custom(validateTime),
	validateRequest,
	async (req, res) => {
		const { date_of_meeting, start_time, end_time, description } = req.body;
		let email_ids_of_attendees = req.body.email_ids_of_attendees;

		try {
			const user = await User.findOne({ where: { id: req.user.id } });
			email_ids_of_attendees += `,${user.userid}`;

			const meeting = await Meeting.create({
				date_of_meeting,
				start_time,
				end_time,
				description,
				email_ids_of_attendees,
			});

			res.status(201).json({
				message: "Meeting successfully created",
				"registration-name": meeting.id,
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).json({ message: "Server Error" });
		}
	}
);

// @route    GET /meeting/:id
// @desc     Get meeting by ID
// @access   Private
router.get("/meeting/:id", auth, async (req, res) => {
	const meetingId = req.params.id;

	try {
		const meeting = await Meeting.findOne({ where: { id: meetingId } });
		if (!meeting) {
			return res
				.status(404)
				.json({ errors: [{ message: "Meeting id doesn’t exist" }] });
		}
		res.json(meeting);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server Error" });
	}
});

// @route    GET /user/meetings
// @desc     Get all the meetings of a user
// @access   Private
router.get("/user/meetings", auth, async (req, res) => {
	try {
		const user = await User.findOne({ where: { id: req.user.id } });

		let q = "";
		if (req.query.q) {
			q = req.query.q;
		}

		const allMeetings = await Meeting.findAll({
			where: {
				email_ids_of_attendees: {
					[Op.substring]: user.userid,
				},
				description: {
					[Op.substring]: q,
				},
			},
		});
		res.json(allMeetings);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server Error" });
	}
});

// @route    DELETE /user/meetings/:id
// @desc     Remove user from a meeting
// @access   Private
router.delete("/user/meetings/:id", auth, async (req, res) => {
	try {
		const user = await User.findOne({ where: { id: req.user.id } });
		const meeting = await Meeting.findOne({
			where: {
				id: req.params.id,
				email_ids_of_attendees: {
					[Op.substring]: user.userid,
				},
			},
		});

		if (!meeting) {
			return res
				.status(404)
				.json({ errors: [{ message: "Meeting id doesn’t exist" }] });
		}

		let email_ids_of_attendees = meeting.email_ids_of_attendees.replace(
			`,${user.userid}`,
			""
		);

		await Meeting.update(
			{ email_ids_of_attendees },
			{
				where: {
					id: req.params.id,
				},
			}
		);
		return res.json({ message: "You are dropped off from the meeting" });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server Error" });
	}
});

module.exports = router;
