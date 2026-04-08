import React from 'react';
import HeadlinePage from './pages/HeadlinePage';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Articledetailpage from './Components/ArticleDetailPage';
import Header from './Components/Header';

const App = () => {
  return (
    <>
    <div className="bg-blue-100">
      <BrowserRouter >
        <Header/>
        <Routes>
          <Route path="/" element={<Navigate to="/headlines" />} />
          <Route path="/headlines" element={<HeadlinePage />} />
          <Route path="/article/:id" element={<Articledetailpage />} />
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
};

export default App;
