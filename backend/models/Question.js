const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["MCQ", "Descriptive", "Coding"],
      required: true,
    },

    options: {
      type: [String],
      default: [],
    },

    correctAnswer: {
      type: String,
      default: "",
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);