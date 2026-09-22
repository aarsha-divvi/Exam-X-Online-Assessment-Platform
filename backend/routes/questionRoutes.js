const express = require("express");

const {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("faculty"),
  createQuestion
);

router.get(
  "/",
  protect,
  authorizeRoles("faculty", "admin"),
  getQuestions
);

router.get(
  "/:id",
  protect,
  authorizeRoles("faculty", "admin"),
  getQuestionById
);

router.put(
  "/:id",
  protect,
  authorizeRoles("faculty"),
  updateQuestion
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("faculty"),
  deleteQuestion
);

module.exports = router;