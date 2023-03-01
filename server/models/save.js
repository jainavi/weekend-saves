const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saveSchema = new Schema(
  {
    url: String,
    title: String,
    content: String,
    modifiedContent: {
      type: String,
      default: null,
    },
    image: String,
    source: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Save", saveSchema);
