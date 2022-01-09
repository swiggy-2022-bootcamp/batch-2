import mongoose from "mongoose";
import validator from "validator";

//question schema
const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      validate(value) {
        if (validator.isEmpty(value)) {
          throw new Error("Title cannot be empty");
        }
      }
    },
    question_body: {
      type: String,
      required: true,
      validate(value) {
        if (validator.isEmpty(value)) {
          throw new Error("Question cannot be empty");
        }
      }
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "answer"
      }
    ]
  },

  { timestamps: true }
);

const Question = mongoose.model("question", questionSchema);
export default Question;
