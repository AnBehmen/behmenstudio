from __future__ import annotations

import csv
import json
import re
import sys
import unicodedata
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
ORIGINALS_DIR = ROOT / "assets" / "images" / "originals"
REPLACEMENTS_DIR = ORIGINALS_DIR / "replace-by-number"
WEB_DIR = ROOT / "assets" / "images" / "web"
THUMB_DIR = ROOT / "assets" / "images" / "thumbnails"
GALLERY_DATA_FILE = ROOT / "gallery-data.js"
GALLERY_INDEX_FILE = ROOT / "assets" / "images" / "gallery-index.csv"

WEB_MAX_SIZE = 1600
THUMB_MAX_SIZE = 600
SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp", ".heic", ".heif"}
SLOT_FILENAME_PATTERN = re.compile(r"^(\d{1,4})(?:[^0-9].*)?$")


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    text = re.sub(r"-{2,}", "-", text).strip("-")
    return text or "photo"


def title_from_filename(path: Path) -> str:
    name = path.stem.replace("_", " ").replace("-", " ")
    name = re.sub(r"\s+", " ", name).strip()
    if not name:
        return "Portfolio image"
    return name.title()


def title_from_slot_filename(path: Path) -> str:
    stem = path.stem
    stem = re.sub(r"^\d{1,4}[^a-zA-Z0-9]*", "", stem)
    cleaned = Path(stem if stem else "portfolio-image")
    return title_from_filename(cleaned)


def mood_from_path(path: Path) -> str:
    if len(path.parts) > 1:
        return path.parts[0].replace("_", " ").replace("-", " ").title()
    return "Gallery"


def span_from_size(width: int, height: int) -> int:
    if not width or not height:
        return 36

    ratio = width / height

    if ratio >= 1.28:
        return 28
    if ratio <= 0.82:
        return 45
    return 36


def unique_slug(base_slug: str, used: set[str]) -> str:
    candidate = base_slug
    index = 2
    while candidate in used:
        candidate = f"{base_slug}-{index}"
        index += 1
    used.add(candidate)
    return candidate


def is_within(path: Path, directory: Path) -> bool:
    try:
        path.relative_to(directory)
        return True
    except ValueError:
        return False


def list_supported_images(directory: Path) -> list[Path]:
    if not directory.exists():
        return []

    return sorted(
        [
            path
            for path in directory.rglob("*")
            if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS and not path.name.startswith(".")
        ],
        key=lambda path: str(path).lower(),
    )


def list_regular_originals() -> list[Path]:
    all_images = list_supported_images(ORIGINALS_DIR)
    return [path for path in all_images if not is_within(path, REPLACEMENTS_DIR)]


def list_replacement_images() -> list[Path]:
    return list_supported_images(REPLACEMENTS_DIR)


def export_webp(source: Path, destination: Path, max_size: int) -> tuple[int, int]:
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)
        size_before = image.size
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGB")
        image.thumbnail((max_size, max_size))
        destination.parent.mkdir(parents=True, exist_ok=True)
        image.save(destination, format="WEBP", quality=86, method=6)
        return size_before


def build_gallery_items_from_originals(image_files: list[Path]) -> list[dict[str, object]]:
    if not image_files:
        raise RuntimeError("No supported image files were found in assets/images/originals/")

    gallery_items: list[dict[str, object]] = []
    used_slugs: set[str] = set()

    for source in image_files:
        relative_path = source.relative_to(ORIGINALS_DIR)
        base_slug = slugify("-".join(relative_path.with_suffix("").parts))
        slug = unique_slug(f"library-{base_slug}", used_slugs)

        web_output = WEB_DIR / f"{slug}.webp"
        thumb_output = THUMB_DIR / f"{slug}.webp"

        original_width, original_height = export_webp(source, web_output, WEB_MAX_SIZE)
        export_webp(source, thumb_output, THUMB_MAX_SIZE)

        gallery_items.append(
            {
                "src": f"assets/images/web/{web_output.name}",
                "alt": f"Portfolio image: {title_from_filename(relative_path)}",
                "category": "Portfolio",
                "mood": mood_from_path(relative_path),
                "span": span_from_size(original_width, original_height),
            }
        )

    return gallery_items


def parse_gallery_data_items() -> list[dict[str, object]]:
    if not GALLERY_DATA_FILE.exists():
        raise RuntimeError("gallery-data.js not found. Cannot apply numbered replacements.")

    raw = GALLERY_DATA_FILE.read_text(encoding="utf-8")
    match = re.search(r"window\.SITE_GALLERY_ITEMS\s*=\s*(\[[\s\S]*\]);", raw)
    if not match:
        raise RuntimeError("Could not parse gallery-data.js")

    parsed = json.loads(match.group(1))
    if not isinstance(parsed, list):
        raise RuntimeError("gallery-data.js does not contain a valid list.")

    return [item for item in parsed if isinstance(item, dict)]


