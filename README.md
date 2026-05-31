# Behmen Studio Website Guide

This website is ready to run as a simple static site.

If you want the short version first, start with:

- `HANDOVER-CHECKLIST.md`

You do not need a database, app, or special software to update the wording or swap photos.

For normal photo updates, the easiest workflow is:

1. put full-size photos into `assets/images/originals/`
2. double-click `process-images.command`
3. reopen `index.html` and check the result

## Ownership and publishing options

There are a few sensible ways to take over this website, depending on how much control you want.

### Option A: keep the site on GitHub Pages

This is the simplest option if you want to keep using GitHub as the host.

Best when:

- you want the lowest-maintenance setup
- you are happy to keep the files in GitHub
- you want to connect your own custom domain to GitHub Pages

### Option B: clone or copy the project into your own GitHub account

This is the best option if you want full ownership yourself.

You can do this in either of these ways:

- create your own GitHub repository and upload these files into it
- clone the repository to your computer, then push it to a repository under your own account
- download the project as a ZIP, then upload the files into a new repository

If you want complete control long-term, this is the cleaner option.

### Option C: host the site on Cloudflare Pages instead

This works well if you prefer Cloudflare’s hosting and dashboard.

Because this website is plain HTML, CSS, and JavaScript, it can be hosted there without a build step.

Important:

- if you choose Cloudflare Pages Direct Upload, Cloudflare says you cannot later switch that same project to Git integration
- if you want Git-based deployments later, create a new Cloudflare Pages project for that

## If you want full ownership

If you want the site fully under your own control, the cleanest choices are:

1. create your own GitHub repository and move the site there, or
2. host the files directly on Cloudflare Pages under your own account

Either way, make sure the following are under your control:

- the GitHub repository or Cloudflare Pages project
- the custom domain
- the DNS settings
- the Google Form connected to the contact form
- the Instagram and business details shown on the website

## GitHub Pages setup

If you are using GitHub Pages, the basic setup is:

1. Open the repository on GitHub
2. Open `Settings`
3. Open `Pages`
4. Set the publishing source to the `main` branch
5. Set the folder to `/ (root)`
6. Save

After GitHub finishes publishing, the site should be live on its GitHub Pages URL.

### Custom domain on GitHub Pages

If you want to connect your own domain on GitHub Pages:

1. Open the repository on GitHub
2. Go to `Settings` > `Pages`
3. In `Custom domain`, enter your domain name and save it
4. Then update your DNS records with your domain provider
5. Wait for DNS to update
6. Turn on `Enforce HTTPS` once GitHub allows it

GitHub notes that DNS changes can take up to 24 hours to propagate.

### DNS records for GitHub Pages

If you are using a root domain such as `example.com`, GitHub’s official DNS records are:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

If you are using a `www` subdomain, create a `CNAME` that points to your GitHub Pages account domain, for example:

- `www.example.com` → `YOUR-USERNAME.github.io`

Important:

- for GitHub Pages custom domains, the `CNAME` should point to `YOUR-USERNAME.github.io`
- it should not point to the repository name
- avoid wildcard DNS records like `*.example.com`

GitHub also recommends verifying your custom domain for extra security.

## Cloudflare hosting setup

If you want to host the website on Cloudflare Pages instead of GitHub Pages, this website is simple enough to do that directly.

### Easiest Cloudflare route

1. Keep the project folder on your computer
2. Make sure the website files are ready
3. Log in to Cloudflare
4. Go to `Workers & Pages`
5. Create a new Pages project
6. Choose `Direct Upload`
7. Upload the project files
8. Add your custom domain inside the Cloudflare Pages project

Because this site is static, there is no build step required.

### What to upload to Cloudflare

Upload the website project itself, including:

- `index.html`
- `styles.css`
- `script.js`
- `gallery-data.js`
- `assets/`
- `privacy.html`
- `terms.html`

You do not need the large `originals/` folder for hosting unless you want to keep it in the same project archive for yourself.

### Cloudflare note

Cloudflare’s official Direct Upload documentation says:

- drag-and-drop upload supports a folder or ZIP file
- Direct Upload projects cannot later be switched to Git integration

So if you think you may want automatic Git deployments later, it is worth deciding that before creating the project.

## If you use Cloudflare only for DNS

You do not have to host on Cloudflare just because you use Cloudflare for the domain.

A common setup is:

- website hosted on GitHub Pages
- domain and DNS managed in Cloudflare

That is perfectly valid too.

## Basic changes you can make yourself

You do not need help for normal edits like these:

- changing the main page text
- updating service descriptions
- changing prices
- replacing portfolio photos
- updating hero photos
- updating the About Me text
- changing Instagram, location, or footer wording

The simplest files to edit are:

- `index.html`
- `gallery-data.js`
- `assets/images/web/`
- `assets/images/thumbnails/`

If you want to replace the portfolio in the easiest way, just add new full-size photos into:

- `assets/images/originals/`

Then run:

- `process-images.command`

## Changes that are better with technical help

These are possible, but they are not the easiest “do it yourself” changes:

- redesigning the layout
- changing colors or spacing site-wide
- changing the contact form structure
- replacing the Google Form with a different system
- changing hosting providers after launch
- editing DNS if you are not comfortable with domain settings

## Best handoff advice

If you are taking over the site, the safest order is:

1. make sure the domain is under your control
2. make sure the hosting account is under your control
3. make sure the Google Form belongs to you
4. make a backup of the whole project folder
5. test the site locally by opening `index.html`
6. only then start changing photos, text, or domains

