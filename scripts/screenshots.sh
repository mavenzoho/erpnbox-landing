#!/bin/bash
# ─── ERPnBox Documentation Screenshot Generator ─────────────────────────────
#
# Usage:
#   ./scripts/screenshots.sh [password]
#
# Prerequisites:
#   npm install -D playwright tsx
#   npx playwright install chromium
#
# Environment:
#   ERPNBOX_URL  - App URL (default: http://localhost:3000)
#   ERPNBOX_EMAIL - Login email (default: tarek@zocube.com)
#

set -e

if [ -z "$1" ] && [ -z "$ERPNBOX_PASS" ]; then
  echo "Usage: ./scripts/screenshots.sh <password>"
  echo "   or: ERPNBOX_PASS=xxx ./scripts/screenshots.sh"
  exit 1
fi

export ERPNBOX_PASS="${1:-$ERPNBOX_PASS}"
export ERPNBOX_URL="${ERPNBOX_URL:-http://localhost:3000}"
export ERPNBOX_EMAIL="${ERPNBOX_EMAIL:-tarek@zocube.com}"

echo "📸 Taking screenshots..."
echo "   URL: $ERPNBOX_URL"
echo "   Email: $ERPNBOX_EMAIL"
echo ""

# Install deps if needed
if ! npx playwright --version > /dev/null 2>&1; then
  echo "Installing Playwright..."
  npm install -D playwright
  npx playwright install chromium
fi

# Run the screenshot script
npx tsx scripts/take-screenshots.ts

echo ""
echo "✅ Screenshots saved to public/docs/screenshots/"
echo "   Run 'npm run build' to include in the build"
