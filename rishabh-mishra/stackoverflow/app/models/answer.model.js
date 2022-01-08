module.exports = (mongoose) => {
  const VoteSchema = require("./vote.model")(mongoose);
  let schema = mongoose.Schema({
    question_id: mongoose.Schema.Types.ObjectId,
    version: [
      {
        body: String,
        user_id: mongoose.Schema.Types.ObjectId,
      },
    ],
    vote: [VoteSchema],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  });
};
