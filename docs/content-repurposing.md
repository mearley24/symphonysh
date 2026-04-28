# Content repurposing — turning each project photo into traffic

Goal: every strong project photo should pull double or triple duty. Once it's
in the repo it should also become a Google Business Profile post, an
Instagram caption, a paragraph inside a resource guide, and a proof strip on
a service page. None of that requires new shoots — just a short, repeatable
playbook per project.

This is an internal doc. Keep it practical, keep it short.

## The ROI ladder

For each project on `/projects`, work top-down. Stop where ROI drops off.

1. **Project page** — already exists at `/projects/<slug>`. Make sure
   meta title/description, alt text, and the related-services block are
   accurate.
2. **Service / platform page proof strip** — does the project show up in
   the right `proofSets` in `src/data/projectProof.ts`? If a Control4 + media
   room project is missing from the AVA or Control4 page proof, add it.
3. **Google Business Profile post** — one photo, one caption, one CTA.
   See template below.
4. **Instagram caption** — 2–3 sentences, low jargon, link in bio to the
   project page.
5. **Resource guide reference** — does any guide in `src/data/resourceGuides.ts`
   benefit from linking this project as proof? E.g. the pre-wire guide should
   link to backbox + structured-wiring projects.
6. **City / service-area page** — if the project is in a named city, the
   city page should reference it (or link `/projects?location=<slug>`).

## Per-project worksheet (5 minutes)

For each project on `/projects`, fill in these six lines once and reuse:

```
Slug:               eagle-vail-theater
Headline angle:     "One-button cinema in an Eagle-Vail basement"
Best photo:         /lovable-uploads/home-theater/IMG_0979.JPG
Service tags:       AVA, Control4, Smart Lighting, Home Integration
Location tag:       Eagle-Vail / Vail Valley
Why it sells:       Acoustic treatment + projection + Control4 = "the room
                    just works on Play."
```

Once that's filled in, the channel-specific copy below writes itself.

## Templates

### Google Business Profile post (≤1500 chars, one photo, one CTA)

```
{Headline angle in plain English — what the homeowner experiences.}

{One sentence on the work: where, what got installed, and why it matters.}

{One sentence on a recurring pain it solves — e.g., "the universal remote
your guests can't figure out", "TVs that lose Wi-Fi every storm", "lights
that never quite match the movie".}

See the full project: symphonysh.com/projects/{slug}
Or schedule a walkthrough: symphonysh.com/walkthrough
```

Cadence: one GBP post per week is plenty. Local SEO benefits from steady
posting, not volume.

### Instagram caption (2–3 sentences, no hashtags soup)

```
{Headline angle, conversational}. {What you actually see in the photo.}
{Light "why it matters" line — older clients, vacation homes, guests, etc.}

Full project on the site (link in bio).

#vailvalley #smarthome #{primary-tag}
```

Use 3–5 hashtags max. The first two are always `#vailvalley` and
`#smarthome`; the third should be the strongest project tag (e.g.
`#hometheater`, `#prewire`, `#control4`, `#tvmounting`, `#frametv`).

### Resource guide proof block

When a guide in `/resources` covers a topic this project demonstrates, drop
in one paragraph and a link to the project page. Example for the pre-wire
guide:

> "Doing this right means setting backboxes before drywall — see
> [Backbox Fireplace Mount](/projects/backbox-fireplace) for what that looks
> like in the wall before stone goes up."

The link is the whole point. Internal links to `/projects/<slug>` from
guides are the cheapest authority signal we can give those pages.

### Service page proof strip

Already automated through `ProjectProof` + `src/data/projectProof.ts`. When
adding a new project, decide which proof set(s) it belongs in:

- `home-theater` — dedicated theaters and media rooms.
- `tv-mounting` — clean fireplace and wall mounts, Frame TV work.
- `wiring` — rack builds, structured cabling, pre-wire rough-ins.
- `whole-home` — multi-room installs, centralized racks feeding the house.

If a project genuinely fits two sets, list it in both. If you can't pick
one without stretching, the photo probably isn't the best proof — leave it
on the project page only.

## Tagging rules (so nothing drifts)

Keep this consistent across copy and metadata:

- **Whole-home / control:** Control4 is the default. Lutron HomeWorks /
  RadioRA3 is fit-based — only call it out when the photo or scope actually
  shows Lutron keypads.
- **Lighting:** Smart Lighting is Control4-led. Don't call it "Lutron" in
  general posts unless the project really used Lutron.
- **Media / theater:** AVA is the default story for single-room media and
  theater rooms. Whole-home AV (multiple zones) routes to Home Integration.
- **Pre-wire / rack / networking:** these belong together in copy. Pre-wire
  is the "before drywall" angle, Rack & Networking is the "behind the scenes
  reliability" angle. Most structured-wiring photos can support either.

## Voice

Older clients, mountain homeowners, and builders read this site. Keep it:

- Concrete (rooms, materials, what you see), not abstract ("seamless
  ecosystem").
- Short sentences. No jargon a builder wouldn't say on a job site.
- No invented numbers, dates, dollar amounts, addresses, or testimonials.
  If a fact isn't in the project entry or in a real photo, it doesn't exist.

## When in doubt

If a photo wouldn't make a good GBP post on its own, don't force the rest
of the ladder. Move on to the next project — the goal is steady, real
output, not coverage for its own sake.
