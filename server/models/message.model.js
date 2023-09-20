const { model, Schema } = require("mongoose");

const messageSchema = new Schema({
  user: String,
  message: String,
  date: Date,
});

module.exports = model("message", messageSchema);
