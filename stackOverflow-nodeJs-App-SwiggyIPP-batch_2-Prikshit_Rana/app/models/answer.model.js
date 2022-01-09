import mongoose from "mongoose";
import validator from "validator";

const answerSchema = new mongoose.Schema(
  {
    ques_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "question",
      required: true
    },
    answer_body: {
      type: String,
      required: true,
      validate(value) {
        if (validator.isEmpty(value)) {
          throw new Error("Answer cannot be empty");
        }
      }
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true
    }
  },

  { timestamps: true }
);

const Answer = mongoose.model("answer", answerSchema);
export default Answer;
