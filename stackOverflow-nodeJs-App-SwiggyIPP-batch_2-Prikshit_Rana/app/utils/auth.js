import config from "../config/index.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

/**
 * newToken : create New JWT token for user
 */
export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
};

/**
 * verifyToken : verify  JWT token for user
 */
export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

/**
 * register : register user
 * method-type = POST
 * return-status:201
 */

export const register = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Email and Password are required" });
  }

  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({ message: "User registered Successfully" , registration_name: user._doc.firstName + " " + user._doc.lastName , email: user._doc.email ,access_token: token });
  } catch (e) {
    console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', e)
    return res.status(500).send({ message: "User Registration Failed" });
  }
};

/**
 * login : login user
 * method-type = POST
 * return-status:201 on success and 401 for invalid cred
 */
export const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Email and Password are required" });
  }

  try {
    const user = await User.findOne({ email: req.body.email })
      .select("email password")
      .exec();

    if (!user) {
      return res.status(401).send({ message: "Sorry invalid credentials" });
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).send({ message: "Sorry invalid credentials" });
    }

    const token = newToken(user);
    return res.status(201).send({ message: "User logged in successfully" , access_token: token });
  } catch (e) {
    console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', e)
    res.status(500).send({ message: "User login failed" });;
  }
};

/**
 * protect : check user is logged in before doing any operation 
 */
export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authentication Token Incorrect" });
  }

  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', e)
    return res.status(401).end({ message:"Token Verification failed" });
  }

  const user = await User.findById(payload.id)
    .select("-password, -updatedAt, -__v")
    .lean()
    .exec();


  if (!user) {
    return res.status(401).send({ message: "Sorry invalid credentials" });
  }

  req.user = user;
  next();
};
