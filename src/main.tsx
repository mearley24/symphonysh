
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
