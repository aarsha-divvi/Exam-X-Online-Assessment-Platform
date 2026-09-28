const express = require("express");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), getUsers);

router.post("/", protect, authorizeRoles("admin"), createUser);

router.put("/:id", protect, authorizeRoles("admin"), updateUser);

router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);

module.exports = router;