const mongoose = require("mongoose");

const MenusSchema = mongoose.Schema({
  idRestaurant: { type: String, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("MenusSchema", MenusSchema);
