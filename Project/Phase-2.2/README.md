# Phase 3

### Overview

This example runs both Express and Vite in a single node process, with HMR for live updates in development.  Server-rendered pages are supported via Nunjucks templating as well.


### Run in development mode


```
npm ci
NODE_ENV=dev yarn dev
```

### In production

Build production assets into `dist/`, and then start

```
npm run build
NODE_ENV=production yarn build
```
