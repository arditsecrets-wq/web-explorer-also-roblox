import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Singleton Mounting logic
 * This prevents React from mounting twice when the script is loaded 
 * by both the environment and a script tag, resolving Error #31.
 */
function initializeApp() {
  const container = document.getElementById('root');
  
  if (!container) return;

  // Global flag to prevent multiple instances
  if ((window as any).__HUBLOADED__) {
    console.warn('App already mounted. Ignoring duplicate call.');
    return;
  }

  (window as any).__HUBLOADED__ = true;

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('Roblox Hub initialized successfully.');
  } catch (err) {
    console.error('Initialization failed:', err);
    container.innerHTML = `<div style="color: #ef4444; padding: 40px; font-family: monospace;">
      <h3 style="margin:0">RUNTIME ERROR</h3>
      <p style="opacity:0.6">${err.message}</p>
    </div>`;
  }
}

// Kick off
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}