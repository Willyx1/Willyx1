import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khan Lab School — Inspired Replica",
  description: "Learner-centered, mastery-based school site demo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> 
        <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
          <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-semibold text-xl">KLS</Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/admissions" className="hover:underline">Admissions</Link>
              <Link href="/programs" className="hover:underline">Programs</Link>
              <Link href="/news" className="hover:underline">News</Link>
              <Link href="/events" className="hover:underline">Events</Link>
              <Link href="/staff" className="hover:underline">Staff</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
              <Link href="/donate" className="text-white bg-black px-3 py-1.5 rounded-md">Give</Link>
            </nav>
          </div>
        </header>
        <main className="min-h-[70vh]">{children}</main>
        <footer className="border-t py-10 text-sm">
          <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Khan Lab School (Demo)</p>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
