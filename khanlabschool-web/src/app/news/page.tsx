import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export default async function NewsPage() {
  const res = await fetch(`${API_BASE}/posts`, { next: { revalidate: 60 } });
  const posts: any[] = res.ok ? await res.json() : [];
  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <h1 className="text-3xl font-semibold">News</h1>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => (
          <Link key={p.id} href={`/news/${p.slug}`} className="border rounded-lg p-5 hover:shadow">
            <h3 className="font-semibold text-lg">{p.title}</h3>
            {p.excerpt && <p className="mt-2 text-sm opacity-80">{p.excerpt}</p>}
          </Link>
        ))}
        {posts.length === 0 && <p>No posts yet.</p>}
      </div>
    </div>
  );
}