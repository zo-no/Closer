#!/bin/sh

set -eu

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "== CURRENT.txt =="
cat "$ROOT_DIR/docs/CURRENT.txt"
echo
echo "== CURRENT.json =="
cat "$ROOT_DIR/docs/CURRENT.json"
