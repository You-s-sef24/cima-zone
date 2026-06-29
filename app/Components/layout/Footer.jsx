import { Film } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#E50914] rounded-lg flex items-center justify-center">
            <Film size={16} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg">
            Cima<span className="text-[#F5C518]">Zone</span>
          </span>
        </Link>

        <p className="text-gray-500 text-xs text-center max-w-xs">
          Your go-to destination for movies & TV shows.
        </p>

        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} CimaZone. All rights reserved. .
        </p>
      </div>
    </footer>
  );
}
