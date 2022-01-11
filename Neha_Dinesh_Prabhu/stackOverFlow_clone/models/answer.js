const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = require('./votes');

const answerSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    created: { type: Date, default: Date.now },
    text: { type: String, required: true },
    votes: [voteSchema]
});

answerSchema.methods = {
    vote: function (user, vote) {
      const existingVote = this.votes.find((v) => v.user._id.equals(user));
  
      if (existingVote) {
        // reset score
        this.score -= existingVote.vote;
        if (vote == 0) {
          // remove vote
          this.votes.pull(existingVote);
        } else {
          //change vote
          this.score += vote;
          existingVote.vote = vote;
        }
      } else if (vote !== 0) {
        // new vote
        this.score += vote;
        this.votes.push({ user, vote });
      }
      return this;
    },
  
    addComment: function (author, body) {
      this.comments.push({ author, body });
      return this;
    },
  
    removeComment: function (id) {
      const comment = this.comments.id(id);
      if (!comment) throw new Error('Comment not found');
      comment.remove();
      return this;
    }
  };
  


answerSchema.set('toJSON', { getters: true });

module.exports = answerSchema;