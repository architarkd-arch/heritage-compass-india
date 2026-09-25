import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { sites } from "@/lib/data";
import { PageTitle, ReportButton, btn, btnGhost, card } from "@/components/Shell";
import { speak, useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/heritage/$id")({
  loader: ({ params }) => { const s = sites.find((x) => x.id === params.id); if (!s) throw notFound(); return s; },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.name ?? "Heritage"} — Heritage Compass` },
    { name: "description", content: loaderData?.summary ?? "" },
    { property: "og:title", content: loaderData?.name ?? "Heritage" },
    { property: "og:description", content: loaderData?.summary ?? "" },
  ] }),
  component: Detail,
});

function Detail() {
  const s = Route.useLoaderData();
  const { t, lang } = useI18n();
  const rows = [["Era", s.era], ["State", s.state], ["Region", s.region], ["Best time", s.bestTime], ["Timings", s.timings], ["Entry fee", s.fee], ["UNESCO", s.unesco ? "Yes" : "No"]];
  return (
    <div>
      <PageTitle title={s.name} sub={s.summary} />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <section className={card}><h2 className="font-display text-xl font-semibold">History</h2><p className="mt-2 leading-relaxed">{s.history}</p></section>
          <section className={card}><h2 className="font-display text-xl font-semibold">Architecture & significance</h2><p className="mt-2 leading-relaxed">{s.architecture}</p></section>
          <section className={card}><h2 className="font-display text-xl font-semibold">Visitor tips</h2><p className="mt-2">{s.tips}</p></section>
          <div className="flex flex-wrap gap-3">
            <button className={btn} onClick={() => speak(`${s.name}. ${s.summary} ${s.history}`, lang)}>🔊 {t("listen")}</button>
            <Link to="/storyteller" search={{ q: `Tell me a story about ${s.name}` }} className={btnGhost}>Ask AI more</Link>
            <a className={btnGhost} target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/${encodeURIComponent(s.name + " " + s.state)}`}>Directions</a>
          </div>
          <ReportButton what={s.name} />
        </div>
        <aside className={card}>
          <dl className="space-y-3 text-sm">{rows.map(([k, v]) => <div key={k}><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>)}</dl>
        </aside>
      </div>
    </div>
  );
}
