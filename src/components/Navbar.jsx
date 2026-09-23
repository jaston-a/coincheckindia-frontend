import React from 'react';
import { Search } from 'lucide-react';

export default function Navbar({ searchQuery, setSearchQuery }) {
  return (
    <header className="bg-white border-b border-gray-200/80 sticky top-0 z-50 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-2.5 cursor-pointer w-full md:w-auto justify-center md:justify-start">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-sm">
            ₹
          </div>
          <span className="text-lg font-extrabold text-slate-900 tracking-tight">CoinCheck<span className="text-emerald-600">India</span></span>
        </div>

        {/* Clean Search Input (Centered & Wider) */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search coin year or mint mark..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 text-sm text-slate-900 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-600/20 border border-gray-200 placeholder-gray-400 transition shadow-sm"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
        </div>

      </div>
    </header>
  );
}