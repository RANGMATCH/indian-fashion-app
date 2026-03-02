"use client";

import { FormEvent, useEffect, useRef } from "react";
import type { RefObject } from "react";
import { Send } from "lucide-react";
import type { ChatMessage } from "@/hooks/useChatAdvisor";

interface HinglishChatAdvisorProps {
  messages: ChatMessage[];
  isTyping: boolean;
  onUserInput: (text: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
  inputRef?: RefObject<HTMLInputElement>;
}

export function HinglishChatAdvisor({ messages, isTyping, onUserInput, onNext, onPrev, inputRef }: HinglishChatAdvisorProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, isTyping]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = inputRef?.current?.value?.trim();
    if (!value) return;
    onUserInput(value);
    if (inputRef?.current) inputRef.current.value = "";
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-maroon-100 bg-white">
      <div className="border-b border-maroon-100 px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-maroon-800 text-sm text-white">🤖</div>
          <div>
            <p className="text-sm font-semibold text-maroon-900">RangMatch Advisor</p>
            <p className="text-xs text-maroon-600">{isTyping ? "typing..." : "Online"}</p>
          </div>
        </div>
      </div>

      <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto bg-offwhite px-3 py-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}>
            <div
              className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm ${
                msg.role === "assistant" ? "bg-maroon-50 text-maroon-900" : "bg-maroon-800 text-white"
              }`}
            >
              <p>{msg.content}</p>
              {msg.role === "assistant" && msg.quickReplies?.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {msg.quickReplies.slice(0, 3).map((reply) => (
                    <button
                      key={`${msg.id}-${reply}`}
                      type="button"
                      onClick={() => onUserInput(reply)}
                      className="touch-feedback min-h-[44px] rounded-full border border-maroon-300 px-4 text-xs font-semibold text-maroon-800"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {(onPrev || onNext) && (
        <div className="flex gap-2 border-t border-maroon-100 px-3 py-2">
          {onPrev ? (
            <button
              type="button"
              onClick={onPrev}
              className="touch-feedback min-h-[44px] rounded-full border border-maroon-300 px-4 text-xs font-semibold text-maroon-800"
            >
              BACK
            </button>
          ) : null}
          {onNext ? (
            <button
              type="button"
              onClick={onNext}
              className="touch-feedback min-h-[44px] rounded-full border border-maroon-300 px-4 text-xs font-semibold text-maroon-800"
            >
              NEXT
            </button>
          ) : null}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-maroon-100 px-3 py-2">
        <input
          ref={inputRef}
          className="touch-feedback min-h-[44px] flex-1 rounded-full border border-maroon-200 px-3 text-sm outline-none focus:ring-2 focus:ring-maroon-300"
          placeholder="Message likhein..."
        />
        <button
          type="submit"
          className="touch-feedback min-h-[44px] min-w-[44px] rounded-full bg-maroon-800 px-3 text-white"
          aria-label="send"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
