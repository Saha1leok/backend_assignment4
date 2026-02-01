const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// ── PUBLIC routes ───────────────────────────
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// ── ADMIN-only routes ───────────────────────
router.post("/", authenticate, authorize("admin"), createCategory);
router.put("/:id", authenticate, authorize("admin"), updateCategory);
router.delete("/:id", authenticate, authorize("admin"), deleteCategory);

module.exports = router;