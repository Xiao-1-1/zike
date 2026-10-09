import React from "react";
import { Plus, Pin, ShieldCheck } from "lucide-react";

export function Sidebar({ spaces, activeSpaceId, onSelectSpace, onNewSpaceClick }) {
  const activeSpace = spaces.find(s => s.id === activeSpaceId) || spaces[0];

  return (
    <aside style={{
      width: "290px",
      minWidth: "290px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      height: "calc(100vh - 90px)",
      paddingLeft: "16px",
      paddingBottom: "16px"
    }}>
      {/* Brand & Identity Card */}
      <div className="glass-panel" style={{ padding: "16px 18px", borderRadius: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "var(--gradient-brand)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "800",
            color: "#fff",
            fontSize: "1.1rem",
            boxShadow: "0 0 16px rgba(99, 102, 241, 0.4)"
          }}>
            Z
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontWeight: "800", fontSize: "1.15rem", letterSpacing: "-0.02em" }}>ZIKE</span>
              <span className="badge badge-purple" style={{ fontSize: "0.65rem", padding: "2px 6px" }}>SPACES</span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
              The Ephemeral Action Messenger
            </p>
          </div>
        </div>

        <div style={{
          marginTop: "12px",
          padding: "8px 10px",
          borderRadius: "8px",
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid var(--border-subtle)",
          fontSize: "0.75rem",
          color: "var(--text-dim)",
          display: "flex",
          alignItems: "center",
          gap: "6px"
        }}>
          <ShieldCheck size={14} color="#10b981" />
          <span>Zero Phone-Number Leakage</span>
        </div>
      </div>

      {/* Spaces List & Selector */}
      <div className="glass-panel" style={{ padding: "14px", borderRadius: "14px", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px", padding: "0 4px" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)" }}>
            Active Spaces
          </span>
          <button
            onClick={onNewSpaceClick}
            title="Create New Space"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "0.75rem",
              color: "var(--accent-cyan)",
              fontWeight: "600",
              padding: "2px 6px",
              borderRadius: "6px",
              background: "rgba(6, 182, 212, 0.1)"
            }}
          >
            <Plus size={13} />
            <span>New</span>
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px", overflowY: "auto", paddingRight: "4px" }}>
          {spaces.map(s => {
            const isActive = s.id === activeSpaceId;
            return (
              <div
                key={s.id}
                onClick={() => onSelectSpace(s.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  background: isActive ? "rgba(99, 102, 241, 0.16)" : "transparent",
                  border: isActive ? "1px solid rgba(99, 102, 241, 0.35)" : "1px solid transparent",
                  transition: "all 0.15s ease"
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{s.emoji}</span>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: isActive ? "700" : "500", color: isActive ? "#fff" : "var(--text-main)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {s.name}
                  </div>
                  <div style={{ fontSize: "0.725rem", color: "var(--text-dim)" }}>
                    #{s.code} • {s.members.length} members
                  </div>
                </div>
                {isActive && (
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-cyan)", boxShadow: "0 0 8px #06b6d4" }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Space Members in active space */}
        <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--border-subtle)" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", marginBottom: "8px" }}>
            Room Members ({activeSpace.members.length})
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", maxHeight: "150px", overflowY: "auto" }}>
            {activeSpace.members.map(m => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem" }}>
                <span style={{ fontSize: "1rem" }}>{m.avatar}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: m.isCurrentUser ? "700" : "500", color: m.isCurrentUser ? "var(--accent-cyan)" : "var(--text-main)" }}>
                    {m.name} {m.isCurrentUser && "(You)"}
                  </span>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>{m.role}</div>
                </div>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Pinned Links / Vault preview */}
        {activeSpace.pinnedNotes && activeSpace.pinnedNotes.length > 0 && (
          <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px solid var(--border-subtle)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.725rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "6px" }}>
              <Pin size={12} color="var(--accent-amber)" />
              <span>Pinned in Space</span>
            </div>
            {activeSpace.pinnedNotes.map(n => (
              <div key={n.id} style={{
                fontSize: "0.725rem",
                background: "rgba(255, 255, 255, 0.02)",
                padding: "6px 8px",
                borderRadius: "6px",
                border: "1px solid var(--border-subtle)",
                marginBottom: "4px"
              }}>
                <span style={{ fontWeight: "600", color: "var(--text-main)", display: "block" }}>{n.title}</span>
                <span style={{ color: "var(--text-dim)", wordBreak: "break-all" }}>{n.content}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reverse Hackathon Badge Footer */}
      <div style={{
        padding: "10px 14px",
        borderRadius: "10px",
        background: "rgba(99, 102, 241, 0.08)",
        border: "1px solid rgba(99, 102, 241, 0.2)",
        fontSize: "0.75rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div>
          <span style={{ color: "var(--accent-cyan)", fontWeight: "700" }}>Reverse Hackathon</span>
          <div style={{ color: "var(--text-dim)", fontSize: "0.7rem" }}>PS-01: Hike Messenger</div>
        </div>
        <span className="badge badge-purple" style={{ fontSize: "0.65rem" }}>Live Demo</span>
      </div>
    </aside>
  );
}
