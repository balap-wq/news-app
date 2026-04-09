import React from 'react';
import HeadlinePage from './pages/HeadlinePage';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import ArticleDetailPage from './pages/ArticleDetailPage';
import Header from './Components/Header';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Navigate to="/headlines" />} />
          <Route path="/headlines" element={<HeadlinePage />} />
          <Route path="/article/:id" element={<ArticleDetailPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
