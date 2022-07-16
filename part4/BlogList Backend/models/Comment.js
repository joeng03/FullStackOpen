const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
  content: String,
  timeStamp: Date,
});
module.exports = commentSchema;
