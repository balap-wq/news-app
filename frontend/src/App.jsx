import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import HeadlinePage from "./pages/HeadlinePage";
import ArticleDetailPage from './pages/ArticleDetailPage';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/headlines" />} />
        <Route path="/headlines" element={<HeadlinePage />} />
        <Route path="/article/:id" element={<ArticleDetailPage />} />
        <Route path="*" element={<Navigate to="/headlines" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
