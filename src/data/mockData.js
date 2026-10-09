export const INITIAL_SPACES = [
  {
    id: "hack-26",
    code: "HACK26",
    name: "Reverse Hackathon Sprint",
    emoji: "⚡",
    category: "Hackathon",
    description: "Rebuilding Hike Messenger for PS-01 with an ephemeral action-driven messenger",
    expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
    members: [
      { id: "u-sahil", name: "Sahil", role: "Product Lead", avatar: "👨‍💻", isCurrentUser: true, upiId: "sahil@okaxis" },
      { id: "u-arya", name: "Arya Sharma", role: "UI/UX Designer", avatar: "👩‍🎨", isCurrentUser: false, upiId: "arya@oksbi" },
      { id: "u-kabir", name: "Kabir Verma", role: "Fullstack Eng", avatar: "⚡", isCurrentUser: false, upiId: "kabir@icici" },
      { id: "u-priya", name: "Priya Nair", role: "Pitch & Growth", avatar: "🎯", isCurrentUser: false, upiId: "priya@paytm" }
    ],
    messages: [
      {
        id: "m-1",
        senderId: "u-sahil",
        senderName: "Sahil",
        avatar: "👨‍💻",
        text: "Team, we chose PS-01 (Hike Messenger)! The problem is clear: Hike tried to fight WhatsApp on general contacts and got crushed. We are building Zike Spaces — temporary rooms with built-in action docks.",
        timestamp: "10:15 AM",
        type: "text",
        reactions: { "🔥": 3, "💯": 2 }
      },
      {
        id: "m-2",
        senderId: "u-arya",
        senderName: "Arya Sharma",
        avatar: "👩‍🎨",
        text: "Love this! The worst part of WhatsApp is post-hackathon group clutter and scrolling for Splitwise links. I made the design tokens with cyberpunk glassmorphism.",
        timestamp: "10:18 AM",
        type: "text",
        reactions: { "❤️": 2 }
      },
      {
        id: "m-3",
        senderId: "u-kabir",
        senderName: "Kabir Verma",
        avatar: "⚡",
        text: "Just ordered fuel for the team: 2 pizzas and cold brews for late night code marathon!",
        timestamp: "10:25 AM",
        type: "expense_alert",
        expenseRef: "e-1",
        reactions: { "🍕": 3 }
      },
      {
        id: "m-4",
        senderId: "u-priya",
        senderName: "Priya Nair",
        avatar: "🎯",
        text: "Added a poll for the pitch focus so we align on the 20-point judging criteria.",
        timestamp: "10:30 AM",
        type: "poll_alert",
        pollRef: "p-1",
        reactions: { "🗳️": 2 }
      }
    ],
    expenses: [
      {
        id: "e-1",
        title: "Midnight Pizza & Red Bull",
        amount: 1450,
        paidBy: "u-kabir",
        paidByName: "Kabir Verma",
        splitBetween: ["u-sahil", "u-arya", "u-kabir", "u-priya"],
        date: "Today, 10:25 AM",
        category: "Food",
        settled: false
      },
      {
        id: "e-2",
        title: "Cab to Hackathon Venue",
        amount: 480,
        paidBy: "u-sahil",
        paidByName: "Sahil",
        splitBetween: ["u-sahil", "u-arya", "u-kabir"],
        date: "Today, 09:15 AM",
        category: "Travel",
        settled: false
      }
    ],
    polls: [
      {
        id: "p-1",
        question: "Which angle to emphasize during the 5-min Hackathon Pitch?",
        options: [
          { id: "opt-1", text: "Teardown of why Jio + WhatsApp Moat killed Hike", votes: 2, voters: ["u-arya", "u-priya"] },
          { id: "opt-2", text: "Live Action Docks: SplitPay, Polls, Self-Destruct", votes: 3, voters: ["u-sahil", "u-kabir", "u-arya"] },
          { id: "opt-3", text: "AI Context Engine & 1-Click Vault Export", votes: 1, voters: ["u-priya"] }
        ],
        createdBy: "u-priya",
        isActive: true
      }
    ],
    tasks: [
      { id: "t-1", title: "Complete Hike root cause teardown document", assignee: "Priya Nair", completed: true, priority: "High" },
      { id: "t-2", title: "Implement SplitPay UPI QR & settlement logic", assignee: "Kabir Verma", completed: true, priority: "Urgent" },
      { id: "t-3", title: "Design Sleek Glassmorphism Dark UI", assignee: "Arya Sharma", completed: true, priority: "High" },
      { id: "t-4", title: "Build AI Catch-Up & Decision Engine", assignee: "Sahil", completed: false, priority: "Urgent" },
      { id: "t-5", title: "One-Page Summary & Pitch Rehearsal (3-min limit)", assignee: "Priya Nair", completed: false, priority: "Medium" }
    ],
    pinnedNotes: [
      { id: "n-1", title: "Judge Demo Flow", content: "1. Show problem (dead WhatsApp groups) -> 2. Show SplitPay in-chat -> 3. Show Poll -> 4. Show AI Recap -> 5. Self-destruct into Vault." },
      { id: "n-2", title: "GitHub Repo", content: "https://github.com/Xiao-1-1/zike.git" }
    ]
  },
  {
    id: "goa-26",
    code: "GOA2026",
    name: "Goa Weekend Getaway 🏖️",
    emoji: "🌴",
    category: "Trip",
    description: "4-day villa booking, scooter rentals, beach shacks, and seafood splits",
    expiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    members: [
      { id: "u-sahil", name: "Sahil", role: "Organiser", avatar: "👨‍💻", isCurrentUser: true, upiId: "sahil@okaxis" },
      { id: "u-rohan", name: "Rohan Mehta", role: "DJ & Navigator", avatar: "🎧", isCurrentUser: false, upiId: "rohan@okhdfc" },
      { id: "u-divya", name: "Divya Rao", role: "Foodie", avatar: "🍹", isCurrentUser: false, upiId: "divya@ybl" }
    ],
    messages: [
      {
        id: "gm-1",
        senderId: "u-rohan",
        senderName: "Rohan Mehta",
        avatar: "🎧",
        text: "Villa in Anjuna is locked! Advance paid ₹12,000. Adding to SplitPay.",
        timestamp: "Yesterday",
        type: "text",
        reactions: { "🎉": 3 }
      }
    ],
    expenses: [
      {
        id: "ge-1",
        title: "Anjuna Villa Advance (2 Nights)",
        amount: 12000,
        paidBy: "u-rohan",
        paidByName: "Rohan Mehta",
        splitBetween: ["u-sahil", "u-rohan", "u-divya"],
        date: "Yesterday",
        category: "Stay",
        settled: false
      }
    ],
    polls: [],
    tasks: [
      { id: "gt-1", title: "Book scooters at Thivim station", assignee: "Sahil", completed: false, priority: "High" }
    ],
    pinnedNotes: []
  }
];

export const STICKERS = [
  { id: "st-1", label: "Jugaad Mode ON", emoji: "⚡", bg: "#4f46e5" },
  { id: "st-2", label: "Scene Kya Hai?", emoji: "👀", bg: "#06b6d4" },
  { id: "st-3", label: "Fundae Mat De", emoji: "🛑", bg: "#f43f5e" },
  { id: "st-4", label: "Chai Break!", emoji: "☕", bg: "#f59e0b" },
  { id: "st-5", label: "Ship It 🚀", emoji: "🏆", bg: "#10b981" },
  { id: "st-6", label: "Paisa Kab Dega?", emoji: "💸", bg: "#8b5cf6" }
];
