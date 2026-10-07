const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const Message = require("../models/Message");

const seedData = async () => {
  const userCount = await User.countDocuments();
  if (userCount > 0) {
    console.log("Already seeded");
    return;
  }
  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("password123", 10);

  const admin = await User.create({
    name: "Admin User",
    email: "admin@support.com",
    passwordHash: adminPassword,
    role: "admin",
  });

  const alice = await User.create({
    name: "Alice Johnson",
    email: "alice@example.com",
    passwordHash: userPassword,
    role: "user",
  });

  const bob = await User.create({
    name: "Bob Smith",
    email: "bob@example.com",
    passwordHash: userPassword,
    role: "user",
  });
  const tickets = await Ticket.insertMany([
    {
      ticketNumber: "TKT-001",
      title: "Laptop screen flickering",
      category: "Hardware",
      priority: "High",
      description: "Screen flickers when charger is connected.",
      status: "Open",
      createdBy: alice._id,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    },

    {
      ticketNumber: "TKT-002",
      title: "Cannot login to portal",
      category: "Software",
      priority: "Medium",
      description: "Getting invalid credentials error repeatedly.",
      status: "Pending",
      createdBy: bob._id,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },

    {
      ticketNumber: "TKT-003",
      title: "Internet disconnecting",
      category: "Network",
      priority: "High",
      description: "Internet disconnects every few minutes.",
      status: "Resolved",
      createdBy: alice._id,
      resolvedAt: new Date(),
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },

    {
      ticketNumber: "TKT-004",
      title: "Wrong billing amount",
      category: "Billing",
      priority: "Low",
      description: "Monthly invoice amount is incorrect.",
      status: "Open",
      createdBy: bob._id,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },

    {
      ticketNumber: "TKT-005",
      title: "Printer not working",
      category: "Hardware",
      priority: "Medium",
      description: "Office printer is stuck on loading screen.",
      status: "Pending",
      createdBy: alice._id,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },

    {
      ticketNumber: "TKT-006",
      title: "Application crashes",
      category: "Software",
      priority: "High",
      description: "Application closes immediately after launch.",
      status: "Resolved",
      createdBy: bob._id,
      resolvedAt: new Date(),
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },

    {
      ticketNumber: "TKT-007",
      title: "Other issue",
      category: "Other",
      priority: "Low",
      description: "General support request regarding account.",
      status: "Open",
      createdBy: alice._id,
    },
  ]);
  await Message.insertMany([
    // Ticket 1

    {
      ticketId: tickets[0]._id,
      senderId: alice._id,
      senderRole: "user",
      text: "My laptop screen keeps flickering whenever I plug in the charger.",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      ticketId: tickets[0]._id,
      senderId: admin._id,
      senderRole: "admin",
      text: "Have you tried updating your display drivers?",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
    {
      ticketId: tickets[0]._id,
      senderId: alice._id,
      senderRole: "user",
      text: "Yes, I updated them yesterday but the issue still exists.",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
      ticketId: tickets[0]._id,
      senderId: admin._id,
      senderRole: "admin",
      text: "Understood. We'll investigate further and get back to you.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },

    // Ticket 2

    {
      ticketId: tickets[1]._id,
      senderId: bob._id,
      senderRole: "user",
      text: "I cannot log in to the support portal even with the correct password.",
      timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
    },
    {
      ticketId: tickets[1]._id,
      senderId: admin._id,
      senderRole: "admin",
      text: "Could you share a screenshot of the error message?",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
    {
      ticketId: tickets[1]._id,
      senderId: bob._id,
      senderRole: "user",
      text: "It says 'Invalid credentials' even after resetting the password.",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      ticketId: tickets[1]._id,
      senderId: admin._id,
      senderRole: "admin",
      text: "Thanks. We have escalated this issue to the authentication team.",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },

    // Ticket 3

    {
      ticketId: tickets[2]._id,
      senderId: alice._id,
      senderRole: "user",
      text: "My internet connection disconnects every few minutes.",
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
    },
    {
      ticketId: tickets[2]._id,
      senderId: admin._id,
      senderRole: "admin",
      text: "We detected an issue with the network router and restarted it.",
      timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000),
    },
    {
      ticketId: tickets[2]._id,
      senderId: alice._id,
      senderRole: "user",
      text: "The connection seems stable now.",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    },
    {
      ticketId: tickets[2]._id,
      senderId: admin._id,
      senderRole: "admin",
      text: "Great! We'll mark this issue as resolved.",
      timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
    },
  ]);
};

module.exports = seedData;
