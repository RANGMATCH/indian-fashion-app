"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Msg = { id: string; role: "user" | "assistant"; content: string };

const QUICK_REPLIES = ["Best colour for office?", "Casual look batao", "Skin tone match"];

interface AdvisorChatBoxProps {
  currentColor?: string;
  garmentType?: string;
}

export function AdvisorChatBox({ currentColor, garmentType }: AdvisorChatBoxProps) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Select Skin Tone, Weather & Occasion above — your preview will update live. Ask for tips here.",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: `u-${Date.now()}`, role: "user", content: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: "Complete the selections above to see colour match suggestions. Your preview section will show the result.",
        },
      ]);
    }, 600);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value?.trim();
    if (!value) return;
    send(value);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section className="max-w-[360px] mx-auto px-4 py-4 border-b border-zinc-800">
      <div className="rounded-xl border-2 border-maroon-900/50 bg-zinc-800/90 overflow-hidden shadow-rangmatch-card">
        <div className="border-b border-zinc-700 px-3 py-2 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-maroon-600 flex items-center justify-center text-white text-sm">
            🤖
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-200">RangMatch Advisor</p>
            <p className="text-[10px] text-teal-400/90">Live preview above updates with your picks</p>
          </div>
        </div>
        <div
          ref={listRef}
          className="max-h-[180px] overflow-y-auto space-y-2 px-3 py-3 bg-zinc-900/50"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 text-xs ${
                  msg.role === "assistant"
                    ? "bg-zinc-700/80 text-zinc-200 border border-zinc-600"
                    : "bg-maroon-700/80 text-white border border-maroon-600/80"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 px-3 py-2 border-t border-zinc-700">
          {QUICK_REPLIES.map((reply) => (
            <button
              key={reply}
              type="button"
              onClick={() => send(reply)}
              className="min-h-[36px] px-3 rounded-lg bg-zinc-700/80 border border-zinc-600 text-zinc-300 text-[11px] font-medium hover:bg-maroon-800/50 hover:border-maroon-600/50 hover:text-white transition-colors duration-200"
            >
              {reply}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 p-3 border-t border-zinc-700">
          <input
            ref={inputRef}
            type="text"
            placeholder="Message likhein..."
            className="min-h-[44px] flex-1 rounded-lg border border-zinc-600 bg-zinc-800 px-3 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:ring-2 focus:ring-maroon-500/50 focus:border-maroon-500/50"
          />
          <button
            type="submit"
            className="min-h-[44px] min-w-[44px] rounded-lg bg-maroon-600 text-white flex items-center justify-center font-medium hover:bg-maroon-500 active:bg-maroon-700 transition-colors duration-200"
            aria-label="Send"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
