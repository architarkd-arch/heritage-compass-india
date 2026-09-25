import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { languages } from "@/lib/data";
import { PageTitle, btn, btnGhost, card } from "@/components/Shell";
import { speak } from "@/lib/i18n";

export const Route = createFileRoute("/languages/$code")({
  loader: ({ params }) => { const l = languages.find((x) => x.code === params.code); if (!l) throw notFound(); return l; },
  head: ({ loaderData }) => ({ meta: [{ title: `Learn ${loaderData?.name} — Heritage Compass` }, { name: "description", content: `Script, sounds, words and quiz for ${loaderData?.name}.` }, { property: "og:title", content: `Learn ${loaderData?.name}` }, { property: "og:description", content: `Explore the ${loaderData?.script} script.` }] }),
  component: Lang,
});

function Lang() {
  const l = Route.useLoaderData();
  const [fi, setFi] = useState(0); const [flip, setFlip] = useState(false);
  const [qi, setQi] = useState(0); const [pick, setPick] = useState<string | null>(null); const [score, setScore] = useState(0);
  const hasVoice = l.code === "hi" || l.code === "ta";
  const w = l.words[fi % l.words.length]!;
  const qw = l.words[qi % l.words.length]!;
  const opts = useMemo(() => [...l.words].sort(() => Math.random() - 0.5).map((x) => x.en), [qi, l]);
  return (
    <div>
      <PageTitle title={`${l.name} · ${l.native}`} sub={`${l.script} script · ${l.family} family · ${l.speakers} speakers`} />
      <div className="grid gap-6 lg:grid-cols-2">
        <section className={card}><h2 className="font-display text-xl font-semibold">Script & sounds</h2>
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">{l.sounds.map((s) => (
            <button key={s.glyph} onClick={() => hasVoice && speak(s.glyph, l.code)} className="rounded-md border border-border p-2 text-center hover:border-primary"><span className="block text-3xl">{s.glyph}</span><span className="text-xs text-muted-foreground">{s.latin}</span></button>))}</div>
          {!hasVoice && <p className="mt-2 text-xs text-muted-foreground">Recorded audio for {l.name} isn't available yet.</p>}</section>
        <section className={card}><h2 className="font-display text-xl font-semibold">Useful words</h2>
          <table className="mt-3 w-full text-left text-sm"><tbody>{l.words.map((x) => <tr key={x.latin} className="border-t border-border"><td className="py-2 text-lg">{x.native}</td><td>{x.latin}</td><td>{x.en}</td></tr>)}</tbody></table></section>
        <section className={card}><h2 className="font-display text-xl font-semibold">Sentence patterns</h2>
          {l.patterns.map((p) => <div key={p.example} className="mt-3"><p className="text-sm text-muted-foreground">{p.pattern}</p><p className="text-xl">{p.example}</p><p className="text-sm">“{p.en}”</p></div>)}</section>
        <section className={card}><h2 className="font-display text-xl font-semibold">Flashcards</h2>
          <button onClick={() => setFlip(!flip)} className="mt-3 flex h-40 w-full items-center justify-center rounded-lg border-2 border-dashed border-primary bg-secondary/50 text-center" aria-label="Flip card">
            {flip ? <span><span className="block text-xl font-semibold">{w.en}</span><span className="text-sm text-muted-foreground">{w.latin}</span></span> : <span className="text-4xl">{w.native}</span>}</button>
          <div className="mt-3 flex gap-2"><button className={btnGhost} onClick={() => { setFi(fi + 1); setFlip(false); }}>Next card</button>{hasVoice && <button className={btnGhost} onClick={() => speak(w.native, l.code)}>🔊 Hear</button>}</div></section>
        <section className={`${card} lg:col-span-2`}><h2 className="font-display text-xl font-semibold">Quick quiz · Score {score}</h2>
          <p className="mt-3">What does <strong className="text-2xl">{qw.native}</strong> mean?</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">{opts.map((o) => <button key={o} disabled={!!pick} onClick={() => { setPick(o); if (o === qw.en) setScore(score + 1); }} className={`rounded-md border px-3 py-2 ${pick && o === qw.en ? "border-success bg-success/15" : pick === o ? "border-destructive bg-destructive/10" : "border-border"}`}>{o}</button>)}</div>
          {pick && <button className={`${btn} mt-3`} onClick={() => { setQi(qi + 1); setPick(null); }}>Next</button>}</section>
      </div>
    </div>
  );
}
