const mongoose = require("mongoose");
const User = mongoose.model("User", mongoose.Schema({
  //id INT AUTO_INCREMENT PRIMARY KEY,
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
}));

module.exports = User;