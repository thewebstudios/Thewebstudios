// ============================================================
// TheWebStudios — Interactions
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Navbar shrink on scroll + hide top bar ----
  const navbar = document.getElementById("navbar");
  const topbar = document.getElementById("topbar");
  const backToTop = document.getElementById("backToTop");
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    if (topbar) {
      if (window.scrollY > 80) {
        topbar.classList.add("hide-bar");
        navbar.style.top = "0px";
      } else {
        topbar.classList.remove("hide-bar");
        navbar.style.top = "";
      }
    }
    if (backToTop) {
      if (window.scrollY > 600) backToTop.classList.add("visible");
      else backToTop.classList.remove("visible");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---- Mobile menu ----
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("closeMenu");

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => mobileMenu.classList.add("open"));
  }
  if (closeMenu && mobileMenu) {
    closeMenu.addEventListener("click", () => mobileMenu.classList.remove("open"));
  }
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => mobileMenu.classList.remove("open"));
    });
  }

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // ---- Animated stat counters ----
  const counters = document.querySelectorAll(".num[data-count]");
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window) {
    const counterIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => counterIo.observe(el));
  } else {
    counters.forEach((el) => animateCounter(el));
  }

  // ---- Project page dynamic content (project.html?type=...) ----
  const projectTitleEl = document.getElementById("projectTitle");
  if (projectTitleEl) {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") || "business";
    const projects = {
      restaurant: { title: "Restaurant Website", desc: "A digital menu and ordering site built to make it effortless for diners to browse, book a table, and reach you on WhatsApp.", industry: "Food & Beverage", feature: "Digital Menu + Booking" },
      realestate: { title: "Real Estate Website", desc: "A property listing site designed to showcase homes with photos, filters, and a fast enquiry path for interested buyers.", industry: "Real Estate", feature: "Listings + Filters" },
      fashion: { title: "Fashion Store Website", desc: "An online fashion store with a clean product catalogue, cart, and checkout built to convert browsers into buyers.", industry: "Retail / Fashion", feature: "Cart + Checkout" },
      clinic: { title: "Clinic Website", desc: "A trust-building website for a clinic, with doctor profiles, services, and simple appointment enquiries.", industry: "Healthcare", feature: "Appointment Enquiries" },
      salon: { title: "Salon & Spa Website", desc: "A booking-friendly site with a service menu, gallery, and one-tap WhatsApp booking for walk-ins and appointments.", industry: "Beauty & Wellness", feature: "WhatsApp Booking" },
      gym: { title: "Gym & Fitness Website", desc: "A membership-focused website with plans, class schedules, and a simple trial enquiry form.", industry: "Fitness", feature: "Membership Plans" },
      business: { title: "Business Website", desc: "A professional, fast-loading website built to represent your business online and turn visitors into enquiries.", industry: "General Business", feature: "Custom Design" }
    };
    const data = projects[type] || projects.business;
    projectTitleEl.textContent = data.title;
    document.title = data.title + " — TheWebStudios";

    const descEl = document.getElementById("projectDesc");
    if (descEl) descEl.textContent = data.desc;
    const indEl = document.getElementById("projectIndustry");
    if (indEl) indEl.textContent = data.industry;
    const featEl = document.getElementById("projectFeature");
    if (featEl) featEl.textContent = data.feature;
  }

  // ---- Enquiry form -> WhatsApp ----
  const form = document.getElementById("enquiryForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("fname").value.trim();
      const phone = document.getElementById("fphone").value.trim();
      const type = document.getElementById("ftype").value;
      const msg = document.getElementById("fmsg").value.trim();

      const text =
        `Hi TheWebStudios, I'd like a quote for a website.%0A%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Phone: ${encodeURIComponent(phone)}%0A` +
        `Project Type: ${encodeURIComponent(type)}%0A` +
        `Details: ${encodeURIComponent(msg)}`;

      window.open(`https://wa.me/919897286952?text=${text}`, "_blank");
    });
  }
});
