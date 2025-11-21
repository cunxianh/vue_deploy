# todo-app

A small Vue 3 + Vite todo application template used for learning and experimenting. It uses Pinia for state management, Vue Router for routing, and Axios for HTTP requests. The project is configured with TypeScript support (type checking), though the source contains both JS and TS composables for demonstration.

## Features

- Vue 3 + Vite starter
- Pinia store for todos
- Simple API composable to demonstrate fetching/persisting todos
- Local development proxy to backend under `/api`

## Tech stack

- Vue 3
- Vite
- Pinia
- Vue Router
- Axios
- TypeScript (type checking via `vue-tsc` / `tsc`)

## Prerequisites

- Node.js (recommended: 20.x or compatible per `package.json` engines)
- npm (or another package manager)

## Setup (install dependencies)

Open a terminal in the project directory and run:

```powershell
npm install
```

## Environment

This project reads a Vite env variable defined in `.env`:

- `VITE_token` — demo token used by the example API client. Do not use the shipped value in production.

Copy or update the `.env` file as needed. Example (already present):

```text
VITE_token=aqua-secret-key-please-change-in-production
```

## Useful scripts

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — build production assets
- `npm run preview` — locally preview production build
- `npm run type-check` — run TypeScript `tsc` type-checking (no emit)

Run the dev server:

```powershell
npm run dev
```

Open http://localhost:5173 (or the port printed by Vite) in your browser.

## Type checking and static typing

The repo includes TypeScript config and `vue-tsc` in devDependencies. To run a type-check pass:

```powershell
npm run type-check
```

Note: the project mixes JS and TS files intentionally for learning. If you convert everything to TypeScript, update `tsconfig.json` includes as needed.

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project for educational purposes.



