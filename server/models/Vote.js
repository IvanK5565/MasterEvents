const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Vote = mongoose.model("Vote", mongoose.Schema({
  vote: { type: Boolean, required: true },
  event_id: { type: ObjectId, ref: "Event", required: true },
  user_id: { type: ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now() },
}));

module.exports = Vote;