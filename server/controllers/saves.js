const Save = require("../models/save");
const { fromUrlExtract } = require("../util/articleExtractor");

exports.getAllPosts = (req, res, next) => {
  res.status(200).json({
    message: "You have successfully reached the route",
  });
};

exports.deleteSave = (req, res) => {
  res.json({ message: "You have reached deleteSaves route" });
};

exports.postSave = (req, res, next) => {
  const method = req.body.method;
  if (method === "URL") {
    const url = req.body.url;
    if (!url) {
      const error = new Error("url not provided");
      error.statusCode = 422;
      throw error;
    }

    fromUrlExtract(url, req.userId)
      .then((article) => {
        let newSave = new Save({ ...article });
        newSave
          .save()
          .then((result) => {
            res
              .status(201)
              .json({ message: "Post created successfully!", result });
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
