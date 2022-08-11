const express = require("express");
const foodCatCtrl = require("../controllers/foodCategory");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const router = express.Router();

router.post("/", multer, foodCatCtrl.createCategory);
router.get("/", foodCatCtrl.getFoodCategory);

module.exports = router;
