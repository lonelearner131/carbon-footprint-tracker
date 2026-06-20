import { useState } from 'react';
import type { ChatMessage, Activity } from '@/types';

/**
 * Custom hook to handle AI chat state and network requests.
 * @param activities - Current Zustand activities to pass as context
 * @returns Object containing chat state and send function
 */
export const useAiChat = (activities: Activity[]) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I am your AI Carbon Assistant. Ask me anything about your footprint or how to reduce it.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (input: string) => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          context: { activities },
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

  return { messages, loading, sendMessage };
};
