const jwt = require("jsonwebtoken");

module.exports = {
	generateToken: function (res, payload, message) {
		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: "5 days" },
			(err, token) => {
				if (err) throw err;
				res.status(201).json({ token, ...message });
			}
		);
	},
	validateTime: function (value) {
		const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
		if (value) {
			const matches = value.match(regex);
			if (!matches || value.length !== 5) {
				throw new Error("Time should be in HH:MM format");
			}
		}
		return true;
	},
};
