import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { askAI } from "@/lib/ai.functions";
import { artStyles } from "@/lib/data";
import { PageTitle, ReportButton, btn, card } from "@/components/Shell";
import { speak, useI18n } from "@/lib/i18n";
import { fileToDataUrl, parseJson } from "@/lib/files";

export const Route = createFileRoute("/art-decoder")({
  head: () => ({ meta: [{ title: "Art Decoder — Heritage Compass" }, { name: "description", content: "Photograph tribal art like Warli, Gond, Saura, Pithora or Bhil and learn its style and motifs." }, { property: "og:title", content: "Tribal Art Decoder" }, { property: "og:description", content: "Identify Indian tribal art styles and motifs." }] }),
  component: Decoder,
});

type Result = { style: string; confidence: number; motifs: { name: string; meaning: string; verified: boolean }[]; explanation: string };

function Decoder() {
  const ask = useServerFn(askAI);
  const { lang, t } = useI18n();
  const [img, setImg] = useState<string | null>(null);
  const [res, setRes] = useState<Result | null>(null);
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);

  async function run() {
    if (!img) return; setBusy(true); setErr(""); setRes(null);
    const r = await ask({ data: { mode: "decoder", prompt: "Analyse this artwork.", image: img } }).catch(() => ({ error: "Network error" }));
    if ("error" in r && r.error) setErr(r.error); else { const j = parseJson<Result>("text" in r ? r.text ?? "" : ""); j ? setRes(j) : setErr("Could not read the result. Try a clearer photo."); }
    setBusy(false);
  }

  return (
    <div>
      <PageTitle title="Art Decoder" sub={`Upload or photograph a tribal artwork. Supports ${artStyles.join(", ")}.`} />
      <div className="grid gap-6 md:grid-cols-2">
        <div className={card}>
          <label className="block">
            <span className="font-medium">Upload or take a photo</span>
            <input type="file" accept="image/*" capture="environment" className="mt-2 block w-full text-sm" onChange={async (e) => { const f = e.target.files?.[0]; if (f) { setImg(await fileToDataUrl(f)); setRes(null); } }} />
          </label>
          {img && <img src={img} alt="Your artwork" className="mt-4 max-h-80 w-full rounded-lg object-contain" />}
          <button disabled={!img || busy} onClick={run} className={`${btn} mt-4 w-full`}>{busy ? "Decoding…" : "Decode artwork"}</button>
          {err && <p className="mt-3 text-destructive" role="alert">{err}</p>}
        </div>
        <div className={card} aria-live="polite">
          {!res ? <p className="text-muted-foreground">Results appear here: style, confidence, motifs and explanation.</p> : (
            <div className="space-y-4">
              <div><p className="text-sm text-muted-foreground">Likely style</p><h2 className="font-display text-2xl font-semibold">{res.style}</h2>
                <div className="mt-2 h-2 rounded bg-secondary"><div className="h-2 rounded bg-primary" style={{ width: `${res.confidence}%` }} /></div>
                <p className="mt-1 text-sm">Confidence: {Math.round(res.confidence)}%</p></div>
              <ul className="space-y-2">{res.motifs.map((m, i) => (
                <li key={i} className="rounded-md border border-border p-3"><div className="flex items-center justify-between gap-2"><strong>{m.name}</strong>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${m.verified ? "bg-success/15 text-success" : "bg-accent"}`}>{m.verified ? "Verified" : "Unverified"}</span></div>
                  <p className="mt-1 text-sm">{m.verified ? m.meaning : "Meaning not verified in our source library."}</p></li>))}</ul>
              <p className="leading-relaxed">{res.explanation}</p>
              <p className="text-xs text-muted-foreground">AI draft, based on documented sources on {res.style} art; needs community review.</p>
              <button className={btn} onClick={() => speak(res.explanation, lang)}>🔊 {t("listen")}</button>
              <ReportButton what="art decoding" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
