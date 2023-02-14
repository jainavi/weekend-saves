const express = require("express");
const body = require("express-validator/check");
const { signUp } = require("../controllers/auth");

const router = express.Router();

// PUT /auth/signup
router.put("/signup", signUp);

module.exports = router;
