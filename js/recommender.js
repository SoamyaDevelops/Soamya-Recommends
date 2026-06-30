/* ══════════════════════════════════════
   SOAMYA RECOMMENDS v2 — RECOMMENDER JS
   Full Apple DB + AI + Filter Engine
   ══════════════════════════════════════ */

// ── GROQ KEYS (same as chat.js — add your keys here too) ──
const GROQ_KEYS_R = [
  "YOUR_GROQ_API_KEY_1",
  "YOUR_GROQ_API_KEY_2",
  "YOUR_GROQ_API_KEY_3",
];
let rKeyIdx = 0;

// ══════════════════════════════════════
// APPLE PRODUCT DATABASE
// All specs from apple.com · Updated 2025
// ══════════════════════════════════════
const DB = [

  // ─── iPHONE ───────────────────────
  {
    id: 'iphone16promax', cat: 'iphone',
    name: 'iPhone 16 Pro Max',
    tagline: 'The ultimate iPhone. Best camera. Longest battery. Biggest screen.',
    priceINR: '₹1,59,900', priceUSD: '$1,199', priceNum: 159900,
    img: 'images/06_iphone_16_pro_orange.png',
    appleUrl: 'https://www.apple.com/iphone-16-pro/',
    specs: ['A18 Pro chip', '48MP ProRAW triple camera', '6.9" ProMotion OLED', '33 hrs video', '256GB–1TB', '8GB RAM', '227g'],
    useCases: ['photographer', 'filmmaker', 'business', 'casual', 'creative'],
    bestFor: ['camera', 'battery', 'performance', 'display'],
    budgets: ['100-150k', 'above150k'],
    discounts: {
      student: 'Up to ₹10,000 off via Apple Education Store',
      corporate: 'Up to ₹12,000 off via Apple Business Store',
      tradein: 'Up to ₹55,000 iPhone trade-in credit',
    },
    why: 'The <strong>A18 Pro chip</strong> handles 4K ProRes video, log-format photography, and console-quality gaming — simultaneously, silently. Camera Control button gives you a physical shutter. The 6.9" ProMotion display adapts from 1Hz to 120Hz automatically. If you want the absolute best iPhone made, this is it.',
    verdict: 'Best iPhone money can buy.',
  },
  {
    id: 'iphone16pro', cat: 'iphone',
    name: 'iPhone 16 Pro',
    tagline: 'Same Pro power as the Max — 28g lighter, 0.3" smaller.',
    priceINR: '₹1,19,900', priceUSD: '$999', priceNum: 119900,
    img: 'images/06_iphone_16_pro_orange.png',
    appleUrl: 'https://www.apple.com/iphone-16-pro/',
    specs: ['A18 Pro chip', '48MP ProRAW triple camera', '6.3" ProMotion OLED', '27 hrs video', '128GB–1TB', '8GB RAM', '199g'],
    useCases: ['photographer', 'filmmaker', 'business', 'casual', 'creative'],
    bestFor: ['camera', 'performance', 'display', 'portability'],
    budgets: ['100-150k', 'above150k'],
    discounts: {
      student: 'Up to ₹8,000 off via Education Store',
      corporate: 'Up to ₹10,000 off via Business Store',
    },
    why: '<strong>Identical A18 Pro chip and ProRAW camera system</strong> to the Pro Max — just smaller. If you prefer one-handed use or find the 6.9" too large for your hands, this is the smarter choice. Same Camera Control, same ProRes 4K, same chip. No compromises except screen size and battery.',
    verdict: 'Best Pro iPhone for one-handed use.',
  },
  {
    id: 'iphone16', cat: 'iphone',
    name: 'iPhone 16',
    tagline: 'The smartest standard iPhone Apple has ever made.',
    priceINR: '₹79,900', priceUSD: '$799', priceNum: 79900,
    img: 'images/13_iphone_16_colors_fan.png',
    appleUrl: 'https://www.apple.com/iphone-16/',
    specs: ['A18 chip', '48MP + 12MP camera', '6.1" Super Retina XDR', '22 hrs video', '128GB–512GB', '8GB RAM', '170g'],
    useCases: ['student', 'casual', 'teacher', 'remote'],
    bestFor: ['value', 'portability', 'camera'],
    budgets: ['60-100k'],
    discounts: {
      student: 'Up to ₹5,000 off via Education Store',
      tradein: 'Up to ₹25,000 trade-in',
    },
    why: '<strong>A18 chip with Apple Intelligence</strong> — the same neural engine as Pro, just without the 3x telephoto lens and ProRAW. At 170g it\'s the lightest iPhone 16 model. Camera Control button included. Perfect for students and everyday users upgrading from older iPhones. Easily handles everything non-professional users need.',
    verdict: 'Best value iPhone for most people.',
  },
  {
    id: 'iphonese', cat: 'iphone',
    name: 'iPhone SE (3rd Gen)',
    tagline: 'The most affordable iPhone with a powerful chip.',
    priceINR: '₹49,900', priceUSD: '$429', priceNum: 49900,
    img: 'images/08_iphone_se_pink.png',
    appleUrl: 'https://www.apple.com/iphone-se/',
    specs: ['A15 Bionic', '12MP camera', '4.7" Retina', '15 hrs video', '64GB–256GB', '4.7" LCD', '144g'],
    useCases: ['casual', 'student', 'teacher'],
    bestFor: ['value', 'portability'],
    budgets: ['under30k', '30-60k'],
    discounts: {
      student: 'Occasional Education pricing',
      tradein: 'Up to ₹15,000 trade-in',
    },
    why: '<strong>A15 Bionic is still very fast</strong> for everyday tasks. The only current iPhone with Touch ID (fingerprint) and a 4.7" display — perfect if you find modern iPhones too large. One major compromise: no 5G in India. Great for parents, first iPhone buyers, or anyone who prefers small phones.',
    verdict: 'Best for small-phone lovers and first-time iPhone buyers.',
  },

  // ─── MacBook ───────────────────────
  {
    id: 'mbpro16m4pro', cat: 'macbook',
    name: 'MacBook Pro 16" M4 Pro',
    tagline: 'The ultimate professional laptop. No fan noise. All day battery.',
    priceINR: '₹2,49,900', priceUSD: '$2,499', priceNum: 249900,
    img: 'images/10_macbook_pro_dark.png',
    appleUrl: 'https://www.apple.com/macbook-pro/',
    specs: ['M4 Pro chip', '16.2" Liquid Retina XDR 120Hz', '24 hrs battery', '512GB–8TB SSD', '24GB–128GB RAM', '2.14kg', 'HDMI 2.1 + SD card'],
    useCases: ['developer', 'creative', 'filmmaker', 'musician', 'business'],
    bestFor: ['performance', 'display', 'ram', 'battery'],
    budgets: ['above150k'],
    discounts: {
      student: '₹12,000–18,000 off via Education Store + periodic free AirPods',
      refurbished: '₹20,000–40,000 off via Apple Certified Refurbished',
    },
    why: '<strong>M4 Pro handles 8K ProRes video, 3D rendering, and dozens of Xcode simulators simultaneously</strong> — without a fan spinning up noticeably. The 16.2" Liquid Retina XDR hits 1000 nits sustained for daylight use. HDMI 2.1 and SD card slot built-in means no dongles for creators. Best-in-class thermal headroom for sustained workloads.',
    verdict: 'Best Mac laptop for heavy professional workloads.',
  },
  {
    id: 'mbpro14m4', cat: 'macbook',
    name: 'MacBook Pro 14" M4',
    tagline: 'Pro display + pro chip in a portable, lighter body.',
    priceINR: '₹1,68,900', priceUSD: '$1,599', priceNum: 168900,
    img: 'images/10_macbook_pro_dark.png',
    appleUrl: 'https://www.apple.com/macbook-pro/',
    specs: ['M4 chip', '14.2" Liquid Retina XDR 120Hz', '24 hrs battery', '512GB–2TB SSD', '16GB–32GB RAM', '1.55kg'],
    useCases: ['developer', 'creative', 'filmmaker', 'business', 'remote'],
    bestFor: ['performance', 'display', 'portability', 'battery'],
    budgets: ['above150k'],
    discounts: {
      student: '₹10,000–14,000 off via Education Store',
      refurbished: '₹15,000–25,000 off',
    },
    why: '<strong>Base M4 is faster than any Windows laptop at twice the price.</strong> The 14" ProMotion display makes this the best 14" screen on any laptop on earth. At 1.55kg it\'s genuinely portable — unlike the 16". For most developers and creatives who don\'t need M4 Pro, this is the sweet spot between price and performance.',
    verdict: 'The developer\'s sweet spot — best 14" laptop made.',
  },
  {
    id: 'mbair15m3', cat: 'macbook',
    name: 'MacBook Air 15" M3',
    tagline: 'The best everyday laptop in the world. Now with a bigger screen.',
    priceINR: '₹1,34,900', priceUSD: '$1,299', priceNum: 134900,
    img: 'images/11_macbook_air_sky_blue.png',
    appleUrl: 'https://www.apple.com/macbook-air/',
    specs: ['M3 chip', '15.3" Liquid Retina', '18 hrs battery', '256GB–2TB SSD', '8GB–24GB RAM', '1.51kg', 'Zero fans'],
    useCases: ['student', 'teacher', 'remote', 'casual', 'business'],
    bestFor: ['battery', 'display', 'value', 'portability'],
    budgets: ['100-150k'],
    discounts: {
      student: '₹8,000–12,000 off via Education Store + free AirPods (periodic)',
      refurbished: '₹10,000–20,000 off',
    },
    why: '<strong>Zero fans = completely silent, always.</strong> M3 chip handles Xcode, Photoshop, 4K streaming and 15 browser tabs without breaking a sweat. 15.3" display is gorgeous for productivity. At 1.51kg, it\'s ultralight for its size. The Education discount + periodic free AirPods makes this the best student purchase in the Apple lineup.',
    verdict: 'Best laptop for students, teachers, and remote workers.',
  },
  {
    id: 'mbair13m3', cat: 'macbook',
    name: 'MacBook Air 13" M3',
    tagline: 'The world\'s lightest capable laptop. 18-hour battery. Zero fans.',
    priceINR: '₹1,14,900', priceUSD: '$1,099', priceNum: 114900,
    img: 'images/05_macbook_air_yellow_hand.png',
    appleUrl: 'https://www.apple.com/macbook-air/',
    specs: ['M3 chip', '13.6" Liquid Retina', '18 hrs battery', '256GB–2TB SSD', '8GB–24GB RAM', '1.24kg', 'Zero fans'],
    useCases: ['student', 'teacher', 'remote', 'casual'],
    bestFor: ['portability', 'battery', 'value'],
    budgets: ['100-150k'],
    discounts: {
      student: '₹6,000–10,000 off via Education Store + free AirPods (periodic)',
      refurbished: '₹8,000–14,000 off',
    },
    why: 'At <strong>1.24kg it\'s the lightest Mac laptop</strong>. Forget the charger for a full day — 18 hours is real-world tested. M3 chip handles Xcode, Python, Figma, Final Cut with ease. The display bezels are thin, speakers are shockingly good for a laptop. Best Mac for college — full stop.',
    verdict: 'Best Mac for college students — lightest, longest battery.',
  },

  // ─── iPad ───────────────────────
  {
    id: 'ipadpro13', cat: 'ipad',
    name: 'iPad Pro 13" M4',
    tagline: 'The world\'s thinnest Apple product. OLED. M4 chip.',
    priceINR: '₹1,66,900', priceUSD: '$1,299', priceNum: 166900,
    img: 'images/03_ipad_pro_air.png',
    appleUrl: 'https://www.apple.com/ipad-pro/',
    specs: ['M4 chip', '13" Ultra Retina XDR OLED', '16GB RAM', '256GB–2TB', 'Apple Pencil Pro', 'LiDAR', '579g', '5.1mm thin'],
    useCases: ['creative', 'photographer', 'filmmaker', 'developer'],
    bestFor: ['performance', 'display', 'portability'],
    budgets: ['above150k'],
    discounts: {
      student: '₹10,000–14,000 off via Education Store',
      refurbished: '₹15,000–25,000 off',
    },
    why: 'The world\'s first <strong>tandem OLED iPad</strong> — double the brightness of any other tablet, with ProMotion 120Hz. M4 chip is faster than most Windows laptops. At 5.1mm, thinner than a pencil. Apple Pencil Pro support makes this the reference tool for digital artists and illustrators. Nothing else comes close.',
    verdict: 'Best tablet on earth for serious creative work.',
  },
  {
    id: 'ipadair13', cat: 'ipad',
    name: 'iPad Air 13" M2',
    tagline: 'Pro features at a more reasonable price. Most users pick this.',
    priceINR: '₹1,09,900', priceUSD: '$799', priceNum: 109900,
    img: 'images/03_ipad_pro_air.png',
    appleUrl: 'https://www.apple.com/ipad-air/',
    specs: ['M2 chip', '13" Liquid Retina (60Hz)', '8GB RAM', '128GB–1TB', 'Apple Pencil Pro', '617g'],
    useCases: ['student', 'creative', 'teacher', 'casual', 'remote'],
    bestFor: ['value', 'display', 'portability'],
    budgets: ['100-150k'],
    discounts: {
      student: '₹8,000 off via Education Store',
      refurbished: '₹8,000–15,000 off',
    },
    why: '<strong>M2 is still more than enough for all tablet tasks.</strong> Apple Pencil Pro and Apple Intelligence supported. USB-C charging. Split-screen multitasking. The main compromise vs Pro: 60Hz non-OLED display (still great) and no LiDAR. For students, note-takers, and casual creators — this is the one to buy.',
    verdict: 'Best iPad for students and teachers.',
  },

  // ─── Apple Watch ───────────────────
  {
    id: 'watchultra2', cat: 'watch',
    name: 'Apple Watch Ultra 2',
    tagline: 'For athletes, explorers, and those who demand more from every feature.',
    priceINR: '₹89,900', priceUSD: '$799', priceNum: 89900,
    img: 'images/07_apple_watch_pride_band.png',
    appleUrl: 'https://www.apple.com/apple-watch-ultra-2/',
    specs: ['S9 SiP', '49mm Always-On', '60 hrs battery (Low Power)', 'Titanium case', 'Dual GPS', '3000 nits', 'IP6X + 100m water'],
    useCases: ['athlete', 'creative'],
    bestFor: ['battery', 'build', 'performance'],
    budgets: ['60-100k', '100-150k'],
    discounts: { tradein: 'Up to ₹30,000 trade-in on older watch' },
    why: '<strong>60 hours of battery — enough for a full ultra-marathon.</strong> Aerospace-grade titanium case survives extreme drops, dives, and summits. 3000 nits peak brightness (readable on ski slopes in direct sun). Action button for instant custom shortcuts. Dual-frequency GPS accurate to 10cm. If you do serious sports or outdoors, nothing else comes close.',
    verdict: 'The ultimate sports and adventure watch.',
  },
  {
    id: 'watchseries10', cat: 'watch',
    name: 'Apple Watch Series 10',
    tagline: 'Thinnest ever. Widest display ever. Now detects sleep apnea.',
    priceINR: '₹46,900', priceUSD: '$399', priceNum: 46900,
    img: 'images/12_apple_watch_gold_sleep.png',
    appleUrl: 'https://www.apple.com/apple-watch-series-10/',
    specs: ['S10 SiP', '46mm Always-On (2000 nits)', '18 hrs battery', '64GB', 'Sleep apnea detection', '9.7mm thin', '36.4g'],
    useCases: ['casual', 'student', 'business', 'remote', 'athlete'],
    bestFor: ['display', 'portability', 'ecosystem'],
    budgets: ['30-60k', '60-100k'],
    discounts: { tradein: 'Up to ₹20,000 trade-in on older watch' },
    why: 'The <strong>Series 10 has the widest Apple Watch display ever</strong> in the thinnest body (9.7mm). S10 chip is 30% faster than Series 8. Sleep apnea detection — cleared by FDA — is a genuinely life-changing health feature. Double-tap gesture works without touching the screen. Best all-rounder for 99% of users.',
    verdict: 'Best all-rounder Apple Watch for most people.',
  },
  {
    id: 'watchse2', cat: 'watch',
    name: 'Apple Watch SE (2nd Gen)',
    tagline: 'The most affordable Apple Watch that still does everything important.',
    priceINR: '₹29,900', priceUSD: '$249', priceNum: 29900,
    img: 'images/17_apple_watch_series_three.png',
    appleUrl: 'https://www.apple.com/apple-watch-se/',
    specs: ['S8 SiP', '44mm Retina', '18 hrs battery', '32GB', 'Crash detection', 'Heart rate', 'Apple Pay'],
    useCases: ['student', 'casual', 'teacher', 'athlete'],
    bestFor: ['value', 'ecosystem'],
    budgets: ['under30k', '30-60k'],
    discounts: { tradein: 'Up to ₹10,000 trade-in' },
    why: 'No Always-On display or ECG sensor, but <strong>everything else you actually use day-to-day</strong>: crash detection, heart rate alerts, fitness tracking, Apple Pay, Siri, notifications. S8 chip runs everything smoothly. Saves ₹17,000 vs Series 10. Perfect for parents buying their first watch or students on a tight budget.',
    verdict: 'Best value entry into Apple Watch ecosystem.',
  },

  // ─── AirPods ───────────────────────
  {
    id: 'airpodspro2', cat: 'airpods',
    name: 'AirPods Pro 2',
    tagline: 'Best ANC earbuds. Period. H2 chip. Hearing aid. Spatial audio.',
    priceINR: '₹24,900', priceUSD: '$249', priceNum: 24900,
    img: 'images/04_airpods_pro.png',
    appleUrl: 'https://www.apple.com/airpods-pro/',
    specs: ['H2 chip', 'Best-in-class ANC', '6 hrs (30 hrs case)', 'Personalized Spatial Audio', 'IP54', 'MagSafe case', 'Hearing aid features'],
    useCases: ['casual', 'student', 'business', 'remote', 'athlete', 'musician'],
    bestFor: ['performance', 'ecosystem', 'battery'],
    budgets: ['under30k', '30-60k'],
    discounts: {
      student: 'Often free with Mac purchase (Education offer)',
      refurbished: '₹3,000–5,000 off',
    },
    why: '<strong>H2 chip delivers ANC 2x stronger than AirPods Pro 1st gen.</strong> Transparency Mode is so natural you forget you\'re wearing them. Personalized Spatial Audio with head tracking. FDA-cleared hearing assistance (like a hearing aid). MagSafe + Apple Watch charger compatible case. If you have an iPhone, buy these over any other earbuds.',
    verdict: 'Best wireless earbuds for Apple users — not close.',
  },
  {
    id: 'airpodsmax', cat: 'airpods',
    name: 'AirPods Max',
    tagline: 'Audiophile-grade over-ear headphones in the Apple ecosystem.',
    priceINR: '₹59,900', priceUSD: '$549', priceNum: 59900,
    img: 'images/09_airpods_max_colors.png',
    appleUrl: 'https://www.apple.com/airpods-max/',
    specs: ['Dual H1 chips', 'Custom 40mm Apple drivers', '20 hrs ANC battery', 'Computational audio', 'USB-C', 'Aluminium ear cups'],
    useCases: ['musician', 'creative', 'business', 'casual'],
    bestFor: ['build', 'performance'],
    budgets: ['30-60k', '60-100k'],
    discounts: { refurbished: '₹5,000–8,000 off' },
    why: '<strong>Custom 40mm drivers + computational audio</strong> produce a soundstage that rivals dedicated $600+ audiophile headphones. The ANC is among the absolute best of any over-ear headphone. USB-C now (2024 update). Aluminium ear cups and mesh headband are genuinely luxurious. Best for music producers, frequent flyers, and serious listeners in the Apple world.',
    verdict: 'Best over-ear headphones in the Apple ecosystem.',
  },
  {
    id: 'airpods4anc', cat: 'airpods',
    name: 'AirPods 4 (with ANC)',
    tagline: 'First time ever — active noise cancellation in open-ear AirPods.',
    priceINR: '₹19,900', priceUSD: '$179', priceNum: 19900,
    img: 'images/04_airpods_pro.png',
    appleUrl: 'https://www.apple.com/airpods-4/',
    specs: ['H2 chip', 'Active Noise Cancellation', '5 hrs (30 hrs case)', 'Spatial Audio', 'USB-C case'],
    useCases: ['student', 'casual', 'remote', 'athlete'],
    bestFor: ['value', 'portability', 'ecosystem'],
    budgets: ['under30k'],
    discounts: { student: 'Often free with Mac/iPad Education purchase' },
    why: 'First AirPods ever with ANC in the classic open-ear design. <strong>H2 chip same as AirPods Pro 2.</strong> New ergonomic design fits more ear shapes than previous AirPods. USB-C case. At ₹19,900 — or free with Education Mac purchase — the best everyday earbud deal in Apple\'s lineup.',
    verdict: 'Best value AirPods with ANC.',
  },

  // ─── Mac Desktop ───────────────────
  {
    id: 'macmini', cat: 'mac-desktop',
    name: 'Mac mini M4',
    tagline: 'The most powerful compact desktop at any price. From ₹59,900.',
    priceINR: '₹59,900', priceUSD: '$599', priceNum: 59900,
    img: 'images/20_mac_mini_front.png',
    appleUrl: 'https://www.apple.com/mac-mini/',
    specs: ['M4 chip', '16GB–32GB RAM', '256GB–2TB SSD', '3x Thunderbolt 4', 'HDMI 2.1', '127×127mm footprint', 'Two front USB-C ports'],
    useCases: ['developer', 'student', 'creative', 'remote', 'business', 'casual'],
    bestFor: ['value', 'performance', 'ecosystem'],
    budgets: ['30-60k', '60-100k'],
    discounts: {
      student: '₹5,000–8,000 off via Education Store',
      refurbished: '₹5,000–10,000 off',
    },
    why: '<strong>M4 chip at ₹59,900 — the best value Mac ever made.</strong> Now smaller than a Mac mini ever was. First Mac mini with 16GB base RAM (was 8GB). Two front USB-C ports. Faster than every Mac from 2020 and below, including Pro and Max chips from that era. Pair with any display you already have. Recommended for most first-time Mac buyers.',
    verdict: 'Best value desktop Mac. Start here.',
  },
  {
    id: 'imac', cat: 'mac-desktop',
    name: 'iMac 24" M4',
    tagline: 'All-in-one Mac with a 4.5K display that makes text look printed.',
    priceINR: '₹1,49,900', priceUSD: '$1,299', priceNum: 149900,
    img: 'images/15_studio_display_colorful.png',
    appleUrl: 'https://www.apple.com/imac/',
    specs: ['M4 chip', '24" 4.5K Retina (500 nits, P3)', '16GB–32GB RAM', '256GB–2TB SSD', '12MP Center Stage webcam', '9.7mm thin', '7 colour options'],
    useCases: ['creative', 'remote', 'teacher', 'business', 'casual'],
    bestFor: ['display', 'build', 'ecosystem'],
    budgets: ['100-150k', 'above150k'],
    discounts: {
      student: '₹8,000–12,000 off via Education Store',
      refurbished: '₹12,000–20,000 off',
    },
    why: 'The <strong>4.5K Retina display (218 pixels/inch)</strong> makes text so sharp it looks printed. 12MP Center Stage webcam is the best in any all-in-one PC. Magnetic power connector. Seven colour options. 9.7mm thin — thinner than most phones. For home offices and creative desks where both display quality and aesthetics matter. No external monitor needed.',
    verdict: 'Best all-in-one for home office and creative desks.',
  },
  {
    id: 'macstudio', cat: 'mac-desktop',
    name: 'Mac Studio M4 Max',
    tagline: 'Renders 8K video in real time. Fits on your palm. Absolute beast.',
    priceINR: '₹3,79,900', priceUSD: '$1,999', priceNum: 379900,
    img: 'images/20_mac_mini_front.png',
    appleUrl: 'https://www.apple.com/mac-studio/',
    specs: ['M4 Max chip', '36GB–128GB RAM', '512GB–8TB SSD', '12 ports (incl. Thunderbolt 5)', '120Gb/s throughput', '197×197mm footprint'],
    useCases: ['developer', 'creative', 'filmmaker', 'musician', 'business'],
    bestFor: ['performance', 'ram', 'storage'],
    budgets: ['above150k'],
    discounts: {
      student: '₹15,000–20,000 off via Education Store',
      refurbished: '₹30,000–60,000 off',
    },
    why: '<strong>M4 Max with 36GB unified RAM</strong> renders feature films faster than dedicated GPU workstations at 3x the price. Thunderbolt 5 at 120Gb/s. 12 ports including front SD and USB-C. Tiny 197mm footprint frees your desk. For serious film editors, 3D artists, audio engineers — at this price/performance ratio, nothing else competes.',
    verdict: 'Best desktop for professional creative work.',
  },

  // ─── Apple TV ──────────────────────
  {
    id: 'appletv4k', cat: 'appletv',
    name: 'Apple TV 4K (3rd Gen)',
    tagline: 'The best streaming box. A15 chip. Siri Remote. Thread hub.',
    priceINR: '₹18,900', priceUSD: '$149', priceNum: 18900,
    img: 'images/18_apple_ecosystem.png',
    appleUrl: 'https://www.apple.com/apple-tv-4k/',
    specs: ['A15 Bionic', '4K HDR10+ Dolby Vision', '64–128GB', 'Ethernet (top model)', 'Thread smart home hub', 'Siri Remote', 'Apple Arcade'],
    useCases: ['casual', 'business', 'remote'],
    bestFor: ['performance', 'ecosystem'],
    budgets: ['under30k'],
    discounts: {},
    why: '<strong>A15 Bionic</strong> makes this the most powerful streaming box ever made. Full Apple Arcade library. AirPlay from any iPhone or Mac. Siri Remote with backlit buttons. Ethernet version doubles as a Thread protocol smart home hub. Upgrades any TV to a full Apple experience. Worth it if you\'re in the Apple ecosystem.',
    verdict: 'Best streaming box for Apple households.',
  },

  // ─── HomePod ───────────────────────
  {
    id: 'homepod2', cat: 'homepod',
    name: 'HomePod (2nd Gen)',
    tagline: 'Room-filling spatial audio. Adapts to your room\'s acoustics automatically.',
    priceINR: '₹32,900', priceUSD: '$299', priceNum: 32900,
    img: 'images/18_apple_ecosystem.png',
    appleUrl: 'https://www.apple.com/homepod/',
    specs: ['S9 chip', '7-tweeter array + high-excursion woofer', 'Spatial Audio with room sensing', 'Temperature + humidity sensor', 'Matter/Thread hub', 'Ultra-Wideband'],
    useCases: ['musician', 'casual'],
    bestFor: ['performance', 'ecosystem', 'build'],
    budgets: ['30-60k'],
    discounts: {},
    why: '<strong>Seven tweeters + adaptive spatial audio</strong> calibrate to your room automatically, every time. Sounds dramatically better than any similarly-priced Sonos or Bose speaker. Built-in temperature and humidity sensor. Matter smart home hub. Two in stereo pair rivals dedicated speakers at 3x the price. Best speaker in the Apple ecosystem.',
    verdict: 'Best smart speaker for Apple households.',
  },
  {
    id: 'homepodmini', cat: 'homepod',
    name: 'HomePod mini',
    tagline: 'Big sound, tiny size, smart home hub. ₹10,900.',
    priceINR: '₹10,900', priceUSD: '$99', priceNum: 10900,
    img: 'images/18_apple_ecosystem.png',
    appleUrl: 'https://www.apple.com/homepod-mini/',
    specs: ['S5 chip', '360° audio', 'HomeKit hub', 'Intercom', 'Handoff from iPhone'],
    useCases: ['casual', 'student'],
    bestFor: ['value', 'ecosystem'],
    budgets: ['under30k'],
    discounts: {},
    why: 'At ₹10,900, the HomePod mini <strong>sounds dramatically better than it should</strong> for its size and price. Controls your entire HomeKit smart home even when you\'re away. Multiple rooms? Put one in each room for whole-home audio under ₹50,000. Best value smart speaker for iPhone users who want to start with smart home.',
    verdict: 'Best budget smart speaker for Apple ecosystem.',
  },

  // ─── Vision Pro ────────────────────
  {
    id: 'visionpro', cat: 'visionpro',
    name: 'Apple Vision Pro',
    tagline: 'Spatial computing. Revolutionary — but not for most people yet.',
    priceINR: '₹3,49,900', priceUSD: '$3,499', priceNum: 349900,
    img: 'images/16_pro_display_xdr_dark.png',
    appleUrl: 'https://www.apple.com/apple-vision-pro/',
    specs: ['M2 + R1 chip', '23M pixels per eye (micro-OLED)', '16GB RAM', '256GB–1TB', '2 hrs battery (external pack)', '600g headset'],
    useCases: ['developer', 'creative', 'filmmaker'],
    bestFor: ['performance', 'display'],
    budgets: ['above150k'],
    discounts: { corporate: 'Apple Business pricing for enterprise' },
    why: '<strong>23 million pixels per eye</strong> — 4x sharper than a Pro Display XDR per eye. Eye tracking, hand tracking, and voice control. No controllers needed. visionOS enables spatial computing workflows that genuinely don\'t exist elsewhere. But: 2-hour battery, 600g headset weight, ₹3.5L price. Buy only if you\'re a developer building for it, or an early adopter with a very specific reason.',
    verdict: 'For developers and serious early adopters only.',
  },
];

