# Cline Prompt S2 — Strip Lovable Tagger & Clean Stale Config

## Context
symphonysh is a React + Vite + shadcn/ui site (repo: `mearley24/symphonysh`). Deployed via Cloudflare Pages (not GitHub Pages). The `lovable-tagger` dev dependency is unused dead weight — it causes 4 moderate Dependabot vulnerabilities (esbuild/vite chain) and references a platform we no longer use.

## Scope — ONLY touch what is listed below. No other changes.

---

## 1. Remove lovable-tagger from package.json

In `package.json`, remove `"lovable-tagger": "^1.1.3"` from `devDependencies`.

Then run:
```zsh
rm -rf node_modules package-lock.json
npm install
```

This regenerates a clean lockfile without the lovable-tagger dependency tree.

## 2. Clean vite.config.ts

Replace the entire `vite.config.ts` with:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Changes:
- Removed `import { componentTagger } from "lovable-tagger"`
- Removed `componentTagger()` from plugins array
- Removed the `mode` parameter from the factory function (no longer needed)
- Hardcoded `base: "/"` — the old `GITHUB_REPOSITORY` logic was for GitHub Pages which we no longer use (Cloudflare Pages always serves from root)

## 3. Remove lovable.dev hostname checks

Three files check `hostname.includes('lovable.dev')` for dev-mode photo sorting. Remove those checks entirely — we are not on Lovable anymore.

**`src/pages/photos/Wiring.tsx`** — find the block that sets `isDev` using `lovable.dev` and remove or simplify it. If `isDev` is only used to gate dev-only photo sorting UI, remove that entire conditional. If `isDev` gates other localhost dev functionality, keep localhost checks but remove the `lovable.dev` part.

**`src/pages/photos/MountedTVs.tsx`** — same treatment.

**`src/pages/photos/HomeTheater.tsx`** — same treatment.

## 4. Fix Lovable reference in supabase.ts

In `src/lib/supabase.ts`, change the error message from:
```
Missing Supabase environment variables. Please make sure you are connected to Supabase in your Lovable project settings.
```
to:
```
Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.
```

## 5. Verify build

After all changes:
```zsh
npm run build
```

The build MUST succeed with zero errors. If it fails, fix the issue before committing.

## 6. Commit and push

```zsh
git add -A
git commit -m "chore: strip lovable-tagger, clean stale config"
git push origin main
```

## DO NOT:
- Rename the `public/lovable-uploads/` directory or change any image paths — the folder name is harmless and renaming would require updating 200+ path references across the codebase
- Add any new dependencies
- Change any styles, components, or page content
- Touch any files not mentioned above
