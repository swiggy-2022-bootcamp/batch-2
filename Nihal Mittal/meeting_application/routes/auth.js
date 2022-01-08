const express = require("express");
const { check } = require("express-validator");
const User = require("../models/User");
const validateRequest = require("../middlewares/validateRequest");
const router = express.Router();

router.post(
	"/user",
	check("userid", "Please include a valid email").isEmail(),
	check("password", "Password is required").exists(),
	check("name", "Name is required").exists(),
	validateRequest,
	async (req, res) => {
		const { name, userid, password } = req.body;
		try {
			const user = await User.findOne({ where: { userid: userid } });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ message: "User already exists" }] });
			}
			await User.create({ name, userid, password });
			res.json({
				message: "User Registered Successfully",
				"registration-name": name,
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Server error");
		}
	}
);

router.post(
	"/login",
	check("userid", "Please include a valid email").isEmail(),
	check("password", "Password is required").exists(),
	validateRequest,
	async (req, res) => {
		const { userid, password } = req.body;
		try {
			const user = await User.findOne({ where: { userid: userid } });
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ message: "User does not exists" }] });
			}
			if (user.password !== password) {
				return res
					.status(400)
					.json({ errors: [{ message: "Incorrect password" }] });
			}
			res.json({
				message: "Login Successful",
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Server error");
		}
	}
);

module.exports = router;
