import React, { useState } from "react";
import { IndianRupee, Vote, CheckSquare, Sparkles, Plus, Check, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import confetti from "canvas-confetti";

export function RightActionDock({
  space,
  onOpenSplitPayModal,
  onOpenPollModal,
  onOpenTaskModal,
  onToggleTask,
  onVotePoll,
  onSettleExpense,
  onOpenAiBriefing
}) {
  const [activeTab, setActiveTab] = useState("split");

  // Financial calculations
  const totalSpend = space.expenses.reduce((sum, e) => sum + e.amount, 0);

  // Current user (Sahil) balances
  // Kabir paid ₹1450 (split 4 ways = 362.5 each). Sahil owes Kabir ₹362.5
  // Sahil paid ₹480 (split 3 ways = 160 each). Kabir owes Sahil ₹160, Arya owes Sahil ₹160.
  // Net balance calculation:
  let netBalance = 0;
  space.expenses.forEach(e => {
    if (e.settled) return;
    const share = e.amount / (e.splitBetween.length || 1);
    if (e.paidBy === "u-sahil") {
      // Sahil paid, others owe Sahil
      const othersCount = e.splitBetween.filter(id => id !== "u-sahil").length;
      netBalance += share * othersCount;
    } else if (e.splitBetween.includes("u-sahil")) {
      // Someone else paid, Sahil owes share
      netBalance -= share;
    }
  });

  const roundedNet = Math.round(netBalance);

  // Task metrics
  const totalTasks = space.tasks.length;
  const completedTasks = space.tasks.filter(t => t.completed).length;
  const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  return (
    <aside style={{
      width: "360px",
      minWidth: "360px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      height: "calc(100vh - 90px)",
      marginRight: "16px",
      paddingBottom: "16px"
    }}>
      {/* Tab Switcher */}
      <div className="glass-panel" style={{
        padding: "6px",
        borderRadius: "14px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: "4px"
      }}>
        <button
          onClick={() => setActiveTab("split")}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "8px 4px",
            borderRadius: "10px",
            background: activeTab === "split" ? "rgba(16, 185, 129, 0.2)" : "transparent",
            border: activeTab === "split" ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid transparent",
            color: activeTab === "split" ? "#34d399" : "var(--text-muted)",
            fontSize: "0.75rem",
            fontWeight: "600",
            gap: "3px"
          }}
        >
          <IndianRupee size={15} />
          <span>SplitPay</span>
        </button>

        <button
          onClick={() => setActiveTab("polls")}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "8px 4px",
            borderRadius: "10px",
            background: activeTab === "polls" ? "rgba(99, 102, 241, 0.2)" : "transparent",
            border: activeTab === "polls" ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid transparent",
            color: activeTab === "polls" ? "#818cf8" : "var(--text-muted)",
            fontSize: "0.75rem",
            fontWeight: "600",
            gap: "3px"
          }}
        >
          <Vote size={15} />
          <span>Polls</span>
        </button>

        <button
          onClick={() => setActiveTab("tasks")}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "8px 4px",
            borderRadius: "10px",
            background: activeTab === "tasks" ? "rgba(245, 158, 11, 0.2)" : "transparent",
            border: activeTab === "tasks" ? "1px solid rgba(245, 158, 11, 0.4)" : "1px solid transparent",
            color: activeTab === "tasks" ? "#fbbf24" : "var(--text-muted)",
            fontSize: "0.75rem",
            fontWeight: "600",
            gap: "3px"
          }}
        >
          <CheckSquare size={15} />
          <span>Tasks</span>
        </button>

        <button
          onClick={() => setActiveTab("ai")}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "8px 4px",
            borderRadius: "10px",
            background: activeTab === "ai" ? "rgba(6, 182, 212, 0.2)" : "transparent",
            border: activeTab === "ai" ? "1px solid rgba(6, 182, 212, 0.4)" : "1px solid transparent",
            color: activeTab === "ai" ? "#22d3ee" : "var(--text-muted)",
            fontSize: "0.75rem",
            fontWeight: "600",
            gap: "3px"
          }}
        >
          <Sparkles size={15} />
          <span>Zike AI</span>
        </button>
      </div>

      {/* Dock Content Panel */}
      <div className="glass-panel" style={{
        flex: 1,
        borderRadius: "14px",
        padding: "16px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "14px"
      }}>
        {/* TAB 1: SplitPay Hub */}
        {activeTab === "split" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-dim)" }}>
                Room Financials
              </div>
              <button
                onClick={onOpenSplitPayModal}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "0.75rem",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#34d399",
                  fontWeight: "700"
                }}
              >
                <Plus size={13} />
                <span>Add Expense</span>
              </button>
            </div>

            {/* Balances Card */}
            <div style={{
              padding: "14px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)",
              border: "1px solid rgba(16, 185, 129, 0.3)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Total Group Pool</span>
                <span style={{ fontSize: "1rem", fontWeight: "800", color: "#fff" }}>₹{totalSpend}</span>
              </div>

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 10px",
                borderRadius: "8px",
                background: "rgba(0, 0, 0, 0.3)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {roundedNet >= 0 ? (
                    <ArrowDownLeft size={16} color="#34d399" />
                  ) : (
                    <ArrowUpRight size={16} color="#f43f5e" />
                  )}
                  <span style={{ fontSize: "0.8rem", color: "var(--text-main)" }}>
                    {roundedNet >= 0 ? "You get back" : "You owe net"}
                  </span>
                </div>
                <span style={{
                  fontSize: "1rem",
                  fontWeight: "800",
                  color: roundedNet >= 0 ? "#34d399" : "#fb7185"
                }}>
                  ₹{Math.abs(roundedNet)}
                </span>
              </div>
            </div>

            {/* Expenses Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ fontSize: "0.725rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-dim)" }}>
                Ledger ({space.expenses.length} records)
              </div>
              {space.expenses.map((e) => (
                <div
                  key={e.id}
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ fontSize: "0.825rem", fontWeight: "600", color: "#fff" }}>{e.title}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>
                      Paid by {e.paidByName} • {e.date}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "#34d399" }}>₹{e.amount}</div>
                    <button
                      onClick={() => onSettleExpense(e)}
                      style={{
                        fontSize: "0.65rem",
                        color: "var(--accent-cyan)",
                        fontWeight: "600",
                        textDecoration: "underline"
                      }}
                    >
                      Settle via UPI
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Decision Polls */}
        {activeTab === "polls" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-dim)" }}>
                Consensus Polls
              </div>
              <button
                onClick={onOpenPollModal}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "0.75rem",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  background: "rgba(99, 102, 241, 0.15)",
                  color: "#818cf8",
                  fontWeight: "700"
                }}
              >
                <Plus size={13} />
                <span>New Poll</span>
              </button>
            </div>

            {space.polls.length === 0 ? (
              <div style={{ textAlign: "center", padding: "20px 0", color: "var(--text-dim)", fontSize: "0.8rem" }}>
                No active polls. Create one to reach instant team consensus!
              </div>
            ) : (
              space.polls.map((p) => {
                const totalVotes = p.options.reduce((sum, o) => sum + o.votes, 0) || 1;
                return (
                  <div
                    key={p.id}
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--border-subtle)"
                    }}
                  >
                    <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
                      {p.question}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {p.options.map((opt) => {
                        const pct = Math.round((opt.votes / totalVotes) * 100);
                        const hasVoted = opt.voters?.includes("u-sahil");
                        return (
                          <div
                            key={opt.id}
                            onClick={() => onVotePoll(p.id, opt.id)}
                            style={{
                              position: "relative",
                              padding: "6px 8px",
                              borderRadius: "6px",
                              background: hasVoted ? "rgba(99, 102, 241, 0.25)" : "rgba(255,255,255,0.04)",
                              border: hasVoted ? "1px solid var(--accent-cyan)" : "1px solid var(--border-subtle)",
                              cursor: "pointer",
                              overflow: "hidden"
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: `${pct}%`,
                                background: "rgba(99, 102, 241, 0.2)",
                                zIndex: 0
                              }}
                            />
                            <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                              <span style={{ color: hasVoted ? "#fff" : "var(--text-main)" }}>{opt.text}</span>
                              <span style={{ fontWeight: "700", color: "var(--accent-cyan)" }}>{pct}% ({opt.votes})</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 3: Tasks & Sprints */}
        {activeTab === "tasks" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-dim)" }}>
                Sprint Checklist
              </div>
              <button
                onClick={onOpenTaskModal}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "0.75rem",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  background: "rgba(245, 158, 11, 0.15)",
                  color: "#fbbf24",
                  fontWeight: "700"
                }}
              >
                <Plus size={13} />
                <span>Add Task</span>
              </button>
            </div>

            {/* Progress Meter */}
            <div style={{
              padding: "12px",
              borderRadius: "10px",
              background: "rgba(245, 158, 11, 0.08)",
              border: "1px solid rgba(245, 158, 11, 0.25)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "6px" }}>
                <span style={{ color: "var(--text-muted)" }}>Sprint Progress</span>
                <span style={{ fontWeight: "700", color: "#fbbf24" }}>{completedTasks}/{totalTasks} ({taskProgress}%)</span>
              </div>
              <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255, 255, 255, 0.1)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${taskProgress}%`, background: "var(--gradient-warm)", transition: "width 0.4s ease" }} />
              </div>
            </div>

            {/* Task Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {space.tasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    onToggleTask(t.id);
                    if (!t.completed) triggerConfetti();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 10px",
                    borderRadius: "8px",
                    background: t.completed ? "rgba(16, 185, 129, 0.08)" : "rgba(255, 255, 255, 0.03)",
                    border: t.completed ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid var(--border-subtle)",
                    cursor: "pointer"
                  }}
                >
                  <div style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "4px",
                    border: t.completed ? "none" : "1px solid var(--border-subtle)",
                    background: t.completed ? "#10b981" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {t.completed && <Check size={12} color="#fff" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: "0.8rem",
                      color: t.completed ? "var(--text-dim)" : "var(--text-main)",
                      textDecoration: t.completed ? "line-through" : "none"
                    }}>
                      {t.title}
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>
                      {t.assignee} • <span style={{ color: t.priority === "Urgent" ? "#fb7185" : "inherit" }}>{t.priority}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Zike AI Context Engine */}
        {activeTab === "ai" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Sparkles size={16} color="#22d3ee" />
              <div style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-cyan)" }}>
                AI Context & Decision Engine
              </div>
            </div>

            <div style={{
              padding: "14px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(99, 102, 241, 0.1) 100%)",
              border: "1px solid rgba(6, 182, 212, 0.3)",
              fontSize: "0.8rem",
              lineHeight: "1.5"
            }}>
              <p style={{ color: "var(--text-muted)", marginBottom: "10px" }}>
                Unlike WhatsApp where decisions get buried in 800 unread messages, Zike AI automatically synthesizes what happened while you were away:
              </p>
              <button
                onClick={onOpenAiBriefing}
                style={{
                  width: "100%",
                  padding: "9px",
                  borderRadius: "8px",
                  background: "var(--gradient-brand)",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "0.8rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: "0 0 16px rgba(99, 102, 241, 0.3)"
                }}
              >
                <Sparkles size={14} />
                <span>Generate Executive Catch-Up</span>
              </button>
            </div>

            <div style={{
              padding: "12px",
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--border-subtle)",
              fontSize: "0.75rem",
              color: "var(--text-muted)"
            }}>
              <div style={{ fontWeight: "700", color: "#fff", marginBottom: "4px" }}>🎯 Key Decisions Tracked:</div>
              <ul style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                <li>Chosen PS-01 Hike Messenger for teardown.</li>
                <li>Strategic direction: Action-driven ephemeral messenger.</li>
                <li>Midnight snacks ordered by Kabir (₹1450).</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