def slot_from_filename(path: Path) -> int | None:
    match = SLOT_FILENAME_PATTERN.match(path.stem)
    if not match:
        return None
    return int(match.group(1))


def apply_numbered_replacements(gallery_items: list[dict[str, object]], replacement_files: list[Path]) -> tuple[list[dict[str, object]], int]:
    if not replacement_files:
        return gallery_items, 0

    updated_items: list[dict[str, object]] = [dict(item) for item in gallery_items]
    used_slots: set[int] = set()

    for source in replacement_files:
        slot = slot_from_filename(source)
        if slot is None:
            raise RuntimeError(
                f"Replacement file '{source.name}' must start with a number like 12-new-photo.jpg"
            )

        if slot < 1 or slot > len(updated_items):
            raise RuntimeError(
                f"Replacement file '{source.name}' points to slot {slot}, but gallery has {len(updated_items)} items"
            )

        if slot in used_slots:
            raise RuntimeError(f"More than one replacement file was provided for slot {slot}")

        used_slots.add(slot)
        item = updated_items[slot - 1]

        current_src = str(item.get("src", "")).strip()
        if current_src.startswith("assets/images/web/") and current_src.endswith(".webp"):
            web_name = Path(current_src).name
        else:
            web_name = f"library-slot-{slot:03d}.webp"

        web_output = WEB_DIR / web_name
        thumb_output = THUMB_DIR / web_name

        original_width, original_height = export_webp(source, web_output, WEB_MAX_SIZE)
        export_webp(source, thumb_output, THUMB_MAX_SIZE)

        item["src"] = f"assets/images/web/{web_name}"
        item["alt"] = f"Portfolio image: {title_from_slot_filename(source)}"
        item["span"] = span_from_size(original_width, original_height)

        source.unlink(missing_ok=True)

    return updated_items, len(used_slots)


def write_gallery_data(items: list[dict[str, object]]) -> None:
    payload = json.dumps(items, indent=2)
    content = (
        "// Auto-generated from assets/images/originals/ by scripts/process_images.py\n"
        "// Safe to replace by running process-images.command again.\n"
        f"window.SITE_GALLERY_ITEMS = {payload};\n"
    )
    GALLERY_DATA_FILE.write_text(content, encoding="utf-8")


def write_gallery_index(items: list[dict[str, object]]) -> None:
    GALLERY_INDEX_FILE.parent.mkdir(parents=True, exist_ok=True)
    with GALLERY_INDEX_FILE.open("w", encoding="utf-8", newline="") as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(["slot", "src", "alt", "category", "mood", "span"])
        for slot, item in enumerate(items, start=1):
            writer.writerow(
                [
                    slot,
                    item.get("src", ""),
                    item.get("alt", ""),
                    item.get("category", ""),
                    item.get("mood", ""),
                    item.get("span", ""),
                ]
            )


def main() -> int:
    try:
        regular_originals = list_regular_originals()
        numbered_replacements = list_replacement_images()

        if regular_originals and numbered_replacements:
            raise RuntimeError(
                "Use one mode at a time: either regular originals OR numbered replacements, not both in one run."
            )

        if regular_originals:
            gallery_items = build_gallery_items_from_originals(regular_originals)
            processed_count = len(gallery_items)
            mode_label = "full-rebuild"
        elif numbered_replacements:
            current_items = parse_gallery_data_items()
            gallery_items, processed_count = apply_numbered_replacements(current_items, numbered_replacements)
            mode_label = "numbered-replacements"
        else:
            print(
                "No images found. Nothing to process. "
                "Add files to assets/images/originals/ (full rebuild) or "
                "assets/images/originals/replace-by-number/ (slot replacements)."
            )
            return 0

        write_gallery_data(gallery_items)
        write_gallery_index(gallery_items)
    except Exception as error:
        print(f"Image processing failed: {error}")
        return 1

    print(f"Mode: {mode_label}")
    print(f"Processed {processed_count} image(s).")
    print(f"Web images saved to: {WEB_DIR}")
    print(f"Thumbnail images saved to: {THUMB_DIR}")
    print(f"Gallery data updated: {GALLERY_DATA_FILE}")
    print(f"Gallery index updated: {GALLERY_INDEX_FILE}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
