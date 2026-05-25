#!/usr/bin/env python3
"""
One-shot script: retire 'full-home-install' and 'structured-wiring-showcase'
projects and remove orphan pre-2023 photos.

Run from repo root. Idempotent — re-running after a successful run is a no-op.

What it does:
  1. Removes the two project objects from src/data/projects.ts
  2. Removes every projectProof.ts photo entry tied to those slugs
  3. Updates Control4.tsx footer link to point at /projects/eagle-vail-theater
  4. Updates PreWire.tsx footer link to point at /projects/backbox-fireplace
  5. Removes <url> entries from public/sitemap.xml for retired slugs
  6. Removes the dedicated photo gallery page for the Home install
     (src/pages/photos/mounted-tvs/Home.tsx) and its route/import in App.tsx
  7. Deletes the photo files from /public/lovable-uploads/ that no other
     page still references after steps 1–6
"""
from __future__ import annotations
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RETIRED_SLUGS = {"full-home-install", "structured-wiring-showcase"}


def read(p: Path) -> str:
    return p.read_text()


def write(p: Path, s: str) -> None:
    p.write_text(s)
    print(f"  wrote {p.relative_to(ROOT)}")


def remove_project_object(text: str, slug: str) -> str:
    """Remove a { ... slug: "X" ... }, block from a TypeScript array."""
    needle = f'slug: "{slug}"'
    i = text.find(needle)
    if i == -1:
        print(f"    (slug {slug} already absent)")
        return text
    # walk backward to find opening '{'
    start = i
    depth = 0
    while start > 0:
        start -= 1
        c = text[start]
        if c == "}":
            depth += 1
        elif c == "{":
            if depth == 0:
                break
            depth -= 1
    # walk forward to find matching '}'
    end = i
    depth = 1
    while end < len(text) - 1:
        end += 1
        c = text[end]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                break
    # absorb trailing comma + newline whitespace
    after = end + 1
    while after < len(text) and text[after] in ",":
        after += 1
    while after < len(text) and text[after] in " \t":
        after += 1
    if after < len(text) and text[after] == "\n":
        after += 1
    # absorb a single leading newline/indent before start to keep formatting clean
    before = start
    while before > 0 and text[before - 1] in " \t":
        before -= 1
    if before > 0 and text[before - 1] == "\n":
        # keep one newline
        pass
    return text[:before] + text[after:]


def remove_proof_entries(text: str, slugs: set[str]) -> str:
    """Remove ProofPhoto objects whose projectSlug matches any in slugs."""
    out = []
    i = 0
    n = len(text)
    removed = 0
    while i < n:
        # Find next '{' that begins a ProofPhoto block (has 'src:' inside)
        brace = text.find("{", i)
        if brace == -1:
            out.append(text[i:])
            break
        out.append(text[i:brace])
        # walk to matching '}'
        depth = 1
        j = brace
        while j < n - 1:
            j += 1
            c = text[j]
            if c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
                if depth == 0:
                    break
        block = text[brace : j + 1]
        # is this a ProofPhoto-shaped block referencing a retired slug?
        slug_match = re.search(r'projectSlug:\s*"([^"]+)"', block)
        src_match = re.search(r"\bsrc:\s*\"", block)
        if slug_match and src_match and slug_match.group(1) in slugs:
            # skip this whole object (and absorb trailing , + newline/indent)
            after = j + 1
            while after < n and text[after] == ",":
                after += 1
            while after < n and text[after] in " \t":
                after += 1
            if after < n and text[after] == "\n":
                after += 1
            removed += 1
            i = after
            # also pop any trailing whitespace we appended that belonged to this block
        else:
            out.append(block)
            i = j + 1
    print(f"    removed {removed} ProofPhoto entries")
    return "".join(out)


