import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import ArticleDetailPage from './pages/ArticleDetailPage';
import Header from './Components/Header';
import HeadlinePage from './pages/HeadlinePage';
import AuthSuccess from './pages/AuthSuccess'; // ← NEW

const App = () => {
  return (
    <>
      <div className="min-h-screen bg-[#FAFAFA]">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/headlines" />} />
            <Route path="/headlines" element={<HeadlinePage />} />
            <Route path="/article/:id" element={<ArticleDetailPage />} />
            <Route path="/auth-success" element={<AuthSuccess />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
