# ShopEase — React + TypeScript + Vite

An e-commerce sample app built with React, TypeScript, Vite, Tailwind, React Router, and TanStack Query. It features product listing with pagination, product detail, a persistent cart with quantity management, and global toasts.

## Features

- Product listing with search, category filter, sorting, and pagination
- Product detail page with add-to-cart
- Cart page with increment/decrement, remove item, and clear cart
- Persistent cart (localStorage)
- Debounced search input
- Error boundaries and Suspense fallbacks for lazy routes
- Sticky header and footer pinned to the bottom on short pages
- Global toast notifications for add/remove/clear cart actions

## Tech Stack

- React 19, TypeScript, Vite
- React Router 7
- TanStack Query 5
- Tailwind CSS 4

## Prerequisites

- Node.js 18+ (recommended LTS)
- npm 9+ (or use pnpm/yarn by adapting commands)

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Run the development server

```bash
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:5173`).

3) Lint the project

```bash
npm run lint
```

4) Build for production

```bash
npm run build
```

5) Preview the production build

```bash
npm run preview
```

## Project Structure

```
src/
  components/ui/       # Reusable UI primitives (button, input, pagination)
  context/             # App providers (cart, toast)
  layouts/             # App layout, header, footer
  modules/             # Route-level pages (home, product, cart)
  shared/              # ErrorBoundary, loader, etc.
  lib/                 # Utilities and hooks (use-debounce, utils)
  routes/              # Route configuration
  types/               # Global types (Product, AppRoute)
```

## Environment

This app fetches products from `https://fakestoreapi.com`. No environment variables are required.

## Notes

- The cart persists to `localStorage`.
- ErrorBoundary provides a retry button and safe fallback.
- Debounced search is set to 1000ms by default in `home.page.tsx`.

