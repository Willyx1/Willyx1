"use client";
import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export default function DonatePage() {
  const [status, setStatus] = useState<string | null>(null);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    const formData = new FormData(e.currentTarget);
    const amount = Number(formData.get("amount"));
    const donorName = String(formData.get("name") || "");
    const donorEmail = String(formData.get("email") || "");
    const res = await fetch(`${API_BASE}/donations/record`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amountCents: Math.round(amount * 100), currency: "USD", donorName, donorEmail }),
    });
    setStatus(res.ok ? "Thank you for your gift!" : "Unable to process donation.");
    if (res.ok) e.currentTarget.reset();
  }
  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="text-3xl font-semibold">Support Our School</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input name="name" placeholder="Full name" className="w-full border rounded p-2" />
        <input name="email" type="email" placeholder="Email" className="w-full border rounded p-2" />
        <input name="amount" type="number" step="0.01" placeholder="Amount (USD)" className="w-full border rounded p-2" required />
        <button className="bg-black text-white px-4 py-2 rounded">Donate</button>
      </form>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
}