import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

const CODESPACE = process.env.REACT_APP_CODESPACE_NAME;
const API_BASE = CODESPACE
  ? `https://${CODESPACE}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

console.log('REACT app starting. API base:', API_BASE);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App apiBase={API_BASE} />
  </React.StrictMode>
);
