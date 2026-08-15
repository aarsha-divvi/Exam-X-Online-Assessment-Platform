const express = require("express");

const {
  createExam,
  getExams,
  scheduleExam,
} = require("../controllers/examController");

const router = express.Router();

// Create exam
router.post("/", createExam);

// Get all exams
router.get("/", getExams);

// Schedule exam
router.put("/:id/schedule", scheduleExam);

module.exports = router;