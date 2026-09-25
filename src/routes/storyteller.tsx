import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { askAI } from "@/lib/ai.functions";
import { PageTitle, btn } from "@/components/Shell";
import { speak, useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/storyteller")({
  validateSearch: (s) => z.object({ q: z.string().optional() }).parse(s),
  head: () => ({ meta: [{ title: "AI Heritage Storyteller — Heritage Compass" }, { name: "description", content: "Ask questions and explore Indian history through conversation." }, { property: "og:title", content: "AI Heritage Storyteller" }, { property: "og:description", content: "Conversational history of India." }] }),
  component: Story,
});

type Msg = { role: "user" | "ai"; text: string };
const starters = ["Why was Hampi abandoned?", "Tell me a legend about Konark", "What is the story behind Warli art?", "Explain Chola bronze sculptures"];

function Story() {
  const { q } = Route.useSearch();
  const ask = useServerFn(askAI);
  const { lang, t } = useI18n();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState(q ?? "");
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { ref.current?.focus(); }, [busy]);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    const next = [...msgs, { role: "user" as const, text }];
    setMsgs(next); setInput(""); setBusy(true);
    const history = next.map((m) => `${m.role === "user" ? "User" : "Storyteller"}: ${m.text}`).join("\n");
    const r = await ask({ data: { mode: "story", prompt: `${history}\n(Reply language code: ${lang})` } }).catch(() => ({ error: "Network error" }));
    setMsgs([...next, { role: "ai", text: "text" in r && r.text ? r.text : ("error" in r ? r.error! : "No answer.") }]);
    setBusy(false);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle title="AI Heritage Storyteller" sub="Ask anything about India's history, monuments, festivals and traditions." />
      {msgs.length === 0 && <div className="mb-4 flex flex-wrap gap-2">{starters.map((s) => <button key={s} onClick={() => send(s)} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm hover:border-primary">{s}</button>)}</div>}
      <div className="space-y-4" aria-live="polite">
        {msgs.map((m, i) => m.role === "user"
          ? <div key={i} className="ml-auto max-w-[85%] rounded-xl bg-foreground px-4 py-2 text-background">{m.text}</div>
          : <div key={i} className="max-w-[95%]"><p className="whitespace-pre-wrap leading-relaxed">{m.text}</p><button onClick={() => speak(m.text, lang)} className="mt-1 text-sm underline">🔊 {t("listen")}</button></div>)}
        {busy && <p className="animate-pulse text-muted-foreground">The storyteller is thinking…</p>}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="sticky bottom-4 mt-6 flex gap-2 rounded-xl border border-border bg-card p-2">
        <textarea ref={ref} rows={2} aria-label="Your question" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }} className="flex-1 resize-none bg-transparent p-2 outline-none" placeholder="Ask about any heritage…" />
        <button disabled={busy} className={btn}>Send</button>
      </form>
    </div>
  );
}
