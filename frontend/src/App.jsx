import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import ArticleDetailPage from './pages/ArticleDetailPage';
import Header from './Components/Header';
import HeadlinePage from './pages/HeadlinePage';
import Welcome from './pages/Welcome';
import AuthCallback from './pages/AuthCallback';
// import Login from './pages/';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-[#FAFAFA]">
          <Header />
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Protected routes */}
            <Route path="/welcome" element={
              <ProtectedRoute>
                <Welcome />
              </ProtectedRoute>
            } />
            <Route path="/headlines" element={
              <ProtectedRoute>
                <HeadlinePage />
              </ProtectedRoute>
            } />
            <Route path="/article/:id" element={
              <ProtectedRoute>
                <ArticleDetailPage />
              </ProtectedRoute>
            } />

            {/* Default */}
            <Route path="/" element={<Navigate to="/headlines" replace />} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;