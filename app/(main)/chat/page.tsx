"use client";

import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };

const FALLBACK_RESPONSES = [
  "Aap skin tone aur occasion bataiye, main colors suggest kar sakta hoon. Profile mein skin tone set karein, phir Search ya Outfit Builder use karein.",
  "Wedding ke liye Navy, Maroon, ya Cream safe choices hain. Outfit Builder se complete look bana sakte hain.",
  "Office ke liye Navy + White ya Light Blue shirt + Grey trouser classic hai. Search page par Formal filter laga ke dekhen.",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Namaste! Main aapka styling assistant hoon. Hindi ya English mein kuch bhi poochhein — e.g. \"Wedding mein kya pehnu?\", \"Maroon shirt ke saath kya match karega?\"" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text }) });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply ?? FALLBACK_RESPONSES[0] }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)] }]);
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-3xl flex-col px-4 py-6 pb-24 md:pb-6">
      <h1 className="text-2xl font-bold text-primary-navy">AI Stylist</h1>
      <p className="text-neutral-grey">Ask in Hindi or English</p>

      <div className="mt-4 flex-1 overflow-y-auto rounded-xl border border-primary-navy/20 bg-white">
        <div className="flex flex-col gap-4 p-4">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}>
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-navy text-white">
                  <MessageCircle className="h-4 w-4" />
                </div>
              )}
              <div className={cn("max-w-[85%] rounded-lg px-4 py-2 text-sm", msg.role === "user" ? "bg-primary-navy text-white" : "bg-neutral-grey/15 text-neutral-black")}>
                {msg.content}
              </div>
              {msg.role === "user" && <div className="h-8 w-8 shrink-0" />}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-navy text-white">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
              <div className="rounded-lg bg-neutral-grey/15 px-4 py-2 text-sm text-neutral-grey">Thinking...</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); send(); }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message... e.g. Wedding mein kya pehnu?"
          className="min-h-[44px] flex-1 rounded-lg border border-neutral-grey/50 px-4 py-2 focus:border-primary-navy focus:outline-none focus:ring-2 focus:ring-primary-navy/20"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-primary-maroon text-white hover:bg-primary-maroon/90 disabled:opacity-50" aria-label="Send">
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
