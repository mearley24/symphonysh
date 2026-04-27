# Photo intake — getting more real project photos onto the site

Real install photos are the single highest-impact content we can add. Every
photo you send in lets us swap an abstract background for proof on a page
that's currently underselling the work. This doc explains where photos live,
what the site needs most right now, and the simplest way to get a batch from
your iCloud folder into the repo.

## Where the photos you've already sent live

All current site photos are in `public/lovable-uploads/`, organized into:

```
public/lovable-uploads/
├── home-theater/        # dedicated theaters, media rooms
├── mounted-tvs/
│   ├── backbox-fp/      # backbox / flush fireplace mounts
│   ├── bc-condo-fp/     # Beaver Creek condo
│   ├── fp-frame/        # Samsung Frame over fireplace
│   ├── frame-sonos/     # Frame TV + Sonos combos
│   ├── HP/              # Highland Park multi-room
│   ├── Home/            # 11-display whole-home install
│   ├── mantel-mount/    # MantelMount pull-down brackets
│   ├── Misc/            # general TV mounting gallery
│   ├── singletree-fp/   # Singletree fireplace project
│   ├── west-vail-bb/    # West Vail backbox
│   └── wood-media/      # custom wood media wall
└── wiring/              # rack builds, structured wiring, rough-ins
    └── wire-relocation/ # before/after rework
```

The categorized photos are wired into:

- `src/data/projects.ts` — full projects shown on `/projects` and `/projects/:slug`
- `src/data/projectProof.ts` — curated proof strips that surface real work on
  service and platform pages (`/services/smart-lighting`, `/services/home-integration`,
  `/services/prewire`, `/platforms/control4`, `/platforms/lutron-radiora3`,
  `/platforms/lutron-homeworks`, `/platforms/ava`, `/service-areas`)

If you send new photos and they fit one of those categories, we add them
both to the project gallery **and** to the relevant proof set.

## What the site needs most right now (highest ROI)

We're shipping the curated proof component empty in any category we don't
have real photos for — we deliberately do not fake imagery. These categories
would each unlock new pages or strengthen existing ones:

| Need | Why it matters | Pages it unlocks |
|---|---|---|
| **Control4 keypads in finished rooms** | The single best Control4 sales image. We currently lean on whole-home shots. | `/platforms/control4`, `/services/home-integration`, `/services/smart-lighting` |
| **Lutron keypads (Sunnata, Palladiom)** | Same — Lutron pages are abstract without a real keypad shot. | `/platforms/lutron-radiora3`, `/platforms/lutron-homeworks`, `/services/smart-lighting` |
| **Motorized shades — installed & cassette detail** | `/services/shades` has no real photos at all today. | `/services/shades`, `/services/home-integration` |
| **Networking rack close-ups (Araknis / Pakedge / patch panel)** | We have rack shots; clearer brand/equipment shots strengthen the networking page. | `/services/networking`, `/services/prewire` |
| **Climate / thermostat installs** | `/services/climate-control` is generic today. | `/services/climate-control` |
| **Outdoor speakers / pool & patio audio** | `/services/audio-entertainment` could open up. | `/services/audio-entertainment` |
| **Cameras, alarm panels, smart locks** | `/services/security-systems` has no real photos. | `/services/security-systems` |
| **AVA remote in-hand / on-couch** | `/platforms/ava` leans on theater context for now. | `/platforms/ava` |
| **More Control4 touchscreens / app screens** | Strong "this is the day-to-day UX" proof. | `/platforms/control4`, homepage |

Even one good photo per category is enough to ship a proof strip on that page.

## The simplest way to send a batch

Your master folder lives at:

```
/Users/Matt/Library/Mobile Documents/com~apple~CloudDocs/Symphony SH/Images/Previous Work
```

That path isn't reachable from the sandbox we work in. To get a batch in,
the easiest path:

### Option A — drop a zip in Dropbox

1. In Finder, navigate to the iCloud folder above.
2. Pick the photos you want (or whole subfolders by category).
3. Right-click → **Compress** (creates `Archive.zip`).
4. Drop that zip into your Dropbox **`Symphony SH photo intake`** folder
   (create it if it doesn't exist). Rename the zip to something like
   `2026-04-keypads-and-shades.zip` so we know what's inside.
5. Send a note: "new batch in Dropbox, intake folder."

We can pull it from there and route everything in one pass.

### Option B — share an iCloud link

1. In Photos or Finder, select the photos.
2. **Share → iCloud Link** → copy the link.
3. Send the link.

Works when you don't want to zip — but iCloud links can expire, so don't
rely on this for the master archive.

### Option C — drop a Google Drive / Dropbox link

If the photos are already in another cloud, just send the share link to the
folder. We'll pull from there.

## What to include in the email / message

For each photo or batch, even one sentence helps a lot:

- **Where** the photo was taken (city + room — e.g. "Edwards · primary bedroom")
- **What** is in it (so we can write a real caption — e.g. "Sunnata keypad
  with five labeled scenes")
- **Project context** if it's part of an existing project (e.g. "this is from
  the Eagle-Vail theater build" — so we add it to that project gallery,
  not a new one)
- **Anything to redact** — house numbers, family names, art on the wall
  that's identifiable, license plates in driveway shots, etc.

We do not invent project facts, locations, or quotes — captions only
describe what the photo shows. If you'd prefer a generic location ("Eagle
County" instead of an exact town), say so when you send the batch.

## Naming & format — what we'll do on our end

You don't need to rename anything before sending. We will:

- Resize/optimize each photo (under 400KB where possible).
- Drop them into the right `public/lovable-uploads/<category>/` folder.
- Add them to the appropriate project in `src/data/projects.ts` **or** to a
  new project entry if it's a new install.
- Pick the strongest photo from the batch and add it to the curated proof
  set in `src/data/projectProof.ts` so it surfaces on the relevant
  service/platform page.
- Write alt text that describes what the image shows (for accessibility +
  SEO) and a one-line caption for the proof card.

## Strict rules we follow when adding photos

These keep the site honest and protect against the fabricated-content risk
flagged in `CLAUDE.md`:

1. **No invented project facts.** Captions describe what the photo shows.
   We do not add locations, brands, dollar amounts, or timelines unless
   you've confirmed them.
2. **No stock or rendered imagery.** Every photo on the site must be a
   real Symphony install. The home page already credits this directly
   ("no stock imagery, no rendered mockups").
3. **No fabricated testimonials** to go with photos. If a quote arrives,
   it must come with written consent. See `src/data/testimonials.ts`.
4. **Privacy by default.** We blur or crop license plates, house numbers,
   and identifiable art unless you've cleared the photo for that specific
   detail.

That's it. The faster we get a batch in, the faster the underweighted pages
go from abstract to "this is the work."
