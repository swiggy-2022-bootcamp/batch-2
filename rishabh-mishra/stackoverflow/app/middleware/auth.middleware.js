const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config");

const userAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authentication invalid." });
  }

  try {
    const decodedToken = jwt.verify(token.slice(7), config.secret, {
      algorithm: "HS256",
      expiresIn: config.expiresIn,
    });

    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = { userAuth };
