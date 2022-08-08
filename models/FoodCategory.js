const mongoose = require("mongoose");

const foodCategorySchema = mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("FoodCategory", foodCategorySchema);
