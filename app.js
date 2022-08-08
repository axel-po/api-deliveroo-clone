const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const foodCatRoutes = require("./routes/foodCategory");
const userRoutes = require("./routes/user");
const restaurantsRoutes = require("./routes/restaurants");
const menusRoutes = require("./routes/menus");

const app = express();

mongoose
  .connect("mongodb+srv://axelpo:yqWHKHVPuZTfCR4g@cluster0.15cty.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use(cors());
app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/foodCat", foodCatRoutes);
app.use("/api/restaurants", restaurantsRoutes);
app.use("/api/menus", menusRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
