# tesla-com Worker

Edge host for the Tesla educational clone (static assets + Hono API).

## Bindings
- `ASSETS` — Vite `dist/public`
- `TESLA_NEWSLETTER` — KV for subscribers + contact log

## Deploy
```bash
# from monorepo root
PORT=3000 pnpm --filter ./artifacts/tesla-clone run build
rm -rf workers/tesla-com/public && mkdir -p workers/tesla-com/public
cp -a artifacts/tesla-clone/dist/public/. workers/tesla-com/public/
cd workers/tesla-com && npx wrangler deploy
```

## API
- `GET /api/healthz`
- `POST /api/newsletter` `{ email, name?, prefs? }`
- `GET /api/newsletter/stats`
- `POST /api/contact` `{ name, email, message, phone?, subject?, vehicle? }`
