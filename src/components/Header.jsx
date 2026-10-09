import React, { useState, useEffect } from "react";
import { Clock, Copy, Check, Sparkles, Archive, Presentation, Users, Plus } from "lucide-react";

export function Header({ space, onOpenAiBriefing, onOpenVault, onOpenTeardown, onNewSpaceClick }) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const diff = new Date(space.expiresAt) - new Date();
      if (diff <= 0) {
        setTimeLeft("Expired & Archiving");
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [space.expiresAt]);

  const copyCode = () => {
    navigator.clipboard.writeText(`https://zike.space/join/${space.code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="glass-panel" style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 20px",
      margin: "12px 16px 8px 16px",
      borderRadius: "14px",
      zIndex: 10
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          width: "42px",
          height: "42px",
          borderRadius: "12px",
          background: "var(--gradient-brand)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.4rem",
          boxShadow: "0 0 16px rgba(99, 102, 241, 0.4)"
        }}>
          {space.emoji}
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <h1 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#fff", margin: 0 }}>
              {space.name}
            </h1>
            <span className="badge badge-cyan">{space.category}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "3px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Clock size={13} color="var(--accent-amber)" />
              <span style={{ color: "var(--accent-amber)", fontWeight: "600" }}>{timeLeft}</span>
              <span style={{ color: "var(--text-dim)" }}>auto-archive</span>
            </div>
            <span style={{ color: "var(--border-subtle)" }}>•</span>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Users size={13} />
              <span>{space.members.length} members</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Space Code Pill */}
        <button
          onClick={copyCode}
          title="Click to copy invite code"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid var(--border-subtle)",
            padding: "7px 12px",
            borderRadius: "10px",
            fontSize: "0.825rem",
            color: "var(--text-main)",
            fontWeight: "600"
          }}
        >
          <span style={{ color: "var(--accent-cyan)" }}>PIN:</span>
          <span style={{ letterSpacing: "0.05em" }}>{space.code}</span>
          {copied ? <Check size={14} color="#10b981" /> : <Copy size={13} color="var(--text-muted)" />}
        </button>

        {/* AI Briefing Button */}
        <button
          onClick={onOpenAiBriefing}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.25) 100%)",
            border: "1px solid rgba(99, 102, 241, 0.4)",
            padding: "8px 14px",
            borderRadius: "10px",
            color: "#fff",
            fontSize: "0.85rem",
            fontWeight: "600",
            boxShadow: "0 0 14px rgba(99, 102, 241, 0.2)"
          }}
        >
          <Sparkles size={15} color="#22d3ee" />
          <span>AI Catch-Up</span>
        </button>

        {/* Create Space Button */}
        <button
          onClick={onNewSpaceClick}
          title="Create New Ephemeral Space"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            background: "rgba(6, 182, 212, 0.12)",
            border: "1px solid rgba(6, 182, 212, 0.35)",
            padding: "8px 12px",
            borderRadius: "10px",
            color: "var(--accent-cyan)",
            fontSize: "0.85rem",
            fontWeight: "700"
          }}
        >
          <Plus size={14} />
          <span>+ Space</span>
        </button>

        {/* Export / Vault Button */}
        <button
          onClick={onOpenVault}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--border-subtle)",
            padding: "8px 12px",
            borderRadius: "10px",
            color: "var(--text-main)",
            fontSize: "0.85rem",
            fontWeight: "600"
          }}
        >
          <Archive size={15} color="var(--accent-emerald)" />
          <span>Event Vault</span>
        </button>

        {/* Pitch Mode Toggle */}
        <button
          onClick={onOpenTeardown}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            background: "rgba(244, 63, 94, 0.15)",
            border: "1px solid rgba(244, 63, 94, 0.35)",
            padding: "8px 13px",
            borderRadius: "10px",
            color: "#fb7185",
            fontSize: "0.85rem",
            fontWeight: "700"
          }}
        >
          <Presentation size={15} />
          <span>Pitch & Teardown</span>
        </button>
      </div>
    </header>
  );
}
