"use client";

import { useState, useCallback } from "react";
import { Search, Mic, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  onSearch: (query: string) => void;
  loading?: boolean;
  className?: string;
}

export function SearchBar({
  placeholder = "Outfit search karein... / आउटफिट खोजें",
  defaultValue = "",
  onSearch,
  loading = false,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleVoiceSearch = useCallback(() => {
    type SRConstructor = new () => {
      lang: string;
      continuous: boolean;
      interimResults: boolean;
      start: () => void;
      onresult: ((e: { results: Array<Array<{ transcript: string }>> }) => void) | null;
      onerror: (() => void) | null;
      onend: (() => void) | null;
    };
    const win = window as unknown as { webkitSpeechRecognition?: SRConstructor; SpeechRecognition?: SRConstructor };
    const SR = win.webkitSpeechRecognition ?? win.SpeechRecognition;
    if (!SR) {
      alert("Voice search is not supported in this browser.");
      return;
    }
    const recognition = new SR();
    recognition.lang = "hi-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    setIsListening(true);
    recognition.onresult = (event: { results: Array<Array<{ transcript: string }>> }) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      setQuery(transcript);
      onSearch(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  }, [onSearch]);

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <div className="flex rounded-2xl border-2 border-black/10 bg-white shadow-card focus-within:border-primary-orange focus-within:ring-2 focus-within:ring-primary-orange/20">
        <span className="flex items-center pl-3 text-neutral-grey">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="min-h-[44px] flex-1 bg-transparent py-2 pl-2 pr-10 text-neutral-black placeholder:text-neutral-grey focus:outline-none"
          aria-label="Search outfits"
        />
        <div className="flex items-center gap-1 pr-2">
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); onSearch(""); }}
              className="rounded p-1 hover:bg-neutral-grey/20"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={handleVoiceSearch}
            disabled={isListening}
            className="rounded p-1.5 hover:bg-neutral-grey/20 disabled:opacity-50"
            aria-label="Voice search"
            title="Voice search (Hindi)"
          >
            <Mic className={cn("h-4 w-4", isListening && "animate-pulse text-primary-maroon")} />
          </button>
        </div>
      </div>
    </form>
  );
}
