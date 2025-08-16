"use client";
import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export default function AdminHome() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") })
    });
    const data = await res.json();
    if (!res.ok) return setError(data?.error || "Login failed");
    setToken(data.token);
    localStorage.setItem("admin_token", data.token);
  }
  return (
    <div>
      {!token ? (
        <form onSubmit={handleLogin} className="space-y-3 max-w-sm">
          <input name="email" placeholder="Email" type="email" className="w-full border rounded p-2" required />
          <input name="password" placeholder="Password" type="password" className="w-full border rounded p-2" required />
          <button className="bg-black text-white px-4 py-2 rounded">Login</button>
          {error && <p className="text-sm mt-2">{error}</p>}
        </form>
      ) : (
        <p className="text-sm">Logged in. Use the nav to manage content.</p>
      )}
    </div>
  );
}