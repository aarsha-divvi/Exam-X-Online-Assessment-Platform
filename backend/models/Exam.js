const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: Number,
      required: true,
      min: 1,
    },

    numberOfQuestions: {
      type: Number,
      required: true,
      min: 1,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Scheduling details
    scheduledDate: {
      type: String,
      default: "",
    },

    startTime: {
      type: String,
      default: "",
    },

    endTime: {
      type: String,
      default: "",
    },

    scheduleStatus: {
      type: String,
      enum: ["Not Scheduled", "Scheduled"],
      default: "Not Scheduled",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exam", examSchema);