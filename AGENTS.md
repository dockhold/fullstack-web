# AGENTS.md

The web half of the two-app full-stack example: a Vite + React single-page app, built from the Dockerfile at the root, that calls the separate `fullstack-api` app. Deploy target: Dockhold (https://dockhold.eu).

## Deploy from this folder (local code, no GitHub repo needed)

1. `npx dockhold login` once. It opens the browser to sign in; the token is stored in the user's config directory, never in this folder.
2. `npx dockhold deploy --name fullstack-web` from this folder.
3. Report the URL the command prints. Never claim a URL is live before the command prints it. Run the same command again to ship a new version; it updates the same app because the CLI recorded the app id in `.dockhold/app.json` (no secret in it, and the CLI adds it to `.gitignore`).

The build uses the Dockerfile at the root on every account.

## Push-to-deploy (from a GitHub repo)

- The Deploy button link in README.md opens the Dockhold dashboard with the repo and name pre-filled; the user signs in, confirms, and the app builds: https://app.dockhold.eu/new?repo=https://github.com/dockhold/fullstack-web&name=fullstack-web&ref=button
- Or the `deploy_app` MCP tool with `repo_url` set to this repository's GitHub URL (the user's copy if they forked or used the template) and `name`. Poll `get_app_status` for the URL.
- Pushes redeploy automatically only when the repo was connected through GitHub in the dashboard (the repo picker, or a private repo). A repo deployed by URL alone deploys by hand until "Auto-deploy on push" is set up under the app's Settings.

## Configuration

- `PORT` is set by Dockhold. Do not set it, and never hardcode a port.
- `API_URL` (plain variable): the deployed API app's URL; read at runtime by `entrypoint.sh`, so set it and restart, no rebuild.
- Secrets (tokens, API keys, passwords) never go in a file in this repo: not in `.env`, not in `dockhold.json`, not in code, not in a commit. Create them in the Secrets section of the Dockhold dashboard and attach them on the app's Variables page.
- Plain (non-secret) variables: the app's Variables page in the dashboard, or `--env KEY=VALUE` on `npx dockhold deploy` (repeatable). A local `.env` file is never uploaded.
- Deploy `fullstack-api` first. After this app is live, set `ALLOWED_ORIGIN` on the API app to this app's URL and restart it.

## When a build or start fails

Run `npx dockhold logs --type build` (or `--type app` for runtime logs), read the error, fix the app, deploy again. Do not invent CLI flags. The CLI has exactly: `login [--token]`, `deploy [--name <name>] [--env KEY=VALUE ...] [--db]`, `logs [--app <id>] [--tail <n>] [--type app|build|db]`, `list`, `open [--app <id>]`.
