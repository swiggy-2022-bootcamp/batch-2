const express = require("express");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");
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
					.json({ errors: [{ message: "User already registered" }] });
			}

			// Hashing the password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			const newUser = await User.create({
				name,
				userid,
				password: hashedPassword,
			});

			const payload = {
				user: {
					id: newUser.id,
				},
			};

			generateToken(res, payload, {
				message: "User Registered Successfully",
				"registration-name": name,
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).json({ message: "Server Error" });
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
					.status(401)
					.json({ errors: [{ message: "User does not exist" }] });
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res
					.status(401)
					.json({ errors: [{ message: "Incorrect password" }] });
			}

			const payload = {
				user: {
					id: user.id,
				},
			};
			generateToken(res, payload, {
				message: "Login Successful",
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).json({ message: "Server Error" });
		}
	}
);

module.exports = router;
