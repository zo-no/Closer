#!/bin/sh

set -eu

if [ "$#" -lt 5 ]; then
  echo "Usage: $0 <active_requirement> <requirement_path> <design_path> <spec_path> <status>"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ACTIVE_REQUIREMENT="$1"
REQUIREMENT_PATH="$2"
DESIGN_PATH="$3"
SPEC_PATH="$4"
shift 4
STATUS="$*"
DATE="$(date +%F)"

cat > "$ROOT_DIR/docs/CURRENT.txt" <<EOF
Closer Current Context
======================

Active requirement:
- ${ACTIVE_REQUIREMENT}

Requirement:
- ${REQUIREMENT_PATH}

Design:
- ${DESIGN_PATH}

Active spec:
- ${SPEC_PATH}

Status:
- ${STATUS}

Last updated:
- ${DATE}
EOF

cat > "$ROOT_DIR/docs/CURRENT.json" <<EOF
{
  "active_requirement": "${ACTIVE_REQUIREMENT}",
  "requirement_path": "${REQUIREMENT_PATH}",
  "design_path": "${DESIGN_PATH}",
  "spec_path": "${SPEC_PATH}",
  "status": "${STATUS}",
  "updated_at": "${DATE}"
}
EOF

echo "Updated docs/CURRENT.txt and docs/CURRENT.json"
