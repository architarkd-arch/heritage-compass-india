import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { sites, type Site } from "@/lib/data";
import { PageTitle, btnGhost, card } from "@/components/Shell";
import indiaMap from "@/assets/india-zone-map.jpg.asset.json";

export const Route = createFileRoute("/map")({
  head: () => ({ meta: [{ title: "Interactive Heritage Map — Heritage Compass" }, { name: "description", content: "Explore monuments, temples, forts and living traditions across India on an interactive map." }, { property: "og:title", content: "Interactive Heritage Map — Heritage Compass" }, { property: "og:description", content: "Select heritage locations across India and open their history, visitor information and directions." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: MapPage,
});

const types = ["All", "Monument", "Temple", "Fort", "Cave", "Natural", "Tradition"] as const;

function MapPage() {
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [sel, setSel] = useState<Site | null>(null);
  const [query, setQuery] = useState("");
  const list = useMemo(() => sites.filter((s) => {
    const matchesType = type === "All" || s.type === type;
    const term = query.trim().toLowerCase();
    return matchesType && (!term || `${s.name} ${s.state} ${s.region}`.toLowerCase().includes(term));
  }), [query, type]);
  const chooseType = (next: (typeof types)[number]) => {
    setType(next);
    if (sel && next !== "All" && sel.type !== next) setSel(null);
  };
  return (
    <div>
      <PageTitle title="Interactive Heritage Map" sub="Explore heritage across India. Search, filter, then select a marker for details." />
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter heritage by type">
          {types.map((t) => <button key={t} onClick={() => chooseType(t)} aria-pressed={type === t} className={`rounded-full border px-3 py-1 text-sm ${type === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"}`}>{t}</button>)}
        </div>
        <label className="relative block min-w-64">
          <span className="sr-only">Search locations</span>
          <Search aria-hidden className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search place or state" className="w-full rounded-md border border-input bg-card py-2 pl-9 pr-3 text-sm" />
        </label>
      </div>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className={`${card} relative mx-auto aspect-[1090/1304] w-full max-w-2xl overflow-hidden p-0 lg:col-span-3`}>
          <img src={indiaMap.url} alt="Map of India showing states grouped into northern, central, western, southern, eastern and north-eastern zones" className="absolute inset-0 h-full w-full object-contain" />
          {list.map((s) => (
            <button key={s.id} onClick={() => setSel(s)} aria-label={s.name} title={s.name}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              className={`group absolute flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-card shadow-md transition hover:scale-125 focus-visible:z-20 ${sel?.id === s.id ? "z-10 scale-125 bg-foreground text-background" : "bg-primary text-primary-foreground"}`}>
              <MapPin aria-hidden className="size-4" />
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-1 hidden w-max max-w-40 -translate-x-1/2 rounded bg-foreground px-2 py-1 text-center text-xs text-background shadow-md group-hover:block group-focus-visible:block">{s.name}</span>
            </button>
          ))}
          {list.length === 0 && <div className="absolute inset-x-4 top-1/2 rounded-md bg-card/95 p-4 text-center shadow"><p className="font-semibold">No places found</p><p className="text-sm text-muted-foreground">Try another name or heritage type.</p></div>}
        </div>
        <div className="space-y-3 lg:col-span-2">
          {sel ? (
            <div className={card}>
              <p className="text-xs uppercase text-primary">{sel.type} · {sel.state}</p>
              <h2 className="font-display text-2xl font-semibold">{sel.name}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{sel.era}{sel.unesco ? " · UNESCO listed" : ""}</p>
              <p className="mt-2 text-sm">{sel.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/heritage/$id" params={{ id: sel.id }} className={btnGhost}>Full details</Link>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${sel.name}, ${sel.state}, India`)}`} target="_blank" rel="noreferrer" className={btnGhost}>Directions ↗</a>
              </div>
            </div>
          ) : <div className={`${card} text-center`}><MapPin aria-hidden className="mx-auto size-7 text-primary" /><p className="mt-2 font-semibold">Choose a heritage place</p><p className="text-sm text-muted-foreground">Select a marker or a name below.</p></div>}
          <p className="text-sm text-muted-foreground">Showing {list.length} of {sites.length} places</p>
          <ul className="max-h-96 space-y-1 overflow-auto">
            {list.map((s) => <li key={s.id}><button onClick={() => setSel(s)} aria-current={sel?.id === s.id ? "true" : undefined} className={`w-full rounded-md px-3 py-2 text-left text-sm ${sel?.id === s.id ? "bg-secondary font-semibold" : "hover:bg-secondary"}`}>{s.name} <span className="text-muted-foreground">— {s.state}</span></button></li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