// ══ FILTER STATE ══
const state = {
  cat: 'all', budget: 'any',
  users: [], uses: [], priorities: [],
  discount: 'none'
};

// ══ PILL SETUP ══
function initPills() {
  // Single-select
  ['fCat', 'fBudget', 'fDiscount'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.querySelectorAll('.fpill').forEach(p => {
      p.addEventListener('click', () => {
        el.querySelectorAll('.fpill').forEach(x => x.classList.remove('active'));
        p.classList.add('active');
        const v = p.dataset.v;
        if (id === 'fCat') state.cat = v;
        if (id === 'fBudget') state.budget = v;
        if (id === 'fDiscount') state.discount = v;
      });
    });
  });

  // Multi-select
  ['fUser', 'fUse', 'fPriority'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.querySelectorAll('.fpill').forEach(p => {
      p.addEventListener('click', () => {
        p.classList.toggle('active');
        const v = p.dataset.v;
        if (id === 'fUser') {
          state.users = p.classList.contains('active')
            ? [...state.users, v]
            : state.users.filter(x => x !== v);
        }
        if (id === 'fUse') {
          state.uses = p.classList.contains('active')
            ? [...state.uses, v]
            : state.uses.filter(x => x !== v);
        }
        if (id === 'fPriority') {
          state.priorities = p.classList.contains('active')
            ? [...state.priorities, v]
            : state.priorities.filter(x => x !== v);
        }
      });
    });
  });

  // Reset
  document.getElementById('resetBtn')?.addEventListener('click', () => {
    state.cat = 'all'; state.budget = 'any';
    state.users = []; state.uses = []; state.priorities = [];
    state.discount = 'none';
    document.querySelectorAll('.fpill').forEach(p => p.classList.remove('active'));
    ['all','any','none'].forEach(v => {
      document.querySelector(`.fpill[data-v="${v}"]`)?.classList.add('active');
    });
    document.getElementById('resultsArea').innerHTML = emptyHTML();
  });
}

