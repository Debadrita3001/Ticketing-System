const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
  },

  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  senderRole: {
    type: String,
    enum: ["user", "admin"],
  },

  text: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
