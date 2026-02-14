import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  // Use a global flag to prevent React "Double-Mount" errors
  if (!(window as any).__APP_MOUNTED__) {
    (window as any).__APP_MOUNTED__ = true;
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}