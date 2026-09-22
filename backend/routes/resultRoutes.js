const express = require("express");

const {
  getMyResults,
  getResultById,
  getExamResults,
} = require("../controllers/resultController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/my",
  protect,
  authorizeRoles("student"),
  getMyResults
);

router.get(
  "/exam/:examId",
  protect,
  authorizeRoles("faculty", "admin"),
  getExamResults
);

router.get(
  "/:id",
  protect,
  authorizeRoles("student", "faculty", "admin"),
  getResultById
);

module.exports = router;