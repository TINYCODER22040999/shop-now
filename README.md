# E-commerce App (Node.js + React)

A full-stack ecommerce application with Express/MongoDB backend and a React (CRA) frontend.

## Tech Stack
- Backend: Express, MongoDB/Mongoose, JWT, dotenv, morgan, cors
- Frontend: React, React Router, Ant Design, Axios, React Hot Toast
- Utilities: concurrently, nodemon

## Monorepo Layout
```
.
├── server.js                 # Express app entry
├── config/db.js              # Mongo connection
├── controllers/              # Route controllers
├── routes/                   # API routes (/api/v1/...)
├── models/                   # Mongoose schemas
├── scripts/seedCategories.js # Seed helper
├── client/                   # React app (CRA)
└── .gitignore                # Ignored files (env, builds, caches, etc.)
```

## Prerequisites
- Node.js 18+ and npm
- MongoDB connection string

## Environment Variables (root .env)
Create a `.env` in the project root (never commit secrets). Minimum:
```
MONGO_URL=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
PORT=8080
DEV_MODE=development
JWT_SECRET=super_secret_value
```
Optional (only if/when you wire up payments):
```
BRAINTREE_MERCHANT_ID=...
BRAINTREE_PUBLIC_KEY=...
BRAINTREE_PRIVATE_KEY=...
```

## Install
From the project root:
```bash
npm install
npm install --prefix client
```

## Development
Run backend and frontend together:
```bash
npm run dev
```
- Backend: http://localhost:8080
- Frontend: http://localhost:3000

Axios in the client uses relative URLs like `/api/v1/...`. For local dev, add a proxy to the React app so requests from port 3000 reach 8080.

Add this to `client/package.json` (top level):
```json
"proxy": "http://localhost:8080"
```
Then restart `npm run dev` if it was running.

CORS is enabled on the server; the proxy is the simplest way for local development.

## Seeding Categories (optional)
Seeds default product categories once (skips if already present):
```bash
npm run seed:categories
```
Requires `MONGO_URL` in `.env`.

## Scripts (root)
```bash
npm start             # start server (prod)
npm run server        # start server with nodemon
npm run client        # start CRA dev server
npm run dev           # start both (concurrently)
npm run seed:categories
```

## Build (client)
Create a production build for the React app:
```bash
npm run build --prefix client
```
The output will be in `client/build/`.

## API Base
All APIs are under `/api/v1/...`.
- Auth: `/api/v1/auth`
- Category: `/api/v1/category`
- Product: `/api/v1/product`

## Common Issues
- 404 from client when calling `/api/v1/...` in dev: ensure the `proxy` is set in `client/package.json` and restart.
- Mongo connection error: verify `MONGO_URL` in `.env`.
- CORS errors: keep `cors()` enabled in `server.js` (already configured).

## Security
- `.env` and local configs are ignored via `.gitignore`.
- Keep secrets out of code and commits. Use `env.example` (already present) to communicate required keys without sensitive values.

## License
MIT © Sintu Kumar
