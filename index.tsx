import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container && !(window as any)._initialized) {
  (window as any)._initialized = true;
  const root = createRoot(container);
  root.render(<App />);
}