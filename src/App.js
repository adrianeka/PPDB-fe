import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './theme';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import PrivateRoute from './components/common/PrivateRoute';
import MainLayout from './components/common/MainLayout';
import Dashboard from './components/Dashboard';

import './App.css';

/**
 * Main App component.
 * Configures the MUI ThemeProvider, CssBaseline reset, and routing tree.
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes (Authenticated only) */}
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>

          {/* Unknown routes redirect back to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
