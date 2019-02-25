import React from 'react';

const ErrorContainer = ({ message }) => (
  <div className="error-container">
    <span>{message}</span>
  </div>
);

export default ErrorContainer;