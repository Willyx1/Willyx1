const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export default async function StaffPage() {
  const res = await fetch(`${API_BASE}/staff`, { next: { revalidate: 60 } });
  const staff: any[] = res.ok ? await res.json() : [];
  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <h1 className="text-3xl font-semibold">Our Team</h1>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((p) => (
          <div key={p.id} className="border rounded-lg p-5">
            <div className="h-32 w-32 bg-gray-100 rounded-full mb-4" />
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-sm opacity-80">{p.role}</p>
          </div>
        ))}
        {staff.length === 0 && <p>No staff yet.</p>}
      </div>
    </div>
  );
}