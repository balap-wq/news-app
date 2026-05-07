import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import ArticleDetailPage from './pages/ArticleDetailPage';
import Header from './Components/Header';
import HeadlinePage from './pages/HeadlinePage';
import AuthSuccess from './pages/AuthSuccess';
import Welcome from './pages/Welcome';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public — no header */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/success" element={<AuthSuccess />} />

          {/* App routes — with header */}
          <Route
            path="/*"
            element={
              <div className="min-h-screen bg-[#FAFAFA]">
                <Header />
                <Routes>
                  {/* Welcome as modal overlay over headlines */}
                  <Route
                    path="/welcome"
                    element={
                      <ProtectedRoute>
                        <div className="relative">
                          <HeadlinePage />
                          <Welcome />
                        </div>
                      </ProtectedRoute>
                    }
                  />

                  {/* PUBLIC — anyone can see headlines, but cards redirect to login if not authed */}
                  <Route path="/headlines" element={<HeadlinePage />} />

                  {/* PROTECTED — only logged in users */}
                  <Route
                    path="/article/:id"
                    element={
                      <ProtectedRoute>
                        <ArticleDetailPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route path="/" element={<Navigate to="/headlines" replace />} />
                </Routes>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
