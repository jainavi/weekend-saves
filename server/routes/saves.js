const express = require("express");

const { getAllPosts } = require("../controllers/saves");

const router = express.Router();

// GET /saves/all-saves
router.get("/all-saves", getAllPosts);

module.exports = router;
