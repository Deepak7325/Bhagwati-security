# Aegis Security — professional React website

A complete redesigned frontend in React + Vite, with navy/amber styling, bundled guard imagery, responsive navigation, service filters, dedicated service detail pages, parallax, and reduced-motion support.

## Quick start

Use Node.js 22 LTS or newer. Open a terminal in this folder:

```sh
npm ci --include=dev --include=optional
npm run dev
```

Open the local URL printed in the terminal. Do not open index.html directly.

## Production

```sh
npm run build
npm run preview
```

Deploy `dist/` to a static hosting service. Because this project uses BrowserRouter, configure the host to serve `/index.html` for unknown paths. Netlify's `_redirects` and Vercel's `vercel.json` are included. Deploy at the domain root; for a subdirectory, configure both Vite `base` and BrowserRouter `basename`.

## Folder structure

```text
src/
  App.jsx                  All route definitions
  main.jsx                 React entry point
  styles.css               Design tokens, layouts, responsive breakpoints
  pages/
    Home.jsx               Landing page
    Services.jsx           Filterable service listing
    ServiceDetails.jsx     Reusable page for each service
    About.jsx              Company approach and values
    NotFound.jsx           Friendly 404
  components/
    Layout.jsx             Shared header, navigation, footer
    Button.jsx             Shared calls to action
    Icon.jsx               Local SVG icons
    ServiceCard.jsx        Reusable service card
    SharedSections.jsx     CTA, process, FAQ
  data/
    services.js            Service copy, images, features, URL slugs
  hooks/
    useMotion.js           Parallax/reveal hook with lifecycle cleanup
  assets/
    guard-hero.webp
    residential.webp
    factory.webp
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/services` | Services with filters |
| `/services/housing` | Housing guards |
| `/services/factory` | Factory guards |
| `/services/commercial` | Commercial & event security |
| `/about` | Why Aegis |
| Other paths | 404 |

## Customize

- Add or edit service information in `src/data/services.js`.
- Add pages in `src/pages/` and register routes in `src/App.jsx`.
- Change colors and fonts in the `:root` section of `src/styles.css`.
- Edit the shared header/footer in `src/components/Layout.jsx`.
- All **Hire your guard** links intentionally use `href="#"`, as requested. Replace them in `Button.jsx`, `ServiceCard.jsx`, and `Layout.jsx` when your booking destination is ready.
- Fonts load through Google Fonts with system fallbacks. All guard images are bundled; no external image service is needed.
- Responsive breakpoints: 1100, 800, 600, and 360 pixels. Motion respects the operating system's reduced-motion preference.

## Assets and scope

This is a frontend template with a fictional company and sample copy. Guard images are AI-generated commercial-style illustrations of fictional people, not employee photographs. No booking or contact backend is connected. Replace sample branding and confirm actual services before publishing.

The images were created with the built-in image-generation tool. Prompt summaries: a navy-uniformed guard at a glass building entrance at blue hour; a residential guard using a tablet at an upscale apartment entrance; and a two-person security patrol at a modern industrial facility. Exact prompt text is in `ASSET-PROMPTS.md`.

Original template code and artwork may be used and modified for personal or commercial projects. Dependencies and Google Fonts retain their respective licenses.

## Windows installation repair

This corrected package has a clean cross-platform lockfile, without linked Linux-only dependencies. React Router is pinned to 7.18.4 to address the reported dependency advisories.

Extract into a new folder, open PowerShell in the folder containing package.json, and run:

```powershell
npm ci --include=dev --include=optional
npm run dev
```

Use Node.js 22 LTS or newer. Keep the included package-lock.json. No global Vite installation is required. The include flags ensure the development server and platform-specific optional binaries are installed.

Validation: clean local dependency installation and production build; Windows x64 dependency selection checked using npm's OS/CPU options with install scripts disabled. This is not a native Windows runtime test.
