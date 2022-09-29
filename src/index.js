import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { AuthContextProvider } from './contexts/AuthContext';
import { NotesContextProvider } from './contexts/NotesContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <AuthContextProvider>
      <NotesContextProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </NotesContextProvider>
    </AuthContextProvider>
  // </React.StrictMode>
);
