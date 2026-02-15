"use client";

import { useState } from "react";
import Link from "next/link";
import { signUp } from "@/lib/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const { data, error } = await signUp(email, password);
    setLoading(false);
    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }
    setMessage({ type: "success", text: "Check your email to confirm your account." });
  };

  return (
    <div className="rounded-xl border border-primary-navy/20 bg-white p-6 shadow-lg">
      <h1 className="text-2xl font-bold text-primary-navy">Sign up</h1>
      <p className="mt-1 text-sm text-neutral-grey">Create an account to save outfits</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm text-neutral-grey">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-neutral-grey/50 px-3 py-2"
            placeholder="you@example.com"
          />
        </label>
        <label className="block">
          <span className="text-sm text-neutral-grey">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="mt-1 w-full rounded-lg border border-neutral-grey/50 px-3 py-2"
          />
        </label>
        {message && (
          <p className={message.type === "error" ? "text-status-error text-sm" : "text-status-success text-sm"}>
            {message.text}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary-navy py-2 font-medium text-white hover:bg-primary-navy/90 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-neutral-grey">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary-maroon hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
