import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SYSTEMS = {
  story: "You are Heritage Compass, a warm storyteller of Indian heritage. Answer concisely (under 200 words) with accurate history. If unsure, say so. Reply in the user's language.",
  decoder: `You analyse photos of Indian tribal/folk art (Warli, Gond, Saura, Pithora, Bhil, Madhubani, Pattachitra). Return ONLY JSON: {"style":string,"confidence":number 0-100,"motifs":[{"name":string,"meaning":string,"verified":boolean}],"explanation":string}. Mark verified=false and meaning="Unverified" for any motif whose meaning you cannot confirm from well-documented sources. Never invent meanings. If not tribal art, style="Unknown".`,
  reader: `You read photos of book pages, focusing on Santali in Ol Chiki and Devanagari primers. Return ONLY JSON: {"script":string,"original":string,"transliteration":string,"translation":string,"target":"English"|"Hindi"}. Use empty strings when unreadable.`,
} as const;

export const askAI = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ mode: z.enum(["story", "decoder", "reader"]), prompt: z.string().max(4000), image: z.string().max(8_000_000).optional(), target: z.string().optional() }).parse(d))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { error: "AI is not configured." };
    const content: Record<string, string>[] = [{ type: "input_text", text: data.prompt + (data.target ? `\nTranslate into ${data.target}.` : "") }];
    if (data.image) content.push({ type: "input_image", image_url: data.image });
    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key, Authorization: `Bearer ${key}`, "X-Lovable-AIG-SDK": "fetch" },
      body: JSON.stringify({ model: "openai/gpt-6-astra", instructions: SYSTEMS[data.mode], input: [{ role: "user", content }], reasoning: { effort: "low" }, store: false, stream: true }),
    });
    if (!res.ok || !res.body) {
      if (res.status === 429) return { error: "Too many requests — please wait a moment." };
      if (res.status === 402) return { error: "AI credits are used up for this workspace." };
      return { error: `AI request failed (${res.status}).` };
    }
    const reader = res.body.getReader(); const dec = new TextDecoder(); let buf = "", text = "";
    for (;;) {
      const { done, value } = await reader.read(); if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n"); buf = lines.pop() ?? "";
      for (const l of lines) {
        if (!l.startsWith("data:")) continue;
        try { const ev = JSON.parse(l.slice(5).trim()); if (ev.type === "response.output_text.delta") text += ev.delta; } catch { /* ignore */ }
      }
    }
    return { text };
  });
