import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { askAI } from "@/lib/ai.functions";
import { PageTitle, ReportButton, btn, card } from "@/components/Shell";
import { speak } from "@/lib/i18n";
import { fileToDataUrl, parseJson } from "@/lib/files";

export const Route = createFileRoute("/book-reader")({
  head: () => ({ meta: [{ title: "Book Reader — Santali Ol Chiki & Devanagari | Heritage Compass" }, { name: "description", content: "Photograph a page to see original text, transliteration and translation side by side." }, { property: "og:title", content: "Heritage Book Reader" }, { property: "og:description", content: "Read Santali and Devanagari primers with AI help." }] }),
  component: Reader,
});

type R = { script: string; original: string; transliteration: string; translation: string; target: string };

function Reader() {
  const ask = useServerFn(askAI);
  const [img, setImg] = useState<string | null>(null); const [target, setTarget] = useState("English");
  const [res, setRes] = useState<R | null>(null); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  async function run() {
    if (!img) return; setBusy(true); setErr(""); setRes(null);
    const r = await ask({ data: { mode: "reader", prompt: "Read this page.", image: img, target } }).catch(() => ({ error: "Network error" }));
    if ("error" in r && r.error) setErr(r.error); else { const j = parseJson<R>("text" in r ? r.text ?? "" : ""); j ? setRes(j) : setErr("Could not read the page."); }
    setBusy(false);
  }
  return (
    <div>
      <PageTitle title="Book Reader" sub="Focused on Santali in Ol Chiki and Devanagari primers. Upload a clear photo of a page." />
      <div className={`${card} flex flex-col gap-3 sm:flex-row sm:items-end`}>
        <label className="flex-1"><span className="font-medium">Page photo</span><input type="file" accept="image/*" capture="environment" className="mt-2 block w-full text-sm" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setImg(await fileToDataUrl(f, 1600)); }} /></label>
        <label><span className="font-medium">Translate to</span><select value={target} onChange={(e) => setTarget(e.target.value)} className="mt-2 block rounded-md border border-input bg-card px-3 py-2"><option>English</option><option>Hindi</option></select></label>
        <button disabled={!img || busy} onClick={run} className={btn}>{busy ? "Reading…" : "Read page"}</button>
      </div>
      {err && <p className="mt-3 text-destructive" role="alert">{err}</p>}
      {img && !res && <img src={img} alt="Uploaded page" className="mt-6 max-h-96 rounded-lg" />}
      {res && (
        <div className="mt-6">
          <p className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-sm">AI draft, needs community review · Script: {res.script || "unknown"}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {[["Original", res.original, "font-['Noto_Sans_Ol_Chiki','Noto_Sans_Devanagari']"], ["Latin transliteration", res.transliteration, ""], [`${target} translation`, res.translation, ""]].map(([h, v, f]) => (
              <section key={h} className={card}><h2 className="font-display font-semibold">{h}</h2><p className={`mt-2 whitespace-pre-wrap text-lg ${f}`}>{v || "—"}</p></section>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button className={btn} onClick={() => speak(res.translation, target === "Hindi" ? "hi" : "en")}>🔊 Play translation</button>
            <p className="text-sm text-muted-foreground">Audio of the original Santali is not available yet.</p>
          </div>
          <div className="mt-4"><ReportButton what="page reading" /></div>
        </div>
      )}
    </div>
  );
}
