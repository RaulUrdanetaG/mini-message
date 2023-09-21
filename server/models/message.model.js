const { model, Schema } = require("mongoose");

const messageSchema = new Schema({
  user: String,
  message: String,
  date: String,
  time: String,
});

module.exports = model("message", messageSchema);
