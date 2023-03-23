const { validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_KEY = process.env.JWT_KEY;
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
      err.toDisplay = "Oops! an internal error occured";
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const error = new Error("Email does not exist");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        { email: loadedUser.email, userId: loadedUser._id.toString() },
        JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      err.toDisplay = "Oops! a database error occurred";
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return next(err);
    });
};
