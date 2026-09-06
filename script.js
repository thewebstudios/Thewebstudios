// ============================================================
// TheWebStudios — Interactions
// ============================================================

// ---- Page loader ----
window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("loader-hide");
      setTimeout(() => loader.remove(), 600);
    }, 500);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Navbar shrink on scroll + hide top bar ----
  const navbar = document.getElementById("navbar");
  const topbar = document.getElementById("topbar");
  const backToTop = document.getElementById("backToTop");
  const parallaxWrappers = document.querySelectorAll(".hero-blobs");
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
    if (parallaxWrappers.length) {
      const y = window.scrollY;
      parallaxWrappers.forEach((wrap, i) => {
        const speed = i % 2 === 0 ? 0.1 : -0.08;
        wrap.style.transform = `translateY(${y * speed}px)`;
      });
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
      restaurant: { title: "Restaurant Website", desc: "A digital menu and ordering site built to make it effortless for diners to browse, book a table, and reach you on WhatsApp.", industry: "Food & Beverage", feature: "Digital Menu + Booking", color: "#c14a2b" },
      realestate: { title: "Real Estate Website", desc: "A property listing site designed to showcase homes with photos, filters, and a fast enquiry path for interested buyers.", industry: "Real Estate", feature: "Listings + Filters", color: "#6d33c9" },
      fashion: { title: "Fashion Store Website", desc: "An online fashion store with a clean product catalogue, cart, and checkout built to convert browsers into buyers.", industry: "Retail / Fashion", feature: "Cart + Checkout", color: "#1f7a4d" },
      clinic: { title: "Clinic Website", desc: "A trust-building website for a clinic, with doctor profiles, services, and simple appointment enquiries.", industry: "Healthcare", feature: "Appointment Enquiries", color: "#1d6fd6" },
      salon: { title: "Salon & Spa Website", desc: "A booking-friendly site with a service menu, gallery, and one-tap WhatsApp booking for walk-ins and appointments.", industry: "Beauty & Wellness", feature: "WhatsApp Booking", color: "#c23b7a" },
      gym: { title: "Gym & Fitness Website", desc: "A membership-focused website with plans, class schedules, and a simple trial enquiry form.", industry: "Fitness", feature: "Membership Plans", color: "#b8860b" },
      hotel: { title: "Hotel Website", desc: "A booking-friendly hotel site with room showcases, amenities, and a simple reservation enquiry flow.", industry: "Hospitality", feature: "Room Showcase + Booking", color: "#8a6d1f" },
      education: { title: "Education Website", desc: "A school or institute website with course listings, admissions info, and a clear enquiry path for parents.", industry: "Education", feature: "Admissions + Courses", color: "#1d4e89" },
      electronics: { title: "Electronics Store Website", desc: "A product-first storefront for an electronics or mobile retailer, with specs, categories, and enquiry buttons.", industry: "Retail / Electronics", feature: "Product Grid + Specs", color: "#3a3f8f" },
      services: { title: "Services Website", desc: "A clean, trust-building layout for consultants and service providers to list offerings and capture enquiries.", industry: "Professional Services", feature: "Service Listing + Enquiry", color: "#2e5c4e" },
      hotel: { title: "Hotel Website", desc: "A room-showcase site with amenities, offers, and a straightforward booking enquiry flow.", industry: "Hospitality", feature: "Booking Enquiries", color: "#8a6d1f" },
      education: { title: "Education Website", desc: "A course and admissions site for schools and institutes, built to make enquiries easy for parents and students.", industry: "Education", feature: "Admissions Enquiries", color: "#2a4d8f" },
      electronics: { title: "Electronics Store Website", desc: "A product-grid storefront with categories and specifications, built for an electronics or mobile retailer.", industry: "Retail / Electronics", feature: "Product Catalogue", color: "#0e7a8f" },
      services: { title: "Services Website", desc: "A clean, trust-building website for consultants and service businesses to list what they offer and get enquiries.", industry: "Professional Services", feature: "Service Listings", color: "#3f4756" },
      business: { title: "Business Website", desc: "A professional, fast-loading website built to represent your business online and turn visitors into enquiries.", industry: "General Business", feature: "Custom Design", color: "#4c2a91" }
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

    // Per-industry accent theme
    const headerEl = document.getElementById("projectPageHeader");
    if (headerEl) {
      headerEl.style.backgroundImage = `linear-gradient(150deg, #0d0b2e 0%, #241a5e 40%, ${data.color} 100%)`;
    }
    const dotEl = document.getElementById("projectDot");
    if (dotEl) dotEl.style.background = data.color;
    const ctaEl = document.getElementById("projectCta");
    if (ctaEl) ctaEl.style.background = data.color;
  }

  // ---- Two-step quote form navigation ----
  const toStep2Btn = document.getElementById("toStep2");
  const toStep1Btn = document.getElementById("toStep1");
  const formStep1 = document.getElementById("formStep1");
  const formStep2 = document.getElementById("formStep2");
  const stepDot1 = document.getElementById("stepDot1");
  const stepDot2 = document.getElementById("stepDot2");
  const stepLine = document.getElementById("stepLine");
  const stepGreeting = document.getElementById("stepGreeting");

  if (toStep2Btn) {
    toStep2Btn.addEventListener("click", () => {
      const nameEl = document.getElementById("fname");
      const phoneEl = document.getElementById("fphone");
      if (!nameEl.value.trim() || !phoneEl.value.trim()) {
        if (!nameEl.value.trim()) nameEl.focus();
        else phoneEl.focus();
        return;
      }
      formStep1.classList.remove("active");
      formStep2.classList.add("active");
      stepDot1.classList.remove("active");
      stepDot2.classList.add("active");
      stepLine.classList.add("filled");
      if (stepGreeting) {
        const firstName = nameEl.value.trim().split(" ")[0];
        stepGreeting.textContent = `Thanks, ${firstName}! A couple more details, then we'll send this to WhatsApp.`;
      }
    });
  }

  if (toStep1Btn) {
    toStep1Btn.addEventListener("click", () => {
      formStep2.classList.remove("active");
      formStep1.classList.add("active");
      stepDot2.classList.remove("active");
      stepLine.classList.remove("filled");
    });
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

  // ---- Shuffle deck (tap to cycle through design styles) ----
  const shuffleDeck = document.getElementById("shuffleDeck");
  if (shuffleDeck) {
    const layoutDeck = () => {
      const cards = Array.from(shuffleDeck.children);
      const total = cards.length;
      cards.forEach((card, i) => {
        card.style.zIndex = total - i;
        card.style.opacity = i < 3 ? "1" : "0";
        const rotate = i === 0 ? 0 : (i % 2 === 0 ? 3 : -3);
        card.style.transform = `translateY(${i * 10}px) scale(${1 - i * 0.05}) rotate(${rotate}deg)`;
        card.style.pointerEvents = i === 0 ? "auto" : "none";
      });
    };
    layoutDeck();

    shuffleDeck.addEventListener("click", () => {
      const front = shuffleDeck.firstElementChild;
      if (!front) return;
      front.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      front.style.transform = "translateX(150%) rotate(20deg)";
      front.style.opacity = "0";
      setTimeout(() => {
        shuffleDeck.appendChild(front);
        front.style.transition = "none";
        layoutDeck();
        void front.offsetWidth;
        front.style.transition = "";
      }, 480);
    });
  }

  // ---- Side slide-in widget (home page only, shows once ever) ----
  const sideWidget = document.getElementById("sideWidget");
  const sideWidgetClose = document.getElementById("sideWidgetClose");
  if (sideWidget) {
    let alreadySeen = false;
    try {
      alreadySeen = localStorage.getItem("tws_side_widget_seen") === "1";
    } catch (err) {
      alreadySeen = false;
    }

    if (!alreadySeen) {
      const markSeen = () => {
        try { localStorage.setItem("tws_side_widget_seen", "1"); } catch (err) {}
      };

      const showTimer = setTimeout(() => {
        sideWidget.classList.add("show");
        markSeen();
      }, 2500);

      if (sideWidgetClose) {
        sideWidgetClose.addEventListener("click", () => {
          clearTimeout(showTimer);
          sideWidget.classList.remove("show");
          markSeen();
        });
      }

      // auto-hide after a while so it doesn't linger forever
      setTimeout(() => {
        sideWidget.classList.remove("show");
      }, 14000);
    }
  }

  // ---- Template showcase (render + filter) ----
  const templateGrid = document.getElementById("templateGrid");
  if (templateGrid) {
    const templates = [
      { name: "Estate Pro", category: "realestate", categoryLabel: "Real Estate", desc: "Property listings with photos, filters, and a fast enquiry path for buyers.", icon: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/>' },
      { name: "Bistro Menu", category: "restaurant", categoryLabel: "Restaurant", desc: "Digital menu with online table booking and WhatsApp ordering.", icon: '<path d="M6 2v7a2 2 0 0 0 4 0V2M8 9v13M18 2v13a2 2 0 0 1-2 2h-2"/><path d="M18 2v7"/>' },
      { name: "Luxe Stay", category: "hotel", categoryLabel: "Hotel", desc: "Room showcase, amenities, and a simple booking enquiry flow.", icon: '<path d="M3 21V9l9-6 9 6v12"/><path d="M9 21v-6h6v6"/>' },
      { name: "MediCare Plus", category: "clinic", categoryLabel: "Clinic", desc: "Doctor profiles, services, and easy appointment enquiries.", icon: '<path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z"/><path d="M12 11v6M9 14h6"/>' },
      { name: "EduBright", category: "education", categoryLabel: "Education", desc: "Course listings and admissions info for schools and institutes.", icon: '<path d="m2 8 10-5 10 5-10 5-10-5z"/><path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5"/>' },
      { name: "Fashion Edit", category: "fashion", categoryLabel: "Fashion", desc: "Product catalogue with cart, checkout, and order tracking.", icon: '<path d="M9 3h6l1 3 4 2-2 3 1 10H5l1-10-2-3 4-2z"/>' },
      { name: "TechMart", category: "electronics", categoryLabel: "Electronics", desc: "Product grid and specs for an electronics or mobile retailer.", icon: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M10 18h4"/>' },
      { name: "Glow Studio", category: "salon", categoryLabel: "Salon", desc: "Service menu, gallery, and one-tap WhatsApp booking.", icon: '<path d="M6 5a3 3 0 1 0 3 3l9 9M6 19a3 3 0 1 0 3-3l9-9"/>' },
      { name: "FitZone", category: "gym", categoryLabel: "Gym", desc: "Membership plans, class schedule, and a trial enquiry form.", icon: '<path d="M6 7v10M18 7v10M3 12h3M18 12h3M9 12h6"/>' },
      { name: "ProServe", category: "services", categoryLabel: "Services", desc: "A clean layout for consultants to list what they offer.", icon: '<path d="M3 7h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>' }
    ];

    const renderTemplates = (filter) => {
      const items = filter === "all" ? templates : templates.filter(t => t.category === filter);
      templateGrid.innerHTML = items.map(t => `
        <div class="ag-template-card">
          <div class="ag-template-preview"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${t.icon}</svg></div>
          <div class="ag-template-body">
            <span class="ag-template-category">${t.categoryLabel}</span>
            <h3>${t.name}</h3>
            <p>${t.desc}</p>
            <div class="ag-template-actions">
              <a href="project.html?type=${t.category}" class="ag-template-link">Live Preview</a>
              <a href="quote.html" class="btn btn-primary">Get This Website</a>
            </div>
          </div>
        </div>
      `).join("");
    };
    renderTemplates("all");

    const filterButtons = document.querySelectorAll(".ag-filter");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderTemplates(btn.getAttribute("data-filter"));
      });
    });
  }

  // ---- FAQ accordion ----
  const faqItems = document.querySelectorAll(".ag-faq-item");
  faqItems.forEach(item => {
    const q = item.querySelector(".ag-faq-q");
    if (!q) return;
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      faqItems.forEach(i => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });

  // ---- Agency contact form -> WhatsApp ----
  const agencyForm = document.getElementById("agencyContactForm");
  if (agencyForm) {
    agencyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("caName").value.trim();
      const business = document.getElementById("caBusiness").value.trim();
      const category = document.getElementById("caCategory").value;
      const phone = document.getElementById("caPhone").value.trim();
      const type = document.getElementById("caType").value.trim();

      const text =
        `Hi TheWebStudios, I'd like a website for my business.%0A%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Business: ${encodeURIComponent(business)}%0A` +
        `Category: ${encodeURIComponent(category)}%0A` +
        `Phone: ${encodeURIComponent(phone)}%0A` +
        `Details: ${encodeURIComponent(type)}`;

      window.open(`https://wa.me/919897286952?text=${text}`, "_blank");
    });
  }
});
