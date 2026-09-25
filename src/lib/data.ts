export type Site = {
  id: string; name: string; state: string; region: "North" | "South" | "East" | "West" | "Central" | "Northeast";
  type: "Monument" | "Temple" | "Fort" | "Natural" | "Tradition" | "Cave";
  era: string; unesco: boolean; x: number; y: number;
  summary: string; history: string; architecture: string; bestTime: string; timings: string; fee: string; tips: string;
  tags: string[];
};

// x,y are rough positions (0-100) on a stylised India map
export const sites: Site[] = [
  { id: "taj-mahal", name: "Taj Mahal", state: "Uttar Pradesh", region: "North", type: "Monument", era: "1632–1653, Mughal", unesco: true, x: 42, y: 30,
    summary: "White marble mausoleum built by Shah Jahan in memory of Mumtaz Mahal.",
    history: "Commissioned in 1632 by Mughal emperor Shah Jahan, built by around 20,000 artisans over two decades on the banks of the Yamuna in Agra.",
    architecture: "Indo-Islamic style blending Persian, Timurid and Indian elements; pietra dura inlay, charbagh garden, four minarets.",
    bestTime: "October–March", timings: "Sunrise to sunset, closed Fridays", fee: "₹50 Indians / ₹1100 foreigners (approx.)", tips: "Visit at sunrise for soft light and fewer crowds.", tags: ["mughal", "agra", "marble", "wonder"] },
  { id: "hampi", name: "Group of Monuments at Hampi", state: "Karnataka", region: "South", type: "Monument", era: "14th–16th c., Vijayanagara", unesco: true, x: 36, y: 68,
    summary: "Ruins of the Vijayanagara capital amid giant boulders.",
    history: "Capital of the Vijayanagara Empire, one of the richest cities of its time, sacked in 1565 after the Battle of Talikota.",
    architecture: "Dravidian temples, the stone chariot of Vittala temple, musical pillars and royal enclosures.",
    bestTime: "October–February", timings: "6 AM–6 PM", fee: "₹40 Indians (approx.)", tips: "Rent a bicycle; watch sunset from Hemakuta hill.", tags: ["vijayanagara", "ruins", "temple"] },
  { id: "konark", name: "Konark Sun Temple", state: "Odisha", region: "East", type: "Temple", era: "13th c., Eastern Ganga", unesco: true, x: 62, y: 50,
    summary: "A temple shaped as the chariot of the Sun god with 24 carved wheels.",
    history: "Built by King Narasimhadeva I around 1250 CE; sailors called it the Black Pagoda.",
    architecture: "Kalinga architecture; 12 pairs of stone wheels that work as sundials, pulled by seven horses.",
    bestTime: "October–March", timings: "6 AM–8 PM", fee: "₹40 Indians (approx.)", tips: "Attend the Konark Dance Festival in December.", tags: ["sun", "odisha", "chariot"] },
  { id: "ajanta", name: "Ajanta Caves", state: "Maharashtra", region: "West", type: "Cave", era: "2nd c. BCE–6th c. CE", unesco: true, x: 34, y: 50,
    summary: "Rock-cut Buddhist caves with some of the finest surviving ancient Indian paintings.",
    history: "About 30 caves carved over centuries, rediscovered in 1819 by a British officer on a tiger hunt.",
    architecture: "Chaityas (prayer halls) and viharas (monasteries) with murals of Jataka tales.",
    bestTime: "June–March", timings: "9 AM–5:30 PM, closed Mondays", fee: "₹40 Indians (approx.)", tips: "Carry a torch; flash photography is banned.", tags: ["buddhist", "murals", "caves"] },
  { id: "red-fort", name: "Red Fort", state: "Delhi", region: "North", type: "Fort", era: "1639–1648, Mughal", unesco: true, x: 40, y: 26,
    summary: "Red sandstone fort where India's Prime Minister hoists the flag on Independence Day.",
    history: "Built by Shah Jahan as the palace of his new capital Shahjahanabad.",
    architecture: "Diwan-i-Aam, Diwan-i-Khas, Rang Mahal; Mughal palace planning.",
    bestTime: "October–March", timings: "9:30 AM–4:30 PM, closed Mondays", fee: "₹35 Indians (approx.)", tips: "Stay for the evening sound and light show.", tags: ["delhi", "mughal", "independence"] },
  { id: "meenakshi", name: "Meenakshi Amman Temple", state: "Tamil Nadu", region: "South", type: "Temple", era: "Rebuilt 16th–17th c., Nayak", unesco: false, x: 42, y: 86,
    summary: "Vast temple complex in Madurai with 14 colourful gopurams.",
    history: "Dedicated to Meenakshi (Parvati) and Sundareswarar (Shiva); centre of Madurai life for over 2,000 years.",
    architecture: "Dravidian style, towering gopurams covered with thousands of painted figures, Hall of 1000 Pillars.",
    bestTime: "October–March", timings: "5 AM–12:30 PM, 4–10 PM", fee: "Free", tips: "Dress modestly; see the night ceremony.", tags: ["madurai", "dravidian", "gopuram"] },
  { id: "kaziranga", name: "Kaziranga National Park", state: "Assam", region: "Northeast", type: "Natural", era: "Park since 1974", unesco: true, x: 78, y: 32,
    summary: "Home to two-thirds of the world's one-horned rhinoceroses.",
    history: "Protected since 1905 after Lady Curzon's concern for the dwindling rhino.",
    architecture: "Floodplain grasslands, wetlands and forests of the Brahmaputra.",
    bestTime: "November–April", timings: "Safari slots morning & afternoon", fee: "Varies by zone", tips: "Book the early elephant or jeep safari.", tags: ["rhino", "wildlife", "assam"] },
  { id: "khajuraho", name: "Khajuraho Temples", state: "Madhya Pradesh", region: "Central", type: "Temple", era: "950–1050 CE, Chandela", unesco: true, x: 44, y: 38,
    summary: "Nagara-style temples famed for intricate sculpture.",
    history: "Built by the Chandela dynasty; of about 85 temples, 25 survive.",
    architecture: "Nagara style with rising shikharas and dense sculptural panels.",
    bestTime: "October–March", timings: "Sunrise–sunset", fee: "₹40 Indians (approx.)", tips: "Visit during the Khajuraho Dance Festival in February.", tags: ["chandela", "sculpture"] },
  { id: "amber", name: "Amber Fort", state: "Rajasthan", region: "West", type: "Fort", era: "1592, Rajput", unesco: true, x: 34, y: 30,
    summary: "Hilltop fort-palace of honey-coloured stone near Jaipur.",
    history: "Built by Raja Man Singh I; part of the Hill Forts of Rajasthan UNESCO site.",
    architecture: "Rajput-Mughal fusion; Sheesh Mahal mirror palace.",
    bestTime: "October–March", timings: "8 AM–5:30 PM", fee: "₹100 Indians (approx.)", tips: "Walk up the ramp early in the morning.", tags: ["jaipur", "rajput", "fort"] },
  { id: "durga-puja", name: "Durga Puja of Kolkata", state: "West Bengal", region: "East", type: "Tradition", era: "Living tradition", unesco: true, x: 66, y: 42,
    summary: "Festival of the goddess Durga, inscribed as UNESCO Intangible Heritage in 2021.",
    history: "Celebrated since at least the 16th century; community pandals grew in the 20th century.",
    architecture: "Temporary pandal art, clay idols made in Kumartuli.",
    bestTime: "September–October", timings: "Festival days", fee: "Free", tips: "Go pandal-hopping at night by metro.", tags: ["festival", "kolkata", "intangible"] },
  { id: "kathakali", name: "Kathakali", state: "Kerala", region: "South", type: "Tradition", era: "17th c. onwards", unesco: false, x: 36, y: 84,
    summary: "Classical dance-drama with elaborate make-up and costumes.",
    history: "Developed from Krishnanattam and Ramanattam in Kerala's temple and court culture.",
    architecture: "Performance art: mudras, facial expressions, chenda drums.",
    bestTime: "All year", timings: "Evening shows", fee: "Varies", tips: "Arrive early to watch the make-up being applied.", tags: ["dance", "kerala"] },
  { id: "sanchi", name: "Sanchi Stupa", state: "Madhya Pradesh", region: "Central", type: "Monument", era: "3rd c. BCE, Mauryan", unesco: true, x: 40, y: 42,
    summary: "One of the oldest stone structures in India, commissioned by Ashoka.",
    history: "Built by Emperor Ashoka and enlarged by later dynasties.",
    architecture: "Hemispherical dome with four carved toranas (gateways).",
    bestTime: "October–March", timings: "Sunrise–sunset", fee: "₹40 Indians (approx.)", tips: "Study the Jataka stories on the gateways.", tags: ["buddhist", "ashoka", "stupa"] },
  { id: "golden-temple", name: "Harmandir Sahib (Golden Temple)", state: "Punjab", region: "North", type: "Temple", era: "1604, Sikh", unesco: false, x: 36, y: 20,
    summary: "Holiest gurdwara of Sikhism, home of the world's largest free kitchen.",
    history: "Founded by Guru Arjan Dev; the Adi Granth was installed in 1604.",
    architecture: "Gilded sanctum amid the Amrit Sarovar pool.",
    bestTime: "November–March", timings: "Open 24 hours", fee: "Free", tips: "Cover your head; eat at the langar.", tags: ["sikh", "amritsar", "langar"] },
  { id: "living-root-bridges", name: "Living Root Bridges", state: "Meghalaya", region: "Northeast", type: "Natural", era: "Living tradition", unesco: false, x: 76, y: 36,
    summary: "Bridges grown from rubber-fig roots by Khasi and Jaintia communities.",
    history: "Grown over decades using traditional ecological knowledge passed down generations.",
    architecture: "Bio-engineered bridges; the double-decker bridge at Nongriat.",
    bestTime: "October–May", timings: "Daylight", fee: "Small local fee", tips: "The Nongriat trek has ~3,500 steps.", tags: ["khasi", "nature", "indigenous"] },
];

