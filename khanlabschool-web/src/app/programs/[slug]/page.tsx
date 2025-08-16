import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetch(`${API_BASE}/programs/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) return <div className="mx-auto max-w-3xl px-6 py-14"><p>Not found.</p></div>;
  const program = await res.json();
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <Link href="/programs" className="text-sm underline">Back to Programs</Link>
      <h1 className="mt-3 text-3xl font-semibold">{program.name}</h1>
      {program.summary && <p className="mt-2 text-lg/8 opacity-80">{program.summary}</p>}
      <article className="prose mt-6 max-w-none">
        <p>{program.content}</p>
      </article>
    </div>
  );
}