## What this website includes

- Home page with hero section
- Services section
- Portfolio gallery with filters and lightbox
- Contact form connected to Google Forms
- About Me section near the bottom
- Footer with Instagram, legal links, and designer credit

## The main files you may want to edit

- `index.html`
  - Main page text
  - Services text and prices
  - Contact section wording
  - About Me wording
- `gallery-data.js`
  - Auto-generated portfolio image list
- `script.js`
  - Google Form link settings
- `assets/images/web/`
  - Main website images
- `assets/images/thumbnails/`
  - Smaller images used in cards and gallery previews

If you only want to update photos and wording, you usually do not need to edit `styles.css`.

## Easiest way to preview the website

Open `index.html` in your browser.

That is enough for normal checking after text or photo changes.

## Simple update guide

### 1. Change text on the page

Open `index.html` in a text editor.

This is where you can update:

- homepage headline
- service descriptions
- service prices
- contact section text
- About Me text
- footer wording

Tip: use your editor's search feature to find the exact words you want to replace.

### 2. Change the photos

There are three image folders:

- `assets/images/originals/`
  - put your full-size original photos here
  - this is the folder you should use first
- `assets/images/web/`
  - the site creates or uses web-ready images here
- `assets/images/thumbnails/`
  - the site creates or uses smaller gallery images here

### 3. Fastest way to add new portfolio photos

1. Add the original photos to:
   - `assets/images/originals/`
2. Double-click:
   - `process-images.command`
3. Wait for it to finish
4. Open `index.html` and check the portfolio

Important:

- running `process-images.command` refreshes the portfolio gallery from the photos currently inside `assets/images/originals/`
- if you remove photos from that folder and run it again, those removed photos will no longer appear in the portfolio

What this does automatically:

- converts large originals into web-friendly WebP images
- creates smaller thumbnail copies
- refreshes `gallery-data.js`
- updates the main portfolio gallery

Tip:

- if you rename files before importing them, the generated image descriptions will also look cleaner
- example: `gold-coast-branding-01.jpg` is better than `DSC_4837.jpg`

### Optional: use folders to create gallery filter groups

If you put all photos directly inside `assets/images/originals/`, they will simply appear in the portfolio under `All`.

If you want the website to build filter groups automatically, place photos into subfolders such as:

- `assets/images/originals/Soft/`
- `assets/images/originals/Bold/`
- `assets/images/originals/Editorial/`

The folder name becomes the filter label on the website.

### 4. Change the portfolio manually if needed

Normally, you do not need to do this anymore.

If you ever want to edit the portfolio list by hand, open:

- `gallery-data.js`

This file is auto-generated by the image processor, so manual edits can be replaced the next time `process-images.command` is run.

Each photo entry includes:

- `src` = the image file path
- `alt` = short description of the image
- `mood` = the filter it appears under
- `span` = how tall it appears in the gallery layout

### 5. Change the hero and other fixed images

Some images are not controlled by the portfolio list.

These are edited directly in `index.html` or `styles.css`.

Current important image spots:

- Hero background:
  - `assets/images/web/hero-main.webp`
- Three floating hero photos:
  - `assets/images/web/hero-card-01.webp`
  - `assets/images/web/hero-card-02.webp`
  - `assets/images/web/hero-card-03.webp`
- Services section images:
  - directly listed inside `index.html`
- About Me background image at the bottom:
  - search in `styles.css` for:
  - `library-26portfolio-ev-beispiele-64.webp`

### 6. Change the contact form

The contact form on the page already sends submissions into Google Forms.

If you only want to keep using the same Google Form, you do not need to change anything.

If you ever replace the Google Form with a different one:

- open `script.js`
- update:
  - `GOOGLE_FORM_URL`
  - `GOOGLE_FORM_POST_URL`
- the field names in `index.html` may also need to be changed to match the new form

If the Google Form itself is changed a lot, this is the point where it is best to ask for technical help.

## Safe editing checklist

These are safe updates for a non-technical user:

- replace page text in `index.html`
- change service prices in `index.html`
- add new photos into `assets/images/originals/`
- run `process-images.command`
- swap fixed images in `index.html` if needed
- update Instagram or footer wording in `index.html`

These are more technical changes:

- editing `styles.css`
- changing the Google Form field structure
- changing JavaScript logic
- changing legal page structure

## Before replacing photos

Good habits:

- keep a backup copy of the full project folder
- keep your original photos untouched in `assets/images/originals/`
- use clear file names
- avoid giant image files on the live site

## Before publishing changes

Check these:

- the page opens normally
- images load correctly
- text has no spelling mistakes
- the contact form still works
- the portfolio filters still work
- the footer links still work

## Helpful note if you get stuck

If you ask someone else to help later, tell them:

- this is a plain HTML/CSS/JavaScript website
- the contact form posts into Google Forms
- the main content file is `index.html`
- the portfolio gallery is auto-generated into `gallery-data.js`
- the image processor is `process-images.command`

## Official help links

If you need current platform instructions later, these are the most useful official references:

- GitHub Pages custom domains:
  - [GitHub Docs: custom domains for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- GitHub Pages domain verification:
  - [GitHub Docs: verify a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- Cloudflare Pages direct upload:
  - [Cloudflare Docs: Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)
- Cloudflare Pages custom domains:
  - [Cloudflare Docs: custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)

## Credits

- Website design and development: [Zach Mackay](https://alexzander73.github.io/index.html)
- Photography copyright and brand content: Anastasiya Behmenburg
