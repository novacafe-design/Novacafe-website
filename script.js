/* ============================================================
   NOVA CAFE - Site interactions
   ============================================================ */

// Sticky nav shadow + scroll progress
const nav = document.getElementById("nav");
const scrollProgress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  if (window.scrollY > 30) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");

  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  scrollProgress.style.transform = `scaleX(${ratio})`;
}, { passive: true });

// Today's opening hours in the top bar (same table as the Visit section)
const topbarHours = document.getElementById("topbarHours");
if (topbarHours) {
  const HOURS = {
    0: ["8am", "11pm"], // Sunday
    1: ["7am", "10pm"],
    2: ["7am", "10pm"],
    3: ["7am", "10pm"],
    4: ["7am", "10pm"],
    5: ["7am", "11pm"], // Friday
    6: ["8am", "11pm"]  // Saturday
  };
  const [opens, closes] = HOURS[new Date().getDay()];
  topbarHours.textContent = `Open today · ${opens} to ${closes}`;
}

// Mobile menu toggle
const burger = document.getElementById("navBurger");
const mobileMenu = document.getElementById("mobileMenu");

function closeMobileMenu() {
  burger.classList.remove("open");
  mobileMenu.classList.remove("open");
  burger.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-hidden", "true");
}

burger.addEventListener("click", () => {
  const isOpen = burger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
  burger.setAttribute("aria-expanded", isOpen);
  mobileMenu.setAttribute("aria-hidden", !isOpen);
});

// Close mobile menu on link click
mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMobileMenu);
});

// Close mobile menu on outside click
document.addEventListener("click", (e) => {
  if (mobileMenu.classList.contains("open") && !nav.contains(e.target)) {
    closeMobileMenu();
  }
});

// Close mobile menu on Escape, returning focus to the toggle
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
    closeMobileMenu();
    burger.focus();
  }
});

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

// Section-level elements
document.querySelectorAll(
  ".story-text, .story-image, .menu-header, .gallery-header, " +
  ".visit-info, .visit-form-wrap, .feature-text, .feature-visual, " +
  ".story-pillars, .visit-map, .footer-brand, .footer-cols, " +
  ".brandstrip-text, .brandstrip-image, " +
  ".signatures-header, .sig-card, .quote-inner"
).forEach(el => observer.observe(el));

// Gallery cells - stagger via inline delay assigned once
document.querySelectorAll(".g").forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.07}s`;
  observer.observe(el);
});

// Shared: does this device ask for reduced motion?
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Tagline band - crossfade through the phrases one at a time.
// Under reduced motion (or without JS) the first phrase stays as a static line.
const tagbandText = document.getElementById("tagbandText");
if (tagbandText && !reduceMotion) {
  const TAGLINES = [
    "Specialty Coffee",
    "Hand-crafted Pastries",
    "All-Day Breakfast",
    "Halal Kitchen",
    "Arabic Hospitality"
  ];
  const phrase = document.getElementById("tagbandPhrase");
  let tagIndex = 0;
  setInterval(() => {
    if (document.hidden) return; // don't churn in background tabs
    phrase.classList.add("is-out"); // slide down out of the clipped band
    setTimeout(() => {
      tagIndex = (tagIndex + 1) % TAGLINES.length;
      tagbandText.textContent = TAGLINES[tagIndex];
      phrase.classList.add("is-prep");     // jump above the band, no transition
      phrase.classList.remove("is-out");
      requestAnimationFrame(() => requestAnimationFrame(() => {
        phrase.classList.remove("is-prep"); // slide back in from the top
      }));
    }, 470); // just past the CSS transition duration
  }, 4200);
}

// Hero stats - count up once as the stats row fades in.
// Final values live in the HTML, so no JS means no change and
// reduced motion shows them instantly.
if (!reduceMotion) {
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  setTimeout(() => {
    document.querySelectorAll(".hero-meta .meta-num").forEach(el => {
      const m = el.textContent.match(/^(\D*?)([\d.]+)(\D*)$/);
      if (!m) return;
      const [, prefix, numStr, suffix] = m;
      const target = parseFloat(numStr);
      const decimals = (numStr.split(".")[1] || "").length;
      const padded = /^0\d/.test(numStr) ? numStr.length : 0;
      // Reserve the final width so neighbouring stats don't jitter
      el.style.minWidth = el.offsetWidth + "px";
      el.style.display = "inline-block";
      el.style.textAlign = "center";
      const start = performance.now();
      const duration = 1400;
      (function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        let value = (target * easeOutCubic(p)).toFixed(decimals);
        if (padded) value = String(Math.round(value)).padStart(padded, "0");
        el.textContent = prefix + value + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + numStr + suffix;
      })(start);
    });
  }, 1500); // begins as the stats row's fade-in (1.4s delay) is underway
}

// Reservation form: submit to Formspree in place instead of leaving the site.
// If JS is unavailable the form still posts natively to Formspree's page.
const reservationForm = document.querySelector(".visit-form");
if (reservationForm) {
  // No bookings in the past
  const dateInput = reservationForm.querySelector('input[name="date"]');
  if (dateInput) {
    const t = new Date();
    const pad = n => String(n).padStart(2, "0");
    dateInput.min = `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
  }

  const statusEl = reservationForm.querySelector(".form-status");
  const submitBtn = reservationForm.querySelector('button[type="submit"]');

  reservationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return; // guard against double submits

    submitBtn.disabled = true;
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = "Sending…";
    statusEl.className = "form-status";
    statusEl.textContent = "";

    try {
      const res = await fetch(reservationForm.action, {
        method: "POST",
        body: new FormData(reservationForm),
        headers: { Accept: "application/json" }
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      reservationForm.reset();
      statusEl.textContent = "Thank you — your request has been received. We'll confirm your booking within the hour.";
      statusEl.classList.add("success");
    } catch (err) {
      statusEl.textContent = "Something went wrong sending your request. Please try again, or call us on +254 723 334 445.";
      statusEl.classList.add("error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
}
