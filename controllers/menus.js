const Menus = require("../models/Menus");

exports.getAllMenus = (req, res, next) => {
  Menus.find()
    .then((menus) => res.status(200).json(menus))
    .catch((error) => res.status(400).json({ error }));
};

exports.getMenusByRestaurant = (req, res, next) => {
  Menus.find({ idRestaurant: req.params.idRestaurant })
    .then((menus) => res.status(200).json(menus))
    .catch((err) => res.status(400).json({ error }));
};

exports.createMenu = (req, res, next) => {
  const menuObject = JSON.parse(req.body.data);

  const menu = new Menus({
    ...menuObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });

  menu
    .save()
    .then(() => res.status(201).json({ message: "Menu create !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyMenu = (req, res, next) => {
  const menuObject = req.file
    ? {
        ...JSON.parse(req.body.data),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
    : { ...req.body };

  Menus.findOne({ idRestaurant: req.params.id })
    .then(() => {
      Menus.updateOne({ idRestaurant: req.params.idRestaurant }, { ...menuObject })
        .then(() => res.status(200).json({ message: "Menu modifié !" }))
        .catch((err) => res.status(400).json({ error }));
    })
    .catch((err) => {
      res.status(400).json({ error });
    });
};
