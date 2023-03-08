const express = require("express");

const isAuth = require("../middleware/isAuth");
const { getAllPosts, deleteSave, postSave } = require("../controllers/saves");

const router = express.Router();

// GET /saves/
router.get("/", isAuth, getAllPosts);

// GET /saves/:saveId
router.get("/:saveId", isAuth);

// POST /saves/post
router.post("/post", isAuth, postSave);

// PUT /saves/:saveId
router.put("/:saveId", isAuth);

// DELETE /save/:saveId
router.delete("/:saveId", isAuth, deleteSave);

module.exports = router;
