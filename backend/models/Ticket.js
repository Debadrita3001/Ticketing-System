// models/Ticket.js
const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  ticketNumber: String,

  title: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    enum: ["Hardware", "Software", "Billing", "Network", "Other"],
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
  },

  description: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["Open", "Pending", "Resolved"],
    default: "Open",
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  resolvedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Ticket", TicketSchema);