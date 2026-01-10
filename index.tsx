
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.info("iGROWTHIC: Mounting sequence initiated...");

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.info("iGROWTHIC: Application successfully mounted to DOM.");
  } catch (error) {
    console.error("iGROWTHIC: Mounting failed with error:", error);
    throw error; // Let global handler catch it
  }
} else {
  console.error("iGROWTHIC: Root container '#root' was not found in the DOM.");
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.info("iGROWTHIC: PWA Service Worker ready."))
      .catch((err) => console.warn("iGROWTHIC: SW registration skipped.", err));
  });
}
