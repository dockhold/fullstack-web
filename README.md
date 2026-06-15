# Full-stack example — web

The React frontend half of the Dockhold full-stack example. It's a Vite SPA that
calls a separate [Express + Postgres API](https://github.com/dockhold/fullstack-api).
Running the frontend and API as **two separate apps** (each its own URL) is the
real shape of a production app — and a **Pro** plan feature, since it needs more
than one app.

[![Deploy to Dockhold](https://img.shields.io/badge/Deploy%20to-Dockhold-2563eb?style=for-the-badge)](https://app.dockhold.eu/new?repo=https://github.com/dockhold/fullstack-web)

## Deploy it

This is **app 2 of 2** — deploy the
[API](https://github.com/dockhold/fullstack-api) first so you have its URL.

1. Click **Use this template** (or fork this repo).
2. Copy `.env.example` to `.env.production` and set `VITE_API_URL` to your
   deployed API's URL. Commit it — Vite bakes it into the build.
3. [Deploy it](https://app.dockhold.eu/new?repo=https://github.com/dockhold/fullstack-web).
   It builds from the [`Dockerfile`](Dockerfile) and goes live at its own URL.
4. Back on the **API** app, set `ALLOWED_ORIGIN` to *this* app's URL and redeploy,
   so the browser is allowed to call it (CORS).

That last step is the two-pass part: the frontend needs the API URL at build
time, and the API needs the frontend URL for CORS — so each learns the other's
URL once it's deployed.

## How it works

- `VITE_API_URL` (from `.env.production`) is inlined into the bundle at build
  time — see [`src/App.jsx`](src/App.jsx). Dashboard variables can't reach a
  pre-built static bundle, so this must be committed.
- The app fetches `GET /api/messages` and posts to `POST /api/messages`.
- It deploys via the [`Dockerfile`](Dockerfile) (build, then `serve -s dist` on
  `$PORT`) — a built SPA needs a Dockerfile so it isn't served as raw source.

## Run it locally

```bash
npm install
# point at your local or deployed API:
echo "VITE_API_URL=http://localhost:3000" > .env.production
npm run dev      # http://localhost:5173
# or test the production path:
npm run build && PORT=5173 npm start
```

## Full walkthrough

[Deploy a full-stack app (React + API + Postgres)](https://dockhold.eu/docs/recipes/deploy-a-full-stack-app)
— the two-app Pro recipe, with deploy order and CORS wiring.
