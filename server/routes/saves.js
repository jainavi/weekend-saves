const express = require("express");

const { getAllPosts, deleteSave } = require("../controllers/saves");

const router = express.Router();

// GET /saves/
router.get("/", getAllPosts);

// GET /saves/:saveId
router.get("/:saveId");

// POST /saves/post
router.post("/post");

// PUT /saves/:saveId
router.put("/:saveId");

router.delete("/delete/:saveId/:id", deleteSave);

module.exports = router;
