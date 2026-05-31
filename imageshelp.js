document.addEventListener("DOMContentLoaded", () => {
  const slotBySrc = buildSlotMap();
  annotateAllImages(slotBySrc);
  watchGalleryUpdates(slotBySrc);
});

function buildSlotMap() {
  const slotMap = new Map();
  const items = Array.isArray(window.SITE_GALLERY_ITEMS) ? window.SITE_GALLERY_ITEMS : [];

  items.forEach((item, index) => {
    const src = typeof item?.src === "string" ? item.src.trim() : "";
    if (src) {
      slotMap.set(src, index + 1);
    }
  });

  return slotMap;
}

function annotateAllImages(slotBySrc) {
  document.querySelectorAll("img").forEach((img) => {
    addImageLabel(img, slotBySrc);
  });
}

function watchGalleryUpdates(slotBySrc) {
  const galleryGrid = document.getElementById("gallery-grid");
  if (!galleryGrid) {
    return;
  }

  const observer = new MutationObserver(() => {
    galleryGrid.querySelectorAll("img").forEach((img) => {
      addImageLabel(img, slotBySrc);
    });
  });

  observer.observe(galleryGrid, { childList: true, subtree: true });
}

function addImageLabel(image, slotBySrc) {
  if (!(image instanceof HTMLImageElement)) {
    return;
  }

  const src = image.getAttribute("src") || "";
  if (!src) {
    return;
  }

  const container = getLabelContainer(image);
  if (!container || container.querySelector(":scope > .filename-badge")) {
    return;
  }

  if (getComputedStyle(container).position === "static") {
    container.style.position = "relative";
  }

  const badge = document.createElement("div");
  badge.className = "filename-badge";

  const filename = src.split("/").pop() || src;
  const slot = slotBySrc.get(src);
  badge.textContent = slot ? `Slot ${slot} - ${filename}` : filename;
  badge.title = src;

  container.appendChild(badge);
}

function getLabelContainer(image) {
  return (
    image.closest(".gallery-item, .frame-image, .hero-card, .featured-stage, .mood-card, .session-media, .lightbox-frame") ||
    image.parentElement
  );
}
