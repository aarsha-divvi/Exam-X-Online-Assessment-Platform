const express = require("express");

const {
  createSubmission,
  getMySubmissions,
  getExamSubmissions,
} = require("../controllers/submissionController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("student"),
  createSubmission
);

router.get(
  "/my",
  protect,
  authorizeRoles("student"),
  getMySubmissions
);

router.get(
  "/exam/:examId",
  protect,
  authorizeRoles("faculty", "admin"),
  getExamSubmissions
);

module.exports = router;