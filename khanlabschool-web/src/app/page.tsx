import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

async function getData() {
  const [postsRes, eventsRes] = await Promise.all([
    fetch(`${API_BASE}/posts`, { next: { revalidate: 60 } }),
    fetch(`${API_BASE}/events/featured`, { next: { revalidate: 60 } }),
  ]);
  return {
    posts: postsRes.ok ? await postsRes.json() : [],
    events: eventsRes.ok ? await eventsRes.json() : [],
  } as { posts: any[]; events: any[] };
}

export default async function Home() {
  const { posts, events } = await getData();
  return (
    <div>
      <section className="bg-gradient-to-br from-indigo-700 to-purple-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <h1 className="text-4xl sm:text-6xl font-bold max-w-3xl">Learner-Centered. Mastery-Based.</h1>
          <p className="mt-4 max-w-2xl text-lg/7 opacity-90">A modern school experience focused on curiosity, agency, and community.</p>
          <div className="mt-8 flex gap-3">
            <Link href="/admissions" className="bg-white text-black px-5 py-2 rounded-md">Visit & Apply</Link>
            <Link href="/about" className="border border-white px-5 py-2 rounded-md">Our Story</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest News</h2>
          <Link href="/news" className="text-sm underline">View all</Link>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((p) => (
            <Link key={p.id} href={`/news/${p.slug}`} className="border rounded-lg p-5 hover:shadow">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              {p.excerpt && <p className="mt-2 text-sm opacity-80">{p.excerpt}</p>}
            </Link>
          ))}
          {posts.length === 0 && <p>No posts yet.</p>}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Upcoming Events</h2>
          <Link href="/events" className="text-sm underline">View all</Link>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((e: any) => (
            <div key={e.id} className="border rounded-lg p-5">
              <h3 className="font-semibold text-lg">{e.title}</h3>
              {e.startsAt && <p className="mt-2 text-sm opacity-80">{new Date(e.startsAt).toLocaleString()}</p>}
              {e.location && <p className="text-sm opacity-80">{e.location}</p>}
            </div>
          ))}
          {events.length === 0 && <p>No events yet.</p>}
        </div>
      </section>
    </div>
  );
}
