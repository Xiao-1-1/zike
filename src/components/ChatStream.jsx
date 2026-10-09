import React, { useState, useRef, useEffect } from "react";
import { Send, Smile, Plus, IndianRupee, Vote, CheckSquare, Sparkles, AlertCircle } from "lucide-react";
import { STICKERS } from "../data/mockData";

export function ChatStream({
  space,
  onSendMessage,
  onOpenSplitPayModal,
  onOpenPollModal,
  onOpenTaskModal,
  onOpenAiBriefing,
  onVotePoll,
  onSettleExpense
}) {
  const [inputText, setInputText] = useState("");
  const [showStickers, setShowStickers] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [space.messages]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage({
      text: inputText,
      type: "text"
    });
    setInputText("");
    setShowStickers(false);
    setShowQuickActions(false);
  };

  const handleSendSticker = (sticker) => {
    onSendMessage({
      text: sticker.label,
      sticker: sticker,
      type: "sticker"
    });
    setShowStickers(false);
  };

  return (
    <div className="glass-panel" style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 90px)",
      marginRight: "16px",
      borderRadius: "16px",
      overflow: "hidden",
      position: "relative"
    }}>
      {/* Purpose Banner */}
      <div style={{
        padding: "10px 18px",
        background: "rgba(99, 102, 241, 0.08)",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "0.8rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "var(--accent-cyan)", fontWeight: "700" }}>ROOM GOAL:</span>
          <span style={{ color: "var(--text-muted)" }}>{space.description}</span>
        </div>
        <div className="badge badge-emerald" style={{ fontSize: "0.7rem" }}>
          Active Session
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "14px"
      }}>
        {space.messages.map((msg) => {
          const isMe = msg.senderId === "u-sahil";
          const associatedExpense = msg.expenseRef
            ? space.expenses.find((e) => e.id === msg.expenseRef)
            : null;
          const associatedPoll = msg.pollRef
            ? space.polls.find((p) => p.id === msg.pollRef)
            : null;

          return (
            <div
              key={msg.id}
              className="animate-slide-up"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: isMe ? "flex-end" : "flex-start",
                width: "100%"
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "8px",
                maxWidth: "80%",
                flexDirection: isMe ? "row-reverse" : "row"
              }}>
                {/* Avatar */}
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: isMe ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  flexShrink: 0
                }}>
                  {msg.avatar}
                </div>

                {/* Bubble Container */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}>
                  <div style={{ fontSize: "0.725rem", color: "var(--text-dim)", marginBottom: "3px", padding: "0 4px" }}>
                    {msg.senderName} • {msg.timestamp}
                  </div>

                  {/* Regular Text Message */}
                  {msg.type === "text" && (
                    <div style={{
                      padding: "10px 14px",
                      borderRadius: isMe ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                      background: isMe
                        ? "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)"
                        : "rgba(30, 41, 59, 0.75)",
                      color: "#fff",
                      fontSize: "0.9rem",
                      lineHeight: "1.45",
                      border: isMe ? "none" : "1px solid var(--border-subtle)",
                      boxShadow: isMe ? "0 4px 14px rgba(79, 70, 229, 0.3)" : "none"
                    }}>
                      {msg.text}
                    </div>
                  )}

                  {/* Hike-Style Sticker Message */}
                  {msg.type === "sticker" && (
                    <div style={{
                      padding: "12px 16px",
                      borderRadius: "16px",
                      background: msg.sticker?.bg || "var(--gradient-brand)",
                      color: "#fff",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      border: "2px solid rgba(255,255,255,0.2)"
                    }}>
                      <span style={{ fontSize: "1.8rem" }}>{msg.sticker?.emoji}</span>
                      <span style={{ fontWeight: "800", fontSize: "1.05rem", letterSpacing: "0.02em" }}>
                        {msg.text}
                      </span>
                    </div>
                  )}

                  {/* Interactive Expense Card in Chat */}
                  {msg.type === "expense_alert" && (
                    <div style={{
                      width: "320px",
                      borderRadius: "14px",
                      background: "linear-gradient(180deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)",
                      border: "1px solid rgba(16, 185, 129, 0.35)",
                      padding: "14px",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.35)"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span className="badge badge-emerald">SplitPay Added</span>
                        <span style={{ fontWeight: "800", color: "#34d399", fontSize: "1.1rem" }}>
                          ₹{associatedExpense ? associatedExpense.amount : 1450}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "700", color: "#fff", marginBottom: "4px" }}>
                        {associatedExpense ? associatedExpense.title : "Midnight Pizza & Red Bull"}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "12px" }}>
                        Paid by {associatedExpense ? associatedExpense.paidByName : "Kabir Verma"} • Split between 4 members
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                          Your share: <b style={{ color: "#fff" }}>₹{associatedExpense ? Math.round(associatedExpense.amount / 4) : 362}</b>
                        </span>
                        <button
                          onClick={() => onSettleExpense && onSettleExpense(associatedExpense || { id: "e-1", amount: 1450, title: "Pizza", paidByName: "Kabir" })}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "8px",
                            background: "var(--accent-emerald)",
                            color: "#fff",
                            fontSize: "0.775rem",
                            fontWeight: "700",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                        >
                          <IndianRupee size={12} />
                          <span>Pay via UPI</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Interactive Poll Card in Chat */}
                  {msg.type === "poll_alert" && associatedPoll && (
                    <div style={{
                      width: "340px",
                      borderRadius: "14px",
                      background: "linear-gradient(180deg, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)",
                      border: "1px solid rgba(99, 102, 241, 0.35)",
                      padding: "14px",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.35)"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                        <Vote size={15} color="var(--accent-cyan)" />
                        <span className="badge badge-purple">Live Consensus Poll</span>
                      </div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "700", color: "#fff", marginBottom: "10px" }}>
                        {associatedPoll.question}
                      </div>

                      {/* Options */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {associatedPoll.options.map((opt) => {
                          const totalVotes = associatedPoll.options.reduce((sum, o) => sum + o.votes, 0) || 1;
                          const pct = Math.round((opt.votes / totalVotes) * 100);
                          const hasVoted = opt.voters?.includes("u-sahil");

                          return (
                            <div
                              key={opt.id}
                              onClick={() => onVotePoll && onVotePoll(associatedPoll.id, opt.id)}
                              style={{
                                position: "relative",
                                padding: "8px 10px",
                                borderRadius: "8px",
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
                                  zIndex: 0,
                                  transition: "width 0.4s ease"
                                }}
                              />
                              <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem" }}>
                                <span style={{ color: hasVoted ? "#fff" : "var(--text-main)", fontWeight: hasVoted ? "700" : "500" }}>
                                  {opt.text}
                                </span>
                                <span style={{ fontWeight: "700", color: "var(--accent-cyan)", marginLeft: "8px" }}>
                                  {pct}% ({opt.votes})
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Reaction Pills */}
                  {msg.reactions && (
                    <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
                      {Object.entries(msg.reactions).map(([emoji, count]) => (
                        <span
                          key={emoji}
                          style={{
                            fontSize: "0.7rem",
                            background: "rgba(255,255,255,0.06)",
                            padding: "2px 6px",
                            borderRadius: "10px",
                            border: "1px solid var(--border-subtle)"
                          }}
                        >
                          {emoji} {count}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Popovers */}

      {/* Stickers Drawer */}
      {showStickers && (
        <div className="glass-panel" style={{
          position: "absolute",
          bottom: "75px",
          left: "20px",
          padding: "12px",
          borderRadius: "14px",
          width: "300px",
          zIndex: 20,
          boxShadow: "var(--shadow-lg)"
        }}>
          <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--text-dim)", textTransform: "uppercase", marginBottom: "8px" }}>
            Hike Culture Stickers 🇮🇳
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {STICKERS.map((st) => (
              <button
                key={st.id}
                onClick={() => handleSendSticker(st)}
                style={{
                  background: st.bg,
                  color: "#fff",
                  padding: "8px 10px",
                  borderRadius: "10px",
                  fontSize: "0.8rem",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  textAlign: "left"
                }}
              >
                <span>{st.emoji}</span>
                <span style={{ fontSize: "0.75rem" }}>{st.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Action Dock Popover */}
      {showQuickActions && (
        <div className="glass-panel" style={{
          position: "absolute",
          bottom: "75px",
          left: "60px",
          padding: "10px",
          borderRadius: "14px",
          width: "240px",
          zIndex: 20,
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
          gap: "4px"
        }}>
          <div style={{ fontSize: "0.7rem", fontWeight: "700", color: "var(--text-dim)", textTransform: "uppercase", padding: "4px 8px" }}>
            Embed Action Dock
          </div>
          <button
            onClick={() => { setShowQuickActions(false); onOpenSplitPayModal(); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 10px",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "0.85rem",
              background: "rgba(16, 185, 129, 0.1)",
              textAlign: "left"
            }}
          >
            <IndianRupee size={16} color="#34d399" />
            <div>
              <div style={{ fontWeight: "600" }}>Add Split Expense</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Instant UPI calculation</div>
            </div>
          </button>

          <button
            onClick={() => { setShowQuickActions(false); onOpenPollModal(); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 10px",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "0.85rem",
              background: "rgba(99, 102, 241, 0.1)",
              textAlign: "left"
            }}
          >
            <Vote size={16} color="#818cf8" />
            <div>
              <div style={{ fontWeight: "600" }}>Launch Quick Poll</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Instant team consensus</div>
            </div>
          </button>

          <button
            onClick={() => { setShowQuickActions(false); onOpenTaskModal(); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 10px",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "0.85rem",
              background: "rgba(245, 158, 11, 0.1)",
              textAlign: "left"
            }}
          >
            <CheckSquare size={16} color="#fbbf24" />
            <div>
              <div style={{ fontWeight: "600" }}>Create Action Task</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Sprint checklist</div>
            </div>
          </button>
        </div>
      )}

      {/* Input Bar */}
      <form
        onSubmit={handleSend}
        style={{
          padding: "12px 18px",
          background: "rgba(15, 23, 42, 0.85)",
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
      >
        {/* Quick Action Button */}
        <button
          type="button"
          onClick={() => { setShowQuickActions(!showQuickActions); setShowStickers(false); }}
          title="Embed Action Dock (Expense / Poll / Task)"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background: showQuickActions ? "var(--accent-primary)" : "rgba(255, 255, 255, 0.06)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Plus size={18} />
        </button>

        {/* Sticker Button */}
        <button
          type="button"
          onClick={() => { setShowStickers(!showStickers); setShowQuickActions(false); }}
          title="Indian Culture Stickers"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background: showStickers ? "rgba(245, 158, 11, 0.2)" : "rgba(255, 255, 255, 0.06)",
            color: showStickers ? "var(--accent-amber)" : "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Smile size={18} />
        </button>

        {/* Input Text Box */}
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Message #${space.code}... (e.g. 'Split ₹600 chai' or type message)`}
          style={{
            flex: 1,
            background: "rgba(30, 41, 59, 0.6)",
            border: "1px solid var(--border-subtle)",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: "10px",
            fontSize: "0.9rem"
          }}
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputText.trim()}
          style={{
            width: "42px",
            height: "40px",
            borderRadius: "10px",
            background: inputText.trim() ? "var(--gradient-brand)" : "rgba(255, 255, 255, 0.08)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: inputText.trim() ? 1 : 0.4,
            cursor: inputText.trim() ? "pointer" : "default"
          }}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
