/* ══════════════════════════════════════
   SOAMYA RECOMMENDS v2 — MAIN JS
   Pinned hero · 3 scroll scenes · GSAP
   ══════════════════════════════════════ */

// ── LENIS SMOOTH SCROLL ──
const lenis = new Lenis({
  duration: 1.25,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// ── LOADER ──
const loader   = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
const loaderPct = document.getElementById('loaderPct');

let pct = 0;
const iv = setInterval(() => {
  pct += Math.random() * 15;
  if (pct > 100) pct = 100;
  const r = Math.floor(pct);
  if (loaderBar) loaderBar.style.width = r + '%';
  if (loaderPct) loaderPct.textContent = r;
  if (pct >= 100) {
    clearInterval(iv);
    setTimeout(() => {
      loader.classList.add('done');
      document.body.classList.remove('is-loading');
      runEntrance();
    }, 350);
  }
}, 75);

// ── CURSOR ──
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = window.innerWidth/2, my = window.innerHeight/2;
let rx = mx, ry = my;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (dot) { dot.style.left = mx+'px'; dot.style.top = my+'px'; }
});
(function cursorRaf() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  if (ring) { ring.style.left = rx+'px'; ring.style.top = ry+'px'; }
  requestAnimationFrame(cursorRaf);
})();

function bindCursor() {
  document.querySelectorAll('a, button, .prod-card, .hdot, .cp-chips button').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-on-link'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-on-link'));
  });
}
document.addEventListener('mousedown', () => document.body.classList.add('cursor-down'));
document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-down'));

// ── NAV HIDE ──
const nav = document.getElementById('nav');
let lastY = 0;
lenis.on('scroll', ({ scroll }) => {
  if (scroll > lastY + 10 && scroll > 140) nav.classList.add('hidden');
  else if (scroll < lastY - 5) nav.classList.remove('hidden');
  lastY = scroll;
});

// ── MOBILE MENU ──
const menuBtn   = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    document.body.style.overflow = open ? 'hidden' : '';
    const spans = menuBtn.querySelectorAll('span');
    spans[0].style.transform = open ? 'rotate(45deg) translate(4px,4px)'  : '';
    spans[1].style.transform = open ? 'rotate(-45deg) translate(4px,-4px)' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

// ══════════════════════════════════════
// HERO SCENES — scroll-driven swap
// ══════════════════════════════════════


