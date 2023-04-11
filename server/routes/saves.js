const express = require("express");
const { check } = require("express-validator");

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
router.post(
  "/post",
  isAuth,
  [
    check("method").equals("URL").withMessage("Invalid method"),
    check("url").isURL().withMessage("Invalid URL"),
  ],
  postSave
);

// PUT /saves/changeType/:saveId
router.put(
  "/change-type",
  isAuth,
  [
    check("saveId").not().isEmpty().withMessage("Invalid request"),
    check("type").isIn(["0", "1", "2"]).withMessage("Invalid request"),
  ],
  changeType
);

// DELETE /save/:saveId
router.delete("/:saveId", isAuth, deleteSave);

module.exports = router;
