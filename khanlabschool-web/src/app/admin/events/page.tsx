"use client";
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export default function AdminEvents() {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  useEffect(() => setToken(localStorage.getItem("admin_token")), []);
  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    const form = new FormData(e.currentTarget);
    const body = {
      title: form.get("title"),
      description: form.get("description"),
      startsAt: form.get("startsAt"),
      endsAt: form.get("endsAt"),
      location: form.get("location"),
      featured: form.get("featured") === "on",
    } as any;
    const res = await fetch(`${API_BASE}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    setStatus(res.ok ? "Created" : "Failed");
    if (res.ok) e.currentTarget.reset();
  }
  if (!token) return <p className="text-sm">Login required.</p>;
  return (
    <div>
      <h2 className="text-xl font-semibold">Create Event</h2>
      <form onSubmit={handleCreate} className="mt-4 grid gap-3 max-w-xl">
        <input name="title" placeholder="title" className="border rounded p-2" required />
        <input name="description" placeholder="description" className="border rounded p-2" />
        <input name="startsAt" type="datetime-local" className="border rounded p-2" required />
        <input name="endsAt" type="datetime-local" className="border rounded p-2" required />
        <input name="location" placeholder="location" className="border rounded p-2" />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" /> featured</label>
        <button className="bg-black text-white px-4 py-2 rounded w-fit">Create</button>
        {status && <p className="text-sm">{status}</p>}
      </form>
    </div>
  );
}