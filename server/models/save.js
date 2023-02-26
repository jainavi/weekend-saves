const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saveSchema = new Schema({
  url: String,
  title: String,
  content: String,
  modified: {
    type: Boolean,
    default: false,
  },
  modifiedContent: {
    type: String,
    default: null,
  },
});
