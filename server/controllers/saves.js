const { extract } = require("@extractus/article-extractor");
const Save = require("../models/save");

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
      return next(error);
    }

    extract(url)
      .then((article) => {
        const { title, image, content, source } = article;
        const newSave = new Save({
          url,
          title,
          content,
          image,
          source,
        });
        newSave
          .save()
          .then((result) => {
            res.status(201).json({
              message: "Post create successfully!",
              save: result,
            });
          })
          .catch((err) => {
            const error = new Error("can't fetch your post");
            error.statuCode = 500;
            next(error);
          });
      })
      .catch((err) => {
        const error = new Error("can't fetch your post");
        error.statuCode = 500;
        next(error);
      });
  } else if (method == "POST") {
    // filler
  } else {
    const error = new Error("valid method not provided");
    error.statusCode = 400;
    next(error);
  }
};
