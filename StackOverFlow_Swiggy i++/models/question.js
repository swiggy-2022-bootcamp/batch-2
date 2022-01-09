var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
const Comment = require("./comment");
questionSchema.pre("remove", async function () {
  await Comment.remove({
    _id: {
      $in: this.comments,
    },
  });
});

module.exports = mongoose.model("Question", questionSchema);
