const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export default async function EventsPage() {
  const res = await fetch(`${API_BASE}/events`, { next: { revalidate: 60 } });
  const events: any[] = res.ok ? await res.json() : [];
  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <h1 className="text-3xl font-semibold">Events</h1>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e) => (
          <div key={e.id} className="border rounded-lg p-5">
            <h3 className="font-semibold text-lg">{e.title}</h3>
            {e.startsAt && <p className="mt-2 text-sm opacity-80">{new Date(e.startsAt).toLocaleString()}</p>}
            {e.location && <p className="text-sm opacity-80">{e.location}</p>}
          </div>
        ))}
        {events.length === 0 && <p>No events yet.</p>}
      </div>
    </div>
  );
}