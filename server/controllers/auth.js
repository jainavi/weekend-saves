const { validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.signUp = (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    error.data = validationError.array();
    throw error;
  }
  const { email, password, phoneNumber, firstName, lastName } = req.body;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email,
        password: hashedPw,
        phoneNumber,
        firstName,
        lastName,
        saves: [],
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User created" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return next(err);
    });
};
