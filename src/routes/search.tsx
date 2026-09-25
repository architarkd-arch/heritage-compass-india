import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { sites, artisans, languages, artworks } from "@/lib/data";
import { PageTitle, card } from "@/components/Shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/search")({
  validateSearch: (s) => z.object({ q: z.string().optional() }).parse(s),
  head: () => ({ meta: [{ title: "Search Heritage — Heritage Compass" }, { name: "description", content: "Search monuments, traditions, crafts and languages of India." }, { property: "og:title", content: "Search Heritage" }, { property: "og:description", content: "Find full details on any Indian heritage." }] }),
  component: SearchPage,
});

const m = (q: string, ...f: string[]) => f.join(" ").toLowerCase().includes(q);

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const nav = useNavigate({ from: "/search" });
  const { t } = useI18n();
  const s = q.trim().toLowerCase();
  const rs = s ? sites.filter((x) => m(s, x.name, x.state, x.type, x.summary, x.era, ...x.tags)) : sites;
  const ra = s ? artisans.filter((x) => m(s, x.name, x.craft, x.state, x.community)) : [];
  const rl = s ? languages.filter((x) => m(s, x.name, x.script)) : [];
  const rw = s ? artworks.filter((x) => m(s, x.title, x.style, x.region)) : [];
  return (
    <div>
      <PageTitle title={t("search")} sub="Search every monument, tradition, craft and language." />
      <input autoFocus aria-label="Search" value={q} onChange={(e) => nav({ search: { q: e.target.value }, replace: true })} placeholder={t("searchPh")} className="w-full rounded-md border border-input bg-card px-4 py-3 text-lg" />
      <p className="mt-3 text-sm text-muted-foreground">{rs.length + ra.length + rl.length + rw.length} results</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {rs.map((x) => (
          <Link key={x.id} to="/heritage/$id" params={{ id: x.id }} className={`${card} hover:border-primary`}>
            <p className="text-xs uppercase text-primary">Heritage · {x.type} · {x.state}</p>
            <h3 className="font-display text-lg font-semibold">{x.name}</h3>
            <p className="text-sm text-muted-foreground">{x.summary}</p>
          </Link>
        ))}
        {ra.map((x) => <Link key={x.id} to="/artisans" className={card}><p className="text-xs uppercase text-primary">Artisan · {x.state}</p><h3 className="font-semibold">{x.name}</h3><p className="text-sm text-muted-foreground">{x.craft}</p></Link>)}
        {rl.map((x) => <Link key={x.code} to="/languages/$code" params={{ code: x.code }} className={card}><p className="text-xs uppercase text-primary">Language</p><h3 className="font-semibold">{x.name} ({x.native})</h3></Link>)}
        {rw.map((x) => <Link key={x.id} to="/ar-gallery" className={card}><p className="text-xs uppercase text-primary">Artwork · {x.style}</p><h3 className="font-semibold">{x.title}</h3></Link>)}
      </div>
      {s && rs.length + ra.length + rl.length + rw.length === 0 && (
        <p className="mt-6">Not in our library yet. <Link to="/storyteller" search={{ q }} className="underline">Ask the AI Storyteller about “{q}”</Link>.</p>
      )}
    </div>
  );
}
