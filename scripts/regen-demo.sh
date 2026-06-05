#!/usr/bin/env bash
# regen-demo.sh — regenerate the whole-home demo assets from a Symphony markup.
#
# Runs the AI-Server tool (agents/symphony_demo/build_demo.py) and drops both
# artifacts into place: base.jpg into public/, layout.ts into src/data/.
#
# Usage:
#   scripts/regen-demo.sh <path-to.symphony> [--page auto] [--max-width 1500]
#
# Then review the demo (npm run dev), and commit if it looks right.

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "usage: scripts/regen-demo.sh <path-to.symphony> [extra build_demo args...]" >&2
  exit 1
fi

MARKUP="$1"; shift
AI_SERVER="${AI_SERVER_DIR:-$HOME/AI-Server}"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BP_DIR="$REPO_ROOT/public/lovable-uploads/home-integration/blueprint"
DATA_FILE="$REPO_ROOT/src/data/wholeHomeLayout.ts"

if [[ ! -f "$MARKUP" ]]; then
  echo "error: markup not found: $MARKUP" >&2
  exit 1
fi
if [[ ! -d "$AI_SERVER/agents/symphony_demo" ]]; then
  echo "error: symphony_demo tool not found at $AI_SERVER (set AI_SERVER_DIR)" >&2
  exit 1
fi

echo "→ generating assets into $BP_DIR"
( cd "$AI_SERVER" && python3 -m agents.symphony_demo.build_demo "$MARKUP" --out "$BP_DIR" --ts -v "$@" )

# wire layout.ts into the component's data path; drop the stray json
mv -f "$BP_DIR/layout.ts" "$DATA_FILE"
rm -f "$BP_DIR/layout.json"

echo "✓ wrote $BP_DIR/base.jpg"
echo "✓ wrote $DATA_FILE"
echo
echo "Next: npm run build && npm run dev  (review /services/home-integration), then commit."
