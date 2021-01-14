const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  text: String,
  user: String,
});

module.exports = model("User", userSchema);
