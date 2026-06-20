"use client";

import React, { useState } from "react";
import { useCarbonStore } from "@/store/useCarbonStore";
import { Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const SmartAssistant = () => {
  const { activities } = useCarbonStore();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am your AI Carbon Assistant. Ask me anything about your footprint or how to reduce it.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          context: { activities }, // Passing Zustand state to AI
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      } else {
        console.error("AI Error:", data.error);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I ran into an error processing your request." },
        ]);
      }
    } catch (e) {
      console.error("Request failed:", e);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error occurred." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-card text-card-foreground border rounded-xl shadow-sm w-full max-w-5xl mx-auto overflow-hidden">
      <div className="p-4 border-b bg-muted/30">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span>🌿</span> Smart Assistant
        </h2>
        <p className="text-xs text-muted-foreground">Context-aware recommendations</p>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-secondary text-secondary-foreground rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-secondary text-secondary-foreground max-w-[80%] rounded-2xl rounded-bl-none px-4 py-2 text-sm animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t bg-muted/10 flex gap-2">
        <label htmlFor="chat-input" className="sr-only">Type your message</label>
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about reducing transport emissions..."
          className="flex-1 bg-background border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          aria-label="Send message"
          className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50 transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};
