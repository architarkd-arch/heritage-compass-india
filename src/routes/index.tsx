import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { WarliBorder, btn, btnGhost, card } from "@/components/Shell";
import { sites } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Heritage Compass — Discover India's Culture & Craft" },
    { name: "description", content: "Interactive heritage map, AI storyteller, artisan directory, games, art decoder and language learning for India." },
    { property: "og:title", content: "Heritage Compass — Discover India's Culture & Craft" },
    { property: "og:description", content: "Explore monuments, traditions, artisans and languages across India." },
  ] }),
  component: Index,
});

const features = [
  { to: "/map", title: "Interactive Heritage Map", desc: "Monuments, sites & traditions across every region." },
  { to: "/storyteller", title: "AI Heritage Storyteller", desc: "Ask questions and explore history in conversation." },
  { to: "/artisans", title: "Artisan & Craft Directory", desc: "Meet craftspeople rooted in regional heritage." },
  { to: "/games", title: "Quizzes & Games", desc: "Quiz, memory match, guess-the-state and more." },
  { to: "/art-decoder", title: "Art Decoder", desc: "Photograph tribal art and learn its motifs." },
  { to: "/book-reader", title: "Book Reader", desc: "Read Santali (Ol Chiki) and Devanagari pages." },
  { to: "/languages", title: "Language Explorer", desc: "Scripts, sounds, words, flashcards and quizzes." },
  { to: "/ar-gallery", title: "AR Gallery", desc: "View artworks in AR and scan posters for stories." },
] as const;

function Index() {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const nav = useNavigate();
  return (
    <div className="space-y-16">
      <section className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">India · 5,000 years of living heritage</p>
        <h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">Heritage Compass</h1>
        <p className="mt-4 font-display text-xl text-primary md:text-2xl">{t("tagline")}</p>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{t("heroSub")}</p>
        <form onSubmit={(e) => { e.preventDefault(); nav({ to: "/search", search: { q } }); }} className="mx-auto mt-8 flex max-w-xl gap-2">
          <input aria-label="Search heritage" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchPh")} className="w-full rounded-md border border-input bg-card px-4 py-3" />
          <button className={btn}>{t("search")}</button>
        </form>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/map" className={btn}>Explore Heritage</Link>
          <Link to="/storyteller" className={btnGhost}>Ask AI</Link>
          <Link to="/artisans" className={btnGhost}>Discover Artisans</Link>
        </div>
        <div className="mx-auto mt-10 max-w-lg"><WarliBorder /></div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold">Everything in one place</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Link key={f.to} to={f.to} className={`${card} transition hover:-translate-y-0.5 hover:border-primary`}>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold">Featured heritage</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {sites.slice(0, 6).map((s) => (
            <Link key={s.id} to="/heritage/$id" params={{ id: s.id }} className={`${card} hover:border-primary`}>
              <p className="text-xs uppercase tracking-wide text-primary">{s.type} · {s.state}</p>
              <h3 className="mt-1 font-display text-lg font-semibold">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <p className="rounded-lg border border-primary/40 bg-accent/40 p-4 text-sm" role="note">⚠️ {t("notice")}</p>
    </div>
  );
}
