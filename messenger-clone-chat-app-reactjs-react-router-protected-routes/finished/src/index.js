import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Register from './components/Auth/Register';
import App from './components/App/App';
import Login from './components/Auth/Login';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { AuthProvider, useAuth } from './useAuth';

// Start the mocking conditionally.
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

function Protected() {
  return <b>You are on a protected page!</b>
}

function RequireAuth({children}) {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" />
  }

  return children;
}

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={
            <RequireAuth>
              <App />
            </RequireAuth>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
