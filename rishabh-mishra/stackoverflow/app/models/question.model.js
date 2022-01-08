module.exports = (mongoose) => {
  const VoteSchema = require("./vote.model")(mongoose);

  let schema = mongoose.Schema({
    version: [
      {
        title: String,
        body: String,
        user_id: mongoose.Schema.Types.ObjectId,
        created_at: { type: Date, default: Date.now },
      },
    ],
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

  const Question = mongoose.model("question", schema);
  return Question;
};
