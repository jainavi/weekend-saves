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
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Save", saveSchema);
