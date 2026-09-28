const express = require("express");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const {
  getAdminReports,
} = require("../controllers/adminReportController");

const router = express.Router();

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAdminReports
);

module.exports = router;