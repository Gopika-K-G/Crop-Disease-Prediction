// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change in import
import App from './App';
import './index.css'; // Ensure this file exists

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
