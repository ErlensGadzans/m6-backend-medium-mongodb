const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  text: String,
  user: String,
});

module.exports = model("Review", reviewSchema);
