const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
  text: String,
  user: String,
});

module.exports = model("Author", authorSchema);
