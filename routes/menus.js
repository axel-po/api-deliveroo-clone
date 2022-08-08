const express = require("express");
const menusCtrl = require("../controllers/menus");
const multer = require("../middleware/multer-config");

const router = express.Router();

router.get("/", menusCtrl.getAllMenus);
router.get("/:idRestaurant", menusCtrl.getMenusByRestaurant);
router.post("/", multer, menusCtrl.createMenu);
router.put("/:id", multer, menusCtrl.modifyMenu);

module.exports = router;
