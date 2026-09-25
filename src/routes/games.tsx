import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { quiz, sites, artisans } from "@/lib/data";
import { PageTitle, btn, card } from "@/components/Shell";

export const Route = createFileRoute("/games")({
  head: () => ({ meta: [{ title: "Heritage Games & Quizzes — Heritage Compass" }, { name: "description", content: "Learn Indian heritage through quizzes, memory match, guess-the-state and craft match games." }, { property: "og:title", content: "Heritage Games & Quizzes" }, { property: "og:description", content: "Play and learn India's heritage." }] }),
  component: Games,
});

const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);
const tabs = ["Quiz", "Memory Match", "Guess the State", "Craft Match", "True or False"] as const;

function Games() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Quiz");
  return (
    <div>
      <PageTitle title="Heritage Games" sub="Earn points while learning. Your best scores stay on this device." />
      <div className="mb-6 flex flex-wrap gap-2" role="tablist">
        {tabs.map((t) => <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`rounded-full border px-4 py-1.5 text-sm ${tab === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}>{t}</button>)}
      </div>
      {tab === "Quiz" && <Quiz />}
      {tab === "Memory Match" && <Memory />}
      {tab === "Guess the State" && <Pairs key="s" items={sites.map((s) => ({ q: s.name, a: s.state }))} label="In which state is" />}
      {tab === "Craft Match" && <Pairs key="c" items={artisans.map((a) => ({ q: a.craft, a: a.state }))} label="Which state is famous for" />}
      {tab === "True or False" && <TrueFalse />}
    </div>
  );
}

function Quiz() {
  const qs = useMemo(() => shuffle(quiz), []);
  const [i, setI] = useState(0); const [pick, setPick] = useState<number | null>(null); const [score, setScore] = useState(0);
  if (i >= qs.length) return <div className={card}><h2 className="font-display text-2xl">Score: {score}/{qs.length} 🎉</h2><button className={`${btn} mt-4`} onClick={() => { setI(0); setScore(0); setPick(null); }}>Play again</button></div>;
  const q = qs[i]!;
  return (
    <div className={`${card} max-w-2xl`}>
      <p className="text-sm text-muted-foreground">Question {i + 1}/{qs.length} · Score {score}</p>
      <h2 className="mt-2 font-display text-xl font-semibold">{q.q}</h2>
      <div className="mt-4 grid gap-2">
        {q.options.map((o, k) => (
          <button key={o} disabled={pick !== null} onClick={() => { setPick(k); if (k === q.answer) setScore(score + 1); }}
            className={`rounded-md border px-4 py-3 text-left ${pick === null ? "border-border hover:border-primary" : k === q.answer ? "border-success bg-success/15" : k === pick ? "border-destructive bg-destructive/10" : "border-border opacity-60"}`}>{o}</button>
        ))}
      </div>
      {pick !== null && <><p className="mt-4 text-sm">💡 {q.fact}</p><button className={`${btn} mt-4`} onClick={() => { setI(i + 1); setPick(null); }}>Next</button></>}
    </div>
  );
}

function Memory() {
  const pairs = useMemo(() => shuffle(sites).slice(0, 6), []);
  const [cards] = useState(() => shuffle(pairs.flatMap((s) => [{ k: s.id, t: s.name }, { k: s.id, t: s.state }])));
  const [open, setOpen] = useState<number[]>([]); const [done, setDone] = useState<string[]>([]); const [moves, setMoves] = useState(0);
  const flip = (i: number) => {
    if (open.length === 2 || open.includes(i) || done.includes(cards[i].k)) return;
    const o = [...open, i]; setOpen(o);
    if (o.length === 2) { setMoves(moves + 1); setTimeout(() => { if (cards[o[0]].k === cards[o[1]].k) setDone((d) => [...d, cards[o[0]].k]); setOpen([]); }, 700); }
  };
  return (
    <div>
      <p className="mb-3 text-sm text-muted-foreground">Match each site with its state. Moves: {moves} {done.length === 6 && "· Complete! 🎉"}</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {cards.map((c, i) => { const shown = open.includes(i) || done.includes(c.k); return (
          <button key={i} onClick={() => flip(i)} className={`flex aspect-[4/3] items-center justify-center rounded-lg border p-2 text-center text-sm ${shown ? "border-primary bg-card" : "border-foreground bg-foreground text-background"} ${done.includes(c.k) ? "opacity-60" : ""}`}>{shown ? c.t : "?"}</button>); })}
      </div>
    </div>
  );
}

function Pairs({ items, label }: { items: { q: string; a: string }[]; label: string }) {
  const answers = Array.from(new Set(items.map((x) => x.a)));
  const [i, setI] = useState(() => Math.floor(Math.random() * items.length));
  const [res, setRes] = useState<string | null>(null); const [score, setScore] = useState(0);
  const item = items[i]!;
  const opts = useMemo(() => shuffle([item.a, ...shuffle(answers.filter((a) => a !== item.a)).slice(0, 3)]), [i]);
  return (
    <div className={`${card} max-w-2xl`}>
      <p className="text-sm text-muted-foreground">Score {score}</p>
      <h2 className="mt-2 font-display text-xl">{label} <strong>{item.q}</strong>?</h2>
      <div className="mt-4 grid grid-cols-2 gap-2">{opts.map((o) => <button key={o} disabled={!!res} onClick={() => { setRes(o); if (o === item.a) setScore(score + 1); }} className={`rounded-md border px-3 py-3 ${res && o === item.a ? "border-success bg-success/15" : res === o ? "border-destructive bg-destructive/10" : "border-border hover:border-primary"}`}>{o}</button>)}</div>
      {res && <button className={`${btn} mt-4`} onClick={() => { setI(Math.floor(Math.random() * items.length)); setRes(null); }}>Next</button>}
    </div>
  );
}

const tf = [
  { s: "The Red Fort was built by Shah Jahan.", a: true }, { s: "Kathakali originated in Punjab.", a: false },
  { s: "Living root bridges are found in Meghalaya.", a: true }, { s: "Sanchi Stupa is a Hindu temple.", a: false },
  { s: "Dokra is a lost-wax metal casting technique.", a: true }, { s: "Madhubani painting is from Tamil Nadu.", a: false },
];
function TrueFalse() {
  const [i, setI] = useState(0); const [r, setR] = useState<boolean | null>(null); const [score, setScore] = useState(0);
  const q = tf[i % tf.length]!;
  return (
    <div className={`${card} max-w-2xl`}>
      <p className="text-sm text-muted-foreground">Score {score}</p>
      <h2 className="mt-2 font-display text-xl">{q.s}</h2>
      <div className="mt-4 flex gap-2">{[true, false].map((v) => <button key={String(v)} disabled={r !== null} onClick={() => { setR(v); if (v === q.a) setScore(score + 1); }} className="flex-1 rounded-md border border-border px-4 py-3 hover:border-primary">{v ? "True" : "False"}</button>)}</div>
      {r !== null && <><p className="mt-3">{r === q.a ? "✅ Correct!" : "❌ Not quite."}</p><button className={`${btn} mt-3`} onClick={() => { setI(i + 1); setR(null); }}>Next</button></>}
    </div>
  );
}
