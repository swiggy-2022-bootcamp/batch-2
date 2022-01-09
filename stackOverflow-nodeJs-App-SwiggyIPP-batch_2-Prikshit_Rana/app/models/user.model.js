import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

/**
 * validatePassword : check if password is strong based on certain conditions
 */
const validatePassword = password => {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
    pointsPerUnique: 1,
    pointsPerRepeat: 0.5,
    pointsForContainingLower: 10,
    pointsForContainingUpper: 10,
    pointsForContainingNumber: 10,
    pointsForContainingSymbol: 10
  });
};

//user schema
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
      index: true
    },

    password: {
      type: String,
      required: [true, "Password cannnot be empty"],
      validate(value) {
        if (!validatePassword(value)) {
          throw new Error("Password validation failed. Create strong password");
        }
      }
    },

    firstName: {
      type: String,
      required: [true, "First name cannot be empty"]
    },

    lastName: {
      type: String
    },

    developerProfile: {
      company: {
        type: String
      },

      githubId: {
        type: String
      },

      mobileNumber: {
        type: String,
        required: [true, "Mobile number is required"]
      }
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

/**
 * checkPassword : check if password is correct
 */
userSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });
};

const User = mongoose.model("user", userSchema);
export default User;
