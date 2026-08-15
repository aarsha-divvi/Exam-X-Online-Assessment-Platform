const express = require("express");

const {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

const router = express.Router();

// Create question
router.post("/", createQuestion);

// Get all questions
router.get("/", getQuestions);

// Get question by ID
router.get("/:id", getQuestionById);

// Update question
router.put("/:id", updateQuestion);

// Delete question
router.delete("/:id", deleteQuestion);

module.exports = router;