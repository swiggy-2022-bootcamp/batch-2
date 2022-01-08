module.exports = (mongoose) => {
  let schema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: "user" },
    reputation: { type: Number, default: 1 },
    questions: [{ type: mongoose.Schema.Types.ObjectId }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  });

  schema.method("toJSON", function () {
    const { __v, _id, password, role, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};
