const Restaurants = require("../models/Restaurants");

exports.getRestaurants = (req, res, next) => {
  Restaurants.find({ category: req.params.category })
    .then((restaurants) => res.status(200).json(restaurants))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneRestaurant = (req, res) => {
  Restaurants.findOne({ _id: req.params.id })
    .then((restaurant) => res.status(200).json(restaurant))
    .catch((error) => res.status(404).json({ error }));
};

exports.createRestaurants = (req, res, next) => {
  const restaurantObject = JSON.parse(req.body.data);

  const restaurants = new Restaurants({
    ...restaurantObject,
    imageUrl: `images/restaurants/${req.file.filename}`,
  });

  restaurants
    .save()
    .then(() => res.status(201).json({ message: "Restaurant create !" }))
    .catch((err) => res.status(400).json({ err }));
};

exports.modifyRestaurant = (req, res, next) => {
  const restaurantObject = req.file
    ? {
        ...JSON.parse(req.body.data),
        imageUrl: `images/restaurants/${req.file.filename}`,
      }
    : { ...req.body };

  Restaurants.findOne({ _id: req.params.id })
    .then(() => {
      Restaurants.updateOne({ _id: req.params.id }, { ...restaurantObject })
        .then(() => res.status(200).json({ message: "Restaurant modifié !" }))
        .catch((err) => res.status(400).json({ error }));
    })
    .catch((err) => {
      res.status(400).json({ error });
    });
};
