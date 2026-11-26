// Website designed by Zach Mackay: https://alexzander73.github.io/index.html
// Most portfolio photo updates can now be done by running process-images.command after dropping
// full-size photos into assets/images/originals/. This file still contains the fallback gallery list.
// Only change these Google Form links if the booking form itself is replaced.
const GOOGLE_FORM_URL = "https://forms.gle/YRux1aAa2SjVNpq47";
const GOOGLE_FORM_POST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfcekjBsArkRfEiZrwBeXv1v7Gg5kuwwtgHnTbd9n-oqqgunA/formResponse";
const THEME_STORAGE_KEY = "ab-theme";
const DEFAULT_LOGO_URL = "assets/icons/logo-ab.svg";
const REQUESTED_LOGO_URL = "assets/icons/logo-ab-requested.svg";
const ADMIN_AUTH_STORAGE_KEY = "ab-admin-auth-v1";
const ADMIN_GITHUB_TOKEN_STORAGE_KEY = "ab-admin-github-token-v1";
const ADMIN_PASSWORD_HASH = "5afe658ec5a7b26a760ea5dcb9153d937e5dc965ddb707238656535eb435bf1e";
const ADMIN_ALLOWED_CATEGORIES = ["Branding", "Portrait", "Couples", "Creative", "Events", "Lifestyle"];
const ADMIN_ALLOWED_MOODS = ["Soft", "Bold", "Editorial", "Romantic", "Moody", "Candid"];
const ADMIN_DEFAULT_REPO_OWNER = "AnBehmen";
const ADMIN_DEFAULT_REPO_NAME = "behmenstudio";
const ADMIN_DEFAULT_REPO_BRANCH = "main";
const ADMIN_GALLERY_DATA_PATH = "gallery-data.js";

// This older featured list is currently not shown on the page.
// You can ignore it unless the featured carousel is added back later.
const featuredSlides = [
  {
    "src": "assets/images/web/1.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Soft"
  },
  {
    "src": "assets/images/web/4.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Editorial"
  },
  {
    "src": "assets/images/web/6.webp",
    "alt": "Couples session photograph from Behmen Studio portfolio",
    "category": "Couples",
    "mood": "Soft"
  },
  {
    "src": "assets/images/web/7.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Editorial"
  },
  {
    "src": "assets/images/web/8.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Bold"
  },
  {
    "src": "assets/images/web/24.webp",
    "alt": "Lifestyle photography image from Behmen Studio portfolio",
    "category": "Lifestyle",
    "mood": "Soft"
  },
  {
    "src": "assets/images/web/45.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody"
  },
  {
    "src": "assets/images/web/28.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Editorial"
  },
  {
    "src": "assets/images/web/39.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Moody"
  },
  {
    "src": "assets/images/web/25.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Moody"
  },
  {
    "src": "assets/images/web/60.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid"
  },
  {
    "src": "assets/images/web/55.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid"
  }
];

