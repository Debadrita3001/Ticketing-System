require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const Ticket = require("./models/Ticket");
const Message = require("./models/Message");
const seedData = require("./utils/seedData");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
  }),
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("connected");
    await seedData();
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    if (existingUser) {
      return res.status(409).json({
        error: "Email already registered",
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash,
      role: "user",
    });
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!email || !password) {
      return res.status(400).json({
        error: "Missing fields",
      });
    }

    if (!user) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      return res.status(401).json({
        error: "Password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/secret", auth, (req, res) => {
  res.json({
    message: "Authenticated",
    user: req.user,
  });
});

app.post("/api/tickets", auth, async (req, res) => {
  try {
    const { title, category, priority, description } = req.body;

    if (
      !title ||
      !category ||
      !priority ||
      !description ||
      title.length < 5 ||
      description.length < 20
    ) {
      return res.status(400).json({
        error: "Missing or invalid fields",
      });
    }
    const validCategories = ["Hardware", "Software", "Network"];
    const validPriorities = ["Low", "Medium", "High"];

    if (
      !validCategories.includes(category) ||
      !validPriorities.includes(priority)
    ) {
      return res.status(400).json({
        error: "Missing or invalid fields",
      });
    }

    const ticket = await Ticket.create({
      title,
      category,
      priority,
      description,
      ticketNumber: `TKT-${Date.now()}`,
      createdBy: req.user.userId,
    });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/api/tickets", auth, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    let tickets;
    if (req.user.role === "admin") tickets = await Ticket.find().limit(limit);
    else
      tickets = await Ticket.find({ createdBy: req.user.userId }).limit(limit);
    res.json(tickets);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/api/tickets/:id", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (
      req.user.role !== "admin" &&
      ticket.createdBy.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        error: "Forbidden",
      });
    }
    if (!ticket) {
      return res.status(404).json({
        error: "No ticket found",
      });
    }
    res.json(ticket);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.patch("/api/tickets/:id", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        error: "No ticket found",
      });
    }

    if (
      req.user.role !== "admin" &&
      ticket.createdBy.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        error: "Forbidden",
      });
    }

    if (req.body.status !== undefined) {
      ticket.status = req.body.status;
    }

    if (req.body.category !== undefined) {
      ticket.category = req.body.category;
    }

    await ticket.save();

    res.json(ticket);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/api/tickets/:id", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({
        error: "No ticket found",
      });
    }

    if (
      req.user.role !== "admin" &&
      ticket.createdBy.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        error: "Forbidden",
      });
    }

    await Message.deleteMany({
      ticketId: req.params.id,
    });

    await Ticket.findByIdAndDelete(req.params.id);

    res.json({
      message: "Ticket Deleted",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/api/tickets/:id/messages", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({
        error: "No ticket found",
      });
    }

    const message = await Message.create({
      ticketId: ticket._id,
      senderId: req.user.userId,
      senderRole: req.user.role,
      text: req.body.text,
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/api/tickets/:id/messages", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({
        error: "No ticket found",
      });
    }
    const messages = await Message.find({ ticketId: ticket._id }).sort({
      timestamp: 1,
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/api/auth/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/api/admin/stats", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({
        error: "Forbidden",
      });
    const totalTickets = await Ticket.countDocuments();

    const openTickets = await Ticket.countDocuments({
      status: "Open",
    });

    const pendingTickets = await Ticket.countDocuments({
      status: "Pending",
    });

    const resolvedTickets = await Ticket.countDocuments({
      status: "Resolved",
    });
    const Hardware = await Ticket.countDocuments({
      category: "Hardware",
    });
    const Software = await Ticket.countDocuments({
      category: "Software",
    });
    const Billing = await Ticket.countDocuments({
      category: "Billing",
    });
    const Network = await Ticket.countDocuments({
      category: "Network",
    });
    const Other = await Ticket.countDocuments({
      category: "Other",
    });
    res.json({
      totalTickets,
      openTickets,
      pendingTickets,
      resolvedTickets,
      ticketsByCategory: {
        Hardware,
        Software,
        Billing,
        Network,
        Other,
      },
      ticketsByStatus: {
        openTickets,
        pendingTickets,
        resolvedTickets,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
