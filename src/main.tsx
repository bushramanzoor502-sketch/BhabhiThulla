import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/cinzel';
import '@fontsource-variable/inter';
import '@fontsource/roboto-condensed/latin-700.css';
import './styles/global.css';
import App from './App';

// Strip the trailing slash from Vite's base for React Router ("/BhabhiThulla/" -> "/BhabhiThulla").
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
