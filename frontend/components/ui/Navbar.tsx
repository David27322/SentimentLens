"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, Show } from "@clerk/nextjs";

const links = [
  { href: "/", label: "Home" },
  { href: "/analyze", label: "Analyze" },
  { href: "/compare", label: "Compare" },
  { href: "/history", label: "History" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
  <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
    <Link href="/" className="font-semibold text-slate-900 tracking-tight">
      Sentiment<span className="text-violet-600">Lens</span>
    </Link>

    <div className="hidden sm:flex items-center gap-1">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
            pathname === href
              ? "bg-violet-50 text-violet-700 font-medium"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          {label}
        </Link>
      ))}
    </div>

    <div className="flex items-center gap-3">
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="px-4 py-1.5 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
            Sign in
          </button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  </div>
</nav>
);
}