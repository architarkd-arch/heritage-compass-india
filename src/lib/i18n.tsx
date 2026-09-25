import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Add a new language by adding its code here and a dictionary below.
export const LOCALES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ta", label: "தமிழ்" },
] as const;
type Code = (typeof LOCALES)[number]["code"];

const dict: Record<Code, Record<string, string>> = {
  en: { home: "Home", map: "Map", search: "Search", story: "Storyteller", crafts: "Artisans", games: "Games", decoder: "Art Decoder", reader: "Book Reader", langs: "Languages", ar: "AR Gallery",
    tagline: "Discover. Learn. Connect. Support. Preserve.", heroSub: "Explore India's heritage, meet traditional artisans, and experience history through AI storytelling.", searchPh: "Search any heritage — Taj Mahal, Warli, Kerala…", notice: "Translations and cultural interpretations may need community review.", listen: "Listen" },
  hi: { home: "मुख्य", map: "नक्शा", search: "खोजें", story: "कथावाचक", crafts: "कारीगर", games: "खेल", decoder: "कला पहचान", reader: "पुस्तक पाठक", langs: "भाषाएँ", ar: "एआर गैलरी",
    tagline: "खोजें। सीखें। जुड़ें। सहयोग करें। संरक्षित करें।", heroSub: "भारत की विरासत खोजें, पारंपरिक कारीगरों से मिलें और एआई कहानियों से इतिहास जानें।", searchPh: "कोई भी विरासत खोजें — ताज महल, वारली…", notice: "अनुवाद और सांस्कृतिक व्याख्याओं की सामुदायिक समीक्षा आवश्यक हो सकती है।", listen: "सुनें" },
  ta: { home: "முகப்பு", map: "வரைபடம்", search: "தேடல்", story: "கதைசொல்லி", crafts: "கைவினைஞர்கள்", games: "விளையாட்டுகள்", decoder: "கலை அறிதல்", reader: "நூல் வாசிப்பு", langs: "மொழிகள்", ar: "AR காட்சியகம்",
    tagline: "கண்டறி. கற்றுக்கொள். இணை. ஆதரி. பாதுகா.", heroSub: "இந்தியாவின் பாரம்பரியத்தை ஆராயுங்கள், கைவினைஞர்களைச் சந்தியுங்கள், AI கதைகளால் வரலாற்றை அனுபவியுங்கள்.", searchPh: "எந்த பாரம்பரியத்தையும் தேடுங்கள்…", notice: "மொழிபெயர்ப்புகளுக்கு சமூக மதிப்பாய்வு தேவைப்படலாம்.", listen: "கேள்" },
};

const Ctx = createContext<{ lang: Code; setLang: (c: Code) => void; t: (k: string) => string }>({ lang: "en", setLang: () => {}, t: (k) => k });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangS] = useState<Code>("en");
  useEffect(() => { const s = localStorage.getItem("lang") as Code | null; if (s && s in dict) setLangS(s); }, []);
  const setLang = (c: Code) => { setLangS(c); localStorage.setItem("lang", c); document.documentElement.lang = c; };
  return <Ctx.Provider value={{ lang, setLang, t: (k) => dict[lang][k] ?? dict.en[k] ?? k }}>{children}</Ctx.Provider>;
}
export const useI18n = () => useContext(Ctx);

export function speak(text: string, lang = "en") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "hi" ? "hi-IN" : lang === "ta" ? "ta-IN" : "en-IN";
  window.speechSynthesis.speak(u);
}