// ══════════════════════════════════════
// GSAP ENTRANCE + SCROLLTRIGGER
// ══════════════════════════════════════
function runEntrance() {
  gsap.registerPlugin(ScrollTrigger);
  bindCursor();

  // Tell GSAP about Lenis
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) { lenis.scrollTo(value, { immediate: true }); }
      return window.scrollY;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
  });
  lenis.on('scroll', ScrollTrigger.update);

  // ── SCENE 0 ENTRANCE ──
  const scene0 = document.getElementById('scene0');
  if (scene0) {
    const tlis0  = scene0.querySelectorAll('.tli');

    gsap.fromTo(tlis0,
      { y: '110%' },
      { y: '0%', duration: 1.1, stagger: 0.12, delay: 0.15, ease: 'power4.out' }
    );
    gsap.fromTo([scene0.querySelector('.hero-body'), ...scene0.querySelectorAll('.hero-actions a')],
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.85, stagger: 0.1, delay: 0.55, ease: 'power3.out' }
    );
    gsap.fromTo('.hero-eyebrow',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: 'power2.out' }
    );
    gsap.fromTo('.hero-dots',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, delay: 0.9 }
    );

    // Scene 0 image entrance
    const img0 = document.getElementById('img0');
    if (img0) {
      gsap.fromTo(img0.querySelector('.hero-img'),
        { x: 60, opacity: 0, scale: 0.92 },
        { x: 0, opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
      );
      gsap.fromTo(img0.querySelector('.hero-img-label'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.8, ease: 'power2.out' }
      );
    }

    // Scroll hint
    gsap.to('.hero-scroll-hint',
      { opacity: .35, duration: 0.6, delay: 1.4 }
    );
  }

  // ── PIN HERO & DRIVE SCENES ──
  const isMobile = window.innerWidth < 768;

  if (!isMobile && document.getElementById('heroPin')) {
    // Force initial states to bypass any CSS caching issues
    gsap.set('#scene1, #scene2, #img1, #img2', { opacity: 0, pointerEvents: 'none' });
    gsap.set('#scene0, #img0', { opacity: 1, pointerEvents: 'auto' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#heroPin',
        start: 'top top',
        end: 'bottom bottom',
        pin: '#hero',
        scrub: 1.2, // smoother scrubbing
        pinSpacing: false,
        onUpdate: (self) => {
          // Update dots based on progress
          const p = self.progress;
          const dots = document.querySelectorAll('.hdot');
          dots.forEach(d => d.classList.remove('active'));
          
          // Manage pointer events
          gsap.set('.hero-scene, .hero-img-slot', { pointerEvents: 'none' });

          if (p < 0.33) { 
            dots[0]?.classList.add('active'); 
            gsap.set('#scene0, #img0', { pointerEvents: 'auto' });
          }
          else if (p < 0.66) { 
            dots[1]?.classList.add('active'); 
            gsap.set('#scene1, #img1', { pointerEvents: 'auto' });
          }
          else { 
            dots[2]?.classList.add('active'); 
            gsap.set('#scene2, #img2', { pointerEvents: 'auto' });
          }
        }
      }
    });

    // Transition 0 -> 1
    tl.to('#scene0', { opacity: 0, y: -40, duration: 1 }, 0);
    tl.to('#img0', { opacity: 0, x: -100, scale: 0.9, duration: 1 }, 0);
    tl.fromTo('#scene1', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 0.5);
    tl.fromTo('#img1', { opacity: 0, scale: 0.5, rotation: 15, x: 150 }, { opacity: 1, scale: 1, rotation: 0, x: 0, duration: 1.5, ease: 'power2.out' }, 0.5);
    
    // Hold scene 1
    tl.to({}, { duration: 0.8 }); // spacer

    // Transition 1 -> 2
    tl.to('#scene1', { opacity: 0, y: -40, duration: 1 }, "+=0");
    tl.to('#img1', { opacity: 0, scale: 0.8, x: -100, rotation: -5, duration: 1 }, "<");
    tl.fromTo('#scene2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5");
    tl.fromTo('#img2', { opacity: 0, scale: 0.5, rotation: -12, x: 150 }, { opacity: 1, scale: 1, rotation: 0, x: 0, duration: 1.5, ease: 'power2.out' }, "-=0.5");
  }

  // ── PRODUCT CARDS SCROLL REVEAL ──
  gsap.fromTo('.prod-card',
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0,
      duration: 0.65,
      stagger: 0.07,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.products-grid', start: 'top 82%', once: true }
    }
  );

  // ── SECTION HEADERS ──
  gsap.utils.toArray('.section-header, .how-left, .fv-content, .about-left, .cta-content').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 84%', once: true } }
    );
  });

  // ── HOW STEPS ──
  gsap.fromTo('.how-step',
    { opacity: 0, x: 30 },
    { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.how-steps', start: 'top 80%', once: true } }
  );

  // ── DISCLAIMER CARDS ──
  gsap.fromTo('.disclaimer-card',
    { opacity: 0, x: 20 },
    { opacity: 1, x: 0, duration: 0.55, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-right', start: 'top 82%', once: true } }
  );

  // ── PARALLAX on feature image & CTA image ──
  gsap.to('.fv-img', {
    yPercent: -12, ease: 'none',
    scrollTrigger: { trigger: '#feature-visual', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
  });
  gsap.to('.cta-img', {
    yPercent: -10, ease: 'none',
    scrollTrigger: { trigger: '#cta', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
  });

  ScrollTrigger.refresh();
}

// Smooth anchor
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -80 }); }
  });
});
