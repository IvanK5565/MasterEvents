const mongoose = require("mongoose");
const Category = mongoose.model("Category", mongoose.Schema({
  name: String,
}));

module.exports = Category;