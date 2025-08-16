export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <nav className="mt-4 flex gap-4 text-sm">
        <a href="/admin" className="underline">Dashboard</a>
        <a href="/admin/posts" className="underline">Posts</a>
        <a href="/admin/events" className="underline">Events</a>
        <a href="/admin/programs" className="underline">Programs</a>
        <a href="/admin/pages" className="underline">Pages</a>
        <a href="/admin/staff" className="underline">Staff</a>
      </nav>
      <div className="mt-8">{children}</div>
    </div>
  );
}