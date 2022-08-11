const mongoose = require("mongoose");

const restaurantsSchema = mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model("Restaurants", restaurantsSchema);
