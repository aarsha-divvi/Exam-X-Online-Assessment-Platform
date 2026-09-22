const express = require("express");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route works",
    user: req.user,
  });
});

router.get(
  "/student",
  protect,
  authorizeRoles("student"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Student access granted",
      user: req.user,
    });
  }
);

router.get(
  "/faculty",
  protect,
  authorizeRoles("faculty"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Faculty access granted",
      user: req.user,
    });
  }
);

router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Admin access granted",
      user: req.user,
    });
  }
);

module.exports = router;