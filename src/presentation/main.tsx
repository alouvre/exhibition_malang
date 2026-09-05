import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.css';
import { MainView } from './views/MainView';

const mountApp = () => {
  const rootElement = document.getElementById("app");
  if (rootElement && !rootElement.dataset.mounted) {
    rootElement.dataset.mounted = "true";
    createRoot(rootElement).render(
      <React.StrictMode>
        <BrowserRouter>
          <MainView />
        </BrowserRouter>
      </React.StrictMode>
    );
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountApp);
} else {
  mountApp();
}
