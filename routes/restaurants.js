const express = require("express");
const restaurantsCtrl = require("../controllers/restaurants");
const multer = require("../middleware/multer-config");

const router = express.Router();

router.get("/:category", restaurantsCtrl.getRestaurants);
router.get("/findOne/:id", restaurantsCtrl.getOneRestaurant);
router.post("/", multer, restaurantsCtrl.createRestaurants);
router.put("/:id", multer, restaurantsCtrl.modifyRestaurant);

module.exports = router;
