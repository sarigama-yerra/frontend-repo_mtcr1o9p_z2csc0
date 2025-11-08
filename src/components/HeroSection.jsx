import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  return (
    <section className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0b12]/40 via-transparent to-[#0b0b12]/60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(124,58,237,0.18),rgba(255,255,255,0)_60%)]" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Control Room Tools
        </span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Hindi Text‑to‑Voice Announcements
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
          Build reusable templates, fill details fast, and play clear Hindi announcements for passengers, visitors, and staff.
        </p>
      </div>
    </section>
  );
}
