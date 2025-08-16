import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`${API_BASE}/events/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) return <div className="mx-auto max-w-3xl px-6 py-14"><p>Not found.</p></div>;
  const e = await res.json();
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <Link href="/events" className="text-sm underline">Back to Events</Link>
      <h1 className="mt-3 text-3xl font-semibold">{e.title}</h1>
      {e.startsAt && <p className="mt-2 text-sm opacity-80">{new Date(e.startsAt).toLocaleString()}</p>}
      {e.location && <p className="text-sm opacity-80">{e.location}</p>}
      <article className="prose mt-6 max-w-none">
        <p>{e.description || ""}</p>
      </article>
    </div>
  );
}