export type Artisan = { id: string; name: string; craft: string; state: string; community: string; about: string; contact: string };
export const artisans: Artisan[] = [
  { id: "a1", name: "Jivya Soma Mashe Collective", craft: "Warli painting", state: "Maharashtra", community: "Warli", about: "Rice-paste paintings on mud walls showing everyday life and harvest.", contact: "Dahanu, Palghar district" },
  { id: "a2", name: "Patan Patola Weavers", craft: "Patola silk", state: "Gujarat", community: "Salvi family", about: "Double-ikat silk saris taking months to weave.", contact: "Patan" },
  { id: "a3", name: "Channapatna Toy Makers", craft: "Lacquered wooden toys", state: "Karnataka", community: "Local cooperative", about: "Eco-friendly toys coloured with vegetable dyes.", contact: "Channapatna" },
  { id: "a4", name: "Bhil Art Circle", craft: "Bhil dot painting", state: "Madhya Pradesh", community: "Bhil", about: "Dot-filled paintings of animals, gods and nature.", contact: "Jhabua" },
  { id: "a5", name: "Pattachitra Chitrakars", craft: "Pattachitra scroll painting", state: "Odisha", community: "Chitrakar", about: "Cloth-scroll paintings of Jagannath myths.", contact: "Raghurajpur" },
  { id: "a6", name: "Kanchipuram Silk Guild", craft: "Kanjivaram silk", state: "Tamil Nadu", community: "Devanga & Saliya", about: "Heavy silk with zari borders woven on pit looms.", contact: "Kanchipuram" },
  { id: "a7", name: "Blue Pottery Studio", craft: "Blue pottery", state: "Rajasthan", community: "Artisan families", about: "Quartz-based glazed pottery in cobalt blue.", contact: "Jaipur" },
  { id: "a8", name: "Dokra Metal Casters", craft: "Dokra lost-wax casting", state: "Chhattisgarh", community: "Ghadwa", about: "4,000-year-old technique of brass casting.", contact: "Bastar" },
  { id: "a9", name: "Madhubani Women Artists", craft: "Madhubani painting", state: "Bihar", community: "Mithila", about: "Bold line paintings with natural colours.", contact: "Madhubani" },
  { id: "a10", name: "Gond Pardhan Painters", craft: "Gond painting", state: "Madhya Pradesh", community: "Pardhan Gond", about: "Vivid stories of forest and folklore in patterned lines.", contact: "Patangarh, Dindori" },
];

