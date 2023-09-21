const { model, Schema } = require("mongoose");

const messageSchema = new Schema({
  user: String,
  message: String,
  date: String,
  time: Date,
});

module.exports = model("message", messageSchema);
