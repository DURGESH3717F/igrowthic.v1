
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Critical: Could not find root element to mount iGROWTHIC.");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Register Service Worker for Offline support in production
// Fix: Use type assertion to any for import.meta to bypass TypeScript error in environments without full Vite type definitions
if ('serviceWorker' in navigator && (import.meta as any).env?.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(() => {
      console.log('iGROWTHIC Service Worker Ready');
    }).catch(() => {
      console.warn('SW registration bypassed');
    });
  });
}
