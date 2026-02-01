const Dish = require("../models/Dish");

// ── GET all dishes ──────────────────────────
const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().populate("category", "name description");
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET one dish by ID ──────────────────────
const getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id).populate("category", "name description");
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.json(dish);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── CREATE a dish (admin only) ──────────────
const createDish = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const dish = await Dish.create({ name, description, price, category });
    res.status(201).json(dish);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── UPDATE a dish (admin only) ──────────────
const updateDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.json(dish);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── DELETE a dish (admin only) ───────────────
const deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.json({ message: "Dish deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllDishes,
  getDishById,
  createDish,
  updateDish,
  deleteDish,
};