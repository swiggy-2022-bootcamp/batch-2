import config from "../config/index.js";
import User from "../resources/user/user.model.js";
import jwt from "jsonwebtoken";
import { logger } from "./logger.js";

export const newToken = (user) => {
  const methodName = "#newToken";
  logger.info(`${methodName} Request recieved for generating new json web token having payload section ${JSON.stringify({id: user.id})}.`);
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  });
};

export const verifyToken = (token) => {
  const methodName = "#verifyToken";
  logger.info(`${methodName} Request recieved for verifying the json web token.`);
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) {
        logger.error(
          `${methodName} Encountered some error while verifying the json web token.`
        );
        return reject(err);
      }
      resolve(payload);
    });
  });
};

export const signup = async (req, res) => {
  const methodName = "#signup";
  if (!req.body.email || !req.body.password) {
    logger.error(`${methodName} Error encountered while signing up the user as both the mandatory fields email and password are not provided.`);
    return res.status(400).send({ message: "Email and Password are required" });
  }

  logger.info(`${methodName} Request recieved for signing up the user: ${JSON.stringify(req.body)}`);

  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res
      .status(201)
      .send({ email: user._doc.email, access_token: token });
  } catch (e) {
    logger.error(`${methodName} Error encountered while signing up the user with email address: ${JSON.stringify(req.body.email)}`);
    return res.status(500).end();
  }
};

export const signin = async (req, res) => {
  const methodName = "#signin";
  if (!req.body.email || !req.body.password) {
    logger.error(`${methodName} Error encountered while signing in the user as both the mandatory fields email and password are not provided.`);
    return res.status(400).send({ message: "Email and Password are required" });
  }
  logger.info(`${methodName} Request recieved for signing up the user: ${JSON.stringify(req.body)}`);
  const invalid = { message: "Sorry invalid credentials" };
  try {
    const user = await User.findOne({ email: req.body.email })
      .select("email password")
      .exec();

    if (!user) {
      logger.error(`${methodName} Error encountered while signing in the user with email address: ${JSON.stringify(req.body.email)} as invalid password and email combination is provided.`);
      return res.status(401).send(invalid);
    }

    const match = await user.checkPassword(req.body.password);
    if (!match) {
      return res.status(401).send(invalid);
    }
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (e) {
    res.status(500).end();
  }
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  const methodName = "#protect";
  if (!bearer || !bearer.startsWith("Bearer ")) {
    logger.error(`${methodName} Error encountered in the middleware as no bearer token is attached with the authorization header.`);
    return res.status(401).end();
  }

  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    logger.error(`${methodName} Error encountered in the middleware as token verification failed.`);
    return res.status(401).end();
  }

  const user = await User.findById(payload.id)
    .select("-password")
    .lean()
    .exec();

  if (!user) {
    logger.error(`${methodName} Error encountered in the middleware as no user exists corresponding to the decoded customer journey token.`);
    return res.status(401).end();
  }

  req.user = user;
  next();
};
