"use client";
import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    const formData = new FormData(e.currentTarget);
    const payload = {
      type: "contact",
      data: {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      },
    };
    const res = await fetch(`${API_BASE}/forms/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setStatus(res.ok ? "Thanks! We'll be in touch." : "Something went wrong.");
    if (res.ok) e.currentTarget.reset();
  }
  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="text-3xl font-semibold">Contact Us</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input name="name" placeholder="Your name" className="w-full border rounded p-2" required />
        <input name="email" type="email" placeholder="Email" className="w-full border rounded p-2" required />
        <textarea name="message" placeholder="Message" className="w-full border rounded p-2 h-32" required />
        <button className="bg-black text-white px-4 py-2 rounded">Send</button>
      </form>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
}