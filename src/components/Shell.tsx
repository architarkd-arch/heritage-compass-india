import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { LOCALES, useI18n } from "@/lib/i18n";

const nav = [
  ["/", "home"], ["/map", "map"], ["/search", "search"], ["/storyteller", "story"], ["/artisans", "crafts"], ["/games", "games"],
  ["/art-decoder", "decoder"], ["/book-reader", "reader"], ["/languages", "langs"], ["/ar-gallery", "ar"],
] as const;

export function WarliBorder() {
  return (
    <svg aria-hidden viewBox="0 0 240 24" className="h-6 w-full text-primary/60" preserveAspectRatio="none">
      {Array.from({ length: 12 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 20 + 10},12)`} stroke="currentColor" fill="none" strokeWidth="1.2">
          <circle cy="-7" r="2" /><path d="M0-5 L-4 1 L4 1 Z M0 1 L4 -5 M-4 1 L-6 7 M4 1 L6 7" />
        </g>
      ))}
    </svg>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link to="/" className="font-display text-xl font-bold text-primary">Heritage Compass</Link>
          <nav className="ml-auto hidden gap-1 lg:flex">
            {nav.map(([to, k]) => (
              <Link key={to} to={to} className="rounded-md px-2 py-1 text-sm hover:bg-secondary" activeProps={{ className: "bg-secondary font-semibold" }} activeOptions={{ exact: to === "/" }}>{t(k)}</Link>
            ))}
          </nav>
          <label className="ml-auto lg:ml-2">
            <span className="sr-only">Language</span>
            <select value={lang} onChange={(e) => setLang(e.target.value as typeof lang)} className="rounded-md border border-input bg-card px-2 py-1 text-sm">
              {LOCALES.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </label>
          <button className="rounded-md border border-input px-3 py-1 text-sm lg:hidden" aria-expanded={open} onClick={() => setOpen(!open)}>Menu</button>
        </div>
        {open && (
          <nav className="grid grid-cols-2 gap-1 border-t border-border px-4 py-3 lg:hidden">
            {nav.map(([to, k]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-secondary">{t(k)}</Link>)}
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      <footer className="border-t border-border bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
          <WarliBorder />
          <p className="mt-4">Heritage Compass — preserving India's culture with its communities. {t("notice")}</p>
        </div>
      </footer>
    </div>
  );
}

export function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-display text-3xl font-bold md:text-4xl">{title}</h1>
      {sub && <p className="mt-2 max-w-2xl text-muted-foreground">{sub}</p>}
      <div className="mt-4 max-w-xs"><WarliBorder /></div>
    </div>
  );
}

export function ReportButton({ what }: { what: string }) {
  const [open, setOpen] = useState(false); const [sent, setSent] = useState(false);
  if (sent) return <p className="text-sm text-muted-foreground">Thanks — your correction was recorded for community review.</p>;
  return open ? (
    <form className="mt-2 space-y-2" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <textarea required aria-label={`Correction for ${what}`} className="w-full rounded-md border border-input bg-card p-2 text-sm" placeholder="Describe the error or suggest a correction…" />
      <button className="rounded-md bg-foreground px-3 py-1.5 text-sm text-background">Submit</button>
    </form>
  ) : <button onClick={() => setOpen(true)} className="text-sm underline">Report an error / suggest a correction</button>;
}

export const btn = "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50";
export const btnGhost = "inline-flex items-center justify-center rounded-md border border-foreground/30 px-4 py-2 font-medium hover:bg-secondary";
export const card = "rounded-xl border border-border bg-card p-5";
