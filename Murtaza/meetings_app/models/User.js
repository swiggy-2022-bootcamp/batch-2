const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("config");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const UserSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, "is invalid"], index: true},
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, "is invalid"], index: true},
    bio: { type: String, required: false },
    meetings: [{ type: Number, default: [] }],
    hash: String,
    salt: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(AutoIncrement, { inc_field: "id" });

UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString("hex");
  	this.hash = crypto
    	.pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    	.toString("hex");
};

UserSchema.methods.isPasswordValid = function (password) {
	let hash = crypto
    	.pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    	.toString("hex");
  	return this.hash == hash;
};

UserSchema.methods.generateJWT = function () {
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign({
		id: this.id,
		username: this.username,
		exp: parseInt(exp.getTime() / 1000),
	}, config.get("app.secret"));
};

UserSchema.methods.decodeJWT = (token) => {
	return jwt.decode(token);
};

UserSchema.methods.toJSON = function () {
  return {
    id: this.id,
    firstName: this.firstName,
    lastName: this.lastName,
    username: this.username,
    emailAddress: this.emailAddress,
    bio: this.bio,
    meetings: this.meetings,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
