import React, { useState } from "react";
import { IndianRupee, X, Check, QrCode, ExternalLink, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

export function SettleUpiModal({ expense, onClose, onConfirmSettlement }) {
  const [settled, setSettled] = useState(false);
  const amountToPay = expense ? Math.round(expense.amount / (expense.splitBetween?.length || 4)) : 362;
  const payeeName = expense?.paidByName || "Kabir Verma";
  const upiId = "kabir@icici";

  const handleConfirm = () => {
    setSettled(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      onConfirmSettlement(expense?.id);
      onClose();
    }, 1200);
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
        width: "440px",
        maxWidth: "100%",
        borderRadius: "18px",
        padding: "24px",
        border: "1px solid rgba(16, 185, 129, 0.4)",
        boxShadow: "0 0 40px rgba(16, 185, 129, 0.25)",
        position: "relative",
        textAlign: "center"
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            padding: "6px",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.06)",
            color: "var(--text-muted)"
          }}
        >
          <X size={18} />
        </button>

        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "12px"
        }}>
          <IndianRupee size={26} color="#fff" />
        </div>

        <h2 style={{ fontSize: "1.25rem", color: "#fff", margin: 0 }}>Instant UPI Settlement</h2>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "4px 0 16px 0" }}>
          Settle your split directly to <b>{payeeName}</b>
        </p>

        {/* Amount Card */}
        <div style={{
          padding: "16px",
          borderRadius: "12px",
          background: "rgba(16, 185, 129, 0.1)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          marginBottom: "18px"
        }}>
          <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>
            Your Share for "{expense?.title || "Team Pizza"}"
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "800", color: "#34d399", margin: "4px 0" }}>
            ₹{amountToPay}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            UPI ID: <code style={{ color: "var(--accent-cyan)" }}>{upiId}</code>
          </div>
        </div>

        {/* Simulated UPI QR Code */}
        <div style={{
          background: "#fff",
          padding: "14px",
          borderRadius: "12px",
          display: "inline-block",
          marginBottom: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)"
        }}>
          <div style={{
            width: "140px",
            height: "140px",
            background: `repeating-linear-gradient(0deg, #1e293b, #1e293b 8px, #fff 8px, #fff 16px), repeating-linear-gradient(90deg, #1e293b, #1e293b 8px, #fff 8px, #fff 16px)`,
            backgroundBlendMode: "difference",
            borderRadius: "6px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{
              background: "#10b981",
              color: "#fff",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "0.7rem",
              fontWeight: "800",
              boxShadow: "0 2px 6px rgba(0,0,0,0.5)"
            }}>
              UPI ₹{amountToPay}
            </div>
          </div>
          <div style={{ color: "#0f172a", fontSize: "0.7rem", fontWeight: "700", marginTop: "6px" }}>
            Scan with GPay / PhonePe / Paytm
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <a
            href={`upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${amountToPay}&cu=INR&tn=${encodeURIComponent("Zike Split: " + (expense?.title || "Expense"))}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "10px",
              borderRadius: "10px",
              background: "rgba(6, 182, 212, 0.15)",
              border: "1px solid rgba(6, 182, 212, 0.35)",
              color: "#38bdf8",
              fontSize: "0.8rem",
              fontWeight: "600",
              textDecoration: "none"
            }}
          >
            <ExternalLink size={14} />
            <span>Launch Native UPI App (`upi://pay`)</span>
          </a>

          <button
            onClick={handleConfirm}
            style={{
              padding: "12px",
              borderRadius: "10px",
              background: settled ? "#10b981" : "var(--gradient-brand)",
              color: "#fff",
              fontWeight: "700",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 4px 16px rgba(16, 185, 129, 0.3)"
            }}
          >
            <Check size={18} />
            <span>{settled ? "Payment Confirmed! Updating..." : `Mark ₹${amountToPay} as Settled`}</span>
          </button>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "0.725rem", color: "var(--text-dim)" }}>
            <ShieldCheck size={14} color="#10b981" />
            <span>Encrypted zero-fee peer-to-peer settlement</span>
          </div>
        </div>
      </div>
    </div>
  );
}