// ══ SCORING ══
function score(p) {
  if (state.cat !== 'all' && p.cat !== state.cat) return -1;
  let s = 10;
  if (state.budget !== 'any') {
    s += p.budgets.includes(state.budget) ? 30 : -15;
  }
  if (state.users.length) {
    s += state.users.filter(u => p.useCases.includes(u)).length * 15;
  }
  const useMap = {
    coding: ['developer'], videoediting: ['filmmaker','creative'],
    photoediting: ['photographer','creative'], music: ['musician'],
    gaming: ['gamer'], schoolwork: ['student'], office: ['business','remote'],
    streaming: ['casual'], fitness: ['athlete'], calls: ['remote','business'],
    browsing: []
  };
  if (state.uses.length) {
    state.uses.forEach(u => {
      const types = useMap[u] || [];
      s += types.filter(t => p.useCases.includes(t)).length * 12;
    });
  }
  if (state.priorities.length) {
    s += state.priorities.filter(pr => p.bestFor.includes(pr)).length * 20;
  }
  return s;
}

function getRecs() {
  return DB.map(p => ({ ...p, _score: score(p) }))
    .filter(p => p._score >= 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, 6);
}

// ══ RENDER CARD ══
function cardHTML(p, rank) {
  const isTop = rank === 0;
  const discInfo = (state.discount !== 'none') && p.discounts?.[state.discount];
  return `
<div class="result-card ${isTop ? 'top' : ''}" style="animation-delay:${rank * 0.07}s">
  <div class="rc-img">
    <img src="${p.img}" alt="${p.name}" loading="lazy"
      onerror="this.style.opacity='0'"/>
  </div>
  <div class="rc-body">
    ${isTop ? `<span class="rc-top-badge">★ Top Pick For You</span>` : ''}
    <h3 class="rc-name">${p.name}</h3>
    <p class="rc-tagline">${p.tagline}</p>
    <div class="rc-price">
      <span class="rc-price-main">${p.priceINR}</span>
      <span class="rc-price-usd">${p.priceUSD}</span>
    </div>
    <div class="rc-specs">
      ${p.specs.slice(0,5).map(s => `<span class="rc-spec">${s}</span>`).join('')}
    </div>
    <div class="rc-why">${p.why}</div>
    ${discInfo ? `<div class="rc-discount">🏷 ${discInfo}</div>` : ''}
    <div class="rc-actions">
      <a href="${p.appleUrl}" target="_blank" rel="noopener" class="rc-btn-primary">View on Apple.com ↗</a>
      <button class="rc-btn-ask" onclick="askAbout('${p.name.replace(/'/g,'`')}')">Ask AI about this</button>
    </div>
  </div>
