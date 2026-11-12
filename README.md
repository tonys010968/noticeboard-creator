# Noticeboard Creator — Starfall Works

A free, browser-only medieval noticeboard creator for tabletop roleplaying campaigns. Create and arrange parchment notices on a wooden board, export PNG/JPEG for VTTs or print, and save projects as JSON.

## Run locally

Open `index.html` in a modern browser. No installation, build or API keys are required.

## Deploy with Cloudflare Pages

1. Connect GitHub repository `tonys010968/noticeboard-creator` to a new Cloudflare Pages project.
2. Framework preset: **None**. Build command: leave blank. Build output directory: `/`.
3. Deploy the `main` branch and verify the generated `*.pages.dev` URL.
4. Under **Custom domains**, add `noticeboardcreator.starfallworks.com`.
5. Future pushes to `main` trigger automatic deployments.

## Version 1.2\n\nNew: upload a photographic wood image (JPG, PNG or WebP) from your computer and choose a lettering style per notice: handwritten quill, formal proclamation or rustic print. The uploaded wood is used in canvas preview and exports without sending the file to a server. Wood image selection is session-only and is not embedded in saved JSON; reselect it when reopening a project. Lettering uses Google Fonts when available with local fallback fonts.\n\n## Version 1.1\n\nThe wooden board now uses deterministic layered timber rendering with fine grain, plank seams, knots, scratches, aging and subtle vignette shading. It works offline without image downloads. Environment placement (tavern, guild hall, town square) remains planned for a later release.\n\n## Features

- Weathered oak, walnut and ancient timber styles
- Multiple editable notices with type, title, text and footer
- Automatic arrangement and drag positioning
- Landscape, square and portrait board formats
- PNG/JPEG export at screen, high and print resolutions
- Browser print support
- JSON save and restore
- No tracking, uploads, backend or paid services

## License

MIT. See LICENSE.
