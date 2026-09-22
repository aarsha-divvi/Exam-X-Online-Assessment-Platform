const express = require("express");

const {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
} = require("../controllers/examController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("faculty"),
  createExam
);

router.get(
  "/",
  protect,
  authorizeRoles("student", "faculty", "admin"),
  getExams
);

router.get(
  "/:id",
  protect,
  authorizeRoles("student", "faculty", "admin"),
  getExamById
);

router.put(
  "/:id",
  protect,
  authorizeRoles("faculty"),
  updateExam
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("faculty"),
  deleteExam
);

module.exports = router;