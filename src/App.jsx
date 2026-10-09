import React, { useState } from "react";
import { INITIAL_SPACES } from "./data/mockData";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { ChatStream } from "./components/ChatStream";
import { RightActionDock } from "./components/RightActionDock";
import { AiBriefingModal } from "./components/AiBriefingModal";
import { VaultExportModal } from "./components/VaultExportModal";
import { TeardownModal } from "./components/TeardownModal";
import { SettleUpiModal } from "./components/SettleUpiModal";
import {
  AddExpenseModal,
  CreatePollModal,
  AddTaskModal,
  CreateSpaceModal
} from "./components/ActionModals";

export function App() {
  const [spaces, setSpaces] = useState(INITIAL_SPACES);
  const [activeSpaceId, setActiveSpaceId] = useState("hack-26");

  // Modals state
  const [showAiBriefing, setShowAiBriefing] = useState(false);
  const [showVault, setShowVault] = useState(false);
  const [showTeardown, setShowTeardown] = useState(false);
  const [showSplitPayModal, setShowSplitPayModal] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCreateSpaceModal, setShowCreateSpaceModal] = useState(false);
  const [settleTargetExpense, setSettleTargetExpense] = useState(null);

  const activeSpace = spaces.find((s) => s.id === activeSpaceId) || spaces[0];

  // Helper to update active space
  const updateActiveSpace = (updater) => {
    setSpaces((prev) =>
      prev.map((s) => (s.id === activeSpaceId ? updater(s) : s))
    );
  };

  // Send a message
  const handleSendMessage = (msgPayload) => {
    const newMsg = {
      id: "msg-" + Date.now(),
      senderId: "u-sahil",
      senderName: "Sahil",
      avatar: "👨‍💻",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      reactions: {},
      ...msgPayload
    };

    updateActiveSpace((prev) => ({
      ...prev,
      messages: [...prev.messages, newMsg]
    }));

    // Realistic teammate reaction simulation
    setTimeout(() => {
      const peerResponses = [
        { name: "Arya Sharma", avatar: "👩‍🎨", text: "Got it! Syncing with the pitch notes now 🚀" },
        { name: "Kabir Verma", avatar: "⚡", text: "Testing the flow live. Looks super crisp!" },
        { name: "Priya Nair", avatar: "🎯", text: "Judges will love the clear distinction from WhatsApp." }
      ];
      const randomPeer = peerResponses[Math.floor(Math.random() * peerResponses.length)];
      const peerMsg = {
        id: "peer-" + Date.now(),
        senderId: "u-" + randomPeer.name.toLowerCase(),
        senderName: randomPeer.name,
        avatar: randomPeer.avatar,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: randomPeer.text,
        type: "text",
        reactions: { "👍": 1 }
      };

      updateActiveSpace((prev) => ({
        ...prev,
        messages: [...prev.messages, peerMsg]
      }));
    }, 1800);
  };

  // Add an expense
  const handleAddExpense = (expenseData) => {
    const newExpId = "exp-" + Date.now();
    const newExpense = {
      id: newExpId,
      date: "Just now",
      settled: false,
      ...expenseData
    };

    const expenseMsg = {
      id: "msg-exp-" + Date.now(),
      senderId: "u-sahil",
      senderName: "Sahil",
      avatar: "👨‍💻",
      text: `Added expense: ${expenseData.title} (₹${expenseData.amount})`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "expense_alert",
      expenseRef: newExpId,
      reactions: { "💸": 2 }
    };

    updateActiveSpace((prev) => ({
      ...prev,
      expenses: [newExpense, ...prev.expenses],
      messages: [...prev.messages, expenseMsg]
    }));

    // Simulated peer acknowledging expense
    setTimeout(() => {
      const peerAck = {
        id: "ack-" + Date.now(),
        senderId: "u-kabir",
        senderName: "Kabir Verma",
        avatar: "⚡",
        text: `Noted ₹${Math.round(expenseData.amount / 4)} split! Scanning UPI to settle.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
        reactions: { "✅": 2 }
      };
      updateActiveSpace((prev) => ({
        ...prev,
        messages: [...prev.messages, peerAck]
      }));
    }, 1500);
  };

  // Create a Poll
  const handleAddPoll = (pollData) => {
    const newPollId = "poll-" + Date.now();
    const newPoll = {
      id: newPollId,
      createdBy: "u-sahil",
      isActive: true,
      ...pollData
    };

    const pollMsg = {
      id: "msg-poll-" + Date.now(),
      senderId: "u-sahil",
      senderName: "Sahil",
      avatar: "👨‍💻",
      text: `Launched consensus poll: "${pollData.question}"`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "poll_alert",
      pollRef: newPollId,
      reactions: { "🗳️": 2 }
    };

    updateActiveSpace((prev) => ({
      ...prev,
      polls: [newPoll, ...prev.polls],
      messages: [...prev.messages, pollMsg]
    }));

    // Simulated teammate voting
    setTimeout(() => {
      updateActiveSpace((prev) => {
        const updatedPolls = prev.polls.map((p) => {
          if (p.id !== newPollId) return p;
          const updatedOptions = p.options.map((opt, idx) => {
            if (idx === 0) {
              return { ...opt, votes: opt.votes + 1, voters: [...(opt.voters || []), "u-arya"] };
            }
            return opt;
          });
          return { ...p, options: updatedOptions };
        });
        return { ...prev, polls: updatedPolls };
      });
    }, 2200);
  };

  // Vote on a Poll
  const handleVotePoll = (pollId, optionId) => {
    updateActiveSpace((prev) => {
      const updatedPolls = prev.polls.map((p) => {
        if (p.id !== pollId) return p;
        const updatedOptions = p.options.map((opt) => {
          const alreadyVoted = opt.voters?.includes("u-sahil");
          if (opt.id === optionId) {
            if (alreadyVoted) return opt;
            return { ...opt, votes: opt.votes + 1, voters: [...(opt.voters || []), "u-sahil"] };
          } else if (alreadyVoted) {
            return { ...opt, votes: Math.max(0, opt.votes - 1), voters: opt.voters.filter((id) => id !== "u-sahil") };
          }
          return opt;
        });
        return { ...p, options: updatedOptions };
      });
      return { ...prev, polls: updatedPolls };
    });
  };

  // Add Task
  const handleAddTask = (taskData) => {
    const newTask = {
      id: "task-" + Date.now(),
      ...taskData
    };
    updateActiveSpace((prev) => ({
      ...prev,
      tasks: [...prev.tasks, newTask]
    }));
  };

  // Toggle Task
  const handleToggleTask = (taskId) => {
    updateActiveSpace((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    }));
  };

  // Settle Expense
  const handleConfirmSettlement = (expenseId) => {
    updateActiveSpace((prev) => ({
      ...prev,
      expenses: prev.expenses.map((e) =>
        e.id === expenseId ? { ...e, settled: true } : e
      )
    }));

    const settlementNotice = {
      id: "msg-settle-" + Date.now(),
      senderId: "u-sahil",
      senderName: "Sahil",
      avatar: "👨‍💻",
      text: "⚡ Settled ₹362 to Kabir Verma via UPI successfully!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
      reactions: { "🎉": 3, "🤝": 2 }
    };

    updateActiveSpace((prev) => ({
      ...prev,
      messages: [...prev.messages, settlementNotice]
    }));
  };

  // Create Space
  const handleCreateSpace = (newSpace) => {
    setSpaces((prev) => [newSpace, ...prev]);
    setActiveSpaceId(newSpace.id);
  };

  // Self-destruct / Archive Space
  const handleArchiveSpace = (spaceId) => {
    setSpaces((prev) => prev.filter((s) => s.id !== spaceId));
    if (spaces.length > 1) {
      setActiveSpaceId(spaces.find((s) => s.id !== spaceId)?.id || "");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* Top Header */}
      <Header
        space={activeSpace}
        onOpenAiBriefing={() => setShowAiBriefing(true)}
        onOpenVault={() => setShowVault(true)}
        onOpenTeardown={() => setShowTeardown(true)}
        onNewSpaceClick={() => setShowCreateSpaceModal(true)}
      />

      {/* Main 3-Column Work Area */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left: Spaces & Member Roster */}
        <Sidebar
          spaces={spaces}
          activeSpaceId={activeSpaceId}
          onSelectSpace={setActiveSpaceId}
          onNewSpaceClick={() => setShowCreateSpaceModal(true)}
        />

        {/* Center: Live Action Stream */}
        <ChatStream
          space={activeSpace}
          onSendMessage={handleSendMessage}
          onOpenSplitPayModal={() => setShowSplitPayModal(true)}
          onOpenPollModal={() => setShowPollModal(true)}
          onOpenTaskModal={() => setShowTaskModal(true)}
          onOpenAiBriefing={() => setShowAiBriefing(true)}
          onVotePoll={handleVotePoll}
          onSettleExpense={(exp) => setSettleTargetExpense(exp)}
        />

        {/* Right: The Superpower Action Dock */}
        <RightActionDock
          space={activeSpace}
          onOpenSplitPayModal={() => setShowSplitPayModal(true)}
          onOpenPollModal={() => setShowPollModal(true)}
          onOpenTaskModal={() => setShowTaskModal(true)}
          onToggleTask={handleToggleTask}
          onVotePoll={handleVotePoll}
          onSettleExpense={(exp) => setSettleTargetExpense(exp)}
          onOpenAiBriefing={() => setShowAiBriefing(true)}
        />
      </div>

      {/* Modals */}
      {showAiBriefing && (
        <AiBriefingModal
          space={activeSpace}
          onClose={() => setShowAiBriefing(false)}
        />
      )}

      {showVault && (
        <VaultExportModal
          space={activeSpace}
          onClose={() => setShowVault(false)}
          onArchiveSpace={handleArchiveSpace}
        />
      )}

      {showTeardown && (
        <TeardownModal
          onClose={() => setShowTeardown(false)}
        />
      )}

      {settleTargetExpense && (
        <SettleUpiModal
          expense={settleTargetExpense}
          onClose={() => setSettleTargetExpense(null)}
          onConfirmSettlement={handleConfirmSettlement}
        />
      )}

      {showSplitPayModal && (
        <AddExpenseModal
          space={activeSpace}
          onClose={() => setShowSplitPayModal(false)}
          onAddExpense={handleAddExpense}
        />
      )}

      {showPollModal && (
        <CreatePollModal
          onClose={() => setShowPollModal(false)}
          onAddPoll={handleAddPoll}
        />
      )}

      {showTaskModal && (
        <AddTaskModal
          space={activeSpace}
          onClose={() => setShowTaskModal(false)}
          onAddTask={handleAddTask}
        />
      )}

      {showCreateSpaceModal && (
        <CreateSpaceModal
          onClose={() => setShowCreateSpaceModal(false)}
          onCreateSpace={handleCreateSpace}
        />
      )}
    </div>
  );
}

export default App;
