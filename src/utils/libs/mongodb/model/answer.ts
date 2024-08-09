// models/Data.js

import mongoose from "mongoose";

const AnswerModel = new mongoose.Schema(
  {},
  {
    strict: false,
  },
);

const Answer = mongoose.models.Answer || mongoose.model("Answer", AnswerModel);

export default Answer;
