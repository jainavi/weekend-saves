const Save = require("../models/save");
const User = require("../models/user");
const { fromUrlExtract } = require("../util/articleExtractor");

exports.getAllPosts = (req, res, next) => {
  const userId = req.userId;

  User.findById(userId)
    .populate({ path: "saves", model: "Save" })
    .then((result) => {
      res
        .status(200)
        .json({
          message: "All saves fetched successfully",
          result: result.saves,
        });
    })
    .catch((err) => {
      err.toDisplay = "Oops! an internal error occured";
      err.statusCode = 500;
      next(err);
    });
};

exports.deleteSave = (req, res) => {
  const saveId = req.body.saveId;
};

exports.postSave = (req, res, next) => {
  const method = req.body.method;
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

        newSave
          .save()
          .then((result) => {
            User.findById(req.userId).then((user) => {
              user.saves.push(result._id);
              user.save().then((result) => {
                res
                  .status(201)
                  .json({ message: "Post created successfully!", result });
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
