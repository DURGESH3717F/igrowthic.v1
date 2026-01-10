
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("iGROWTHIC Mount Error:", error);
  }
} else {
  console.error("Critical: Root element #root not found.");
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('iGROWTHIC Service Worker Registered'))
      .catch((err) => console.warn('SW registration skipped:', err));
  });
}