// This is the fallback portfolio list. If gallery-data.js exists, it will override this list.
const defaultGalleryItems = [
  {
    "src": "assets/images/web/1.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Soft",
    "span": 28
  },
  {
    "src": "assets/images/web/2.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Soft",
    "span": 45
  },
  {
    "src": "assets/images/web/3.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Editorial",
    "span": 45
  },
  {
    "src": "assets/images/web/4.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Editorial",
    "span": 28
  },
  {
    "src": "assets/images/web/5.webp",
    "alt": "Couples session photograph from Behmen Studio portfolio",
    "category": "Couples",
    "mood": "Candid",
    "span": 45
  },
  {
    "src": "assets/images/web/6.webp",
    "alt": "Couples session photograph from Behmen Studio portfolio",
    "category": "Couples",
    "mood": "Soft",
    "span": 28
  },
  {
    "src": "assets/images/web/7.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Editorial",
    "span": 28
  },
  {
    "src": "assets/images/web/8.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Bold",
    "span": 28
  },
  {
    "src": "assets/images/web/9.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/10.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 45
  },
  {
    "src": "assets/images/web/11.webp",
    "alt": "Lifestyle photography image from Behmen Studio portfolio",
    "category": "Lifestyle",
    "mood": "Candid",
    "span": 45
  },
  {
    "src": "assets/images/web/12.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Soft",
    "span": 45
  },
  {
    "src": "assets/images/web/13.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Moody",
    "span": 40
  },
  {
    "src": "assets/images/web/14.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Bold",
    "span": 40
  },
  {
    "src": "assets/images/web/15.webp",
    "alt": "Couples session photograph from Behmen Studio portfolio",
    "category": "Couples",
    "mood": "Romantic",
    "span": 45
  },
  {
    "src": "assets/images/web/16.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Moody",
    "span": 45
  },
  {
    "src": "assets/images/web/17.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/18.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/19.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/20.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/21.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Soft",
    "span": 45
  },
  {
    "src": "assets/images/web/22.webp",
    "alt": "Couples session photograph from Behmen Studio portfolio",
    "category": "Couples",
    "mood": "Candid",
    "span": 45
  },
  {
    "src": "assets/images/web/23.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 45
  },
  {
    "src": "assets/images/web/24.webp",
    "alt": "Lifestyle photography image from Behmen Studio portfolio",
    "category": "Lifestyle",
    "mood": "Soft",
    "span": 28
  },
  {
    "src": "assets/images/web/25.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/26.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Soft",
    "span": 40
  },
  {
    "src": "assets/images/web/27.webp",
    "alt": "Couples session photograph from Behmen Studio portfolio",
    "category": "Couples",
    "mood": "Romantic",
    "span": 45
  },
  {
    "src": "assets/images/web/28.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Editorial",
    "span": 28
  },
  {
    "src": "assets/images/web/29.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 28
  },
  {
    "src": "assets/images/web/30.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Bold",
    "span": 28
  },
  {
    "src": "assets/images/web/31.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Editorial",
    "span": 40
  },
  {
    "src": "assets/images/web/32.webp",
    "alt": "Couples session photograph from Behmen Studio portfolio",
    "category": "Couples",
    "mood": "Soft",
    "span": 28
  },
  {
    "src": "assets/images/web/33.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Bold",
    "span": 28
  },
  {
    "src": "assets/images/web/34.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/35.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Editorial",
    "span": 45
  },
  {
    "src": "assets/images/web/36.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Editorial",
    "span": 28
  },
  {
    "src": "assets/images/web/37.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/38.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Editorial",
    "span": 45
  },
  {
    "src": "assets/images/web/39.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/40.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 45
  },
  {
    "src": "assets/images/web/41.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Editorial",
    "span": 28
  },
  {
    "src": "assets/images/web/42.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/43.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/44.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 45
  },
  {
    "src": "assets/images/web/45.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/46.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Bold",
    "span": 28
  },
  {
    "src": "assets/images/web/47.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 28
  },
  {
    "src": "assets/images/web/48.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Bold",
    "span": 28
  },
  {
    "src": "assets/images/web/49.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 45
  },
  {
    "src": "assets/images/web/50.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/51.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/52.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 45
  },
  {
    "src": "assets/images/web/53.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/54.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Bold",
    "span": 40
  },
  {
    "src": "assets/images/web/55.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 28
  },
  {
    "src": "assets/images/web/56.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/57.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 45
  },
  {
    "src": "assets/images/web/58.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 45
  },
  {
    "src": "assets/images/web/59.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/60.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 28
  },
  {
    "src": "assets/images/web/61.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/62.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Bold",
    "span": 28
  }
];

let galleryItems = loadGalleryItems();

