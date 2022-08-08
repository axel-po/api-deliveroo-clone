const mongoose = require("mongoose");

const restaurantsSchema = mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  // menus: [
  //   {
  //     name: { type: String, required: true },
  //     price: { type: Number, required: false },
  //     desc: { type: String, required: false },
  //     thumb: { type: String, required: false },
  //   },
  // ],
});

module.exports = mongoose.model("Restaurants", restaurantsSchema);
