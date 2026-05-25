# Photo intake — symphonysh.com

How new project photos get from Matt's phone/camera onto the live site.

## Where photos live

All site photos sit under `public/lovable-uploads/`, organized by category:

```
public/lovable-uploads/
├── home-theater/                 — dedicated theaters, media rooms
├── wiring/                       — rack builds, structured cabling, rough-in
├── mounted-tvs/
│   ├── backbox-fp/               — flush backbox fireplace mounts
│   ├── bc-condo-fp/              — Beaver Creek condo fireplace mounts
│   ├── fp-frame/                 — Samsung Frame over fireplace
│   ├── frame-sonos/              — Frame TV + Sonos finished rooms
│   ├── HP/                       — Highland Park multi-room
│   ├── mantel-mount/             — MantelMount pull-down mounts
│   ├── Misc/                     — gallery-only one-offs
│   ├── singletree-fp/            — Singletree fireplace mounts
│   ├── west-vail-bb/             — West Vail residence
│   └── wood-media/               — custom wood media walls
└── symphony-logo-transparent.{png,webp}
```

## Adding new photos — what to send Matt's agent

When you have new shots ready, send them with this info per photo (or per batch
if same project + same room/angle):

1. **The image files** (full-res from camera/phone; the site will downsize as
   needed). Keep EXIF data intact — it tells us the real capture date.
2. **Which project** they belong to. Either:
   - an existing project slug (see list below), or
   - "new project" + 1-2 lines describing it (location, scope, what to feature)
3. **Per photo, a short caption + alt text** describing what the photo
   literally shows. Examples:
   - alt: "Backbox fireplace TV mount flush against stone surround"
   - caption: "Backbox fireplace mount · Eagle County"
4. **(Optional) Which one is the hero shot** for the project card. If you
   don't pick one, the agent picks the strongest.

## Current project slugs

These are the live projects. To add photos to one, reference it by slug:

- `eagle-vail-theater` — Eagle-Vail Home Theater (lead project)
- `backbox-fireplace` — Backbox Fireplace Mount, Eagle County
- `fireplace-frame-tv` — Samsung Frame Over Fireplace
- `beaver-creek-condo` — Beaver Creek Ski Condo
- `mantel-mount-install` — MantelMount Pull-Down, Avon
- `hp-multi-room` — Highland Park Multi-Room
- `frame-sonos-combo` — Frame TV + Sonos, Edwards (**Recent Work card**)
- `wood-media-wall` — Custom Wood Media Wall (**Recent Work card**)
- `singletree-fireplace` — Singletree Fireplace Mount (**Recent Work card**)
- `west-vail-residence` — West Vail Residence
- `cordillera-media-room` — Cordillera Media Room
- `featured-theater-install` — Theater-Style Install
- `misc-installations` — Installation Gallery

The three flagged **Recent Work card** projects are the ones on the homepage
hero. Strong new shots for any of those go straight to the homepage.

## How a new project gets added

If the new photos belong to a **new** project (not in the list above):

1. Pick a slug (kebab-case, short — e.g. `vail-summit-rebuild`).
2. Add an entry to `src/data/projects.ts` with:
   - `slug`, `name`, `location`, `categories`, `scope`, `description`
   - `photos: [...]` array of new photo paths
   - `heroPhoto: "..."` for the project card
   - `systemsInstalled`, `relatedServices`, `testimonial`
3. (Optional) Add a dedicated photo gallery page under
   `src/pages/photos/mounted-tvs/<Slug>.tsx` and route it in `src/App.tsx`.
4. Add `<url>...</url>` entry to `public/sitemap.xml`.

The agent will handle all of these — just send photos + intent.

## Rules — what to never do

- Never invent project details. Caption only what the photo actually shows.
- Never reuse a photo across more than one project (it dilutes proof).
- Never add stock or rendered imagery.
- Always preserve EXIF capture date. The site uses it for "newest first"
  ordering when relevant.

## Retired in May 2026

The following were retired in this cleanup pass:

- `full-home-install` — "Full-Home AV Install" (2022 photos, weakest set)
- `structured-wiring-showcase` — "Structured Wiring" (mostly 2022 photos)
- `/photos/mounted-tvs/home` — the dedicated gallery page for the above

The kept wiring, mantel-mount, west-vail, and misc photo references inside
other projects are intentional and still in service.
