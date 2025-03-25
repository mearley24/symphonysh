
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

// Error boundary for unhandled errors
const handleError = (error: Error) => {
  console.error("Root level error caught:", error);
};

// Set up global error handler
window.addEventListener('error', (event) => {
  console.error("Global error event:", event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error("Unhandled Promise rejection:", event.reason);
});

// Wrap the render in a try-catch to prevent complete failure
try {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
} catch (error) {
  console.error("Failed to render application:", error);
  // Render a minimal fallback UI
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h1>Application Error</h1>
        <p>We're sorry, but the application failed to load.</p>
        <p>Please try refreshing the page.</p>
      </div>
    `;
  }
}
