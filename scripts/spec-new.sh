#!/bin/sh

set -eu

if [ "$#" -lt 3 ]; then
  echo "Usage: $0 <id> <slug> <title>"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ID="$1"
SLUG="$2"
shift 2
TITLE="$*"

REQ_PATH="docs/requirements/${ID}-${SLUG}.md"
DESIGN_PATH="docs/designs/${ID}-${SLUG}.md"
SPEC_PATH="docs/specs/${ID}-${SLUG}-phase-1.md"
DATE="$(date +%F)"

mkdir -p "$ROOT_DIR/docs/requirements" "$ROOT_DIR/docs/designs" "$ROOT_DIR/docs/specs"

sed \
  -e "s|{{TITLE}}|$TITLE|g" \
  "$ROOT_DIR/templates/requirement.md.tmpl" > "$ROOT_DIR/$REQ_PATH"

sed \
  -e "s|{{TITLE}}|$TITLE|g" \
  -e "s|{{REQUIREMENT_PATH}}|$REQ_PATH|g" \
  "$ROOT_DIR/templates/design.md.tmpl" > "$ROOT_DIR/$DESIGN_PATH"

sed \
  -e "s|{{TITLE}}|$TITLE|g" \
  -e "s|{{REQUIREMENT_PATH}}|$REQ_PATH|g" \
  -e "s|{{DESIGN_PATH}}|$DESIGN_PATH|g" \
  "$ROOT_DIR/templates/spec.md.tmpl" > "$ROOT_DIR/$SPEC_PATH"

cat > "$ROOT_DIR/docs/CURRENT.txt" <<EOF
Closer Current Context
======================

Active requirement:
- ${ID}-${SLUG}

Requirement:
- ${REQ_PATH}

Design:
- ${DESIGN_PATH}

Active spec:
- ${SPEC_PATH}

Status:
- requirement, design, and initial spec templates created

Last updated:
- ${DATE}
EOF

cat > "$ROOT_DIR/docs/CURRENT.json" <<EOF
{
  "active_requirement": "${ID}-${SLUG}",
  "requirement_path": "${REQ_PATH}",
  "design_path": "${DESIGN_PATH}",
  "spec_path": "${SPEC_PATH}",
  "status": "requirement, design, and initial spec templates created",
  "updated_at": "${DATE}"
}
EOF

echo "Created:"
echo "$REQ_PATH"
echo "$DESIGN_PATH"
echo "$SPEC_PATH"
echo "Updated docs/CURRENT.txt and docs/CURRENT.json"
