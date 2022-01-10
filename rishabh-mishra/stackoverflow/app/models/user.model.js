const bcrypt = require("bcrypt");
const { hashPassword } = require("../utils/authentication");

module.exports = (mongoose) => {
  let schema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user" },
    reputation: { type: Number, default: 1 },
    questions: [{ type: mongoose.Schema.Types.ObjectId }],
    answers: [{ type: mongoose.Schema.Types.ObjectId }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  });

  schema.method("toJSON", function () {
    const { __v, _id, password, role, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.pre("save", async function (next) {
    this.updated_at = Date.now();
    if ((this.modified && this.modified["password"]) || this.isNew) {
      this.password = await hashPassword(this.password);
      if (this.modified) delete this.modified["password"];
      delete this.isNew;
    }
    next();
  });

  const User = mongoose.model("user", schema);
  return User;
};
