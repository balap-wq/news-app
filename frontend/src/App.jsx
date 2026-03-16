import React from "react";
import HeadlineCard from "./Components/headlinecards";
import HeadlinesPage from "./pages/HeadlinesPage";

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
      {/* <HeadlineCard/> */}
      <HeadlinesPage/>
    </div>
  );
}

export default App;