const testimonials = [
  {
    quote: "Replace this with a real client quote once available.",
    label: "Placeholder testimonial"
  },
  {
    quote: "Add a short review here about feeling comfortable during the shoot.",
    label: "Placeholder testimonial"
  },
  {
    quote: "Add a short review here about loving the final gallery.",
    label: "Placeholder testimonial"
  }
];

const faqs = [
  {
    q: "How do I book?",
    a: "Use the booking request button and share a few details about the session you have in mind. I’ll follow up with availability and next steps."
  },
  {
    q: "Do you help with posing?",
    a: "Yes. You do not need to know what to do with your hands. That is part of the job."
  },
  {
    q: "Where do sessions happen?",
    a: "This can be updated later. For now, sessions can be planned for studio, outdoor, location-based, or event settings."
  },
  {
    q: "What should I wear?",
    a: "Wear something that feels like you, but a little more intentional. Styling guidance can be added once final service details are confirmed."
  },
  {
    q: "When will I receive my photos?",
    a: "Delivery timeframe can be confirmed by the photographer. Replace this with your actual turnaround window."
  },
  {
    q: "Can I request a specific mood or style?",
    a: "Absolutely. Bring references, words, colours, songs, messy Pinterest boards — whatever helps explain the feeling."
  },
  {
    q: "Are prices listed?",
    a: "Pricing can be added once confirmed. For now, enquiries are handled through the booking form."
  }
];

function normalizeGallerySpan(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return 36;
  }
  return Math.min(56, Math.max(20, Math.round(numericValue)));
}

function normalizeGalleryItem(item) {
  const src = item && typeof item.src === "string" ? item.src.trim() : "";
  if (!src) {
    return null;
  }

  const alt =
    item && typeof item.alt === "string" && item.alt.trim()
      ? item.alt.trim()
      : "Portfolio photograph from Behmen Studio";
  const category =
    item && typeof item.category === "string" && item.category.trim()
      ? item.category.trim()
      : "Portrait";
  const mood =
    item && typeof item.mood === "string" && item.mood.trim()
      ? item.mood.trim()
      : "Soft";

  return {
    src,
    alt,
    category,
    mood,
    span: normalizeGallerySpan(item ? item.span : undefined)
  };
}

function normalizeGalleryItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => normalizeGalleryItem(item))
    .filter((item) => item !== null);
}

function loadGalleryItems() {
  const sourceItems =
    Array.isArray(window.SITE_GALLERY_ITEMS) && window.SITE_GALLERY_ITEMS.length
      ? window.SITE_GALLERY_ITEMS
      : defaultGalleryItems;
  return normalizeGalleryItems(sourceItems);
}

document.addEventListener("DOMContentLoaded", () => {
  const runInitializer = (name, initializer, fallbackValue) => {
    try {
      return initializer();
    } catch (error) {
      console.error(`${name} failed to initialize.`, error);
      return fallbackValue;
    }
  };

  runInitializer("Contact form", initContactForm);
  runInitializer("Booking links", wireBookingLinks);
  runInitializer("Navigation", initNavigation);
  runInitializer("Image error handling", () => markMissingImagesOnError(document));

  const galleryApi =
    runInitializer("Portfolio carousel", initPortfolioCarousel, null) || {
      closeLightbox: () => {},
      previousLightbox: () => {},
      nextLightbox: () => {},
      previous: () => {},
      next: () => {},
      refresh: () => {}
    };
  runInitializer("Image library", () => {
    if (typeof initAdminMode === "function") {
      initAdminMode(galleryApi);
    }
  });

  document.addEventListener("keydown", (event) => {
    const lightbox = document.getElementById("lightbox");
    const lightboxOpen = Boolean(lightbox && lightbox.classList.contains("is-open"));

    if (event.key === "Escape" && lightboxOpen) {
      galleryApi.closeLightbox();
      return;
    }

    if (event.key === "ArrowLeft") {
      if (lightboxOpen) {
        galleryApi.previousLightbox();
      } else {
        galleryApi.previous();
      }
    }

    if (event.key === "ArrowRight") {
      if (lightboxOpen) {
        galleryApi.nextLightbox();
      } else {
        galleryApi.next();
      }
    }
  });
});

