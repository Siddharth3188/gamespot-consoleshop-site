/* =========================================================
   Spiders Games: Demo script (vanilla JS)
   1. Image sources (edit here)
   2. WhatsApp links
   3. Mobile navigation
   4. Active nav link on scroll
   5. Footer year
   ========================================================= */

/* ---------- 1. Image sources ----------
   Each slot points to a bundled illustration. Swap in a photo URL or local path any time.
   Set a slot to "" to show the neutral placeholder instead.
   If a URL fails to load, the placeholder stays, so there is never a broken image. */
const IMAGES = {
  // Illustrations bundled in /assets so the demo works offline.
  // Replace any of these with a real photo URL or path (e.g. "images/racing.jpg").
  hero:     "assets/hero.svg",      // Photo idea: people playing a console game
  gaming:   "assets/gaming.svg",    // Photo idea: person playing a console game
  racing:   "assets/racing.svg",    // Photo idea: racing simulator cockpit, wheel, pedals, screen
  vr:       "assets/vr.svg",        // Photo idea: person using a Meta Quest headset
  ps5:      "assets/ps5.svg",       // Photo idea: PlayStation 5 console
  ps4:      "assets/ps4.svg",       // Photo idea: PlayStation 4 console
  ps2:      "assets/ps2.svg",       // Photo idea: PlayStation 2 console
  consoles: "assets/consoles.svg",  // Photo idea: consoles on a retail shelf
  repairs:  "assets/repairs.svg"    // Photo idea: console repair workbench
};

document.querySelectorAll("[data-image]").forEach((slot) => {
  const src = IMAGES[slot.dataset.image];
  if (!src) return;

  const img = new Image();
  img.alt = slot.dataset.alt || "";
  img.decoding = "async";
  img.addEventListener("load", () => {
    slot.appendChild(img);
    slot.classList.add("has-image");
  });
  // On error, do nothing: the placeholder remains visible.
  img.src = src;
});

/* ---------- 2. WhatsApp links ----------
   Any link with data-wa="message" opens WhatsApp with that message prefilled. */
const WHATSAPP_NUMBER = "916382123512";

document.querySelectorAll("[data-wa]").forEach((link) => {
  const text = encodeURIComponent(link.dataset.wa);
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  link.target = "_blank";
  link.rel = "noopener";
});

/* ---------- 3. Mobile navigation ---------- */
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

toggle.addEventListener("click", () => {
  setMenu(toggle.getAttribute("aria-expanded") !== "true");
});

// Close when a link is chosen
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// Close with Escape and return focus to the button
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("is-open")) {
    setMenu(false);
    toggle.focus();
  }
});

// Close when tapping outside the menu
document.addEventListener("click", (e) => {
  if (nav.classList.contains("is-open") && !nav.contains(e.target) && !toggle.contains(e.target)) {
    setMenu(false);
  }
});

// Reset when resizing up to desktop
window.matchMedia("(min-width: 861px)").addEventListener("change", (e) => {
  if (e.matches) setMenu(false);
});

/* ---------- 4. Active nav link on scroll ---------- */
const navLinks = [...document.querySelectorAll(".nav-list a")];
// Sections may declare data-nav to highlight a different nav link (e.g. the VR section highlights "VR & Racing")
const sections = [...document.querySelectorAll("main section[id]")];

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.dataset.nav || entry.target.id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => observer.observe(s));
}

/* ---------- 5. Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
