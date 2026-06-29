"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Film } from "lucide-react";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search/${query}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-[#E50914] rounded-lg flex items-center justify-center">
            <Film size={16} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg">
            Cima<span className="text-[#F5C518]">Zone</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 ml-auto">
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center gap-2 bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-1.5 w-56 focus-within:border-[#F5C518] transition-colors"
          >
            <Search size={14} className="text-[#9E9E9E] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="bg-transparent text-sm text-white placeholder:text-[#9E9E9E] outline-none w-full"
            />
          </form>

          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden text-[#9E9E9E] hover:text-white transition-colors"
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="md:hidden px-4 pb-3 bg-[#0a0a0a]">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 bg-[#1a1a1a] border border-[#F5C518] rounded-full px-4 py-2"
          >
            <Search size={14} className="text-[#9E9E9E] shrink-0" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, TV shows, people..."
              className="bg-transparent text-sm text-white placeholder:text-[#9E9E9E] outline-none w-full"
            />
          </form>
        </div>
      )}
    </nav>
  );
}