def main() -> int:
    # 1+2: projects.ts and projectProof.ts
    print("[1] Removing retired project objects from projects.ts")
    proj_path = ROOT / "src/data/projects.ts"
    txt = read(proj_path)
    for slug in RETIRED_SLUGS:
        txt = remove_project_object(txt, slug)
    write(proj_path, txt)

    print("[2] Removing ProofPhoto entries for retired slugs in projectProof.ts")
    proof_path = ROOT / "src/data/projectProof.ts"
    txt = read(proof_path)
    txt = remove_proof_entries(txt, RETIRED_SLUGS)
    write(proof_path, txt)

    # 3+4: footer link updates on Control4.tsx and PreWire.tsx
    print("[3] Patching footer link on Control4.tsx")
    c4 = ROOT / "src/pages/services/Control4.tsx"
    s = read(c4)
    s = s.replace(
        '{ to: "/projects/full-home-install", label: "See the full-home install" }',
        '{ to: "/projects/eagle-vail-theater", label: "See a real Vail Valley install" }',
    )
    write(c4, s)

    print("[4] Patching footer link on PreWire.tsx")
    pw = ROOT / "src/pages/services/PreWire.tsx"
    s = read(pw)
    s = s.replace(
        '{ to: "/projects/structured-wiring-showcase", label: "See the structured wiring set" }',
        '{ to: "/projects/backbox-fireplace", label: "See a pre-wire install" }',
    )
    write(pw, s)

    # 5: sitemap
    print("[5] Removing retired routes from sitemap.xml")
    sm = ROOT / "public/sitemap.xml"
    s = read(sm)
    for slug in RETIRED_SLUGS:
        # remove the whole <url>...projects/<slug>...</url> line(s)
        pat = re.compile(
            rf"\s*<url>\s*<loc>https://symphonysh\.com/projects/{re.escape(slug)}</loc>.*?</url>\s*",
            re.S,
        )
        s, n = pat.subn("\n  ", s)
        if n:
            print(f"    removed sitemap entry for {slug}")
    write(sm, s)

    # 6: photo gallery page Home.tsx + its route in App.tsx
    print("[6] Removing /photos/mounted-tvs/home gallery page + route")
    home_page = ROOT / "src/pages/photos/mounted-tvs/Home.tsx"
    if home_page.exists():
        home_page.unlink()
        print(f"    deleted {home_page.relative_to(ROOT)}")
    app = ROOT / "src/App.tsx"
    s = read(app)
    s = re.sub(
        r'^\s*import Home from "\./pages/photos/mounted-tvs/Home";\n',
        "",
        s,
        flags=re.M,
    )
    s = re.sub(
        r'^\s*<Route path="/photos/mounted-tvs/home" element={<Home />} />\n',
        "",
        s,
        flags=re.M,
    )
    write(app, s)
    # Also remove sitemap entry if present
    s = read(sm)
    pat = re.compile(
        r"\s*<url>\s*<loc>https://symphonysh\.com/photos/mounted-tvs/home</loc>.*?</url>\s*",
        re.S,
    )
    s, n = pat.subn("\n  ", s)
    if n:
        write(sm, s)
        print(f"    removed sitemap entry for /photos/mounted-tvs/home")

    # 7: delete photo files that nothing in src/ references anymore
    print("[7] Deleting orphan photo files under /public/lovable-uploads/")
    src_root = ROOT / "src"
    # gather all photo refs from src
    refs: set[str] = set()
    ref_pat = re.compile(r"/lovable-uploads/[^\"'\s<>]+\.(?:jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)")
    for f in src_root.rglob("*"):
        if not f.is_file():
            continue
        if f.suffix.lower() not in (".ts", ".tsx", ".js", ".jsx", ".html", ".md"):
            continue
        try:
            txt = f.read_text()
        except Exception:
            continue
        for m in ref_pat.finditer(txt):
            refs.add(m.group(0))
    # also include public/sitemap.xml just in case
    refs |= set(ref_pat.findall((ROOT / "public/sitemap.xml").read_text()))

    uploads = ROOT / "public/lovable-uploads"
    deleted = 0
    kept_orphans: list[str] = []
    for p in list(uploads.rglob("*")):
        if not p.is_file():
            continue
        if p.suffix.lower() not in (".jpg", ".jpeg", ".png", ".webp"):
            continue
        rel = "/" + str(p.relative_to(ROOT / "public"))
        # Keep brand/logo files even if not directly referenced (safety)
        if "symphony-logo" in p.name:
            continue
        if rel not in refs:
            kept_orphans.append(rel)
    # Of those orphans, only delete ones that have an EXIF year < 2023
    # OR are inside the now-retired folders (mounted-tvs/Home/, wire-relocation/)
    try:
        from PIL import Image  # type: ignore
    except ImportError:
        import subprocess

        subprocess.run([sys.executable, "-m", "pip", "install", "-q", "pillow"], check=True)
        from PIL import Image  # type: ignore

    for rel in kept_orphans:
        abs_p = ROOT / "public" / rel.lstrip("/")
        # decide whether to delete:
        delete_it = False
        # 1) inside retired folder
        if "/mounted-tvs/Home/" in rel or "/wire-relocation/" in rel:
            delete_it = True
        else:
            # 2) EXIF year < 2023
            try:
                with Image.open(abs_p) as im:
                    exif = im.getexif() or {}
                    dt = exif.get(36867) or exif.get(36868) or exif.get(306)
                if dt and int(str(dt)[:4]) < 2023:
                    delete_it = True
            except Exception:
                pass
        if delete_it:
            try:
                abs_p.unlink()
                deleted += 1
                print(f"    deleted {rel}")
            except FileNotFoundError:
                pass
    # Remove empty directories left behind
    for d in sorted([p for p in uploads.rglob("*") if p.is_dir()], reverse=True):
        try:
            d.rmdir()
            print(f"    removed empty dir {d.relative_to(ROOT)}")
        except OSError:
            pass

    print(f"\nDONE. Orphan/retired-folder photos deleted: {deleted}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
