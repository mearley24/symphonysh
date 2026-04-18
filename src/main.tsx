import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import { initAnalytics } from './utils/tracking';

// Initialize GA4 / Google Ads only when real IDs are configured via Vite env
// vars. See src/utils/tracking.ts — this is a no-op until Matt wires in the
// real measurement IDs in Cloudflare Pages, so we never make 404'd requests
// to a literal "GA_MEASUREMENT_ID" string.
initAnalytics();

// Quiet production-only handlers. During development we still want console
// errors surfaced by React/Vite; in production we just prevent runtime
// overlays from white-screening the site.
if (import.meta.env.PROD) {
  window.addEventListener('error', (event) => {
    event.preventDefault();
  });
  window.addEventListener('unhandledrejection', (event) => {
    event.preventDefault();
  });
}

try {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
} catch (error) {
  // Last-resort fallback — if React itself can't boot, show a clean message
  // rather than a blank page. Deliberately no console.error in production.
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding:40px;text-align:center;font-family:system-ui,sans-serif;color:#fff;background:#0a0a0a;min-height:100vh;">
        <h1 style="color:#ca9f5c;">Symphony Smart Homes</h1>
        <p>We're having a temporary issue loading the site.</p>
        <p>Please refresh the page, or call us at <a href="tel:+19705193013" style="color:#ca9f5c;">(970) 519-3013</a>.</p>
      </div>
    `;
  }
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error('Failed to render application:', error);
  }
}