function setYear() {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

function applySavedTheme() {
  const savedTheme = getSavedTheme();
  document.documentElement.dataset.theme = savedTheme;
  syncThemeBrandAssets(savedTheme);
}

function getSavedTheme() {
  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "requested" || savedTheme === "warm") {
      return savedTheme;
    }
  } catch (error) {
    return "warm";
  }

  return "warm";
}

function initThemeSelector() {
  const buttons = document.querySelectorAll("[data-theme-choice]");
  if (!buttons.length) {
    return;
  }

  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    syncThemeBrandAssets(theme);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      // If the browser does not save the theme choice, the page still works normally.
    }

    buttons.forEach((button) => {
      if (!(button instanceof HTMLButtonElement)) {
        return;
      }

      const isActive = button.dataset.themeChoice === theme;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  setTheme(getSavedTheme());

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.dataset.themeChoice;
      if (theme === "requested" || theme === "warm") {
        setTheme(theme);
      }
    });
  });
}

function syncThemeBrandAssets(theme) {
  const logoUrl = theme === "requested" ? REQUESTED_LOGO_URL : DEFAULT_LOGO_URL;

  document.querySelectorAll(".brand-logo").forEach((logo) => {
    if (logo instanceof HTMLImageElement) {
      logo.src = logoUrl;
    }
  });

  const favicon = document.getElementById("site-favicon");
  if (favicon instanceof HTMLLinkElement) {
    favicon.href = logoUrl;
  }
}

function wireBookingLinks() {
  const bookingElements = document.querySelectorAll("[data-booking-link], .booking-link");
  const contactSection = document.getElementById("contact");
  const contactTitle = document.getElementById("contact-title");

  bookingElements.forEach((element) => {
    if (element instanceof HTMLAnchorElement) {
      element.href = "#contact";
      element.removeAttribute("target");
      element.removeAttribute("rel");
      return;
    }

    element.addEventListener("click", () => {
      if (!contactSection) {
        window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
        return;
      }

      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        if (contactTitle && typeof contactTitle.focus === "function") {
          contactTitle.focus();
        }
      }, 320);
    });
  });
}

function initContactForm() {
  const form = document.getElementById("booking-form");
  const status = document.getElementById("booking-form-status");
  const target = document.getElementById("booking-form-target");

  if (!(form instanceof HTMLFormElement) || !(status instanceof HTMLElement)) {
    return;
  }

  form.action = GOOGLE_FORM_POST_URL;

  let awaitingResponse = false;
  let submitFallbackId = null;

  const submitButton = form.querySelector('button[type="submit"]');

  const resetSubmitButton = () => {
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = false;
      submitButton.textContent = "Send booking request";
    }
  };

  form.addEventListener("submit", (event) => {
    if (!form.reportValidity()) {
      event.preventDefault();
      status.textContent = "Please complete the required fields before sending.";
      status.classList.remove("is-success");
      status.classList.add("is-error");
      resetSubmitButton();
      return;
    }

    awaitingResponse = true;
    status.textContent = "Sending your request...";
    status.classList.remove("is-success", "is-error");

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    if (submitFallbackId) {
      window.clearTimeout(submitFallbackId);
    }

    submitFallbackId = window.setTimeout(() => {
      if (!awaitingResponse) {
        return;
      }

      awaitingResponse = false;
      status.textContent =
        "The form is taking longer than expected. Please try again in a moment.";
      status.classList.remove("is-success");
      status.classList.add("is-error");
      resetSubmitButton();
    }, 12000);
  });

  if (target) {
    target.addEventListener("load", () => {
      if (!awaitingResponse) {
        return;
      }

      awaitingResponse = false;
      if (submitFallbackId) {
        window.clearTimeout(submitFallbackId);
        submitFallbackId = null;
      }
      form.reset();
      status.textContent = "Thanks. Your request has been sent and Ana will follow up soon.";
      status.classList.remove("is-error");
      status.classList.add("is-success");
      resetSubmitButton();
    });
  }
}

