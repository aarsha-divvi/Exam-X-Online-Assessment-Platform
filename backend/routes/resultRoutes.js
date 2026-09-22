const express = require("express");

const router = express.Router();

const {
  getResults,
  getResultsByExam,
  getStudentResult,
  getExamPerformance,
} = require("../controllers/resultController");


// Get all results
router.get("/", getResults);

// Get results for one exam
router.get("/exam/:examId", getResultsByExam);

// Get exam performance
router.get(
  "/exam/:examId/performance",
  getExamPerformance
);

// Get one student's result for an exam
router.get(
  "/student/:studentId/exam/:examId",
  getStudentResult
);


module.exports = router;