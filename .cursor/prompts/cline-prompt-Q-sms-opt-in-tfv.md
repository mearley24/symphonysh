# Cline Task Q — SMS Opt-In + TFV Compliance for symphonysh.com

**Goal:** Make the website compliant with Twilio Toll-Free Verification (TFV) so that a TFV reviewer who loads `/contact`, `/privacy`, and `/terms` will see explicit, branded SMS opt-in collection and SMS-specific privacy/terms language. Sister artifact: `mearley24/AI-Server` → `voice_receptionist/TFV_FORM_VALUES.md`.

**Repo:** `mearley24/symphonysh` (Vite + React + Tailwind + Supabase Edge Functions)
**Branch:** `feature/sms-opt-in-tfv`
**Mode:** Cline-first. No interactive editors. No long terminal pastes.

---

## Why

Twilio TFV is currently blocked. A reviewer would load the URLs we want to submit and see:
- `/contact` form has only Name / Email / Message — no Phone field, no SMS consent checkbox.
- `/privacy` has no SMS / text messaging section.
- `/terms` has no SMS communications clause.

Submitting now = rejection (1–3 week turnaround on the rejection notice). This task closes those gaps.

## Constraints (hard)

- Do **not** make the SMS checkbox required to submit the contact form. Submission must succeed with the box unchecked; only the `sms_consent` flag changes.
- Checkbox must be **unchecked** by default.
- Consent copy must include the brand name "Symphony Smart Homes" and the phrases: "Msg & data rates may apply", "Msg frequency varies", "Reply HELP for help", "STOP to cancel". Do not abbreviate or paraphrase these — TFV reviewers grep for them.
- SMS consent must be its own checkbox, **not** bundled with newsletter/marketing consent.
- Phone field is optional, but if the SMS checkbox is checked, the Phone field becomes required at submit time (client-side validation only — server still accepts).
- Privacy section must explicitly state: "Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes" (CTIA-required wording — TFV reviewers look for this exact phrase).
- Do not modify unrelated routes, components, or copy.
- No secrets in commits. No Twilio Account SID / Auth Token / API keys in source. Supabase function additions read existing env vars only.

## Files to change

1. `src/pages/Contact.tsx`
   - Add `phone` and `smsConsent` to component state.
   - Add a Phone input (type="tel", placeholder e.g. "(970) 555-0123") below Email. Optional unless `smsConsent === true`.
   - Add an unchecked checkbox below the Message field with the exact consent copy in **Appendix A**. The Privacy Policy and Terms references must be `<Link>` components to `/privacy` and `/terms`.
   - On submit: if `smsConsent && !phone` → show toast error "Phone number required for SMS consent" and abort.
   - Include `phone` and `sms_consent` in the JSON body POSTed to the existing `send-contact-email` Supabase function.
   - Reset `phone` and `smsConsent` on successful submit.
   - Preserve existing toast copy, SEO block, layout, and styling. Use existing Tailwind utility classes / shadcn components for consistency.

2. `src/pages/Privacy.tsx`
   - Insert a new section **after the existing "INFORMATION WE COLLECT" section** titled **"SMS / TEXT MESSAGING"**. Use the section number that fits the existing numbering (renumber subsequent sections accordingly).
   - Body text: see **Appendix B**. Must include the CTIA-required no-sharing sentence verbatim.
   - Update the "Last updated" date to today.

3. `src/pages/Terms.tsx`
   - Insert a new section **after the existing "USE OF SERVICES" section** titled **"SMS COMMUNICATIONS"**. Renumber subsequent sections.
   - Body text: see **Appendix C**.
   - Update the "Last updated" date to today.

4. `supabase/functions/send-contact-email/index.ts` (path may differ — locate via `grep -r "send-contact-email" supabase/`)
   - Accept new optional fields `phone` and `sms_consent` in the request body.
   - If a Supabase table stores contact submissions, persist both fields. If only an email is sent, append "Phone: …" and "SMS consent: yes/no" lines to the email body.
   - Do not break existing callers that omit the new fields.

