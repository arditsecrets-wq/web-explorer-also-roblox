import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const mountApp = () => {
  const container = document.getElementById('root');
  if (container && !(window as any).__APP_INITIALIZED__) {
    (window as any).__APP_INITIALIZED__ = true;
    const root = createRoot(container);
    root.render(React.createElement(App));
  }
};

if (document.readyState === 'complete') {
  mountApp();
} else {
  window.addEventListener('load', mountApp);
}