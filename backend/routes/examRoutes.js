const express = require("express");

const router = express.Router();

const {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
  scheduleExam,
  publishExam,
  addQuestionsToExam,
} = require("../controllers/examController");


// Create exam
router.post("/", createExam);

// Get all exams
router.get("/", getExams);

// Get one exam
router.get("/:id", getExamById);

// Update exam
router.put("/:id", updateExam);

// Delete exam
router.delete("/:id", deleteExam);

// Schedule exam
router.put("/:id/schedule", scheduleExam);

// Publish exam
router.put("/:id/publish", publishExam);

// Add/update questions in exam
router.put("/:id/questions", addQuestionsToExam);


module.exports = router;