5. (If a `contact_submissions` table exists in `supabase/migrations/`) Add a migration that adds columns `phone text` and `sms_consent boolean default false`. If no such table exists, skip migration work — note this in the task summary.

## Verification (do this in the same task before declaring done)

- [ ] `bun install && bun run build` completes with no new errors / warnings introduced by this change.
- [ ] `bun run dev`, navigate to `/contact`: Phone field renders, SMS checkbox renders unchecked, submitting with checkbox unchecked still works, submitting with box checked but no phone shows an error, submitting with box checked + phone succeeds.
- [ ] `/privacy` and `/terms` rendered pages contain the new sections and the phrase "Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes" appears verbatim on `/privacy`.
- [ ] Save three full-page screenshots to `docs/tfv-evidence/2026-04-30/` (or current date): `contact.png`, `privacy.png`, `terms.png`. Use Playwright headless or `npx @playwright/test` if available; otherwise document the manual steps in `SITE_STATUS.md`.
- [ ] Update `SITE_STATUS.md` with a "TFV opt-in compliance" entry: what changed, screenshot paths, deploy commit hash, deploy URL.
- [ ] Commit on branch `feature/sms-opt-in-tfv`. Do not merge to `main` automatically — open a PR and wait for human review.
- [ ] Final task summary must include: PR URL, commit hash, screenshot paths, and a one-line confirmation that the three TFV consent phrases are present on `/contact`.

## Out of scope

- Two-factor / OTP flows.
- Any change to `/sms-opt-in`, `/opt-in`, or `/sms` routes (they remain 404; the TFV evidence URL is `/contact`).
- Marketing / newsletter consent (a separate use case requiring a separate opt-in).
- Any change to the Twilio account, phone number, or `voice_receptionist/` code in `mearley24/AI-Server` — that's tracked separately in `voice_receptionist/TFV_FORM_VALUES.md`.

---

## Appendix A — exact consent checkbox copy

The label next to the unchecked checkbox must read:

> I agree to receive service and appointment text messages from **Symphony Smart Homes** at the number provided. Msg & data rates may apply. Msg frequency varies. Reply HELP for help, STOP to cancel. See our Privacy Policy and Terms.

"Privacy Policy" links to `/privacy`. "Terms" links to `/terms`. "Symphony Smart Homes" should be bold (`<strong>` or font-semibold). The full sentence must be visible without expanding/hovering.

## Appendix B — Privacy Policy section body (insert verbatim)

```
SMS / TEXT MESSAGING

When you opt in to receive text messages from Symphony Smart Homes by checking
the SMS consent box on our contact form, we collect and use your mobile phone
number solely to send service-related text messages, including appointment
confirmations, service-visit reminders, callbacks and follow-ups from our AI
phone receptionist, and account/service notifications.

Mobile information will not be shared with third parties or affiliates for
marketing or promotional purposes. Information sharing with subcontractors in
support services, such as customer service, is permitted. All other use case
categories exclude text messaging originator opt-in data and consent; this
information will not be shared with any third parties.

Message frequency varies based on your service activity. Message and data
rates may apply. You can opt out at any time by replying STOP to any message,
and you can request help by replying HELP. Opting out of SMS will not affect
your ability to receive other communications from us (such as email). To
delete your phone number from our SMS records, contact us at
info@symphonysh.com.
```

## Appendix C — Terms of Service section body (insert verbatim)

```
SMS COMMUNICATIONS

By providing your mobile phone number and checking the SMS consent box on
our contact form, you agree to receive service-related text messages from
Symphony Smart Homes, including appointment confirmations and reminders,
callbacks from our AI phone receptionist, and account or service
notifications.

Message and data rates may apply. Message frequency varies. You may opt out
at any time by replying STOP to any message. Reply HELP to any message for
support. We will not send promotional or marketing text messages on this
channel without obtaining separate, explicit consent. Carriers are not
liable for delayed or undelivered messages.
```

## Appendix D — Cline kickoff (paste this into Cline)

```
Read .cursor/prompts/cline-prompt-Q-sms-opt-in-tfv.md and execute it end to
end. Do not skip the verification checklist. Open a PR — do not merge.
```