export type Q = { q: string; options: string[]; answer: number; fact: string };
export const quiz: Q[] = [
  { q: "Who built the Taj Mahal?", options: ["Akbar", "Shah Jahan", "Babur", "Aurangzeb"], answer: 1, fact: "Shah Jahan built it for Mumtaz Mahal." },
  { q: "Konark Sun Temple is shaped like a…", options: ["Boat", "Lotus", "Chariot", "Mountain"], answer: 2, fact: "It has 24 wheels and 7 horses." },
  { q: "Hampi was the capital of which empire?", options: ["Maurya", "Chola", "Vijayanagara", "Gupta"], answer: 2, fact: "It fell in 1565." },
  { q: "Warli art is traditionally painted with…", options: ["Rice paste", "Oil paint", "Charcoal", "Ink"], answer: 0, fact: "White rice paste on mud walls." },
  { q: "Kaziranga is famous for the…", options: ["Snow leopard", "One-horned rhino", "Asiatic lion", "Red panda"], answer: 1, fact: "About two-thirds of the world's population lives there." },
  { q: "Which script is used for Santali?", options: ["Ol Chiki", "Gurmukhi", "Modi", "Brahmi"], answer: 0, fact: "Created by Pandit Raghunath Murmu in 1925." },
  { q: "Sanchi Stupa was commissioned by…", options: ["Ashoka", "Harsha", "Chandragupta II", "Kanishka"], answer: 0, fact: "3rd century BCE." },
  { q: "Kathakali comes from which state?", options: ["Tamil Nadu", "Kerala", "Odisha", "Assam"], answer: 1, fact: "Known for green 'pacha' make-up." },
  { q: "Durga Puja was inscribed by UNESCO in…", options: ["2011", "2016", "2021", "2024"], answer: 2, fact: "As Intangible Cultural Heritage." },
  { q: "Patola is a type of…", options: ["Pottery", "Double-ikat silk", "Metal casting", "Painting"], answer: 1, fact: "Woven in Patan, Gujarat." },
];