function initNavigation() {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  const mobileQuery = window.matchMedia("(max-width: 920px)");

  if (!header || !menuToggle || !nav) {
    return;
  }

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const syncNavStateForViewport = () => {
    if (!mobileQuery.matches) {
      nav.classList.remove("is-open");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      nav.setAttribute("aria-hidden", "false");
      return;
    }

    nav.setAttribute("aria-hidden", nav.classList.contains("is-open") ? "false" : "true");
  };

  syncNavStateForViewport();
  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", syncNavStateForViewport);
  } else if (typeof mobileQuery.addListener === "function") {
    mobileQuery.addListener(syncNavStateForViewport);
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    nav.setAttribute("aria-hidden", String(!isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 920px)").matches) {
        nav.classList.remove("is-open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        nav.setAttribute("aria-hidden", "true");
      }
    });
  });
}

function initScrollReveal() {
  const revealItems = document.querySelectorAll(".reveal:not(#gallery)");
  const gallerySection = document.getElementById("gallery");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (gallerySection) {
    gallerySection.classList.add("is-visible");
  }

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  revealItems.forEach((item) => item.classList.add("is-reveal-ready"));

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initFeaturedCarousel() {
  const image = document.getElementById("featured-image");
  const dots = document.getElementById("carousel-dots");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const stage = document.getElementById("featured-stage");

  if (!image || !dots || !prevBtn || !nextBtn || !stage) {
    return {
      next: () => {},
      previous: () => {}
    };
  }

  let index = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let autoAdvanceId = null;

  const dotButtons = featuredSlides.map((slide, slideIndex) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.role = "tab";
    dot.setAttribute("aria-label", `Go to featured slide ${slideIndex + 1}`);
    dot.setAttribute("aria-selected", "false");
    dot.addEventListener("click", () => {
      index = slideIndex;
      render();
      restartAutoAdvance();
    });
    dots.appendChild(dot);
    return dot;
  });

  const render = () => {
    const slide = featuredSlides[index];

    image.src = slide.src;
    image.alt = slide.alt;

    stage.classList.remove("image-missing");
    image.onerror = () => {
      stage.classList.add("image-missing");
    };

    dotButtons.forEach((dot, dotIndex) => {
      const selected = dotIndex === index;
      dot.setAttribute("aria-selected", String(selected));
    });
  };

  const next = () => {
    index = (index + 1) % featuredSlides.length;
    render();
  };

  const previous = () => {
    index = (index - 1 + featuredSlides.length) % featuredSlides.length;
    render();
  };

  const stopAutoAdvance = () => {
    if (autoAdvanceId) {
      window.clearInterval(autoAdvanceId);
      autoAdvanceId = null;
    }
  };

  const startAutoAdvance = () => {
    stopAutoAdvance();
    if (reducedMotion || featuredSlides.length < 2) {
      return;
    }
    autoAdvanceId = window.setInterval(next, 4600);
  };

  const restartAutoAdvance = () => {
    startAutoAdvance();
  };

  prevBtn.addEventListener("click", () => {
    previous();
    restartAutoAdvance();
  });
  nextBtn.addEventListener("click", () => {
    next();
    restartAutoAdvance();
  });

  addSwipeSupport(stage, previous, next);
  stage.addEventListener("mouseenter", stopAutoAdvance);
  stage.addEventListener("mouseleave", startAutoAdvance);
  stage.addEventListener("focusin", stopAutoAdvance);
  stage.addEventListener("focusout", startAutoAdvance);
  dots.addEventListener("mouseenter", stopAutoAdvance);
  dots.addEventListener("mouseleave", startAutoAdvance);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoAdvance();
      return;
    }
    startAutoAdvance();
  });
  render();
  startAutoAdvance();

  return { next, previous };
}

