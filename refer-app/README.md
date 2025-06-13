# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules. It now includes a basic Tailwind CSS setup powered by PostCSS.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Setup

Install dependencies:

```bash
npm install
```

Tailwind CSS is configured through `tailwind.config.js` and `postcss.config.js`.

## Development

Run the development server with hot reloading:

```bash
npm run dev
```

## Build

Create an optimized production build:

```bash
npm run build
```
