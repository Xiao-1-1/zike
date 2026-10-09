import React, { useState } from "react";
import { X, IndianRupee, Vote, CheckSquare, Plus, Users, Sparkles } from "lucide-react";

export function AddExpenseModal({ space, onClose, onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    onAddExpense({
      title,
      amount: parseFloat(amount),
      category,
      paidBy: "u-sahil",
      paidByName: "Sahil",
      splitBetween: space.members.map((m) => m.id)
    });
    onClose();
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.75)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
      padding: "20px"
    }}>
      <div className="glass-panel animate-slide-up" style={{ width: "420px", maxWidth: "100%", padding: "24px", borderRadius: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <IndianRupee size={20} color="#34d399" />
            <h3 style={{ fontSize: "1.1rem", color: "#fff", margin: 0 }}>Add Group Expense</h3>
          </div>
          <button onClick={onClose} style={{ color: "var(--text-muted)" }}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>What was it for?</label>
            <input
              type="text"
              required
              placeholder="e.g. Red Bull & Chai, Uber cab, Domain fee"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", marginTop: "4px" }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Amount (₹)</label>
            <input
              type="number"
              required
              placeholder="e.g. 650"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: "100%", marginTop: "4px" }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: "100%", marginTop: "4px" }}
            >
              <option value="Food">🍕 Food & Drinks</option>
              <option value="Travel">🚕 Travel & Commute</option>
              <option value="Stay">🏨 Stay & Hotel</option>
              <option value="Tools">⚡ Hackathon Tools / API</option>
              <option value="Other">📦 Other</option>
            </select>
          </div>

          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", padding: "8px 10px", background: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
            Will be split equally across all <b>{space.members.length} members</b> (₹{amount ? Math.round(amount / space.members.length) : 0} each).
          </div>

          <button
            type="submit"
            style={{
              padding: "11px",
              borderRadius: "10px",
              background: "var(--accent-emerald)",
              color: "#fff",
              fontWeight: "700",
              fontSize: "0.85rem",
              marginTop: "8px"
            }}
          >
            Add Expense & Post to Chat
          </button>
        </form>
      </div>
    </div>
  );
}

export function CreatePollModal({ onClose, onAddPoll }) {
  const [question, setQuestion] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !opt1 || !opt2) return;
    const options = [
      { id: "opt-" + Date.now() + "-1", text: opt1, votes: 1, voters: ["u-sahil"] },
      { id: "opt-" + Date.now() + "-2", text: opt2, votes: 0, voters: [] }
    ];
    if (opt3.trim()) {
      options.push({ id: "opt-" + Date.now() + "-3", text: opt3, votes: 0, voters: [] });
    }
    onAddPoll({ question, options });
    onClose();
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.75)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
      padding: "20px"
    }}>
      <div className="glass-panel animate-slide-up" style={{ width: "420px", maxWidth: "100%", padding: "24px", borderRadius: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Vote size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: "1.1rem", color: "#fff", margin: 0 }}>Create Consensus Poll</h3>
          </div>
          <button onClick={onClose} style={{ color: "var(--text-muted)" }}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Decision Question</label>
            <input
              type="text"
              required
              placeholder="e.g. Which demo scenario should we present first?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{ width: "100%", marginTop: "4px" }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Option 1</label>
            <input
              type="text"
              required
              placeholder="Option 1"
              value={opt1}
              onChange={(e) => setOpt1(e.target.value)}
              style={{ width: "100%", marginTop: "4px" }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Option 2</label>
            <input
              type="text"
              required
              placeholder="Option 2"
              value={opt2}
              onChange={(e) => setOpt2(e.target.value)}
              style={{ width: "100%", marginTop: "4px" }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Option 3 (Optional)</label>
            <input
              type="text"
              placeholder="Option 3"
              value={opt3}
              onChange={(e) => setOpt3(e.target.value)}
              style={{ width: "100%", marginTop: "4px" }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "11px",
              borderRadius: "10px",
              background: "var(--gradient-brand)",
              color: "#fff",
              fontWeight: "700",
              fontSize: "0.85rem",
              marginTop: "8px"
            }}
          >
            Launch Poll to Room
          </button>
        </form>
      </div>
    </div>
  );
}