</div>`;
}

function emptyHTML() {
  return `<div class="results-empty">
    <div class="re-icon">◎</div>
    <h3>Set your filters, then tap<br/>"Get My Recommendation"</h3>
    <p>Or type your need in the AI box above — both give detailed, honest advice.</p>
  </div>`;
}

// ══ GET RECS BUTTON ══
document.getElementById('getRecBtn')?.addEventListener('click', () => {
  const area = document.getElementById('resultsArea');
  area.innerHTML = `
    <div class="skeleton" style="height:200px"></div>
    <div class="skeleton" style="height:180px;margin-top:1.5rem"></div>
    <div class="skeleton" style="height:180px;margin-top:1.5rem"></div>`;

  setTimeout(() => {
    const recs = getRecs();
    if (!recs.length) {
      area.innerHTML = `<div class="results-empty">
        <div class="re-icon">◎</div>
        <h3>No matches found</h3>
        <p>Try widening your filters — or ask the AI above in plain English.</p>
      </div>`;
      return;
    }
    area.innerHTML = `
      <div class="ai-answer-card" style="animation:fadeUp .4s var(--ease-out) both">
        <span class="ai-answer-label">Filter Results — ${recs.length} products matched</span>
        <p class="ai-answer-text">Based on your selections, here are your best Apple matches. The top pick is highlighted with our strongest recommendation.</p>
      </div>
      ${recs.map((p,i) => cardHTML(p,i)).join('')}`;

    gsap?.fromTo?.('.result-card', { opacity:0, y:32 }, { opacity:1, y:0, duration:.55, stagger:.08, ease:'power3.out' });
  }, 750);
});

// ══ AI ASK ══
const SYSTEM_REC = `You are a razor-sharp Apple product expert. Give specific direct recommendations with exact Indian ₹ and US $ prices. Explain why in plain English — real-life benchmarks, not spec-sheet marketing. Mention discounts. Max 200 words. No bullet points for short answers.

