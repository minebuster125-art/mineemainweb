"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "bot";
  content: string;
}

const KNOWLEDGE_BASE = {
  services:
    "MineProductions offers: Recreation Videos (recreating popular Minecraft content), Custom Maps (building unique Minecraft maps), Challenge Content (designing challenge and competition maps), and Interactive Videos (creating engaging interactive Minecraft experiences for YouTube).",
  pricing:
    "Our pricing ranges from $50 to $500+, depending on project complexity, scope, and timeline. Recreation videos start at $50, custom maps from $100, challenge content from $75, and interactive videos from $150.",
  turnaround:
    "Standard turnaround time is 3-14 days depending on project scope and complexity. Rush orders may be available for an additional fee.",
  revisions:
    "We offer 2 free revisions with every project. Additional revisions can be discussed and may incur extra charges.",
  contact:
    "You can reach us on Discord at: mineproductions, or use our website order form at the Order page.",
  order:
    "To order, visit our Custom Order page, fill in your YouTube channel details, choose your project type, describe what you need, set your budget and deadline, and submit. We'll get back to you within 24 hours.",
  about:
    "MineProductions is a premium Minecraft content production studio specializing in creating and recreating custom Minecraft videos for YouTube creators worldwide. We serve creators with 1,000 to 1,000,000+ subscribers.",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();

  if (
    lower.includes("price") ||
    lower.includes("cost") ||
    lower.includes("how much") ||
    lower.includes("pricing") ||
    lower.includes("budget")
  ) {
    return KNOWLEDGE_BASE.pricing;
  }
  if (
    lower.includes("service") ||
    lower.includes("what do you") ||
    lower.includes("offer") ||
    lower.includes("what can") ||
    lower.includes("create") ||
    lower.includes("make")
  ) {
    return KNOWLEDGE_BASE.services;
  }
  if (
    lower.includes("time") ||
    lower.includes("how long") ||
    lower.includes("turnaround") ||
    lower.includes("deadline") ||
    lower.includes("delivery")
  ) {
    return KNOWLEDGE_BASE.turnaround;
  }
  if (
    lower.includes("revision") ||
    lower.includes("edit") ||
    lower.includes("change") ||
    lower.includes("fix")
  ) {
    return KNOWLEDGE_BASE.revisions;
  }
  if (
    lower.includes("contact") ||
    lower.includes("discord") ||
    lower.includes("reach") ||
    lower.includes("email")
  ) {
    return KNOWLEDGE_BASE.contact;
  }
  if (
    lower.includes("order") ||
    lower.includes("buy") ||
    lower.includes("purchase") ||
    lower.includes("hire") ||
    lower.includes("commission")
  ) {
    return KNOWLEDGE_BASE.order;
  }
  if (
    lower.includes("about") ||
    lower.includes("who") ||
    lower.includes("studio") ||
    lower.includes("company") ||
    lower.includes("team")
  ) {
    return KNOWLEDGE_BASE.about;
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hey there! 👋 Welcome to MineProductions. I can help you with info about our services, pricing, turnaround times, and how to order. What would you like to know?";
  }

  return "For more details, please use our order form or contact us on Discord at mineproductions.";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hey! 👋 I'm the MineProductions assistant. Ask me about our services, pricing, turnaround times, or how to order!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);

    setIsTyping(true);
    setTimeout(() => {
      const response = getBotResponse(userMsg);
      setMessages((prev) => [...prev, { role: "bot", content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  };

  return (
    <>
      {/* Chat Bubble */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] chat-bubble"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
        id="chatbot-toggle"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-24 right-6 z-[60] w-[360px] max-h-[500px] chat-panel flex flex-col overflow-hidden"
            id="chatbot-panel"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-[rgba(76,175,80,0.15)] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#2d7a30] flex items-center justify-center">
                <svg
                  className="w-4 h-4"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2zm-6 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8zm3 2a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2zm-5 4h4a1 1 0 010 2h-4a1 1 0 010-2z" />
                </svg>
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  MineProductions AI
                </p>
                <p className="text-xs text-[#4CAF50]">● Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[350px]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#4CAF50] text-white rounded-tr-sm"
                        : "bg-[#1a1a1a] text-[#e5e2e1] rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                    <span className="w-2 h-2 bg-[#4CAF50] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-[#4CAF50] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-[#4CAF50] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-[rgba(76,175,80,0.15)] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about our services..."
                className="flex-1 bg-[#1a1a1a] rounded-full px-4 py-2.5 text-sm outline-none border border-[rgba(76,175,80,0.1)] focus:border-[#4CAF50] transition-colors text-[#e5e2e1] placeholder-[#555]"
                id="chatbot-input"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center hover:bg-[#78dc77] transition-colors"
                aria-label="Send message"
                id="chatbot-send"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
