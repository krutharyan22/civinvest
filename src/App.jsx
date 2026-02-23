import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Marketplace from './pages/Marketplace';
import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import InvestFlow from './pages/InvestFlow';
import { HelmetProvider } from 'react-helmet-async';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-[#0a0a0b] text-white font-sans selection:bg-blue-500 pb-20">
            <Navbar />
            <Routes>
              <Route path="/" element={<Marketplace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/invest/:id"
                element={
                  <ProtectedRoute>
                    <InvestFlow />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}