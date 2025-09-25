const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sport: { type: mongoose.Schema.Types.ObjectId, ref: "Sport", required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  teamA: [String],
  teamB: [String],
  additionalPlayers: { type: Number, default: 0 },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  cancelled: { type: Boolean, default: false },
  cancelReason: String,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Session", sessionSchema);
