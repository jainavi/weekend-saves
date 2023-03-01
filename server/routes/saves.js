const express = require("express");

const { getAllPosts, deleteSave, postSave } = require("../controllers/saves");

const router = express.Router();

// GET /saves/
router.get("/", getAllPosts);

// GET /saves/:saveId
router.get("/:saveId");

// POST /saves/post
router.post("/post", postSave);

// PUT /saves/:saveId
router.put("/:saveId");

// DELETE /save/:saveId
router.delete("/:saveId", deleteSave);

module.exports = router;