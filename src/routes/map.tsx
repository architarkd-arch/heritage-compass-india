import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { sites, type Site } from "@/lib/data";
import { PageTitle, card } from "@/components/Shell";

export const Route = createFileRoute("/map")({
  head: () => ({ meta: [{ title: "Interactive Heritage Map — Heritage Compass" }, { name: "description", content: "Explore monuments, temples, forts and living traditions across India on a map." }, { property: "og:title", content: "Interactive Heritage Map" }, { property: "og:description", content: "Discover sites and traditions across India." }] }),
  component: MapPage,
});

const types = ["All", "Monument", "Temple", "Fort", "Cave", "Natural", "Tradition"] as const;

function MapPage() {
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [sel, setSel] = useState<Site | null>(null);
  const list = sites.filter((s) => type === "All" || s.type === type);
  return (
    <div>
      <PageTitle title="Interactive Heritage Map" sub="Tap a marker to discover a site. Filter by type." />
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter">
        {types.map((t) => <button key={t} onClick={() => setType(t)} aria-pressed={type === t} className={`rounded-full border px-3 py-1 text-sm ${type === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}>{t}</button>)}
      </div>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className={`${card} relative aspect-[4/5] lg:col-span-3`}>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full p-4" aria-hidden>
            <path d="M34 8 L44 6 L50 14 L46 20 L56 26 L70 30 L84 26 L86 36 L76 40 L68 44 L64 52 L56 58 L50 66 L46 76 L42 92 L36 84 L34 70 L30 60 L26 50 L18 44 L22 36 L30 30 L32 20 Z" className="fill-secondary stroke-primary/50" strokeWidth="0.5" />
          </svg>
          {list.map((s) => (
            <button key={s.id} onClick={() => setSel(s)} aria-label={s.name} title={s.name}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card shadow ${sel?.id === s.id ? "scale-150 bg-foreground" : "bg-primary"} transition`} />
          ))}
        </div>
        <div className="space-y-3 lg:col-span-2">
          {sel ? (
            <div className={card}>
              <p className="text-xs uppercase text-primary">{sel.type} · {sel.state}</p>
              <h2 className="font-display text-2xl font-semibold">{sel.name}</h2>
              <p className="mt-2 text-sm">{sel.summary}</p>
              <Link to="/heritage/$id" params={{ id: sel.id }} className="mt-3 inline-block underline">Full details →</Link>
            </div>
          ) : <p className="text-muted-foreground">Select a marker on the map.</p>}
          <ul className="max-h-96 space-y-1 overflow-auto">
            {list.map((s) => <li key={s.id}><button onClick={() => setSel(s)} className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-secondary">{s.name} <span className="text-muted-foreground">— {s.state}</span></button></li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
