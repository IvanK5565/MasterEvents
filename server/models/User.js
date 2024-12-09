const mongoose = require("mongoose");
const User = mongoose.model("User", mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
}));

module.exports = User;