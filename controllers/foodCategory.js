const FoodCategory = require("../models/FoodCategory");

exports.getFoodCategory = (req, res, next) => {
  FoodCategory.find()
    .then((foodCat) => res.status(200).json(foodCat))
    .catch((error) => res.status(400).json({ error }));
};

exports.createCategory = (req, res, next) => {
  const categoryObject = JSON.parse(req.body.data);

  const category = new FoodCategory({
    ...categoryObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });

  category
    .save()
    .then(() => res.status(201).json({ message: "Category create !" }))
    .catch((error) => res.status(400).json({ error }));
};
