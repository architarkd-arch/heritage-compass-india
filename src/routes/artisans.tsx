import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { artisans } from "@/lib/data";
import { PageTitle, card } from "@/components/Shell";

export const Route = createFileRoute("/artisans")({
  head: () => ({ meta: [{ title: "Artisan & Craft Directory — Heritage Compass" }, { name: "description", content: "Discover local craftspeople connected to India's regional heritage." }, { property: "og:title", content: "Artisan & Craft Directory" }, { property: "og:description", content: "Support India's traditional artisans." }] }),
  component: Artisans,
});

function Artisans() {
  const [q, setQ] = useState(""); const [st, setSt] = useState("All");
  const states = ["All", ...Array.from(new Set(artisans.map((a) => a.state)))];
  const list = artisans.filter((a) => (st === "All" || a.state === st) && `${a.name} ${a.craft} ${a.community}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageTitle title="Artisan & Craft Directory" sub="Find craftspeople and communities keeping India's traditions alive." />
      <div className="mb-6 flex flex-col gap-2 sm:flex-row">
        <input aria-label="Search crafts" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search craft or community…" className="flex-1 rounded-md border border-input bg-card px-3 py-2" />
        <select aria-label="State" value={st} onChange={(e) => setSt(e.target.value)} className="rounded-md border border-input bg-card px-3 py-2">{states.map((s) => <option key={s}>{s}</option>)}</select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => (
          <article key={a.id} className={card}>
            <p className="text-xs uppercase tracking-wide text-primary">{a.craft}</p>
            <h2 className="mt-1 font-display text-lg font-semibold">{a.name}</h2>
            <p className="mt-2 text-sm">{a.about}</p>
            <p className="mt-3 text-sm text-muted-foreground">{a.community} · {a.contact}, {a.state}</p>
          </article>
        ))}
      </div>
      {list.length === 0 && <p className="text-muted-foreground">No artisans match.</p>}
    </div>
  );
}
