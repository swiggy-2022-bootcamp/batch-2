module.exports = (mongoose) => {
  const VoteSchema = require("./vote.model")(mongoose);

  const versionSchema = new mongoose.Schema(
    {
      title: String,
      body: String,
      user_id: mongoose.Schema.Types.ObjectId,
      created_at: { type: Date, default: Date.now },
    },
    { _id: false }
  );

  let schema = mongoose.Schema({
    version: [versionSchema],
    vote: [VoteSchema],
    answers: [mongoose.Schema.Types.ObjectId],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  });

  schema.method("toJSON", function () {
    const { __v, _id, vote, ...object } = this.toObject();

    let cnt = 0;
    vote.forEach((element) => {
      cnt += element.action ? 1 : -1;
    });

    object.id = _id;
    object.vote = cnt;
    return object;
  });

  schema.pre("save", async function (next) {
    this.updated_at = Date.now();
    next();
  });

  const Question = mongoose.model("question", schema);
  return Question;
};
