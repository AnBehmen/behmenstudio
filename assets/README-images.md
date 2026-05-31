# Image Folder Guide

This folder system is set up to keep your original photos safe while also keeping the website fast.

## Easiest workflow

1. Put full-size photos into `assets/images/originals/`
2. Double-click `process-images.command`
3. The site will create the smaller web versions for you
4. The portfolio gallery will refresh automatically

Running the processor again refreshes the portfolio from whatever is currently inside `originals/`.

## Easiest GitHub-website workflow (no local app needed)

If using the GitHub website on an older laptop:

1. Open the repository in GitHub
2. Open `assets/images/originals/`
3. Click `Add file` -> `Upload files`
4. Drag in the new photos and commit
5. Wait for the `Process Gallery Images` action to finish

That action auto-generates:

- `assets/images/web/`
- `assets/images/thumbnails/`
- `gallery-data.js`

and commits them automatically, so the site updates on GitHub Pages.

## Replace one specific image by number (easy mode)

If she wants to replace only one existing gallery image:

1. Open `assets/images/gallery-index.csv`
2. Find the `slot` number of the image to replace
3. Upload a new original photo into `assets/images/originals/inbox/`
4. Start the replacement filename with that slot number:
   - `12-new-photo.jpg`
   - `034-better-version.png`
5. Commit upload in GitHub web UI

What happens automatically:

- the workflow resizes the photo
- replaces that exact slot image on the live site
- updates `gallery-data.js`
- removes the uploaded original from `inbox/` to keep it clean

Important:

- only one mode per run:
  - full rebuild: upload to `assets/images/originals/`
  - slot replace: upload to `assets/images/originals/inbox/`
- do not upload to both locations in the same commit

## What goes where

### `assets/images/originals/`

Put your full-size original photos here.

Use this folder as your safe source folder.

Do not use these large originals directly on the website.

### `assets/images/web/`

Put your website-ready images here.

These are the main files used for:

- hero images
- service images
- gallery images
- About Me background image

### `assets/images/thumbnails/`

Put smaller versions of your photos here.

These are useful for:

- cards
- smaller gallery previews
- lighter page loading

## Recommended export sizes

- large website images: `1600px` wide, WebP
- medium website images: `1000px` wide, WebP
- smaller thumbnails: `600px` wide, WebP

## File naming tips

Use simple names like:

- `business-portrait-01.webp`
- `couple-beach-sunset-02.webp`
- `event-launch-01.webp`

Avoid:

- very long names
- random camera names like `IMG_4837`
- spaces if possible

Cleaner names also create cleaner auto-generated image descriptions on the website.

## Where the website reads images from

The website gets images from two places:

- `index.html`
  - for fixed page images like hero cards and service photos
- `gallery-data.js`
  - for the auto-generated portfolio gallery list

## Optional: create filter groups automatically

If you place all original photos directly into `assets/images/originals/`, they will simply appear in the main portfolio.

If you want gallery filters to appear automatically, create subfolders such as:

- `assets/images/originals/Soft/`
- `assets/images/originals/Bold/`
- `assets/images/originals/Editorial/`

The folder name becomes the gallery filter label.

## Good habit

Whenever you add new website images:

1. keep the originals in `originals/`
2. run `process-images.command`
3. check the website in your browser
4. only edit `index.html` if you want to change fixed images outside the portfolio
