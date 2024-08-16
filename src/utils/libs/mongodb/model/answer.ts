// models/Data.js

import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
    },
    choice: {
      type: String,
    },
  },
  { _id: false }
);

const AnswerSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  result: [ResultSchema],
});

const Answer = mongoose.models.Answer || mongoose.model('Answer', AnswerSchema);

export default Answer;
