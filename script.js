/* =========================================================
   Spiders Games: Demo script (vanilla JS)
   1. Image sources (edit here)
   2. WhatsApp links
   3. Mobile navigation
   4. Active nav link on scroll
   5. Footer year
   ========================================================= */

/* ---------- 1. Image sources ----------
   Paste an image URL (or a local path like "images/ps5.jpg") for each slot.
   Leave a slot empty ("") to keep the neutral placeholder.
   If a URL fails to load, the placeholder stays, so there is never a broken image. */
const IMAGES = {
  hero:     "",  // Console + controller in a clean, well-lit setup
  ps5:      "",  // PlayStation 5 console
  ps4:      "",  // PlayStation 4 console
  ps2:      "",  // PlayStation 2 console
  consoles: "",  // Consoles on a retail shelf or display
  quest:    "",  // Meta Quest VR headset
  racing:   "",  // Racing simulator cockpit
  repairs:  ""   // Console repair workbench
};

document.querySelectorAll("[data-image]").forEach((slot) => {
  const src = IMAGES[slot.dataset.image];
  if (!src) return;

  const img = new Image();
  img.alt = slot.dataset.alt || "";
  img.loading = "lazy";
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
const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => observer.observe(s));
}

/* ---------- 5. Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
