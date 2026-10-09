import React, { useState } from "react";
import { Archive, X, Download, Check, ShieldCheck, Trash2 } from "lucide-react";
import confetti from "canvas-confetti";

export function VaultExportModal({ space, onClose, onArchiveSpace }) {
  const [downloaded, setDownloaded] = useState(false);
  const totalSpend = space.expenses.reduce((s, e) => s + e.amount, 0);

  const handleDownload = () => {
    setDownloaded(true);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 }
    });

    // Real client-side Blob synthesis for instant Markdown vault download
    const vaultContent = `# ZIKE EVENT VAULT: ${space.name}
Generated: ${new Date().toLocaleString()}
Space ID: ${space.id} (Code: #${space.code})
Participants: ${space.members.map(m => m.name).join(", ")}

---

## 1. FINANCIAL RECONCILIATION
Total Space Spend: ₹${totalSpend}
Settlement Ledger:
${space.expenses.map(e => `- [${e.settled ? "SETTLED" : "PENDING"}] ₹${e.amount} - ${e.title} (Paid by ${e.paidByName}, Split between ${e.splitBetween.length} members)`).join("\n")}

## 2. RECORDED CONSENSUS & DECISIONS
${space.polls.map(p => {
  const topOption = [...p.options].sort((a, b) => b.votes - a.votes)[0];
  return `### Poll: ${p.question}\n- Winner: ${topOption?.text || "N/A"} (${topOption?.votes || 0} votes)\n- All Options: ${p.options.map(o => `${o.text} (${o.votes} votes)`).join(", ")}`;
}).join("\n\n")}

## 3. SPRINT DELIVERABLES & TASKS
${space.tasks.map(t => `- [${t.completed ? "x" : " "}] ${t.title} (${t.priority.toUpperCase()} priority)`).join("\n")}

---
Exported via Zike Spaces — Ephemeral Action-Driven Collaboration
Reverse Hackathon 2026 (PS-01 Hike Messenger Teardown & Rethink)
`;

    const blob = new Blob([vaultContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Zike_Vault_${space.id}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
      padding: "20px"
    }}>
      <div className="glass-panel animate-slide-up" style={{
        width: "620px",
        maxWidth: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        borderRadius: "18px",
        padding: "26px",
        border: "1px solid rgba(16, 185, 129, 0.4)",
        boxShadow: "0 0 40px rgba(16, 185, 129, 0.2)",
        position: "relative"
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Archive size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h2 style={{ fontSize: "1.25rem", color: "#fff", margin: 0 }}>Zike Event Vault</h2>
                <span className="badge badge-emerald">Archival Engine</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
                Automatic synthesis of temporary session #{space.code}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: "6px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.06)",
              color: "var(--text-muted)"
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Narrative Box */}
        <div style={{
          padding: "12px 16px",
          borderRadius: "10px",
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid var(--border-subtle)",
          fontSize: "0.825rem",
          color: "var(--text-main)",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <ShieldCheck size={18} color="#10b981" />
          <span>
            <b>Anti-Clutter Guarantee:</b> Instead of leaving a dead group chat on WhatsApp forever, Zike condenses all memories, debts, and files into this Vault, allowing you to safely self-destruct chat logs.
          </span>
        </div>

        {/* The Printable One-Page Card Preview */}
        <div style={{
          borderRadius: "14px",
          background: "rgba(15, 23, 42, 0.9)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "18px",
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "10px" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", color: "#fff", margin: 0 }}>{space.name}</h3>
              <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>ID: {space.id} • Code: #{space.code}</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--accent-cyan)", fontWeight: "700" }}>{space.members.length} Participants</span>
              <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>Reverse Hackathon 2026</div>
            </div>
          </div>

          {/* Section: Financials */}
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "#34d399", marginBottom: "6px" }}>
              💰 Financial Summary (Total: ₹{totalSpend})
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {space.expenses.map((e) => (
                <div key={e.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <span>{e.title} (Paid by {e.paidByName})</span>
                  <span style={{ fontWeight: "700", color: "#fff" }}>₹{e.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Decisions */}
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "#818cf8", marginBottom: "6px" }}>
              🗳️ Recorded Consensus
            </div>
            {space.polls.map((p) => {
              const topOption = [...p.options].sort((a, b) => b.votes - a.votes)[0];
              return (
                <div key={p.id} style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <b>{p.question}:</b> <span style={{ color: "var(--accent-cyan)" }}>Winner: {topOption?.text} ({topOption?.votes} votes)</span>
                </div>
              );
            })}
          </div>

          {/* Section: Tasks */}
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "#fbbf24", marginBottom: "6px" }}>
              ⚡ Completed Deliverables
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {space.tasks.filter(t => t.completed).map((t) => (
                <span key={t.id} style={{
                  fontSize: "0.725rem",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#34d399",
                  border: "1px solid rgba(16, 185, 129, 0.3)"
                }}>
                  ✓ {t.title}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleDownload}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px",
              background: "var(--gradient-brand)",
              color: "#fff",
              fontWeight: "700",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
          >
            {downloaded ? <Check size={16} /> : <Download size={16} />}
            <span>{downloaded ? "Vault Exported!" : "Export 1-Page Vault PDF / JSON"}</span>
          </button>

          <button
            onClick={() => {
              onArchiveSpace(space.id);
              onClose();
            }}
            style={{
              padding: "12px 18px",
              borderRadius: "10px",
              background: "rgba(244, 63, 94, 0.15)",
              border: "1px solid rgba(244, 63, 94, 0.35)",
              color: "#fb7185",
              fontWeight: "700",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <Trash2 size={16} />
            <span>Self-Destruct Space</span>
          </button>
        </div>
      </div>
    </div>
  );
}
