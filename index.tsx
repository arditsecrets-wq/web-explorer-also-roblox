import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

// Ensure we are mounting correctly with React 18 standards
// We use <App /> syntax which is standard for TSX.
const root = createRoot(container);

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('App successfully mounted to #root');
} catch (err) {
  console.error('Mounting failed:', err);
  container.innerHTML = `<div style="color: red; padding: 20px;">Runtime Error: ${err.message}</div>`;
}