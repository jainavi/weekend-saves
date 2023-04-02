const Save = require("../models/save");
const User = require("../models/user");
const { fromUrlExtract } = require("../util/articleExtractor");

exports.getAllPosts = (req, res, next) => {
  const userId = req.userId;
  const { type, tags, page } = req.query;
  const matchFilter =
    {
      archive: { "userOptions.isArchived": true },
      favourite: { "userOptions.isFavourite": true },
    }[type] || {};
  const limitPerPage = 6;

  User.findById(userId)
    .populate({
      path: "saves",
      select: "-content -modifiedContent",
      match: matchFilter,
      options: {
        limit: limitPerPage,
        skip: (page - 1) * limitPerPage,
      },
    })
    .then((result) => {
      let docCount;
      switch (type) {
        case "favourite":
          docCount = result.docCount.favourite;
          break;
        case "archive":
          docCount = result.docCount.archive;
          break;
        default:
          docCount = result.docCount.total;
          break;
      }
      res.status(200).json({
        message: "Saves fetched successfully",
        result: { saves: result.saves, docCount },
      });
    })
    .catch((err) => {
      err.toDisplay = err.toDisplay || "Oops! an internal error occured";
      err.statusCode = 500;
      next(err);
    });
};

exports.getSave = (req, res) => {
  const userId = req.body.userId;
  const saveId = req.body.saveId;

  User.findById(userId)
    .then((user) => {
      const userSaves = user.saves;
      if (!userSaves.includes(saveId)) {
        const error = new Error("Article not found");
        error.toDisplay = "Article not found";
        error.statusCode = 404;
        throw error;
      }

      Save.findById(saveId).then((save) => {
        res
          .status(200)
          .json({ message: "Save fetched successfully", result: save });
      });
    })
    .catch((err) => {
      err.toDisplay = err.toDisplay || "Oops! an internal error occured";
      next(err);
    });
};

exports.deleteSave = (req, res) => {
  const saveId = req.body.saveId;
};

exports.postSave = (req, res, next) => {
  const method = req.body.method;
  let save;
  if (method === "URL") {
    const url = req.body.url;
    if (!url) {
      const error = new Error("url not provided");
      error.statusCode = 400;
      throw error;
    }

    fromUrlExtract(url, req.userId)
      .then((article) => {
        let newSave = new Save({ ...article });
        save = newSave;
        newSave
          .save()
          .then((result) => {
            User.findById(req.userId).then((user) => {
              user.saves.push(result._id);
              user.docCount.total += 1;
              user.save().then((result) => {
                res.status(201).json({
                  message: "Post created successfully!",
                  result: save,
                });
              });
            });
          })
          .catch((err) => {
            err.toDisplay = "Oops! an internal error occured";
            err.statusCode = 500;
            next(err);
          });
      })
      .catch((err) => {
        err.toDisplay = "Can't fetch your post";
        err.statusCode = 500;
        next(err);
      });
  } else {
    const error = new Error("valid method not provided");
    error.statusCode = 400;
    throw error;
  }
};
