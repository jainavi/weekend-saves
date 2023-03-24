const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saveSchema = new Schema(
  {
    url: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    modifiedContent: {
      type: String,
      default: null,
    },
    image: { type: String, default: "" },
    source: { type: String, default: "" },
    ttr: Number,
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true, //Make it required
    },
    userOptions: {
      isArchived: {
        type: Boolean,
        default: false,
      },
      isFavourite: {
        type: Boolean,
        default: false,
      },
      tags: {
        type: [String],
        default: [],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Save", saveSchema);
