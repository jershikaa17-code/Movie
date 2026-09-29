import { registerSW } from "virtual:pwa-register";

// registerType: 'autoUpdate' in vite.config.js means new service worker
// versions activate silently on the next load — no user-facing prompt needed.
if ("serviceWorker" in navigator) {
  registerSW({ immediate: true });
}
