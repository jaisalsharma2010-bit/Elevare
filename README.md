# Elevare

*Rise, block by block.* A focus timer with a study log. Plain HTML, CSS and JavaScript: no framework, no
install step, no account, and no network requests to other services.

## Run it

**Quickest:** open `dist/elevare.html` (or `index.html`) in a modern browser.

**As a local site** (needed for offline support and installing it as an app):

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

To put it online, upload the folder to any static host (GitHub Pages, Netlify,
Cloudflare Pages and so on). No build is required.

## What is in the app

| Area | Features |
|---|---|
| Main screen | Focus, Home and Ambient screens, intention and category, session dots, tasks, ambient sounds, notes, streak, mini player, full screen |
| Dashboard | Total focus time, completed blocks, current and longest streak, active day average, quick log, calendar heatmap, selected day with edit and delete, 14-day trend |
| Background | Brand color fields, or your own images and videos with dim, blur, fit, play and sound controls |
| Clock | 12 or 24 hour, Small / Regular / Huge, flip animation and card colors |
| Focus timer | Pomodoro, Countdown, Flowtime, Task ETA mode, lengths and presets, six styles, auto-start, chime, notifications |
| Quotes | Category filter, show or hide on Focus and Home screens |
| Data | JSON backup and restore, CSV export, sample data, erase |

Keyboard: `Space` start/pause, `R` reset, `F` full screen, `S` settings, `Esc` close.

## How things are counted

- A **block** is one logged session, whether it came from the timer or Quick log.
- A **streak** is consecutive days with at least one session. Today does not break
  it until the day is over.
- The **active day average** divides total focus time by days that have a session.
- A timer session belongs to the day it **started**.
- Focus time is logged when a timer ends or when you choose *Finish and log*.
  Resetting offers to log what had elapsed. Breaks are never logged.
- Sessions under one minute are not logged.
- Add `#tags` in the intention or the notes field to tag a session.

## Your data

Everything is stored in the browser's `localStorage`. It does not sync between
browsers or devices, and clearing site data removes it. Use **Settings > Data >
Export backup** now and then. Opening the app from a different address (a file,
`localhost`, a hosted URL) gives each one its own separate data.

## Custom backgrounds

Open **Settings > Background** and add files, or drop them anywhere on the page.

- Images: JPG, PNG, WebP, GIF, AVIF up to 30 MB. Videos: MP4, WebM, MOV up to
  300 MB, as long as your browser can decode them (MP4 H.264 and WebM are safest).
- Files are stored in the browser (IndexedDB). They are never uploaded and are
  **not** part of the JSON backup.
- Videos loop silently. Turning sound on takes effect after your first click.
  Silent videos pause while the tab is hidden.

Data saved while the app was called stillpoint is picked up automatically when it
is opened from the same address.

## Browser notes

- The always-on-top mini player uses Document Picture-in-Picture (Chrome and Edge).
  Other browsers show a floating card inside the page.
- Sound needs one click on the page first; browsers block it otherwise.
- If the page is closed when a timer ends, it is logged the next time you open it.

## Project layout

```
index.html              Page structure
css/                    base, main screen, timer styles, settings panel
js/config.js            Categories, presets, colors, default settings
js/quotes.js            Quote lists
js/store.js             Saving, validation, import and export
js/media.js             Background image and video storage
js/stats.js             Streaks, averages, calendar and trend maths
js/timer.js             Timer engine
js/audio.js             Chime and ambient sounds
js/ui/                  One file per screen area
assets/                 Fonts (SIL Open Font License) and icons
sw.js, manifest.webmanifest   Offline and install support
tests/                  Logic tests
tools/build_standalone.py     Builds dist/elevare.html
```

## Develop

```bash
npm test                # needs Node 18 or newer
npm run build           # rebuild the single-file version
```

If you add a file under `css/`, `js/` or `assets/`, also add it to the list in
`sw.js`, and to `index.html` where relevant.
