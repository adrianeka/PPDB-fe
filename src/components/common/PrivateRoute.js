import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Route guard component for React Router v6.
 * Redirects to the login page ('/') if no token is found in localStorage.
 */
const PrivateRoute = () => {
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  // If authenticated, render nested child routes using Outlet
  // Otherwise, redirect to login page and replace the route history entry
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
