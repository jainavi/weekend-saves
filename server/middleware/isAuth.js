const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_KEY = process.env.JWT_KEY;

module.exports = (req, res, next) => {
  let token;
  try {
    token = req.get("Authorization").split(" ")[1];
  } catch (err) {
    err.statusCode = 401;
    err.toDisplay = "Authorization Failed!";
    throw err;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_KEY);
  } catch (err) {
    err.statusCode = 500;
    err.toDisplay = "Internal error has occured";
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
