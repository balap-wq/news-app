// import { useEffect, useState } from 'react';
// import './App.css';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// function App() {
//   const [health, setHealth] = useState(null);

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
//     </div>
//   );
// }

// export default App;

import React from "react";
import HeadlineCard from "./Components/headlinecars";

function App() {
  const handleCardClick = () => {
    alert("Card clicked!");
  };

  return (
    <div className="app p-4">
      {/* <h1 className="text-2xl font-bold mb-4">News App</h1>
      <HeadlineCard
        title="Breaking News: Market Hits All-Time High"
        source="Reuters"
        publishedAt="2024-06-01T12:00:00Z"
        urlToImage="https://via.placeholder.com/400x200?text=Market+News"
        onClick={handleCardClick}
      /> */}
      <HeadlineCard/>
    </div>
  );
}

export default App;