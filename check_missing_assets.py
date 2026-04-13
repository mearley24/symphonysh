from pathlib import Path
import re

root = Path('.')
public = root / 'public'
pattern = re.compile(r'/lovable-uploads/[^)"\'\s]+')

refs = set()

for base in [root / 'src', root / 'public']:
    if not base.exists():
        continue
    for path in base.rglob('*'):
        if path.is_file():
            try:
                text = path.read_text(errors='ignore')
            except Exception:
                continue
            refs.update(pattern.findall(text))

missing = []
for ref in sorted(refs):
    target = public / ref.lstrip('/')
    if not target.is_file():
        missing.append(ref)

print(f"TOTAL_REFERENCES {len(refs)}")
print(f"MISSING_COUNT {len(missing)}")
print("MISSING_SAMPLE_START")
for item in missing[:100]:
    print(item)
print("MISSING_SAMPLE_END")

groups = {}
for item in missing:
    parts = item.strip('/').split('/')
    key = '/' + '/'.join(parts[:3]) if len(parts) >= 3 else item
    groups[key] = groups.get(key, 0) + 1

print("TOP_GROUPS_START")
for key, count in sorted(groups.items(), key=lambda x: (-x[1], x[0]))[:20]:
    print(f"{count} {key}")
print("TOP_GROUPS_END")
