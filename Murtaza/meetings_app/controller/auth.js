const jwt = require("jsonwebtoken");
const config = require("config");
const createError = require('http-errors');

module.exports = (req, res, next) => {
	try {
		const token = req.cookies["auth-token"];
		if (token == undefined) throw createError(401, "Auth token missing");

		const authenticatedUser = jwt.verify(token, config.get("app.secret"));
		if (authenticatedUser) {
			req.userId = authenticatedUser.id;
			next();
		} else throw createError(401, "Invalid auth token");
	}
	catch(err) {
		next(err);
	}	
};
