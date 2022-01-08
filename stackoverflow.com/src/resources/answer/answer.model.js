import mongoose from "mongoose";
import validator from "validator";

const answerSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      validate(value) {
        if (validator.isEmpty(value)) {
          throw new Error("Description cannot be empty");
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
