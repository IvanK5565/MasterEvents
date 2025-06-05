import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedLoginRoute = ({ children }) => {
  // Check if user is logged in by looking for user data in localStorage
  const user = localStorage.getItem('user');

  // If user is logged in, redirect to home page
  if (user) {
    return <Navigate to="/" replace />;
  }

  // If user is not logged in, allow access to the login page
  return children;
};

export default ProtectedLoginRoute; 