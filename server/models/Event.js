const mongoose = require("mongoose");
const Event = mongoose.model("Event", mongoose.Schema({
  //id INT AUTO_INCREMENT PRIMARY KEY,
  name: { type: String, required: true },
  describe: String,
  date: { type: Date, required: true },
  category: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
}));

module.exports = Event;