function initPortfolioCarousel() {
  const viewport = document.getElementById("portfolio-viewport");
  const track = document.getElementById("portfolio-track");
  const prevControl = document.getElementById("portfolio-prev");
  const nextControl = document.getElementById("portfolio-next");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".lightbox-nav.prev");
  const nextBtn = document.querySelector(".lightbox-nav.next");

  const emptyApi = {
    closeLightbox: () => {},
    previousLightbox: () => {},
    nextLightbox: () => {},
    previous: () => {},
    next: () => {},
    refresh: () => {}
  };

  if (
    !viewport ||
    !track ||
    !prevControl ||
    !nextControl ||
    !lightbox ||
    !lightboxImage ||
    !closeBtn ||
    !prevBtn ||
    !nextBtn
  ) {
    return emptyApi;
  }

  let items = [...galleryItems];
  let lightboxIndex = 0;
  let embla = null;
  let autoplayHalted = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const getAutoplay = () => embla?.plugins?.()?.autoplay ?? null;

  const haltAutoplay = () => {
    autoplayHalted = true;
    getAutoplay()?.stop();
  };

  const onViewportEnter = () => {
    if (!autoplayHalted) {
      getAutoplay()?.stop();
    }
  };

  const onViewportLeave = () => {
    if (!autoplayHalted) {
      getAutoplay()?.play();
    }
  };

  const renderLightbox = () => {
    const item = items[lightboxIndex];
    if (!item) {
      return;
    }

    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;

    const frame = lightboxImage.closest(".lightbox-frame");
    if (frame) {
      frame.classList.remove("image-missing");
    }

    lightboxImage.onerror = () => {
      if (frame) {
        frame.classList.add("image-missing");
      }
    };
  };

  const openLightbox = (index) => {
    haltAutoplay();
    lightboxIndex = index;
    renderLightbox();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const nextLightbox = () => {
    if (!items.length) {
      return;
    }
    lightboxIndex = (lightboxIndex + 1) % items.length;
    renderLightbox();
  };

  const previousLightbox = () => {
    if (!items.length) {
      return;
    }
    lightboxIndex = (lightboxIndex - 1 + items.length) % items.length;
    renderLightbox();
  };

  const previous = () => {
    haltAutoplay();
    if (embla) {
      embla.scrollPrev();
    }
  };

  const next = () => {
    haltAutoplay();
    if (embla) {
      embla.scrollNext();
    }
  };

  const buildSlides = () => {
    track.innerHTML = "";
    galleryItems = loadGalleryItems();
    items = [...galleryItems];

    if (!items.length) {
      const empty = document.createElement("p");
      empty.textContent = "No portfolio images yet.";
      track.appendChild(empty);
      return;
    }

    items.forEach((item, index) => {
      const slide = document.createElement("button");
      slide.type = "button";
      slide.className = "portfolio-slide";
      slide.setAttribute("aria-label", `Open image: ${item.alt}`);

      const image = document.createElement("img");
      image.src = item.src;
      image.alt = item.alt;
      image.loading = index < 2 ? "eager" : "lazy";
      image.decoding = "async";
      image.addEventListener(
        "error",
        () => {
          slide.classList.add("image-missing");
        },
        { once: true }
      );

      slide.append(image);
      slide.addEventListener("click", () => openLightbox(index));
      track.appendChild(slide);
    });

    markMissingImagesOnError(track);
  };

  const mountEmbla = () => {
    if (embla) {
      embla.destroy();
      embla = null;
    }

    autoplayHalted = false;

    if (!items.length) {
      return;
    }

    if (typeof window.EmblaCarousel !== "function") {
      console.error("EmblaCarousel is not available. Check vendor/embla scripts.");
      return;
    }

    const plugins = [];
    const canAutoplay =
      !reducedMotion &&
      items.length > 1 &&
      typeof window.EmblaCarouselAutoplay === "function";

    if (canAutoplay) {
      // stopOnInteraction: drag stops permanently.
      // Hover pause is handled below so mouseleave can resume until a real interaction.
      plugins.push(
        window.EmblaCarouselAutoplay({
          delay: 4500,
          stopOnInteraction: true,
          stopOnMouseEnter: false,
          stopOnFocusIn: true,
          playOnInit: true
        })
      );
    }

    embla = window.EmblaCarousel(
      viewport,
      {
        loop: items.length > 1,
        align: "start",
        containScroll: "trimSnaps",
        dragFree: false,
        skipSnaps: false,
        duration: reducedMotion ? 0 : 28
      },
      plugins
    );

    viewport.removeEventListener("mouseenter", onViewportEnter);
    viewport.removeEventListener("mouseleave", onViewportLeave);

    if (canAutoplay) {
      embla.on("pointerDown", haltAutoplay);
      viewport.addEventListener("mouseenter", onViewportEnter);
      viewport.addEventListener("mouseleave", onViewportLeave);
    }
  };

  const refresh = () => {
    buildSlides();
    mountEmbla();
  };

  prevControl.addEventListener("click", previous);
  nextControl.addEventListener("click", next);
  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", previousLightbox);
  nextBtn.addEventListener("click", nextLightbox);
  addSwipeSupport(lightbox, previousLightbox, nextLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  refresh();

  return {
    closeLightbox,
    previousLightbox,
    nextLightbox,
    previous,
    next,
    refresh
  };
}

function initTestimonials() {
  const row = document.getElementById("testimonial-row");
  if (!row) {
    return;
  }

  testimonials.forEach((item) => {
    const card = document.createElement("article");
    card.className = "testimonial-card";

    const quote = document.createElement("p");
    quote.textContent = `“${item.quote}”`;

    const tag = document.createElement("p");
    tag.className = "tag";
    tag.textContent = item.label;

    card.append(quote, tag);
    row.appendChild(card);
  });
}

function initFaqs() {
  const list = document.getElementById("faq-list");
  if (!list) {
    return;
  }

  faqs.forEach((item, index) => {
    const wrapper = document.createElement("article");
    wrapper.className = "faq-item";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "faq-question";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", `faq-answer-${index}`);
    button.innerHTML = `<span>${item.q}</span><span class="icon" aria-hidden="true">+</span>`;

    const answer = document.createElement("div");
    answer.className = "faq-answer";
    answer.id = `faq-answer-${index}`;
    answer.innerHTML = `<p>${item.a}</p>`;

    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      button.querySelector(".icon").textContent = expanded ? "+" : "−";
      answer.style.maxHeight = expanded ? "0px" : `${answer.scrollHeight}px`;
    });

    wrapper.append(button, answer);
    list.appendChild(wrapper);
  });
}

function addSwipeSupport(element, onSwipeRight, onSwipeLeft) {
  if (!element) {
    return;
  }

  let touchStartX = 0;
  let touchEndX = 0;

  element.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  element.addEventListener(
    "touchend",
    (event) => {
      touchEndX = event.changedTouches[0].clientX;
      const delta = touchEndX - touchStartX;

      if (Math.abs(delta) < 36) {
        return;
      }

      if (delta > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    },
    { passive: true }
  );
}

function markMissingImagesOnError(root) {
  const images = root.querySelectorAll("img");
  images.forEach((image) => {
    const markMissing = () => {
      const parent = image.closest(
        ".frame-image, .hero-card, .gallery-item, .portfolio-slide, .featured-stage"
      );
      if (parent) {
        parent.classList.add("image-missing");
      }
    };

    image.addEventListener("error", markMissing, { once: true });

    if (image.complete && image.naturalWidth === 0) {
      markMissing();
    }
  });
}
