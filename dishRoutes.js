const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const {
  getAllDishes,
  getDishById,
  createDish,
  updateDish,
  deleteDish,
} = require("../controllers/dishController");

// ── PUBLIC routes ───────────────────────────
router.get("/", getAllDishes);
router.get("/:id", getDishById);

// ── ADMIN-only routes ───────────────────────
router.post("/", authenticate, authorize("admin"), createDish);
router.put("/:id", authenticate, authorize("admin"), updateDish);
router.delete("/:id", authenticate, authorize("admin"), deleteDish);

module.exports = router;