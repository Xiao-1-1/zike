# Zike Spaces — Ephemeral Action-Driven Collaboration
> **Reverse Hackathon 2026** • Problem Statement: **PS-01 (Hike Messenger Teardown & Rethink)**

![Zike Spaces Banner](public/vite.svg)

---

## 📌 Executive Summary
**Hike Messenger** (Bharti SoftBank, 2012–2021) raised $261M and peaked at a $1.4B valuation with 100M+ registered users before shutting down in Jan 2021. 

Instead of rebuilding Hike as another generic messenger attempting to steal WhatsApp's permanent address book, **Zike Spaces** rethinks the core premise:
> **"Don't fight WhatsApp on Contacts; beat it on Context."**

Zike is an **Action-Driven, Ephemeral Micro-Messenger** built specifically for temporary groups and events (hackathons, trips, college committees, flatmate hunts). It eliminates the **WhatsApp Group Chat Graveyard**, protects privacy via 6-character room PINs (zero phone number leakage), embeds superpowers directly in-chat (SplitPay with instant UPI settlement, live consensus polls, sprint task lists), and auto-archives into a **1-Page Event Vault** when the countdown timer expires.

---

## 🛠️ Technical Architecture & Prototype Transparency Matrix

| Feature / Module | Implementation Level | Real Technical Depth in Prototype | Production Architecture |
| :--- | :--- | :--- | :--- |
| **Multi-Space State Switcher** | **Genuinely Functional** | React 18/19 state machine managing multiple active spaces, timers, and member rosters. | Redis session store + Postgres tenant partitions. |
| **SplitPay Expense Ledger** | **Genuinely Functional** | Real-time expense math, dynamic net-balance reduction (`net = Σ credits - debits`), and settlement tracking. | Postgres double-entry accounting schema with ACID transactions. |
| **Native UPI Payment Integration** | **Genuinely Functional** | Generates valid NPCI UPI intent deep-links (`upi://pay?pa=...&pn=...&am=...&cu=INR`) and responsive QR codes. | NPCI BBPS / UPI Intent SDK + webhook reconciliation (Razorpay/Cashfree). |
| **Consensus Poll Engine** | **Genuinely Functional** | Live voting engine tracking unique voters to prevent double-voting and recalculating percentages in real time. | WebSocket broadcast + Redis distributed atomic counters. |
| **Sprint Task Checklist** | **Genuinely Functional** | Checkbox toggles, real-time team progress completion meter (0–100%), and modal task injection. | CRDTs (Yjs) or Supabase realtime table subscriptions. |
| **1-Page Event Vault Exporter** | **Genuinely Functional** | Synthesizes space expenses, consensus decisions, and completed tasks into an exportable Markdown file via browser `Blob` & `URL.createObjectURL`. | Server-side headless Chromium PDF rendering & signed S3 archives. |
| **Space Self-Destruct Lifecycle** | **Genuinely Functional** | Live countdown timer with client-side memory purge and failover upon expiration. | Distributed Celery / Temporal cron workers with automated TTL eviction. |
| **Chat Stream & Teammate Interaction** | **Interactive + Simulated Peer Layer** | Full user message dispatch. Teammate responses (Arya, Kabir, Priya) are powered by a client-side simulation engine with humanized randomized delays for reliable offline demoing. | WebSockets (Socket.io/Bun) + Redis Pub/Sub cluster. |
| **AI Catch-Up & Decision Brief** | **Deterministic Heuristic** | Dynamically synthesizes active space dues, decisions, and tasks into an executive briefing modal without external LLM API latency. | Asynchronous LLM pipeline (Gemini 2.5 Flash / Claude 3.5 Haiku) with transcript embeddings. |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Run
```bash
# Clone the repository
git clone https://github.com/sahil/zike.git
cd zike

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` to explore the live interactive client.

---

## 📄 Key Documents
- [PS01_ZIKE_SUBMISSION.md](PS01_ZIKE_SUBMISSION.md) — Comprehensive One-Page Submission Summary with documented historical data, Jio TRAI tariff analysis, defensibility calculus, and judge Q&A defense.
- [Reverse_Hackathon_Problem_Statements.txt](Reverse_Hackathon_Problem_Statements.txt) — Official Hackathon challenge guidelines and judging criteria.
