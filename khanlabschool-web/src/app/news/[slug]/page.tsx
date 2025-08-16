import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetch(`${API_BASE}/posts/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) return <div className="mx-auto max-w-3xl px-6 py-14"><p>Not found.</p></div>;
  const post = await res.json();
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <Link href="/news" className="text-sm underline">Back to News</Link>
      <h1 className="mt-3 text-3xl font-semibold">{post.title}</h1>
      {post.publishedAt && <p className="mt-2 text-sm opacity-70">{new Date(post.publishedAt).toLocaleDateString()}</p>}
      <article className="prose mt-6 max-w-none">
        <p>{post.content}</p>
      </article>
    </div>
  );
}