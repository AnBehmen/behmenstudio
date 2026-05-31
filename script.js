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
    "src": "assets/images/web/library-titelbild-2000-19to9.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Soft"
  },
  {
    "src": "assets/images/web/library-catlina-aw-ig-12.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Editorial"
  },
  {
    "src": "assets/images/web/library-22-06-19-lara-alper-und-katja-188.webp",
    "alt": "Couples session photograph from Behmen Studio portfolio",
    "category": "Couples",
    "mood": "Soft"
  },
  {
    "src": "assets/images/web/library-mittwochulu0144.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Editorial"
  },
  {
    "src": "assets/images/web/library-6c7a8484.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Bold"
  },
  {
    "src": "assets/images/web/library-2look-natur-orig-10.webp",
    "alt": "Lifestyle photography image from Behmen Studio portfolio",
    "category": "Lifestyle",
    "mood": "Soft"
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-37.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody"
  },
  {
    "src": "assets/images/web/library-073a4234-2-2k-2.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Editorial"
  },
  {
    "src": "assets/images/web/library-6c7a8452.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Moody"
  },
  {
    "src": "assets/images/web/library-a7401618.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Moody"
  },
  {
    "src": "assets/images/web/library-dsc-6470.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid"
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-69.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid"
  }
];

// This is the fallback portfolio list. If gallery-data.js exists, it will override this list.
const defaultGalleryItems = [
  {
    "src": "assets/images/web/library-titelbild-2000-19to9.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Soft",
    "span": 28
  },
  {
    "src": "assets/images/web/library-1691479-14-web-1900xv2.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Soft",
    "span": 45
  },
  {
    "src": "assets/images/web/library-rumyana-ig-1-2.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Editorial",
    "span": 45
  },
  {
    "src": "assets/images/web/library-catlina-aw-ig-12.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Editorial",
    "span": 28
  },
  {
    "src": "assets/images/web/library-hochzeit-im-studio-88.webp",
    "alt": "Couples session photograph from Behmen Studio portfolio",
    "category": "Couples",
    "mood": "Candid",
    "span": 45
  },
  {
    "src": "assets/images/web/library-22-06-19-lara-alper-und-katja-188.webp",
    "alt": "Couples session photograph from Behmen Studio portfolio",
    "category": "Couples",
    "mood": "Soft",
    "span": 28
  },
  {
    "src": "assets/images/web/library-mittwochulu0144.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Editorial",
    "span": 28
  },
  {
    "src": "assets/images/web/library-6c7a8484.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Bold",
    "span": 28
  },
  {
    "src": "assets/images/web/library-dsc-2743.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-30.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 45
  },
  {
    "src": "assets/images/web/library-2look-natur-orig-18.webp",
    "alt": "Lifestyle photography image from Behmen Studio portfolio",
    "category": "Lifestyle",
    "mood": "Candid",
    "span": 45
  },
  {
    "src": "assets/images/web/library-a7401944.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Soft",
    "span": 45
  },
  {
    "src": "assets/images/web/library-073a4501-2-3-2-3-2.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Moody",
    "span": 40
  },
  {
    "src": "assets/images/web/library-catlina-aw-ig-13.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Bold",
    "span": 40
  },
  {
    "src": "assets/images/web/library-22-06-19-lara-alper-und-katja-17.webp",
    "alt": "Couples session photograph from Behmen Studio portfolio",
    "category": "Couples",
    "mood": "Romantic",
    "span": 45
  },
  {
    "src": "assets/images/web/library-a7401958.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Moody",
    "span": 45
  },
  {
    "src": "assets/images/web/library-a7405460b.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/library-6c7a8437.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/library-dsc-2334.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/library-rumyana-ig-1-3.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/library-dsc-2803.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Soft",
    "span": 45
  },
  {
    "src": "assets/images/web/library-22-06-19-lara-alper-und-katja-35.webp",
    "alt": "Couples session photograph from Behmen Studio portfolio",
    "category": "Couples",
    "mood": "Candid",
    "span": 45
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-56.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 45
  },
  {
    "src": "assets/images/web/library-2look-natur-orig-10.webp",
    "alt": "Lifestyle photography image from Behmen Studio portfolio",
    "category": "Lifestyle",
    "mood": "Soft",
    "span": 28
  },
  {
    "src": "assets/images/web/library-a7401618.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/library-catlina-aw-ig-2.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Soft",
    "span": 40
  },
  {
    "src": "assets/images/web/library-22-06-19-lara-alper-und-katja-60.webp",
    "alt": "Couples session photograph from Behmen Studio portfolio",
    "category": "Couples",
    "mood": "Romantic",
    "span": 45
  },
  {
    "src": "assets/images/web/library-073a4234-2-2k-2.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Editorial",
    "span": 28
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-26.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 28
  },
  {
    "src": "assets/images/web/library-a7401711.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Bold",
    "span": 28
  },
  {
    "src": "assets/images/web/library-catlina-aw-ig-6.webp",
    "alt": "Brand portrait photograph from Behmen Studio portfolio",
    "category": "Branding",
    "mood": "Editorial",
    "span": 40
  },
  {
    "src": "assets/images/web/library-22-06-19-lara-alper-und-katja-79.webp",
    "alt": "Couples session photograph from Behmen Studio portfolio",
    "category": "Couples",
    "mood": "Soft",
    "span": 28
  },
  {
    "src": "assets/images/web/library-073a4442-2-3-4.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Bold",
    "span": 28
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-27.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/library-a7401873.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Editorial",
    "span": 45
  },
  {
    "src": "assets/images/web/library-073a4568-2-4-kopie.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Editorial",
    "span": 28
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-28.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/library-dsc-2343.webp",
    "alt": "Portrait photography image from Behmen Studio portfolio",
    "category": "Portrait",
    "mood": "Editorial",
    "span": 45
  },
  {
    "src": "assets/images/web/library-6c7a8452.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-29.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 45
  },
  {
    "src": "assets/images/web/library-6c7a8467.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Editorial",
    "span": 28
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-31.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/library-mittwochulu0129.webp",
    "alt": "Creative editorial portrait from Behmen Studio portfolio",
    "category": "Creative",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-32.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 45
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-37.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-45.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Bold",
    "span": 28
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-55.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 28
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-57.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Bold",
    "span": 28
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-58.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 45
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-59.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-6.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-60.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 45
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-61.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-64.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Bold",
    "span": 40
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-69.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 28
  },
  {
    "src": "assets/images/web/library-26portfolio-ev-beispiele-70.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/library-a7405463b.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 45
  },
  {
    "src": "assets/images/web/library-dsc-6376.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 45
  },
  {
    "src": "assets/images/web/library-dsc-6420.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Bold",
    "span": 45
  },
  {
    "src": "assets/images/web/library-dsc-6470.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Candid",
    "span": 28
  },
  {
    "src": "assets/images/web/library-dsc-6527.webp",
    "alt": "Event photography image from Behmen Studio portfolio",
    "category": "Events",
    "mood": "Moody",
    "span": 28
  },
  {
    "src": "assets/images/web/library-dsc-6755.webp",
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
  const src = typeof item?.src === "string" ? item.src.trim() : "";
  if (!src) {
    return null;
  }

  const alt =
    typeof item?.alt === "string" && item.alt.trim()
      ? item.alt.trim()
      : "Portfolio photograph from Behmen Studio";
  const category =
    typeof item?.category === "string" && item.category.trim()
      ? item.category.trim()
      : "Portrait";
  const mood =
    typeof item?.mood === "string" && item.mood.trim()
      ? item.mood.trim()
      : "Soft";

  return {
    src,
    alt,
    category,
    mood,
    span: normalizeGallerySpan(item?.span)
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
  applySavedTheme();
  setYear();
  initThemeSelector();
  initContactForm();
  wireBookingLinks();
  initNavigation();
  initScrollReveal();
  markMissingImagesOnError(document);

  const carouselApi = initFeaturedCarousel();
  const galleryApi = initMoodGallery();
  initAdminMode(galleryApi);

  initTestimonials();
  initFaqs();

  document.addEventListener("keydown", (event) => {
    const lightboxOpen = document.getElementById("lightbox")?.classList.contains("is-open");

    if (event.key === "Escape" && lightboxOpen) {
      galleryApi.closeLightbox();
      return;
    }

    if (event.key === "ArrowLeft") {
      if (lightboxOpen) {
        galleryApi.previousLightbox();
      } else {
        carouselApi.previous();
      }
    }

    if (event.key === "ArrowRight") {
      if (lightboxOpen) {
        galleryApi.nextLightbox();
      } else {
        carouselApi.next();
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
        contactTitle?.focus?.();
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

  target?.addEventListener("load", () => {
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
  const revealItems = document.querySelectorAll(".reveal");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

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

function initMoodGallery() {
  const grid = document.getElementById("gallery-grid");
  const loadMoreBtn = document.getElementById("gallery-load-more");
  const filters = document.getElementById("gallery-filters");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".lightbox-nav.prev");
  const nextBtn = document.querySelector(".lightbox-nav.next");

  if (!grid || !loadMoreBtn || !filters || !lightbox || !lightboxImage || !closeBtn || !prevBtn || !nextBtn) {
    return {
      closeLightbox: () => {},
      previousLightbox: () => {},
      nextLightbox: () => {},
      refresh: () => {}
    };
  }

  let activeFilter = "All";
  let filteredItems = [...galleryItems];
  let lightboxIndex = 0;
  let visibleCount = 0;

  const getAvailableFilters = () => [
    "All",
    ...new Set(
      galleryItems
        .map((item) => item.mood)
        .filter((mood) => typeof mood === "string" && mood.trim() && mood.trim() !== "All")
    )
  ];

  const getBatchSize = () => (window.matchMedia("(max-width: 759px)").matches ? 8 : 12);
  const resetVisibleCount = () => {
    visibleCount = getBatchSize();
  };
  const ensureValidActiveFilter = () => {
    const filtersForData = getAvailableFilters();
    if (activeFilter !== "All" && !filtersForData.includes(activeFilter)) {
      activeFilter = "All";
    }
  };

  const renderFilterButtons = () => {
    filters.innerHTML = "";
    const availableFilters = getAvailableFilters();
    const filterList = availableFilters.length <= 2 ? ["All"] : availableFilters;

    filterList.forEach((filterName) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-btn";
      button.dataset.filter = filterName;
      button.textContent = filterName;
      button.classList.toggle("is-active", filterName === activeFilter);

      button.addEventListener("click", () => {
        activeFilter = filterName;
        filters.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("is-active"));
        button.classList.add("is-active");
        resetVisibleCount();
        renderGrid();
      });

      filters.appendChild(button);
    });
  };

  const renderLightbox = () => {
    const item = filteredItems[lightboxIndex];
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
      frame?.classList.add("image-missing");
    };
  };

  const openLightbox = (index) => {
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
    if (!filteredItems.length) {
      return;
    }
    lightboxIndex = (lightboxIndex + 1) % filteredItems.length;
    renderLightbox();
  };

  const previousLightbox = () => {
    if (!filteredItems.length) {
      return;
    }
    lightboxIndex = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    renderLightbox();
  };

  const renderGrid = () => {
    ensureValidActiveFilter();
    filteredItems =
      activeFilter === "All"
        ? [...galleryItems]
        : galleryItems.filter((item) => item.mood === activeFilter);

    grid.innerHTML = "";

    if (!filteredItems.length) {
      const empty = document.createElement("p");
      empty.textContent = "No images in this mood yet. Add more gallery items in script.js.";
      grid.appendChild(empty);
      loadMoreBtn.hidden = true;
      return;
    }

    const visibleItems = filteredItems.slice(0, visibleCount);

    visibleItems.forEach((item, itemIndex) => {
      const card = document.createElement("button");
      card.className = "gallery-item";
      card.type = "button";
      card.style.setProperty("--span", String(item.span ?? 36));
      card.setAttribute("aria-label", `Open image: ${item.alt}`);

      const image = document.createElement("img");
      image.src = item.src;
      image.alt = item.alt;
      image.loading = "lazy";
      image.decoding = "async";

      image.addEventListener(
        "error",
        () => {
          card.classList.add("image-missing");
        },
        { once: true }
      );

      card.append(image);

      card.addEventListener("click", () => openLightbox(itemIndex));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(itemIndex);
        }
      });

      grid.appendChild(card);
    });

    loadMoreBtn.hidden = visibleCount >= filteredItems.length;
    markMissingImagesOnError(grid);
  };

  const refresh = () => {
    resetVisibleCount();
    renderFilterButtons();
    renderGrid();
  };

  loadMoreBtn.addEventListener("click", () => {
    visibleCount += getBatchSize();
    renderGrid();
  });

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
    refresh
  };
}

function initAdminMode(galleryApi) {
  const shell = document.getElementById("admin-shell");
  const closeBtn = document.getElementById("admin-close");
  const loginPanel = document.getElementById("admin-login-panel");
  const githubPanel = document.getElementById("admin-github-panel");
  const githubForm = document.getElementById("admin-github-form");
  const githubTokenInput = document.getElementById("admin-github-token");
  const githubOwnerInput = document.getElementById("admin-github-owner");
  const githubRepoInput = document.getElementById("admin-github-repo");
  const githubBranchInput = document.getElementById("admin-github-branch");
  const workPanel = document.getElementById("admin-work-panel");
  const loginForm = document.getElementById("admin-login-form");
  const passwordInput = document.getElementById("admin-password");
  const uploadForm = document.getElementById("admin-upload-form");
  const srcInput = document.getElementById("admin-src-path");
  const fileInput = document.getElementById("admin-image-file");
  const altInput = document.getElementById("admin-alt");
  const categoryInput = document.getElementById("admin-category");
  const moodInput = document.getElementById("admin-mood");
  const spanInput = document.getElementById("admin-span");
  const status = document.getElementById("admin-status");
  const list = document.getElementById("admin-gallery-list");
  const replaceInput = document.getElementById("admin-replace-file");
  const refreshButton = document.getElementById("admin-refresh-gallery");
  const logoutButton = document.getElementById("admin-logout");

  if (
    !shell ||
    !closeBtn ||
    !loginPanel ||
    !githubPanel ||
    !(githubForm instanceof HTMLFormElement) ||
    !(githubTokenInput instanceof HTMLInputElement) ||
    !(githubOwnerInput instanceof HTMLInputElement) ||
    !(githubRepoInput instanceof HTMLInputElement) ||
    !(githubBranchInput instanceof HTMLInputElement) ||
    !workPanel ||
    !(loginForm instanceof HTMLFormElement) ||
    !(uploadForm instanceof HTMLFormElement) ||
    !(passwordInput instanceof HTMLInputElement) ||
    !(srcInput instanceof HTMLInputElement) ||
    !(fileInput instanceof HTMLInputElement) ||
    !(altInput instanceof HTMLInputElement) ||
    !(categoryInput instanceof HTMLSelectElement) ||
    !(moodInput instanceof HTMLSelectElement) ||
    !(spanInput instanceof HTMLInputElement) ||
    !status ||
    !list ||
    !(replaceInput instanceof HTMLInputElement) ||
    !(refreshButton instanceof HTMLButtonElement) ||
    !(logoutButton instanceof HTMLButtonElement)
  ) {
    return;
  }

  let replaceIndex = null;
  let typedSecret = "";
  let secretTimeoutId = null;
  let repoContext = null;
  let busy = false;

  const setStatus = (message, type = "neutral") => {
    status.textContent = message;
    status.classList.remove("is-success", "is-error");
    if (type === "success") {
      status.classList.add("is-success");
    }
    if (type === "error") {
      status.classList.add("is-error");
    }
  };

  const setBusy = (value) => {
    busy = value;
    uploadForm.querySelectorAll("button").forEach((button) => {
      if (button instanceof HTMLButtonElement) {
        button.disabled = value;
      }
    });
    list.querySelectorAll("button").forEach((button) => {
      if (button instanceof HTMLButtonElement) {
        button.disabled = value;
      }
    });
    refreshButton.disabled = value;
    logoutButton.disabled = value;
  };

  const toBase64FromBytes = (bytes) => {
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return window.btoa(binary);
  };

  const toBase64FromText = (value) => {
    const bytes = new TextEncoder().encode(value);
    return toBase64FromBytes(bytes);
  };

  const fromBase64ToText = (value) => {
    const normalized = value.replace(/\s+/g, "");
    const binary = window.atob(normalized);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  };

  const getRepoContext = () => ({
    token: githubTokenInput.value.trim(),
    owner: githubOwnerInput.value.trim() || ADMIN_DEFAULT_REPO_OWNER,
    repo: githubRepoInput.value.trim() || ADMIN_DEFAULT_REPO_NAME,
    branch: githubBranchInput.value.trim() || ADMIN_DEFAULT_REPO_BRANCH
  });

  const setRepoConnectedState = (connected) => {
    githubPanel.hidden = connected;
    workPanel.hidden = !connected;
  };

  const runAdminAction = async (action) => {
    if (busy) {
      return;
    }
    setBusy(true);
    try {
      await action();
    } finally {
      setBusy(false);
    }
  };

  const githubApiRequest = async (path, context, options = {}) => {
    const method = options.method ?? "GET";
    const encodedPath = path
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");

    const url = new URL(`https://api.github.com/repos/${context.owner}/${context.repo}/contents/${encodedPath}`);
    if (options.includeRef ?? method === "GET") {
      url.searchParams.set("ref", context.branch);
    }

    const response = await window.fetch(url.toString(), {
      method,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${context.token}`,
        "X-GitHub-Api-Version": "2022-11-28"
      },
      body: options.body ? JSON.stringify(options.body) : undefined
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const detail =
        typeof payload?.message === "string" && payload.message
          ? payload.message
          : `GitHub request failed (${response.status}).`;
      throw new Error(detail);
    }

    return payload;
  };

  const parseGalleryDataText = (rawText) => {
    const match = rawText.match(/window\.SITE_GALLERY_ITEMS\s*=\s*(\[[\s\S]*\]);/);
    if (!match?.[1]) {
      throw new Error("Could not parse gallery-data.js from repository.");
    }

    return normalizeGalleryItems(JSON.parse(match[1]));
  };

  const buildGalleryDataText = (items) => {
    const normalized = normalizeGalleryItems(items);
    return [
      "// Auto-generated gallery data.",
      "// This file can be replaced later by running process-images.command.",
      `window.SITE_GALLERY_ITEMS = ${JSON.stringify(normalized, null, 2)};`,
      ""
    ].join("\n");
  };

  const fetchGalleryFile = async (context) => {
    const payload = await githubApiRequest(ADMIN_GALLERY_DATA_PATH, context);
    if (typeof payload?.content !== "string" || typeof payload?.sha !== "string") {
      throw new Error("Could not read gallery-data.js from GitHub.");
    }

    const text = fromBase64ToText(payload.content);
    return {
      sha: payload.sha,
      items: parseGalleryDataText(text)
    };
  };

  const writeRepoFile = async (context, path, contentBase64, message, sha = undefined) => {
    const body = {
      message,
      content: contentBase64,
      branch: context.branch
    };
    if (sha) {
      body.sha = sha;
    }

    return githubApiRequest(path, context, { method: "PUT", body });
  };

  const readRepoFileSha = async (context, path) => {
    const payload = await githubApiRequest(path, context, { method: "GET", includeRef: true });
    if (typeof payload?.sha !== "string") {
      throw new Error(`Could not read file SHA for ${path}.`);
    }
    return payload.sha;
  };

  const deleteRepoFile = async (context, path, message) => {
    let sha;
    try {
      sha = await readRepoFileSha(context, path);
    } catch (error) {
      return;
    }

    await githubApiRequest(path, context, {
      method: "DELETE",
      includeRef: false,
      body: {
        message,
        sha,
        branch: context.branch
      }
    });
  };

  const commitGalleryItems = async (context, items, message) => {
    const normalized = normalizeGalleryItems(items);
    const latest = await fetchGalleryFile(context);
    await writeRepoFile(
      context,
      ADMIN_GALLERY_DATA_PATH,
      toBase64FromText(buildGalleryDataText(normalized)),
      message,
      latest.sha
    );
    galleryItems = normalized;
  };

  const syncGalleryFromRepo = async (context) => {
    const latest = await fetchGalleryFile(context);
    galleryItems = latest.items;
    galleryApi.refresh();
    renderAdminList();
  };

  const slugifyName = (value) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 42) || "image";

  const getFileExtension = (file) => {
    const fromName = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (fromName && fromName.length <= 6) {
      return fromName;
    }
    if (file.type === "image/jpeg") {
      return "jpg";
    }
    if (file.type === "image/png") {
      return "png";
    }
    if (file.type === "image/webp") {
      return "webp";
    }
    return "bin";
  };

  const readFileBytes = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  };

  const populateSelect = (select, values) => {
    select.innerHTML = "";
    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  };

  populateSelect(categoryInput, ADMIN_ALLOWED_CATEGORIES);
  populateSelect(moodInput, ADMIN_ALLOWED_MOODS);

  const isAuthenticated = () => {
    try {
      return window.sessionStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === "1";
    } catch (error) {
      return false;
    }
  };

  const setAuthenticated = (value) => {
    try {
      if (value) {
        window.sessionStorage.setItem(ADMIN_AUTH_STORAGE_KEY, "1");
      } else {
        window.sessionStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
      }
    } catch (error) {
      // Ignore storage failures so the rest of the page still works.
    }
  };

  const closeAdmin = () => {
    shell.hidden = true;
    shell.setAttribute("aria-hidden", "true");
    document.body.classList.remove("admin-open");
    replaceIndex = null;
    replaceInput.value = "";
  };

  const openAdmin = () => {
    shell.hidden = false;
    shell.setAttribute("aria-hidden", "false");
    document.body.classList.add("admin-open");

    githubOwnerInput.value = githubOwnerInput.value || ADMIN_DEFAULT_REPO_OWNER;
    githubRepoInput.value = githubRepoInput.value || ADMIN_DEFAULT_REPO_NAME;
    githubBranchInput.value = githubBranchInput.value || ADMIN_DEFAULT_REPO_BRANCH;

    try {
      const savedToken = window.sessionStorage.getItem(ADMIN_GITHUB_TOKEN_STORAGE_KEY);
      if (savedToken && !githubTokenInput.value) {
        githubTokenInput.value = savedToken;
      }
    } catch (error) {
      // Ignore unavailable storage.
    }

    if (isAuthenticated()) {
      loginPanel.hidden = true;
      setRepoConnectedState(Boolean(repoContext));
      if (repoContext) {
        renderAdminList();
        setStatus("Admin mode unlocked and connected to GitHub.", "success");
      } else {
        setStatus("Admin mode unlocked. Connect GitHub to edit live files.");
      }
      return;
    }

    loginPanel.hidden = false;
    githubPanel.hidden = true;
    workPanel.hidden = true;
    setStatus("Enter admin password to unlock image controls.");
    passwordInput.value = "";
    passwordInput.focus();
  };

  const renderAdminList = () => {
    list.innerHTML = "";

    if (!galleryItems.length) {
      const empty = document.createElement("p");
      empty.textContent = "No gallery images are currently loaded.";
      list.appendChild(empty);
      return;
    }

    galleryItems.forEach((item, index) => {
      const row = document.createElement("article");
      row.className = "admin-gallery-row";

      const preview = document.createElement("img");
      preview.src = item.src;
      preview.alt = item.alt;
      preview.loading = "lazy";
      preview.decoding = "async";
      preview.className = "admin-thumb";

      const meta = document.createElement("div");
      meta.className = "admin-gallery-meta";

      const details = document.createElement("p");
      details.textContent = `${index + 1}. ${item.mood} / ${item.category} / span ${item.span}`;

      const caption = document.createElement("p");
      caption.textContent = item.alt;

      meta.append(details, caption);

      const actions = document.createElement("div");
      actions.className = "admin-gallery-actions";

      const replaceButton = document.createElement("button");
      replaceButton.type = "button";
      replaceButton.className = "btn btn-secondary";
      replaceButton.textContent = "Replace";
      replaceButton.addEventListener("click", () => {
        replaceIndex = index;
        replaceInput.click();
      });

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "btn btn-secondary";
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        if (!repoContext) {
          setStatus("Connect GitHub first.", "error");
          return;
        }

        runAdminAction(async () => {
          const nextItems = [...galleryItems];
          const removedItem = nextItems[index];
          nextItems.splice(index, 1);

          const removedPath = removedItem?.src ?? "";
          if (
            typeof removedPath === "string" &&
            removedPath.startsWith("assets/images/web/admin-") &&
            !nextItems.some((item) => item.src === removedPath)
          ) {
            await deleteRepoFile(repoContext, removedPath, `admin: remove image file ${removedPath}`);
          }

          await commitGalleryItems(repoContext, nextItems, "admin: remove gallery image");
          galleryApi.refresh();
          renderAdminList();
          setStatus("Image removed and pushed to GitHub.", "success");
        }).catch((error) => {
          setStatus(error.message, "error");
        });
      });

      actions.append(replaceButton, removeButton);
      row.append(preview, meta, actions);
      list.appendChild(row);
    });
  };

  const hashText = async (value) => {
    if (!window.crypto?.subtle) {
      return null;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  };

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const candidate = passwordInput.value.trim();

    if (!candidate) {
      setStatus("Password is required.", "error");
      return;
    }

    setStatus("Checking password...");

    let digest = null;
    try {
      digest = await hashText(candidate);
    } catch (error) {
      setStatus("Could not verify password. Please try again.", "error");
      return;
    }
    if (!digest) {
      setStatus("This browser does not support secure admin login checks.", "error");
      return;
    }
    if (digest !== ADMIN_PASSWORD_HASH) {
      setStatus("Incorrect password.", "error");
      return;
    }

    setAuthenticated(true);
    loginPanel.hidden = true;
    setRepoConnectedState(Boolean(repoContext));
    setStatus("Admin mode unlocked. Connect GitHub to apply live changes.", "success");
  });

  githubForm.addEventListener("submit", (event) => {
    event.preventDefault();
    runAdminAction(async () => {
      const nextContext = getRepoContext();
      if (!nextContext.token) {
        setStatus("GitHub token is required.", "error");
        return;
      }

      await syncGalleryFromRepo(nextContext);
      repoContext = nextContext;
      try {
        window.sessionStorage.setItem(ADMIN_GITHUB_TOKEN_STORAGE_KEY, nextContext.token);
      } catch (error) {
        // Ignore storage failures.
      }

      setRepoConnectedState(true);
      setStatus(
        `Connected to ${nextContext.owner}/${nextContext.repo} (${nextContext.branch}). Live edits are enabled.`,
        "success"
      );
      altInput.focus();
    }).catch((error) => {
      setStatus(error.message, "error");
    });
  });

  uploadForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!repoContext) {
      setStatus("Connect GitHub first.", "error");
      return;
    }

    runAdminAction(async () => {
      const selectedFile = fileInput.files?.[0] ?? null;
      let src = srcInput.value.trim();

      if (!src && !selectedFile) {
        setStatus("Add an image file or an image path.", "error");
        return;
      }

      if (selectedFile) {
        if (selectedFile.size > 18 * 1024 * 1024) {
          setStatus("Image file is too large. Keep files below 18MB.", "error");
          return;
        }

        const extension = getFileExtension(selectedFile);
        const name = selectedFile.name.replace(/\.[^.]+$/, "");
        const path = `assets/images/web/admin-${Date.now()}-${slugifyName(name)}.${extension}`;
        const fileBytes = await readFileBytes(selectedFile);
        await writeRepoFile(
          repoContext,
          path,
          toBase64FromBytes(fileBytes),
          `admin: upload ${selectedFile.name}`
        );
        src = path;
      }

      const nextItem = normalizeGalleryItem({
        src,
        alt: altInput.value,
        category: categoryInput.value,
        mood: moodInput.value,
        span: spanInput.value
      });

      if (!nextItem) {
        setStatus("Invalid image data. Please try a different file or path.", "error");
        return;
      }

      const nextItems = [...galleryItems, nextItem];
      await commitGalleryItems(repoContext, nextItems, "admin: add gallery image");

      uploadForm.reset();
      spanInput.value = "36";
      galleryApi.refresh();
      renderAdminList();
      setStatus("Image uploaded and pushed live to GitHub.", "success");
    }).catch((error) => {
      setStatus(error.message, "error");
    });
  });

  replaceInput.addEventListener("change", async () => {
    if (!repoContext) {
      setStatus("Connect GitHub first.", "error");
      return;
    }

    const selectedFile = replaceInput.files?.[0] ?? null;
    if (replaceIndex === null || !selectedFile) {
      return;
    }

    runAdminAction(async () => {
      if (selectedFile.size > 18 * 1024 * 1024) {
        setStatus("Replacement file is too large. Keep files below 18MB.", "error");
        return;
      }

      const nextItems = [...galleryItems];
      const existing = nextItems[replaceIndex];
      if (!existing) {
        return;
      }

      const currentSrc = existing.src;
      const canOverwriteExisting =
        currentSrc.startsWith("assets/") && !currentSrc.startsWith("assets/images/web/admin-");
      const extension = getFileExtension(selectedFile);
      const name = selectedFile.name.replace(/\.[^.]+$/, "");
      const uploadPath = canOverwriteExisting
        ? currentSrc
        : `assets/images/web/admin-${Date.now()}-${slugifyName(name)}.${extension}`;
      const fileBytes = await readFileBytes(selectedFile);

      let existingSha;
      if (canOverwriteExisting) {
        try {
          const existingPayload = await githubApiRequest(uploadPath, repoContext);
          if (typeof existingPayload?.sha === "string") {
            existingSha = existingPayload.sha;
          }
        } catch (error) {
          existingSha = undefined;
        }
      }

      await writeRepoFile(
        repoContext,
        uploadPath,
        toBase64FromBytes(fileBytes),
        `admin: replace image ${uploadPath}`,
        existingSha
      );

      nextItems[replaceIndex] = normalizeGalleryItem({ ...existing, src: uploadPath }) ?? existing;
      await commitGalleryItems(repoContext, nextItems, "admin: update gallery after replace");

      if (
        currentSrc.startsWith("assets/images/web/admin-") &&
        currentSrc !== uploadPath &&
        !nextItems.some((item, itemIndex) => itemIndex !== replaceIndex && item.src === currentSrc)
      ) {
        await deleteRepoFile(repoContext, currentSrc, `admin: remove replaced image file ${currentSrc}`);
      }

      replaceInput.value = "";
      replaceIndex = null;
      galleryApi.refresh();
      renderAdminList();
      setStatus("Image replaced and pushed live to GitHub.", "success");
    }).catch((error) => {
      replaceInput.value = "";
      replaceIndex = null;
      setStatus(error.message, "error");
    });
  });

  refreshButton.addEventListener("click", () => {
    if (!repoContext) {
      setStatus("Connect GitHub first.", "error");
      return;
    }

    runAdminAction(async () => {
      await syncGalleryFromRepo(repoContext);
      setStatus("Gallery refreshed from GitHub.", "success");
    }).catch((error) => {
      setStatus(error.message, "error");
    });
  });

  logoutButton.addEventListener("click", () => {
    setAuthenticated(false);
    repoContext = null;
    workPanel.hidden = true;
    githubPanel.hidden = true;
    loginPanel.hidden = false;
    passwordInput.value = "";
    try {
      window.sessionStorage.removeItem(ADMIN_GITHUB_TOKEN_STORAGE_KEY);
    } catch (error) {
      // Ignore storage failures.
    }
    setStatus("Admin mode locked.");
    passwordInput.focus();
  });

  shell.addEventListener("click", (event) => {
    if ((event.target instanceof HTMLElement) && event.target.dataset.adminClose === "true") {
      closeAdmin();
    }
  });

  closeBtn.addEventListener("click", closeAdmin);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !shell.hidden) {
      closeAdmin();
      return;
    }

    if (shell.hidden && !event.ctrlKey && !event.metaKey && !event.altKey && event.key.length === 1) {
      typedSecret = `${typedSecret}${event.key.toLowerCase()}`.slice(-12);

      if (secretTimeoutId) {
        window.clearTimeout(secretTimeoutId);
      }

      secretTimeoutId = window.setTimeout(() => {
        typedSecret = "";
      }, 1200);

      if (typedSecret.endsWith("admin")) {
        openAdmin();
      }
    }
  });

  if (window.location.hash === "#admin") {
    openAdmin();
  }
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
      const parent = image.closest(".frame-image, .hero-card, .gallery-item, .featured-stage");
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
