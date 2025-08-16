import Link from "next/link";

export default function AdmissionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="text-3xl font-semibold">Admissions</h1>
      <p className="mt-6 text-lg/8 opacity-90">
        We welcome curious, kind, and motivated learners. Explore our process and important dates.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/contact" className="bg-black text-white px-4 py-2 rounded">Schedule a Visit</Link>
        <a href="#" className="border px-4 py-2 rounded">Start Application</a>
      </div>
    </div>
  );
}