const express = require("express");

const isAuth = require("../middleware/isAuth");
const {
  getAllPosts,
  deleteSave,
  postSave,
  changeType,
} = require("../controllers/saves");

const router = express.Router();

// GET /saves/
router.get("/", isAuth, getAllPosts);

// GET /saves/:saveId
router.get("/:saveId", isAuth);

// POST /saves/post
router.post("/post", isAuth, postSave);

// PUT /saves/changeType/:saveId
router.put("/change-type", isAuth, changeType);

// DELETE /save/:saveId
router.delete("/:saveId", isAuth, deleteSave);

module.exports = router;
