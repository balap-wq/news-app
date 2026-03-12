import React from 'react'
import HeadlinePage from './pages/HeadlinePage'
import {  Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/headlinepage" />} />
          <Route path='/headlinepage' element={<HeadlinePage />} />
        </Routes>
      </BrowserRouter>    
    </>
  )
}

export default App






// import { useEffect, useState } from 'react';
// import './App.css';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// function App() {
//   const [health, setHealth] = useState("");
//   const [news, setNews] = useState(null);

//   useEffect(() => {
//     fetch(`${API_URL}/health`)
//       .then((res) => res.json())
//       .then((data) => setHealth(data))
//       .catch(() => setHealth({ status: 'unreachable' }));
//   }, []);
  

//   return (
//     <div className="app">
//       <h1>News App</h1>
//       <p>API Status: {health ? health.status : 'checking...'}</p>
//       <h4>{health ? health.timestamp : 'Checking timestamp...'}</h4>
      
//     </div>
//   );
// }

// export default App;