export function AddTaskModal({ space, onClose, onAddTask }) {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState(space.members[0]?.name || "Sahil");
  const [priority, setPriority] = useState("High");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAddTask({
      title,
      assignee,
      priority,
      completed: false
    });
    onClose();
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.75)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
      padding: "20px"
    }}>
      <div className="glass-panel animate-slide-up" style={{ width: "420px", maxWidth: "100%", padding: "24px", borderRadius: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckSquare size={20} color="var(--accent-amber)" />
            <h3 style={{ fontSize: "1.1rem", color: "#fff", margin: 0 }}>Add Sprint Task</h3>
          </div>
          <button onClick={onClose} style={{ color: "var(--text-muted)" }}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Task Description</label>
            <input
              type="text"
              required
              placeholder="e.g. Practice 3-min pitch timing"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", marginTop: "4px" }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Assignee</label>
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              style={{ width: "100%", marginTop: "4px" }}
            >
              {space.members.map((m) => (
                <option key={m.id} value={m.name}>{m.name} ({m.role})</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{ width: "100%", marginTop: "4px" }}
            >
              <option value="Urgent">🚨 Urgent</option>
              <option value="High">⚡ High</option>
              <option value="Medium">🔹 Medium</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              padding: "11px",
              borderRadius: "10px",
              background: "var(--accent-amber)",
              color: "#000",
              fontWeight: "700",
              fontSize: "0.85rem",
              marginTop: "8px"
            }}
          >
            Add to Sprint Checklist
          </button>
        </form>
      </div>
    </div>
  );
}

export function CreateSpaceModal({ onClose, onCreateSpace }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Hackathon");
  const [durationHours, setDurationHours] = useState(24);
  const [emoji, setEmoji] = useState("🚀");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    onCreateSpace({
      id: "space-" + Date.now(),
      code,
      name,
      emoji,
      category,
      description: `Temporary ${category} space created for ${durationHours}h collaboration`,
      expiresAt: new Date(Date.now() + durationHours * 3600 * 1000).toISOString(),
      members: [
        { id: "u-sahil", name: "Sahil", role: "Organizer", avatar: "👨‍💻", isCurrentUser: true, upiId: "sahil@okaxis" }
      ],
      messages: [
        {
          id: "m-welcome",
          senderId: "u-sahil",
          senderName: "Sahil",
          avatar: "👨‍💻",
          text: `Welcome to #${code}! This ephemeral space will auto-archive in ${durationHours} hours. No phone number sharing required.`,
          timestamp: "Just now",
          type: "text",
          reactions: { "👋": 1 }
        }
      ],
      expenses: [],
      polls: [],
      tasks: [],
      pinnedNotes: []
    });
    onClose();
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.75)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
      padding: "20px"
    }}>
      <div className="glass-panel animate-slide-up" style={{ width: "440px", maxWidth: "100%", padding: "24px", borderRadius: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: "1.1rem", color: "#fff", margin: 0 }}>Create Ephemeral Space</h3>
          </div>
          <button onClick={onClose} style={{ color: "var(--text-muted)" }}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Space Purpose / Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Goa Trip 2026, Flat 402 Wifi Split, Project Alpha"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", marginTop: "4px" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: "100%", marginTop: "4px" }}
              >
                <option value="Hackathon">⚡ Hackathon</option>
                <option value="Trip">🏖️ Vacation / Trip</option>
                <option value="Flatmates">🏠 Flatmates</option>
                <option value="Event">🎉 Party / Event</option>
                <option value="Project">💼 Project</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Lifespan</label>
              <select
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                style={{ width: "100%", marginTop: "4px" }}
              >
                <option value={12}>12 Hours (Party / Dinner)</option>
                <option value={24}>24 Hours (Hackathon)</option>
                <option value={72}>3 Days (Weekend Trip)</option>
                <option value={168}>7 Days (Sprint)</option>
                <option value={720}>30 Days (Apartment)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            style={{
              padding: "12px",
              borderRadius: "10px",
              background: "var(--gradient-brand)",
              color: "#fff",
              fontWeight: "700",
              fontSize: "0.85rem",
              marginTop: "8px"
            }}
          >
            Launch Ephemeral Space
          </button>
        </form>
      </div>
    </div>
  );
}
