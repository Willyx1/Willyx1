import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export default async function ProgramsPage() {
  const res = await fetch(`${API_BASE}/programs`, { next: { revalidate: 60 } });
  const programs: any[] = res.ok ? await res.json() : [];
  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <h1 className="text-3xl font-semibold">Programs</h1>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((p) => (
          <Link key={p.id} href={`/programs/${p.slug}`} className="border rounded-lg p-5 hover:shadow">
            <h3 className="font-semibold text-lg">{p.name}</h3>
            {p.summary && <p className="mt-2 text-sm opacity-80">{p.summary}</p>}
          </Link>
        ))}
        {programs.length === 0 && <p>No programs yet.</p>}
      </div>
    </div>
  );
}