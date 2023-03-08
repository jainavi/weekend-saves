const express = require("express");
const { body } = require("express-validator");

const { signUp, login } = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

// PUT /auth/signup
router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid Email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail already linked");
          }
        });
      })
      .normalizeEmail(),
    body("password", "Invalid Password").isLength({ min: 5 }).trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match");
        }
        return true;
      }),
    body("phoneNumber", "Invalid Phone Number")
      .isNumeric()
      .isLength({ min: 10, max: 10 })
      .trim(),
    body("firstName")
      .isAlpha()
      .withMessage("Name must only contain alphabets")
      .isLength({ min: 1 })
      .withMessage("Name can't be empty")
      .trim(),
    body("lastName")
      .if((value, { req }) => {
        if (!req.body.lastName || value === "") {
          return false;
        }
        return true;
      })
      .isAlpha()
      .withMessage("Last name must only contain alphabets")
      .trim(),
  ],
  signUp
);

// POST /auth/login
router.post(
  "/login",
  [body("email").normalizeEmail(), body("password").trim()],
  login
);

module.exports = router;
