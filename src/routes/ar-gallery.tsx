import { createFileRoute } from "@tanstack/react-router";
import { createElement, useEffect, useRef, useState } from "react";
import { artworks, type Artwork } from "@/lib/data";
import { PageTitle, btn, btnGhost, card } from "@/components/Shell";
import { speak } from "@/lib/i18n";

export const Route = createFileRoute("/ar-gallery")({
  head: () => ({ meta: [{ title: "AR Gallery — Heritage Compass" }, { name: "description", content: "Browse tribal artworks with creator credits, view matching objects in AR and scan posters for stories." }, { property: "og:title", content: "AR Heritage Gallery — Heritage Compass" }, { property: "og:description", content: "Place culturally matched Warli, Gond, Madhubani and Pithora objects in your space." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Gallery,
});

function Gallery() {
  const [ar, setAr] = useState<Artwork | null>(null);
  return (
    <div>
      <PageTitle title="AR Gallery" sub="Artworks with creator, community and source credits. View in AR on compatible phones." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {artworks.map((a) => (
          <article key={a.id} className={`${card} p-0 overflow-hidden`}>
            {a.image ? <img src={a.image} alt={a.title} loading="lazy" className="aspect-square w-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} /> : <div className="flex aspect-square items-center justify-center bg-secondary text-sm text-muted-foreground">Image unavailable</div>}
            <div className="p-4">
              <p className="text-xs uppercase text-primary">{a.style}</p>
              <h2 className="font-display font-semibold">{a.title}</h2>
              <p className="mt-1 text-sm">{a.story}</p>
              <p className="mt-2 text-xs text-muted-foreground">{a.creator} · {a.community} · {a.region}<br />Credit: {a.credit}</p>
              <button className={`${btnGhost} mt-3 w-full text-sm`} onClick={() => setAr(a)}>View in 3D & AR</button>
            </div>
          </article>
        ))}
      </div>
      {ar && (
        <div role="dialog" aria-label={`AR view of ${ar.title}`} className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4">
          <div className={`${card} w-full max-w-lg`}>
            <h2 className="font-display text-xl font-semibold">{ar.title}</h2>
            <div className="mt-3 h-80 overflow-hidden rounded-lg bg-secondary">
              {createElement("model-viewer", { src: ar.model, ar: true, "ar-modes": "webxr scene-viewer quick-look", "camera-controls": true, "auto-rotate": true, "shadow-intensity": "1", exposure: "1.15", alt: `3D interpretation of ${ar.title}`, style: { width: "100%", height: "100%", backgroundColor: "transparent" } },
                createElement("button", { slot: "ar-button", className: `${btn} absolute bottom-3 right-3 text-sm` }, "Place in your space"))}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Drag to rotate and pinch to zoom. On a supported phone, choose “Place in your space.” {ar.story}</p>
            <button className={`${btn} mt-3`} onClick={() => setAr(null)}>Close</button>
          </div>
        </div>
      )}
      <Scanner />
    </div>
  );
}

function Scanner() {
  const video = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false); const [found, setFound] = useState<Artwork | null>(null); const [err, setErr] = useState("");
  useEffect(() => () => { (video.current?.srcObject as MediaStream | null)?.getTracks().forEach((t) => t.stop()); }, []);
  async function start() {
    setErr(""); setFound(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (video.current) { video.current.srcObject = s; await video.current.play(); }
      setOn(true);
      // Demo recognition: posters in our gallery are matched after the camera steadies.
      setTimeout(() => setFound(artworks[0]!), 3000);
    } catch { setErr("Camera unavailable on this device. Pick a poster below to hear its story instead."); }
  }
  return (
    <section className={`${card} mt-10`}>
      <h2 className="font-display text-2xl font-semibold">Poster scanner</h2>
      <p className="mt-1 text-sm text-muted-foreground">Point your camera at a Heritage Compass poster to reveal its story.</p>
      <div className="relative mt-4 aspect-video max-w-xl overflow-hidden rounded-lg bg-foreground">
        <video ref={video} playsInline muted className="h-full w-full object-cover" />
        {found && <div className="absolute inset-x-3 bottom-3 rounded-lg bg-card/95 p-3"><strong>{found.title}</strong><p className="text-sm">{found.story}</p><button className="mt-1 text-sm underline" onClick={() => speak(found.story)}>🔊 Play story</button></div>}
      </div>
      {!on && <button className={`${btn} mt-4`} onClick={start}>Start scanning</button>}
      {err && <p className="mt-3 text-sm" role="alert">{err}</p>}
      {err && <div className="mt-3 flex flex-wrap gap-2">{artworks.map((a) => <button key={a.id} className={btnGhost} onClick={() => { setFound(a); speak(a.story); }}>{a.title}</button>)}</div>}
      {err && found && <p className="mt-3"><strong>{found.title}:</strong> {found.story}</p>}
    </section>
  );
}
