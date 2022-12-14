const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        firstName: req.body.firstName,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({
            userId: user._id,
            name: user.name,
            email: user.email,
            token: jwt.sign({ userId: user._id }, "eyJ1c2VySWQiOiI2MmYxODRhMzljY2JlNWIzMTc5NTgzMTIiLCJpYXQiOjE2NjAwNDI3MTQs", { expiresIn: "24h" }),
          })
        )
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }

          res.status(200).json({
            userId: user._id,
            name: user.name,
            email: user.email,
            token: jwt.sign({ userId: user._id }, "eyJ1c2VySWQiOiI2MmYxODRhMzljY2JlNWIzMTc5NTgzMTIiLCJpYXQiOjE2NjAwNDI3MTQs", { expiresIn: "24h" }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};
