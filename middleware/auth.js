const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "eyJ1c2VySWQiOiI2MmYxODRhMzljY2JlNWIzMTc5NTgzMTIiLCJpYXQiOjE2NjAwNDI3MTQs");
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
