const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization)
    return res.status(401).json({ message: "token not found" });

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const response = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = response;

    next();
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Invalid Token" });
  }
};

const generateToken = function (userData) {
  try {
    return jwt.sign(userData, process.env.JWT_SECRET_KEY);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { generateToken, jwtAuthMiddleware };
