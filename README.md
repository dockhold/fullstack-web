# Full-stack example — web

The React frontend half of the Dockhold full-stack example. It's a Vite SPA that
calls a separate [Express + Postgres API](https://github.com/dockhold/fullstack-api).
Running the frontend and API as **two separate apps** (each its own URL) is the
real shape of a production app — and a **Pro** plan feature, since it needs more
than one app.

[![Deploy on Dockhold](https://dockhold.eu/button.svg)](https://app.dockhold.eu/new?repo=https://github.com/dockhold/fullstack-web&name=fullstack-web&ref=button)

## Deploy it

This is **app 2 of 2** — deploy the
[API](https://github.com/dockhold/fullstack-api) first so you have its URL.

1. Click **Use this template** (or fork this repo).
2. [Deploy it](https://app.dockhold.eu/new?repo=https://github.com/dockhold/fullstack-web).
   It builds from the [`Dockerfile`](Dockerfile) and goes live at its own URL.
3. In the dashboard, set the `API_URL` variable to your deployed API's URL, then
   **restart** the app. That's it — no rebuild.
4. Back on the **API** app, set `ALLOWED_ORIGIN` to *this* app's URL and restart,
   so the browser is allowed to call it (CORS).

## Deploy with your AI tool

Install the Dockhold plugin or MCP server in your AI coding tool
([setup guide](https://dockhold.eu/docs/recipes/deploy-from-your-ai-tool)), then
say "put this online" in a folder with this template. The tool signs you in
through the browser once and reports the URL when the app is live.

Or from a terminal: `npx dockhold login`, then `npx dockhold deploy`.

## How the API URL works (runtime config)

`API_URL` is read at **runtime**, not baked into the build — so you set it in the
dashboard and restart, with no rebuild and nothing to commit. At container
startup, [`entrypoint.sh`](entrypoint.sh) writes the dashboard's `API_URL` into
`config.js`, which the page loads into `window.__APP_CONFIG__` before the app
runs (see [`src/App.jsx`](src/App.jsx)).

This is the runtime-config pattern for a static SPA — it's why you can point the
frontend at any API without rebuilding.

## Run it locally

```bash
npm install
# set your API URL for local dev in public/config.js:
#   window.__APP_CONFIG__ = { API_URL: "http://localhost:3000" };
npm run dev      # http://localhost:5173
```

## Full walkthrough

[Deploy a full-stack app (React + API + Postgres)](https://dockhold.eu/docs/recipes/deploy-a-full-stack-app)
— the two-app Pro recipe, with deploy order and CORS wiring.
