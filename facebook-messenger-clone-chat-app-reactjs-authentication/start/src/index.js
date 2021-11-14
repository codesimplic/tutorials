import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Start the mocking conditionally.
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
