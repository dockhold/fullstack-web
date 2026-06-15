#!/bin/sh
set -e

# Inject the runtime API URL the app reads from window.__APP_CONFIG__.
# API_URL comes from the Dockhold dashboard (Variables) — set it and restart,
# no rebuild needed. Overwrites the placeholder baked in at build time.
printf 'window.__APP_CONFIG__ = { API_URL: "%s" };\n' "${API_URL:-}" > /app/dist/config.js

exec serve -s dist -l "$PORT"
