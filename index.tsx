import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  // Use a property on the window to ensure we only initialize once
  // This prevents the common "Error #31" in environments that might load index.tsx twice.
  if (!(window as any).__ROBLOX_HUB_INITIALIZED__) {
    (window as any).__ROBLOX_HUB_INITIALIZED__ = true;
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('Roblox Hub: Systems Operational');
  }
}