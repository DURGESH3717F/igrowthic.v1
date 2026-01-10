
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

// Register Service Worker for Offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Using relative path for sw.js to handle various project root environments
    navigator.serviceWorker.register('./sw.js').then(registration => {
      console.log('iGROWTHIC Service Worker Ready');
    }).catch(registrationError => {
      // Fail silently to prevent app block
      console.warn('SW registration bypassed');
    });
  });
}
