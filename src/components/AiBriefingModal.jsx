import React from "react";
import { Sparkles, X, CheckCircle2, IndianRupee, Clock, Zap, Share2 } from "lucide-react";

export function AiBriefingModal({ space, onClose }) {
  const totalSpend = space.expenses.reduce((s, e) => s + e.amount, 0);
  const pendingTasks = space.tasks.filter((t) => !t.completed);

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.75)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
      padding: "20px"
    }}>
      <div className="glass-panel animate-slide-up" style={{
        width: "560px",
        maxWidth: "100%",
        borderRadius: "18px",
        padding: "24px",
        border: "1px solid rgba(6, 182, 212, 0.4)",
        boxShadow: "0 0 35px rgba(6, 182, 212, 0.25)",
        position: "relative"
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Sparkles size={20} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: "1.2rem", color: "#fff", margin: 0 }}>Zike AI Catch-Up Briefing</h2>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
                Synthesized from #{space.code} stream • While you were away
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

        {/* Executive Summary Card */}
        <div style={{
          padding: "14px 16px",
          borderRadius: "12px",
          background: "rgba(6, 182, 212, 0.08)",
          border: "1px solid rgba(6, 182, 212, 0.2)",
          marginBottom: "16px",
          fontSize: "0.85rem",
          lineHeight: "1.5"
        }}>
          <span style={{ fontWeight: "700", color: "var(--accent-cyan)" }}>TL;DR Executive Summary:</span>
          <p style={{ marginTop: "4px", color: "var(--text-main)" }}>
            The team locked <b>PS-01 Hike Messenger</b> as the hackathon track and agreed to rebuild it as an <b>Action-Driven Ephemeral Collaboration Space</b>. UI tokens and SplitPay logic are complete. Pitch deck rehearsal is the next critical milestone.
          </p>
        </div>

        {/* 3 Pillars */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
          {/* Key Decisions */}
          <div style={{
            padding: "12px",
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid var(--border-subtle)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", fontWeight: "700", color: "#a5b4fc", marginBottom: "8px" }}>
              <CheckCircle2 size={14} color="#818cf8" />
              <span>Key Decisions Reached</span>
            </div>
            <ul style={{ paddingLeft: "16px", fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "4px" }}>
              <li>Rejected generic WhatsApp clone strategy.</li>
              <li>Focused on temporary spaces with zero contact book sharing.</li>
              <li>Locked built-in UPI settlement as core hook.</li>
            </ul>
          </div>

          {/* Pending Tasks */}
          <div style={{
            padding: "12px",
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid var(--border-subtle)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", fontWeight: "700", color: "#fbbf24", marginBottom: "8px" }}>
              <Clock size={14} color="#fbbf24" />
              <span>Pending High Priorities</span>
            </div>
            <ul style={{ paddingLeft: "16px", fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "4px" }}>
              {pendingTasks.slice(0, 3).map((t) => (
                <li key={t.id}>
                  {t.title} (<b style={{ color: "var(--text-main)" }}>{t.assignee}</b>)
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Financial Snapshot */}
        <div style={{
          padding: "10px 14px",
          borderRadius: "10px",
          background: "rgba(16, 185, 129, 0.08)",
          border: "1px solid rgba(16, 185, 129, 0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "18px",
          fontSize: "0.8rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <IndianRupee size={16} color="#34d399" />
            <span style={{ color: "var(--text-main)" }}>Total Pool Spend: <b>₹{totalSpend}</b> across {space.expenses.length} bills</span>
          </div>
          <span className="badge badge-emerald">Audited by Zike Engine</span>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            background: "var(--gradient-brand)",
            color: "#fff",
            fontWeight: "700",
            fontSize: "0.85rem"
          }}
        >
          Got it, Take Me Back to Chat
        </button>
      </div>
    </div>
  );
}
