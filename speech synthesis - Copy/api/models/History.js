const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  text: String,
  audioPath: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("History", HistorySchema);
