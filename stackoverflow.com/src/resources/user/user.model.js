import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please fill valid email.");
        }
      },
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password cannnot be empty"],
      validate(value) {
        if (!validatePassword(value)) {
          throw new Error("Password validation failed. Create strong password");
        }
      },
    },

    firstName: {
      type: String,
      required: [true, "First name cannot be empty"],
    },

    secondName: {
      type: String,
    },

    developerProfile: {
      company: {
        type: String,
      },

      githubId: {
        type: String,
      },

      mobileNumber: {
        type: String,
        required: [true, "Mobile number is required"],
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;
