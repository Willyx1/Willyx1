"use client";
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export default function AdminStaff() {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  useEffect(() => setToken(localStorage.getItem("admin_token")), []);
  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get("name"),
      role: form.get("role"),
      bio: form.get("bio"),
      headshot: form.get("headshot"),
      email: form.get("email"),
    } as any;
    const res = await fetch(`${API_BASE}/staff`, {
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
      <h2 className="text-xl font-semibold">Create Staff</h2>
      <form onSubmit={handleCreate} className="mt-4 grid gap-3 max-w-xl">
        <input name="name" placeholder="name" className="border rounded p-2" required />
        <input name="role" placeholder="role" className="border rounded p-2" required />
        <input name="email" placeholder="email" type="email" className="border rounded p-2" />
        <input name="headshot" placeholder="headshot URL" className="border rounded p-2" />
        <textarea name="bio" placeholder="bio" className="border rounded p-2 h-40" />
        <button className="bg-black text-white px-4 py-2 rounded w-fit">Create</button>
        {status && <p className="text-sm">{status}</p>}
      </form>
    </div>
  );
}