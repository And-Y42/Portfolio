// Mobile nav toggle
const topbar = document.querySelector(".topbar");
const menuBtn = document.querySelector(".menuBtn");

menuBtn?.addEventListener("click", () => {
  const isOpen = topbar.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu after click
document.querySelectorAll(".nav a").forEach((a) => {
  a.addEventListener("click", () => {
    topbar.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Footer year
document.getElementById("year").textContent = String(new Date().getFullYear());

// Reveal-on-scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        observer.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Count-up animation for stats
function animateCount(el, to) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    el.textContent = String(to);
    return;
  }

  const duration = 900;
  const start = performance.now();
  const from = 0;

  function tick(t) {
    const p = Math.min(1, (t - start) / duration);
    // ease out cubic
    const eased = 1 - Math.pow(1 - p, 3);
    const value = Math.round(from + (to - from) * eased);
    el.textContent = String(value);

    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const stats = document.querySelectorAll(".statNum");
const statsObserver = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        const el = e.target;
        const to = Number(el.getAttribute("data-count") || "0");
        animateCount(el, to);
        statsObserver.unobserve(el);
      }
    }
  },
  { threshold: 0.4 }
);

stats.forEach((el) => statsObserver.observe(el));
