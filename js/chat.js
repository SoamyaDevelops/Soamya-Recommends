/* ══════════════════════════════════════
   SOAMYA RECOMMENDS v2 — CHAT JS
   Groq AI · Multi-key rotation
   ══════════════════════════════════════ */

// ─────────────────────────────────────
// ADD YOUR GROQ API KEYS HERE
// Get free at: https://console.groq.com
// ─────────────────────────────────────
const GROQ_KEYS = [
  "YOUR_GROQ_API_KEY_1",   // ← Replace this
  "YOUR_GROQ_API_KEY_2",   // ← Optional second key
  "YOUR_GROQ_API_KEY_3",   // ← Optional third key
];

const MODEL = "llama-3.3-70b-versatile";
let keyIdx = 0;
const history = [];

const SYSTEM = `You are a razor-sharp Apple product advisor for "Soamya Recommends", an independent advisory site.

RULES:
- Give direct, specific recommendations — name exact models
- Always include Indian ₹ prices AND US $ prices
- Explain in plain English: what does the spec mean in real life?
- Mention Education, Corporate, Trade-in discounts when relevant
- Say when a cheaper model does 90% of the same thing
- Max 180 words unless user wants detail
- Be like a knowledgeable friend, not a salesperson

CURRENT APPLE LINEUP (2024-2025):
IPHONE: 16 Pro Max (₹1,59,900/$1,199) · 16 Pro (₹1,19,900/$999) · 16 Plus (₹89,900/$899) · 16 (₹79,900/$799)
MACBOOK: Pro 16" M4 Pro (₹2,49,900/$2,499) · Pro 14" M4 (₹1,68,900/$1,599) · Air 15" M3 (₹1,34,900/$1,299) · Air 13" M3 (₹1,14,900/$1,099)
IPAD: Pro 13" M4 (₹1,66,900/$1,299) · Air 13" M2 (₹1,09,900/$799) · mini M3 (₹69,900/$499) · 10th Gen (₹49,900/$349)
WATCH: Ultra 2 (₹89,900/$799) · Series 10 (₹46,900/$399) · SE 2 (₹29,900/$249)
AIRPODS: Pro 2 (₹24,900/$249) · Max (₹59,900/$549) · 4 ANC (₹19,900/$179) · 4 (₹14,900/$129)
DESKTOP: Mac Studio M4 Max (₹3,79,900/$1,999) · Mac mini M4 (₹59,900/$599) · iMac M4 (₹1,49,900/$1,299)
TV: Apple TV 4K (₹18,900/$149) · HomePod 2 (₹32,900/$299) · mini (₹10,900/$99)
VISION: Vision Pro (₹3,49,900/$3,499)

DISCOUNTS: Student/Teacher: 8-10% off Mac+iPad via apple.com/education · Corporate: Apple Business Store · Trade-in: up to ₹55,000 · Refurbished: up to 15% off`;

// Panel state
const bubble = document.getElementById('chatBubble');
const panel = document.getElementById('chatPanel');
const closeBtn = document.getElementById('chatClose');
const msgs = document.getElementById('cpMessages');
const input = document.getElementById('cpInput');
const sendBtn = document.getElementById('cpSend');
const chips = document.getElementById('cpChips');

if (bubble) {
  bubble.addEventListener('click', () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) input?.focus();
  });
}
if (closeBtn) closeBtn.addEventListener('click', () => panel.classList.remove('open'));

document.addEventListener('click', e => {
  if (panel && bubble && !panel.contains(e.target) && !bubble.contains(e.target)) {
    panel.classList.remove('open');
  }
});

// Add message to UI
function addMsg(text, role, isTyping = false) {
  const wrap = document.createElement('div');
  wrap.className = `cp-msg ${role}`;
  const bubble_el = document.createElement('div');
  bubble_el.className = 'cp-bubble';
  if (isTyping) {
    wrap.classList.add('typing');
    bubble_el.innerHTML = '<div class="t-dot"></div><div class="t-dot"></div><div class="t-dot"></div>';
  } else {
    bubble_el.textContent = text;
  }
  const time = document.createElement('span');
  time.className = 'cp-time';
  time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  wrap.appendChild(bubble_el);
  wrap.appendChild(time);
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
  return wrap;
}

// Send to Groq
async function send(text) {
  if (!text?.trim()) return;
  const valid = GROQ_KEYS.filter(k => k && !k.startsWith('YOUR_'));
  if (!valid.length) {
    addMsg('⚠️ API key not set yet. Open js/chat.js and add your Groq key to GROQ_KEYS.', 'ai');
    return;
  }

  if (chips) chips.style.display = 'none';
  addMsg(text, 'user');
  history.push({ role: 'user', content: text });
  if (input) input.value = '';

  const typingEl = addMsg('', 'ai', true);
  let reply = null;

  for (let i = 0; i < valid.length; i++) {
    const key = valid[(keyIdx + i) % valid.length];
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 400,
          temperature: 0.65,
          messages: [
            { role: 'system', content: SYSTEM },
            ...history.slice(-8)
          ]
        })
      });
      if (res.status === 429) { keyIdx = (keyIdx + 1) % valid.length; continue; }
      if (!res.ok) continue;
      const data = await res.json();
      reply = data.choices?.[0]?.message?.content;
      keyIdx = (keyIdx + i) % valid.length;
      break;
    } catch { continue; }
  }

  typingEl?.parentNode?.removeChild(typingEl);
  const final = reply || "Sorry, couldn't connect right now. Try again in a moment!";
  history.push({ role: 'assistant', content: final });
  addMsg(final, 'ai');
}

if (sendBtn) sendBtn.addEventListener('click', () => send(input?.value));
if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') send(input.value); });

window.chipSend = function(btn) {
  send(btn.textContent);
};