Current lineup: iPhone 16 Pro Max (₹1,59,900), 16 Pro (₹1,19,900), 16 Plus (₹89,900), 16 (₹79,900), SE (₹49,900) | MacBook Pro 16" M4 Pro (₹2,49,900), Pro 14" M4 (₹1,68,900), Air 15" M3 (₹1,34,900), Air 13" M3 (₹1,14,900) | iPad Pro 13" M4 (₹1,66,900), Air 13" M2 (₹1,09,900), mini M3 (₹69,900), 10th gen (₹49,900) | Watch Ultra 2 (₹89,900), Series 10 (₹46,900), SE (₹29,900) | AirPods Pro 2 (₹24,900), Max (₹59,900), 4 ANC (₹19,900), 4 (₹14,900) | Mac Studio M4 Max (₹3,79,900), mini M4 (₹59,900), iMac M4 (₹1,49,900) | Apple TV 4K (₹18,900) | HomePod 2 (₹32,900), mini (₹10,900) | Vision Pro (₹3,49,900)`;

async function askAI(q) {
  const valid = GROQ_KEYS_R.filter(k => k && !k.startsWith('YOUR_'));
  if (!valid.length) return '⚠️ API key not set. Open js/recommender.js and add your Groq key to GROQ_KEYS_R.';

  // Append currently active filters to guide the AI
  let filterCtx = [];
  if (state.cat !== 'all') filterCtx.push(`Category: ${state.cat}`);
  if (state.budget !== 'any') filterCtx.push(`Budget: ${state.budget}`);
  if (state.users.length) filterCtx.push(`Who: ${state.users.join(', ')}`);
  if (state.uses.length) filterCtx.push(`Primary Use: ${state.uses.join(', ')}`);
  if (state.priorities.length) filterCtx.push(`Priorities: ${state.priorities.join(', ')}`);
  
  let userQuery = q;
  if (filterCtx.length > 0) {
    userQuery += `\n\n[Active Filters: ${filterCtx.join(' | ')} - Please tailor your answer to these constraints if possible]`;
  }

  for (let i = 0; i < valid.length; i++) {
    const key = valid[(rKeyIdx + i) % valid.length];
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          max_tokens: 500,
          temperature: 0.6,
          messages: [
            { role: 'system', content: SYSTEM_REC },
            { role: 'user', content: userQuery }
          ]
        })
      });
      if (res.status === 429) { rKeyIdx = (rKeyIdx + 1) % valid.length; continue; }
      if (!res.ok) continue;
      const d = await res.json();
      return d.choices?.[0]?.message?.content;
    } catch { continue; }
  }
  return 'Sorry, couldn\'t connect right now. Try again in a moment!';
}

async function handleAIAsk() {
  const input = document.getElementById('aiInput');
  const area = document.getElementById('resultsArea');
  if (!input?.value.trim()) return;
  const q = input.value.trim();
  input.value = '';
  document.querySelector('.ai-chips').style.opacity = '.4';

  area.innerHTML = `<div class="skeleton" style="height:120px"></div>
    <div class="skeleton" style="height:80px;margin-top:1.2rem"></div>`;

  const answer = await askAI(q);
  area.innerHTML = `
    <div class="ai-answer-card">
      <span class="ai-answer-label">AI Recommendation for: "${q}"</span>
      <p class="ai-answer-text">${answer}</p>
    </div>
    <div class="results-empty" style="padding:2rem;margin-top:1.2rem">
      <p style="font-size:.82rem;color:var(--txt-1)">Want to see product cards? Use the filters on the left and click "Get My Recommendation".</p>
    </div>`;
}

document.getElementById('aiSend')?.addEventListener('click', handleAIAsk);
document.getElementById('aiInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') handleAIAsk(); });

window.fillAsk = el => {
  const inp = document.getElementById('aiInput');
  if (inp) { inp.value = el.textContent; inp.focus(); }
};
window.askAbout = name => {
  const panel = document.getElementById('chatPanel');
  const inp = document.getElementById('cpInput');
  if (panel && inp) { panel.classList.add('open'); inp.value = `Tell me more about the ${name}`; inp.focus(); }
};

// ══ INIT ══
document.addEventListener('DOMContentLoaded', () => {
  initPills();
  // URL param pre-select
  const cat = new URLSearchParams(window.location.search).get('cat');
  if (cat) {
    const btn = document.querySelector(`#fCat [data-v="${cat}"]`);
    if (btn) {
      document.querySelectorAll('#fCat .fpill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      state.cat = cat;
    }
  }
  gsap?.fromTo?.(['.rec-header', '.ai-ask', '.filters'],
    { opacity:0, y:28 },
    { opacity:1, y:0, duration:.8, stagger:.1, delay:.4, ease:'power3.out' }
  );
});
