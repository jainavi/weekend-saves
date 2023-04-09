const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  saves: [{ type: Schema.Types.ObjectId, ref: "Save" }],
  docCount: {
    type: [Number],
    default: [0, 0, 0],
  },
});

module.exports = mongoose.model("User", userSchema);
