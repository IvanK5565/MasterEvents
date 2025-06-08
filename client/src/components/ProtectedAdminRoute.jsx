import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // If user is not an admin, redirect to home page
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // If user is an admin, allow access to the protected route
  return children;
};

export default ProtectedAdminRoute; 