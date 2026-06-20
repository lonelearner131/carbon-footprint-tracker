"use client";

import React, { useState, useCallback } from "react";
import { useCarbonStore } from "@/store/useCarbonStore";
import { useAiChat } from "@/hooks/useAiChat";
import { Send } from "lucide-react";

/**
 * SmartAssistant Component.
 * Provides a context-aware chat interface using the Gemini AI.
 * Uses strict custom hooks for logic and implements aria-live for screen readers.
 */
export const SmartAssistant = () => {
  // Use atomic selector
  const activities = useCarbonStore((state) => state.activities);
  const { messages, loading, sendMessage } = useAiChat(activities);
  const [input, setInput] = useState("");

  const handleSend = useCallback(() => {
    sendMessage(input);
    setInput("");
  }, [input, sendMessage]);

  return (
    <article className="flex flex-col h-[500px] bg-card text-card-foreground border rounded-xl shadow-sm w-full max-w-5xl mx-auto overflow-hidden">
      <header className="p-4 border-b bg-muted/30">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-100">
          <span>🌿</span> Smart Assistant
        </h2>
        <p className="text-xs text-slate-700 dark:text-slate-300" id="assistant-desc">Context-aware recommendations</p>
      </header>
      
      <section 
        className="flex-1 p-4 overflow-y-auto flex flex-col gap-3"
        aria-live="polite"
        aria-atomic="false"
        role="log"
      >
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
          <div className="flex justify-start" aria-label="AI is thinking">
            <div className="bg-secondary text-secondary-foreground max-w-[80%] rounded-2xl rounded-bl-none px-4 py-2 text-sm animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </section>

      <footer className="p-3 border-t bg-muted/10 flex gap-2">
        <label htmlFor="chat-input" className="sr-only">Type your message for the AI</label>
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about reducing transport emissions..."
          aria-describedby="assistant-desc"
          className="flex-1 bg-background border rounded-full px-4 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          aria-label="Send message to AI assistant"
          className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Send size={18} />
        </button>
      </footer>
    </article>
  );
};
