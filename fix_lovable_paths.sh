#!/bin/zsh
set -euo pipefail

echo "Collecting files with lovable-uploads paths..."
grep -rl 'lovable-uploads/' src/ > /tmp/symphonysh_image_files.txt || {
  echo "No files found with lovable-uploads/ paths."
  exit 0
}

echo "Fixing paths in files listed in /tmp/symphonysh_image_files.txt ..."
while IFS= read -r file; do
  [ -f "$file" ] || continue
  sed -i '' \
    -e 's|lovable-uploads/home theater/|lovable-uploads/home-theater/|g' \
    -e 's|lovable-uploads/mounted tvs/BC Condo FP/|lovable-uploads/mounted-tvs/bc-condo-fp/|g' \
    -e 's|lovable-uploads/mounted tvs/Backbox FP/|lovable-uploads/mounted-tvs/backbox-fp/|g' \
    -e 's|lovable-uploads/mounted tvs/FP Frame/|lovable-uploads/mounted-tvs/fp-frame/|g' \
    -e 's|lovable-uploads/mounted tvs/Frame Sonos/|lovable-uploads/mounted-tvs/frame-sonos/|g' \
    -e 's|lovable-uploads/mounted tvs/Mantel Mount/|lovable-uploads/mounted-tvs/mantel-mount/|g' \
    -e 's|lovable-uploads/mounted tvs/Singletree FP/|lovable-uploads/mounted-tvs/singletree-fp/|g' \
    -e 's|lovable-uploads/mounted tvs/West Vail BB/|lovable-uploads/mounted-tvs/west-vail-bb/|g' \
    -e 's|lovable-uploads/mounted tvs/Wood Media/|lovable-uploads/mounted-tvs/wood-media/|g' \
    "$file"
done < /tmp/symphonysh_image_files.txt

echo "Running quick checks..."
rg 'lovable-uploads/home theater/' src/ || echo "home theater path fixed"
rg 'lovable-uploads/mounted tvs/' src/ || echo "mounted tvs paths fixed"

echo "Done."
