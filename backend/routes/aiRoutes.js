const express = require("express");

const router = express.Router();

const {
  generateQuestions,
} = require("../controllers/aiController");

router.post("/generate", generateQuestions);

module.exports = router;