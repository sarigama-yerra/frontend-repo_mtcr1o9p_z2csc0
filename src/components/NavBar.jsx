import React from 'react';
import { Megaphone, Settings } from 'lucide-react';

export default function NavBar() {
  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur supports-[backdrop-filter]:bg-white/40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">
              <Megaphone className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-slate-900">Control Room Announcer</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-700">
            <a href="#" className="hover:text-slate-900">Docs</a>
            <a href="#" className="hover:text-slate-900">Support</a>
            <button className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5">
              <Settings className="h-4 w-4" /> Settings
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