export type Artwork = { id: string; title: string; style: string; creator: string; community: string; region: string; credit: string; image: string; story: string; model?: string };
export const artworks: Artwork[] = [
  { id: "w1", title: "Harvest Dance (Tarpa)", style: "Warli", creator: "Community artist", community: "Warli", region: "Palghar, Maharashtra", credit: "Illustrative reproduction", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Warli_painting.jpg/640px-Warli_painting.jpg", story: "Dancers circle around the tarpa player, a spiral that mirrors the cycle of life.", model: "https://modelviewer.dev/shared-assets/models/Astronaut.glb" },
  { id: "w2", title: "Tree of Life", style: "Gond", creator: "Pardhan Gond artist", community: "Gond", region: "Dindori, Madhya Pradesh", credit: "Illustrative reproduction", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Gond_painting.jpg/640px-Gond_painting.jpg", story: "Birds and animals shelter in a tree whose patterns carry clan stories." },
  { id: "w3", title: "Madhubani Fish", style: "Madhubani", creator: "Mithila artist", community: "Mithila", region: "Bihar", credit: "Illustrative reproduction", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Madhubani_art.jpg/640px-Madhubani_art.jpg", story: "Fish symbolise fertility and good fortune, often painted for weddings." },
  { id: "w4", title: "Pithora Horses", style: "Pithora", creator: "Rathwa lakhara", community: "Rathwa", region: "Chhota Udaipur, Gujarat", credit: "Source unavailable", image: "", story: "Painted horses honour Baba Pithora; made as a vow for a family's wellbeing." },
];

export type Lang = { code: string; name: string; native: string; script: string; family: string; speakers: string;
  sounds: { glyph: string; latin: string }[]; words: { native: string; latin: string; en: string }[]; patterns: { pattern: string; example: string; en: string }[] };
// Reviewed records (static, curated). Structure allows adding more languages.
export const languages: Lang[] = [
  { code: "sat", name: "Santali", native: "ᱥᱟᱱᱛᱟᱲᱤ", script: "Ol Chiki", family: "Austroasiatic", speakers: "~7.6 million",
    sounds: [{ glyph: "ᱚ", latin: "o" }, { glyph: "ᱛ", latin: "t" }, { glyph: "ᱜ", latin: "g" }, { glyph: "ᱟ", latin: "a" }, { glyph: "ᱠ", latin: "k" }, { glyph: "ᱞ", latin: "l" }, { glyph: "ᱤ", latin: "i" }, { glyph: "ᱢ", latin: "m" }],
    words: [{ native: "ᱡᱚᱦᱟᱨ", latin: "johar", en: "greetings" }, { native: "ᱫᱟᱜ", latin: "dak'", en: "water" }, { native: "ᱚᱲᱟᱜ", latin: "orak'", en: "house" }, { native: "ᱜᱟᱹᱛᱮ", latin: "gate", en: "friend" }],
    patterns: [{ pattern: "Subject + Object + Verb", example: "ᱤᱧ ᱫᱟᱜ ᱧᱩᱭ", en: "I drink water" }] },
  { code: "hi", name: "Hindi", native: "हिन्दी", script: "Devanagari", family: "Indo-Aryan", speakers: "~600 million",
    sounds: [{ glyph: "अ", latin: "a" }, { glyph: "आ", latin: "ā" }, { glyph: "क", latin: "ka" }, { glyph: "ग", latin: "ga" }, { glyph: "म", latin: "ma" }, { glyph: "र", latin: "ra" }],
    words: [{ native: "नमस्ते", latin: "namaste", en: "hello" }, { native: "पानी", latin: "pānī", en: "water" }, { native: "घर", latin: "ghar", en: "house" }, { native: "दोस्त", latin: "dost", en: "friend" }],
    patterns: [{ pattern: "Subject + Object + Verb", example: "मैं पानी पीता हूँ", en: "I drink water" }] },
  { code: "ta", name: "Tamil", native: "தமிழ்", script: "Tamil", family: "Dravidian", speakers: "~85 million",
    sounds: [{ glyph: "அ", latin: "a" }, { glyph: "ஆ", latin: "ā" }, { glyph: "க", latin: "ka" }, { glyph: "ம", latin: "ma" }, { glyph: "ழ", latin: "zha" }, { glyph: "ந", latin: "na" }],
    words: [{ native: "வணக்கம்", latin: "vaṇakkam", en: "hello" }, { native: "தண்ணீர்", latin: "taṇṇīr", en: "water" }, { native: "வீடு", latin: "vīṭu", en: "house" }, { native: "நண்பன்", latin: "naṇpaṉ", en: "friend" }],
    patterns: [{ pattern: "Subject + Object + Verb", example: "நான் தண்ணீர் குடிக்கிறேன்", en: "I drink water" }] },
];

export const artStyles = ["Warli", "Gond", "Saura", "Pithora", "Bhil", "Madhubani", "Pattachitra"];
