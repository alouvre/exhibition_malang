import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.css';
import { MainView } from './views/MainView';

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("app");
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <MainView />
        </BrowserRouter>
      </React.StrictMode>
    );
  }
});
