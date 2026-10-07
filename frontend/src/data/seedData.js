export const seedTickets = [
  {
    id: "TKT-001",
    title: "Cannot login",
    category: "Software",
    priority: "High",
    status: "Open",
    createdAt: "2026-05-25",
    messages: [],
  },
  {
    id: "TKT-002",
    title: "Laptop screen flickering",
    category: "Hardware",
    priority: "Medium",
    status: "Pending",
    createdAt: "2026-05-26",
    messages: [
      {
        sender: "user",
        text: "My laptop screen keeps flickering every few minutes.",
        timestamp: "2026-05-26T09:15:00",
      },
      {
        sender: "admin",
        text: "Have you updated your display drivers recently?",
        timestamp: "2026-05-26T09:30:00",
      },
    ],
  },
  {
    id: "TKT-003",
    title: "Internet connection unstable",
    category: "Network",
    priority: "High",
    status: "Open",
    createdAt: "2026-05-27",
    messages: [
      {
        sender: "user",
        text: "The office WiFi disconnects every 10-15 minutes.",
        timestamp: "2026-05-27T11:05:00",
      },
    ],
  },
  {
    id: "TKT-004",
    title: "Invoice not received",
    category: "Billing",
    priority: "Low",
    status: "Resolved",
    createdAt: "2026-05-28",
    messages: [
      {
        sender: "user",
        text: "I haven't received the invoice for my last payment.",
        timestamp: "2026-05-28T08:45:00",
      },
      {
        sender: "admin",
        text: "We've resent the invoice to your registered email address.",
        timestamp: "2026-05-28T09:10:00",
      },
      {
        sender: "user",
        text: "Received it now. Thank you!",
        timestamp: "2026-05-28T09:18:00",
      },
    ],
  },
  {
    id: "TKT-005",
    title: "VPN connection failed",
    category: "Network",
    priority: "High",
    status: "Open",
    createdAt: "2026-05-29",
    messages: [
      {
        sender: "user",
        text: "I'm unable to connect to the company VPN from home.",
        timestamp: "2026-05-29T08:45:00",
      },
      {
        sender: "admin",
        text: "Can you confirm whether you're receiving any error message?",
        timestamp: "2026-05-29T09:10:00",
      },
    ],
  },
  {
    id: "TKT-006",
    title: "Software license expired",
    category: "Software",
    priority: "Medium",
    status: "Pending",
    createdAt: "2026-05-30",
    messages: [
      {
        sender: "user",
        text: "My IDE is showing a license expired warning.",
        timestamp: "2026-05-30T10:15:00",
      },
      {
        sender: "admin",
        text: "We've requested a renewal from the vendor.",
        timestamp: "2026-05-30T11:00:00",
      },
      {
        sender: "user",
        text: "Thanks, please keep me updated.",
        timestamp: "2026-05-30T11:05:00",
      },
    ],
  },
  {
    id: "TKT-007",
    title: "Keyboard replacement request",
    category: "Hardware",
    priority: "Low",
    status: "Resolved",
    createdAt: "2026-05-31",
    messages: [
      {
        sender: "user",
        text: "Several keys on my keyboard are not working properly.",
        timestamp: "2026-05-31T09:20:00",
      },
      {
        sender: "admin",
        text: "A replacement keyboard has been approved and shipped.",
        timestamp: "2026-05-31T14:40:00",
      },
      {
        sender: "user",
        text: "Received the replacement. Everything works now.",
        timestamp: "2026-05-31T16:05:00",
      },
    ],
  },
];
